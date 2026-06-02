import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle, XCircle, Loader2, Home, Mail, MapPin, Calendar, Clock, Users, Briefcase, Plane, Car } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import PageMeta from "@/components/PageMeta";
import { useTranslation } from "@/i18n/LanguageContext";
import { useToast } from "@/hooks/use-toast";

type Status = "loading" | "paid" | "failed" | "pending" | "unknown";

type Booking = {
  id: string;
  payment_status: string;
  date: string;
  time: string;
  service_type: string | null;
  pickup: string;
  dropoff: string | null;
  vehicle: string | null;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  passengers: number | null;
  luggage: number | null;
  flight_number: string | null;
  notes: string | null;
  amount_display: number | null;
  currency_display: string | null;
  amount_charged: number | null;
  currency_charged: string | null;
};

const COPY = {
  fr: {
    title: "Paiement confirmé",
    subtitle: "Votre réservation est enregistrée. Un email de confirmation vous a été envoyé.",
    reference: "Référence",
    summary: "Récapitulatif de la réservation",
    service: "Service",
    pickup: "Prise en charge",
    dropoff: "Destination",
    date: "Date",
    time: "Heure",
    vehicle: "Véhicule",
    passengers: "Passagers",
    luggage: "Bagages",
    flight: "N° de vol",
    contact: "Contact",
    amount: "Montant",
    nextSteps: "Prochaines étapes",
    step1: "Vous recevrez un email de confirmation immédiate.",
    step2: "Notre équipe valide votre course sous 2 heures ouvrées.",
    step3: "Les détails du chauffeur vous seront communiqués 12h avant la course.",
    resend: "Renvoyer l'email de confirmation",
    sending: "Envoi en cours…",
    resent: "Email renvoyé avec succès",
    resendError: "Échec de l'envoi. Réessayez dans un instant.",
    cooldown: (s: number) => `Patientez ${s}s avant un nouvel envoi`,
    home: "Retour à l'accueil",
    failedTitle: "Paiement échoué",
    failedDesc: "Le paiement n'a pas abouti. Aucun montant n'a été débité. Vous pouvez réessayer.",
    retry: "Réessayer",
    pendingTitle: "Paiement en cours de traitement",
    pendingDesc: "Nous vérifions encore le statut auprès de notre prestataire. Vous recevrez un email dès confirmation.",
    verifying: "Vérification du paiement",
    wait: "Merci de patienter quelques instants…",
  },
  en: {
    title: "Payment confirmed",
    subtitle: "Your booking is registered. A confirmation email has been sent.",
    reference: "Reference",
    summary: "Booking summary",
    service: "Service",
    pickup: "Pickup",
    dropoff: "Drop-off",
    date: "Date",
    time: "Time",
    vehicle: "Vehicle",
    passengers: "Passengers",
    luggage: "Luggage",
    flight: "Flight no.",
    contact: "Contact",
    amount: "Amount",
    nextSteps: "Next steps",
    step1: "You will receive an immediate confirmation email.",
    step2: "Our team validates your ride within 2 business hours.",
    step3: "Chauffeur details will be shared 12h before the ride.",
    resend: "Resend confirmation email",
    sending: "Sending…",
    resent: "Email resent successfully",
    resendError: "Failed to send. Please retry in a moment.",
    cooldown: (s: number) => `Wait ${s}s before resending`,
    home: "Back to home",
    failedTitle: "Payment failed",
    failedDesc: "Payment did not complete. No amount was charged. You can try again.",
    retry: "Try again",
    pendingTitle: "Payment is being processed",
    pendingDesc: "We're still verifying with our provider. You'll receive an email once confirmed.",
    verifying: "Verifying payment",
    wait: "Please wait a moment…",
  },
  ar: {
    title: "تم تأكيد الدفع",
    subtitle: "تم تسجيل حجزك. تم إرسال بريد إلكتروني للتأكيد.",
    reference: "المرجع",
    summary: "ملخص الحجز",
    service: "الخدمة",
    pickup: "نقطة الانطلاق",
    dropoff: "الوجهة",
    date: "التاريخ",
    time: "الوقت",
    vehicle: "المركبة",
    passengers: "الركاب",
    luggage: "الأمتعة",
    flight: "رقم الرحلة",
    contact: "التواصل",
    amount: "المبلغ",
    nextSteps: "الخطوات التالية",
    step1: "ستتلقى بريدًا إلكترونيًا للتأكيد على الفور.",
    step2: "يتحقق فريقنا من رحلتك خلال ساعتين عمل.",
    step3: "ستتم مشاركة تفاصيل السائق قبل 12 ساعة من الرحلة.",
    resend: "إعادة إرسال بريد التأكيد",
    sending: "جارٍ الإرسال…",
    resent: "تم إعادة إرسال البريد بنجاح",
    resendError: "فشل الإرسال. حاول مرة أخرى بعد قليل.",
    cooldown: (s: number) => `انتظر ${s} ثانية قبل إعادة الإرسال`,
    home: "العودة إلى الرئيسية",
    failedTitle: "فشل الدفع",
    failedDesc: "لم يكتمل الدفع. لم يتم خصم أي مبلغ. يمكنك المحاولة مرة أخرى.",
    retry: "إعادة المحاولة",
    pendingTitle: "جارٍ معالجة الدفع",
    pendingDesc: "ما زلنا نتحقق من المزود. ستتلقى بريدًا إلكترونيًا بمجرد التأكيد.",
    verifying: "جارٍ التحقق من الدفع",
    wait: "يرجى الانتظار قليلاً…",
  },
} as const;

const formatRef = (b: Pick<Booking, "id" | "date">) =>
  `RES-${String(b.date).replace(/-/g, "")}-${b.id.slice(0, 4).toUpperCase()}`;

const BookingReturn = () => {
  const [params] = useSearchParams();
  const { language } = useTranslation();
  const { toast } = useToast();
  const c = COPY[language];
  const [status, setStatus] = useState<Status>("loading");
  const [booking, setBooking] = useState<Booking | null>(null);
  const [resendState, setResendState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    let attempts = 0;
    let cancelled = false;

    const orderId = params.get("order") || params.get("merchant_order_id");
    const txSuccess = params.get("success");
    const specialRef = params.get("special_reference");

    const poll = async () => {
      while (!cancelled && attempts < 12) {
        attempts++;
        const query = supabase
          .from("bookings")
          .select(
            "id, payment_status, date, time, service_type, pickup, dropoff, vehicle, firstname, lastname, email, phone, passengers, luggage, flight_number, notes, amount_display, currency_display, amount_charged, currency_charged"
          );
        const { data } = specialRef
          ? await query.eq("id", specialRef).maybeSingle()
          : orderId
            ? await query.eq("payment_order_id", orderId).maybeSingle()
            : { data: null as Booking | null };

        if (data) {
          setBooking(data as Booking);
          if (data.payment_status === "paid") { setStatus("paid"); return; }
          if (data.payment_status === "failed") { setStatus("failed"); return; }
        }

        if (attempts === 1 && txSuccess === "false") { setStatus("failed"); return; }
        await new Promise((r) => setTimeout(r, 2500));
      }
      if (!cancelled) setStatus(txSuccess === "true" ? "paid" : "pending");
    };

    poll();
    return () => { cancelled = true; };
  }, [params]);

  useEffect(() => {
    if (cooldown <= 0) return;
    const id = setTimeout(() => setCooldown((s) => s - 1), 1000);
    return () => clearTimeout(id);
  }, [cooldown]);

  const handleResend = async () => {
    if (!booking || resendState === "sending" || cooldown > 0) return;
    setResendState("sending");
    try {
      const reservationId = formatRef(booking);
      const { error } = await supabase.functions.invoke("send-transactional-email", {
        body: {
          templateName: "booking-received",
          recipientEmail: booking.email,
          idempotencyKey: `booking-received-resend-${booking.id}-${Date.now()}`,
          templateData: {
            bookingId: booking.id,
            reservationId,
            firstname: booking.firstname,
            service: booking.service_type ?? undefined,
            pickup: booking.pickup,
            dropoff: booking.dropoff || undefined,
            date: booking.date,
            time: booking.time,
            vehicle: booking.vehicle ?? undefined,
          },
        },
      });
      if (error) throw error;
      setResendState("sent");
      setCooldown(30);
      toast({ title: c.resent });
    } catch (e) {
      console.error("resend failed", e);
      setResendState("error");
      toast({ title: c.resendError, variant: "destructive" });
    }
  };

  const reservationId = booking ? formatRef(booking) : "";
  const amount =
    booking && booking.amount_display && booking.currency_display
      ? `${booking.amount_display} ${booking.currency_display}${
          booking.currency_charged && booking.currency_charged !== booking.currency_display
            ? ` (≈ ${booking.amount_charged} ${booking.currency_charged})`
            : ""
        }`
      : null;

  const Row = ({ icon: Icon, label, value }: { icon: typeof MapPin; label: string; value?: string | number | null }) => {
    if (value === null || value === undefined || value === "" || value === 0) return null;
    return (
      <div className="flex items-start gap-3 py-2 border-b border-border/40 last:border-0">
        <Icon className="text-primary mt-0.5 shrink-0" size={16} />
        <div className="flex-1 min-w-0">
          <div className="font-sans text-xs text-muted-foreground uppercase tracking-wide">{label}</div>
          <div className="font-sans text-sm text-foreground break-words">{value}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background flex items-start justify-center px-4 py-10">
      <PageMeta title={c.title} description="KCC EliteDriver" />
      <div className="max-w-2xl w-full">
        {status === "loading" && (
          <div className="rounded-lg border border-border bg-card p-8 text-center">
            <Loader2 className="mx-auto mb-4 text-primary animate-spin" size={48} />
            <h1 className="font-serif text-2xl text-foreground mb-2">{c.verifying}</h1>
            <p className="font-sans text-sm text-muted-foreground">{c.wait}</p>
          </div>
        )}

        {status === "paid" && (
          <div className="space-y-6">
            <div className="rounded-lg border border-border bg-card p-8 text-center">
              <CheckCircle className="mx-auto mb-4 text-emerald-500" size={48} />
              <h1 className="font-serif text-3xl text-foreground mb-2">{c.title}</h1>
              <p className="font-sans text-sm text-muted-foreground mb-3">{c.subtitle}</p>
              {reservationId && (
                <p className="font-sans text-xs text-muted-foreground">
                  {c.reference} : <span className="text-primary font-semibold">{reservationId}</span>
                </p>
              )}
            </div>

            {booking && (
              <div className="rounded-lg border border-border bg-card p-6">
                <h2 className="font-serif text-xl text-foreground mb-4">{c.summary}</h2>
                <Row icon={Car} label={c.service} value={booking.service_type} />
                <Row icon={Car} label={c.vehicle} value={booking.vehicle} />
                <Row icon={MapPin} label={c.pickup} value={booking.pickup} />
                <Row icon={MapPin} label={c.dropoff} value={booking.dropoff} />
                <Row icon={Calendar} label={c.date} value={booking.date} />
                <Row icon={Clock} label={c.time} value={booking.time} />
                <Row icon={Users} label={c.passengers} value={booking.passengers} />
                <Row icon={Briefcase} label={c.luggage} value={booking.luggage} />
                <Row icon={Plane} label={c.flight} value={booking.flight_number} />
                <Row icon={Mail} label={c.contact} value={`${booking.firstname} ${booking.lastname} · ${booking.email} · ${booking.phone}`} />
                {amount && <Row icon={CheckCircle} label={c.amount} value={amount} />}
              </div>
            )}

            <div className="rounded-lg border border-border bg-card p-6">
              <h2 className="font-serif text-xl text-foreground mb-3">{c.nextSteps}</h2>
              <ul className="space-y-2 font-sans text-sm text-muted-foreground">
                <li className="flex gap-2"><span className="text-primary">•</span>{c.step1}</li>
                <li className="flex gap-2"><span className="text-primary">•</span>{c.step2}</li>
                <li className="flex gap-2"><span className="text-primary">•</span>{c.step3}</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={handleResend}
                disabled={resendState === "sending" || cooldown > 0 || !booking}
                className="inline-flex items-center justify-center gap-2 border border-primary text-primary hover:bg-primary/10 disabled:opacity-50 disabled:cursor-not-allowed font-sans text-sm font-semibold px-6 py-3 rounded-md transition-colors"
              >
                {resendState === "sending" ? (
                  <><Loader2 size={14} className="animate-spin" /> {c.sending}</>
                ) : cooldown > 0 ? (
                  <><Mail size={14} /> {c.cooldown(cooldown)}</>
                ) : (
                  <><Mail size={14} /> {c.resend}</>
                )}
              </button>
              <Link to="/" className="inline-flex items-center justify-center gap-2 gradient-gold text-primary-foreground font-sans text-sm font-semibold px-6 py-3 rounded-md">
                <Home size={14} /> {c.home}
              </Link>
            </div>
          </div>
        )}

        {status === "failed" && (
          <div className="rounded-lg border border-border bg-card p-8 text-center">
            <XCircle className="mx-auto mb-4 text-destructive" size={48} />
            <h1 className="font-serif text-2xl text-foreground mb-2">{c.failedTitle}</h1>
            <p className="font-sans text-sm text-muted-foreground mb-6">{c.failedDesc}</p>
            <Link to="/booking" className="inline-flex items-center gap-2 gradient-gold text-primary-foreground font-sans text-sm font-semibold px-6 py-3 rounded-md">
              {c.retry}
            </Link>
          </div>
        )}

        {(status === "pending" || status === "unknown") && (
          <div className="rounded-lg border border-border bg-card p-8 text-center">
            <Loader2 className="mx-auto mb-4 text-primary" size={48} />
            <h1 className="font-serif text-2xl text-foreground mb-2">{c.pendingTitle}</h1>
            <p className="font-sans text-sm text-muted-foreground mb-6">{c.pendingDesc}</p>
            <Link to="/" className="inline-flex items-center gap-2 gradient-gold text-primary-foreground font-sans text-sm font-semibold px-6 py-3 rounded-md">
              <Home size={14} /> {c.home}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingReturn;