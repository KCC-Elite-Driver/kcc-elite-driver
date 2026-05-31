import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle, XCircle, Loader2, Home } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import PageMeta from "@/components/PageMeta";

type Status = "loading" | "paid" | "failed" | "pending" | "unknown";

const BookingReturn = () => {
  const [params] = useSearchParams();
  const [status, setStatus] = useState<Status>("loading");
  const [reservationId, setReservationId] = useState<string>("");

  useEffect(() => {
    let attempts = 0;
    let cancelled = false;

    const orderId = params.get("order") || params.get("merchant_order_id");
    const txSuccess = params.get("success");
    const specialRef = params.get("special_reference"); // == bookingId

    const poll = async () => {
      while (!cancelled && attempts < 12) {
        attempts++;
        const query = supabase.from("bookings").select("id, payment_status, date").limit(1);
        const { data } = specialRef
          ? await query.eq("id", specialRef).maybeSingle()
          : orderId
            ? await query.eq("payment_order_id", orderId).maybeSingle()
            : { data: null };

        if (data) {
          setReservationId(String(data.id).slice(0, 8).toUpperCase());
          if (data.payment_status === "paid") { setStatus("paid"); return; }
          if (data.payment_status === "failed") { setStatus("failed"); return; }
        }

        // If Paymob redirected with success=false, short-circuit.
        if (attempts === 1 && txSuccess === "false") { setStatus("failed"); return; }

        await new Promise((r) => setTimeout(r, 2500));
      }
      if (!cancelled) setStatus(txSuccess === "true" ? "paid" : "pending");
    };

    poll();
    return () => { cancelled = true; };
  }, [params]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <PageMeta title="Confirmation de réservation" description="Retour paiement KCC EliteDriver" />
      <div className="max-w-md w-full rounded-lg border border-border bg-card p-8 text-center">
        {status === "loading" && (
          <>
            <Loader2 className="mx-auto mb-4 text-primary animate-spin" size={48} />
            <h1 className="font-serif text-2xl text-foreground mb-2">Vérification du paiement</h1>
            <p className="font-sans text-sm text-muted-foreground">Merci de patienter quelques instants…</p>
          </>
        )}
        {status === "paid" && (
          <>
            <CheckCircle className="mx-auto mb-4 text-emerald-500" size={48} />
            <h1 className="font-serif text-2xl text-foreground mb-2">Paiement confirmé</h1>
            <p className="font-sans text-sm text-muted-foreground mb-2">
              Votre réservation est enregistrée. Un email de confirmation vous a été envoyé.
            </p>
            {reservationId && (
              <p className="font-sans text-xs text-muted-foreground mb-6">Référence : <span className="text-primary">{reservationId}</span></p>
            )}
            <Link to="/" className="inline-flex items-center gap-2 gradient-gold text-primary-foreground font-sans text-sm font-semibold px-6 py-3 rounded-md">
              <Home size={14} /> Retour à l'accueil
            </Link>
          </>
        )}
        {status === "failed" && (
          <>
            <XCircle className="mx-auto mb-4 text-destructive" size={48} />
            <h1 className="font-serif text-2xl text-foreground mb-2">Paiement échoué</h1>
            <p className="font-sans text-sm text-muted-foreground mb-6">
              Le paiement n'a pas abouti. Aucun montant n'a été débité. Vous pouvez réessayer.
            </p>
            <Link to="/booking" className="inline-flex items-center gap-2 gradient-gold text-primary-foreground font-sans text-sm font-semibold px-6 py-3 rounded-md">
              Réessayer
            </Link>
          </>
        )}
        {(status === "pending" || status === "unknown") && (
          <>
            <Loader2 className="mx-auto mb-4 text-primary" size={48} />
            <h1 className="font-serif text-2xl text-foreground mb-2">Paiement en cours de traitement</h1>
            <p className="font-sans text-sm text-muted-foreground mb-6">
              Nous vérifions encore le statut auprès de notre prestataire. Vous recevrez un email dès confirmation.
            </p>
            <Link to="/" className="inline-flex items-center gap-2 gradient-gold text-primary-foreground font-sans text-sm font-semibold px-6 py-3 rounded-md">
              <Home size={14} /> Retour à l'accueil
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default BookingReturn;