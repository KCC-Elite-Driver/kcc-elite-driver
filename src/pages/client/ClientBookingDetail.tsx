import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useTranslation } from "@/i18n/LanguageContext";
import { ArrowLeft, Pencil, Check, AlertTriangle } from "lucide-react";

type Booking = {
  id: string; service_type: string | null; pickup: string; dropoff: string;
  date: string; time: string; vehicle: string | null; status: string;
  firstname: string; lastname: string; email: string; phone: string;
  passengers: number; luggage: number; notes: string | null;
  flight_number: string | null; meet_greet: boolean; payment_method: string | null; created_at: string;
};

const ClientBookingDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { t } = useTranslation();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState<Partial<Booking>>({});
  const [showCancel, setShowCancel] = useState(false);

  useEffect(() => {
    if (!id || !user) return;
    supabase.from("bookings").select("*").eq("id", id).eq("client_id", user.id).single()
      .then(({ data }) => {
        if (data) { setBooking(data as Booking); setForm(data as Booking); }
      });
  }, [id, user]);

  const canEdit = booking && (booking.status === "pending" || booking.status === "confirmed");

  const handleSave = async () => {
    if (!booking) return;
    await supabase.from("bookings").update({
      pickup: form.pickup, dropoff: form.dropoff, date: form.date, time: form.time, notes: form.notes,
    }).eq("id", booking.id);
    setBooking({ ...booking, ...form } as Booking);
    setEditing(false);
  };

  const handleCancel = async () => {
    if (!booking) return;
    await supabase.from("bookings").update({ status: "cancelled" }).eq("id", booking.id);
    setBooking({ ...booking, status: "cancelled" });
    setShowCancel(false);
  };

  if (!booking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background pt-20">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const fields: { label: string; key: keyof Booking; editable?: boolean }[] = [
    { label: t.field_service, key: "service_type" },
    { label: t.field_pickup, key: "pickup", editable: true },
    { label: t.field_dropoff, key: "dropoff", editable: true },
    { label: t.field_date, key: "date", editable: true },
    { label: t.field_time, key: "time", editable: true },
    { label: t.field_vehicle, key: "vehicle" },
    { label: t.field_passengers, key: "passengers" },
    { label: t.field_luggage, key: "luggage" },
    { label: t.field_flight, key: "flight_number" },
    { label: t.field_notes, key: "notes", editable: true },
  ];

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-8 max-w-xl">
        <Link to="/client/bookings" className="flex items-center gap-2 font-sans text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft size={16} /> {t.client_back_bookings}
        </Link>

        <div className="rounded-lg border border-border bg-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="font-serif text-xl font-bold text-foreground">{t.client_booking_detail}</h1>
            {canEdit && !editing && (
              <button onClick={() => setEditing(true)} className="flex items-center gap-1 font-sans text-sm text-primary hover:underline">
                <Pencil size={14} /> {t.client_modify}
              </button>
            )}
          </div>

          <div className="space-y-4">
            {fields.map(f => (
              <div key={f.key} className="flex items-start justify-between py-2 border-b border-border/50">
                <span className="font-sans text-sm text-muted-foreground">{f.label}</span>
                {editing && f.editable ? (
                  <input
                    type={f.key === "date" ? "date" : f.key === "time" ? "time" : "text"}
                    value={String(form[f.key] ?? "")}
                    onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                    className="bg-secondary border border-border rounded px-2 py-1 text-sm font-sans text-foreground text-right w-48 focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                ) : (
                  <span className="font-sans text-sm text-foreground text-right">{String(booking[f.key] ?? "—")}</span>
                )}
              </div>
            ))}
          </div>

          {editing && (
            <div className="flex gap-2 justify-end mt-6">
              <button onClick={() => setEditing(false)} className="font-sans text-sm px-4 py-2 rounded-md border border-border text-muted-foreground hover:text-foreground">{t.client_cancel_edit}</button>
              <button onClick={handleSave} className="flex items-center gap-1 gradient-gold text-primary-foreground font-sans text-sm font-semibold px-4 py-2 rounded-md hover:opacity-90">
                <Check size={14} /> {t.client_save}
              </button>
            </div>
          )}

          {canEdit && !editing && (
            <div className="mt-6 pt-4 border-t border-border">
              {showCancel ? (
                <div className="flex items-center gap-3">
                  <AlertTriangle size={16} className="text-destructive shrink-0" />
                  <span className="font-sans text-sm text-muted-foreground">{t.client_cancel_confirm}</span>
                  <button onClick={handleCancel} className="font-sans text-sm text-destructive hover:underline">{t.client_cancel_yes}</button>
                  <button onClick={() => setShowCancel(false)} className="font-sans text-sm text-muted-foreground hover:underline">{t.client_cancel_no}</button>
                </div>
              ) : (
                <button onClick={() => setShowCancel(true)} className="font-sans text-sm text-destructive hover:underline">{t.client_cancel_booking}</button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientBookingDetail;
