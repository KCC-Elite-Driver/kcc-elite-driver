import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useTranslation } from "@/i18n/LanguageContext";
import { LogOut, ArrowLeft } from "lucide-react";

type Booking = {
  id: string; firstname: string; lastname: string; email: string; phone: string;
  service_type: string | null; pickup: string; dropoff: string; date: string; time: string;
  vehicle: string | null; status: string; driver_id: string | null; provider_id: string | null; created_at: string;
};
type Provider = { id: string; name: string };
type Driver = { id: string; firstname: string; lastname: string; provider_id: string };

const AdminBookings = () => {
  const { signOut } = useAuth();
  const { t } = useTranslation();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [providers, setProviders] = useState<Provider[]>([]);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [filter, setFilter] = useState("all");
  const [editId, setEditId] = useState<string | null>(null);

  const statusMap: Record<string, string> = {
    pending: t.status_pending, confirmed: t.status_confirmed,
    completed: t.status_completed, cancelled: t.status_cancelled,
  };
  const statusColors: Record<string, string> = {
    pending: "bg-amber-500/10 text-amber-500", confirmed: "bg-emerald-500/10 text-emerald-500",
    completed: "bg-blue-500/10 text-blue-500", cancelled: "bg-destructive/10 text-destructive",
  };

  const load = async () => {
    const [b, p, d] = await Promise.all([
      supabase.from("bookings").select("*").order("created_at", { ascending: false }),
      supabase.from("providers").select("id, name"),
      supabase.from("drivers").select("id, firstname, lastname, provider_id"),
    ]);
    setBookings((b.data as Booking[]) ?? []);
    setProviders((p.data as Provider[]) ?? []);
    setDrivers((d.data as Driver[]) ?? []);
  };

  useEffect(() => { load(); }, []);

  const filtered = filter === "all" ? bookings : bookings.filter(b => b.status === filter);

  const updateBooking = async (id: string, updates: Record<string, any>) => {
    await supabase.from("bookings").update(updates as any).eq("id", id);

    // Send confirmation email to client when status changes to "confirmed"
    if (updates.status === "confirmed") {
      const b = bookings.find((x) => x.id === id);
      if (b && b.status !== "confirmed") {
        const driver = drivers.find((d) => d.id === (updates.driver_id ?? b.driver_id));
        supabase.functions.invoke("send-transactional-email", {
          body: {
            templateName: "booking-confirmed",
            recipientEmail: b.email,
            idempotencyKey: `booking-confirmed-${id}`,
            templateData: {
              bookingId: id,
              firstname: b.firstname,
              reservationId: id.slice(0, 8).toUpperCase(),
              service: b.service_type ?? undefined,
              pickup: b.pickup,
              dropoff: b.dropoff || undefined,
              date: b.date,
              time: b.time,
              vehicle: b.vehicle ?? undefined,
              driverName: driver ? `${driver.firstname} ${driver.lastname}` : undefined,
            },
          },
        }).catch((e) => console.error("confirmation email failed", e));
      }
    }

    load();
    setEditId(null);
  };

  const filterButtons = [
    { key: "all", label: t.admin_all },
    { key: "pending", label: t.status_pending },
    { key: "confirmed", label: t.status_confirmed },
    { key: "completed", label: t.status_completed },
    { key: "cancelled", label: t.status_cancelled },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-4">
            <Link to="/admin" className="text-muted-foreground hover:text-foreground"><ArrowLeft size={20} /></Link>
            <h1 className="font-serif text-xl font-bold text-foreground">{t.admin_bookings}</h1>
          </div>
          <button onClick={signOut} className="flex items-center gap-1.5 font-sans text-sm text-muted-foreground hover:text-foreground"><LogOut size={16} /></button>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <div className="flex gap-2 mb-6 flex-wrap">
          {filterButtons.map(s => (
            <button key={s.key} onClick={() => setFilter(s.key)}
              className={`font-sans text-xs px-3 py-1.5 rounded-full border transition-colors ${filter === s.key ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:text-foreground"}`}>
              {s.label}
            </button>
          ))}
        </div>

        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/50">
                <th className="text-left px-4 py-3 font-sans font-medium text-muted-foreground">{t.admin_client}</th>
                <th className="text-left px-4 py-3 font-sans font-medium text-muted-foreground">{t.admin_service}</th>
                <th className="text-left px-4 py-3 font-sans font-medium text-muted-foreground">{t.admin_date}</th>
                <th className="text-left px-4 py-3 font-sans font-medium text-muted-foreground">{t.admin_route}</th>
                <th className="text-left px-4 py-3 font-sans font-medium text-muted-foreground">{t.admin_status}</th>
                <th className="text-left px-4 py-3 font-sans font-medium text-muted-foreground">{t.admin_driver}</th>
                <th className="text-left px-4 py-3 font-sans font-medium text-muted-foreground">{t.admin_actions}</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(b => {
                const assignedDriver = drivers.find(d => d.id === b.driver_id);
                const isEditing = editId === b.id;
                return (
                  <tr key={b.id} className="border-b border-border/50 hover:bg-secondary/30">
                    <td className="px-4 py-3 font-sans text-foreground">{b.firstname} {b.lastname}</td>
                    <td className="px-4 py-3 font-sans text-muted-foreground">{b.service_type || "—"}</td>
                    <td className="px-4 py-3 font-sans text-muted-foreground">{b.date} {b.time}</td>
                    <td className="px-4 py-3 font-sans text-muted-foreground text-xs">{b.pickup} → {b.dropoff}</td>
                    <td className="px-4 py-3">
                      {isEditing ? (
                        <select value={b.status} onChange={e => updateBooking(b.id, { status: e.target.value })}
                          className="bg-secondary border border-border rounded px-2 py-1 text-xs font-sans">
                          {Object.entries(statusMap).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                        </select>
                      ) : (
                        <span className={`font-sans text-xs px-2 py-1 rounded-full ${statusColors[b.status] || ""}`}>
                          {statusMap[b.status] || b.status}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {isEditing ? (
                        <select value={b.driver_id || ""} onChange={e => updateBooking(b.id, { driver_id: e.target.value || null, provider_id: drivers.find(d => d.id === e.target.value)?.provider_id || null })}
                          className="bg-secondary border border-border rounded px-2 py-1 text-xs font-sans">
                          <option value="">{t.admin_unassigned}</option>
                          {drivers.map(d => <option key={d.id} value={d.id}>{d.firstname} {d.lastname}</option>)}
                        </select>
                      ) : (
                        <span className="font-sans text-xs text-muted-foreground">
                          {assignedDriver ? `${assignedDriver.firstname} ${assignedDriver.lastname}` : t.admin_unassigned}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <button onClick={() => setEditId(isEditing ? null : b.id)}
                        className="font-sans text-xs text-primary hover:underline">
                        {isEditing ? t.admin_close : t.admin_edit}
                      </button>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr><td colSpan={7} className="px-4 py-8 text-center font-sans text-muted-foreground">{t.admin_no_bookings}</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default AdminBookings;
