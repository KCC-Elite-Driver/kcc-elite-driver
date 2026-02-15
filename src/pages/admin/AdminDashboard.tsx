import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { CalendarDays, Users, Truck, ClipboardList, LogOut } from "lucide-react";

const AdminDashboard = () => {
  const { signOut } = useAuth();
  const [counts, setCounts] = useState({ bookings: 0, providers: 0, drivers: 0, pending: 0 });

  useEffect(() => {
    const load = async () => {
      const [b, p, d, pend] = await Promise.all([
        supabase.from("bookings").select("id", { count: "exact", head: true }),
        supabase.from("providers").select("id", { count: "exact", head: true }),
        supabase.from("drivers").select("id", { count: "exact", head: true }),
        supabase.from("bookings").select("id", { count: "exact", head: true }).eq("status", "pending"),
      ]);
      setCounts({
        bookings: b.count ?? 0,
        providers: p.count ?? 0,
        drivers: d.count ?? 0,
        pending: pend.count ?? 0,
      });
    };
    load();
  }, []);

  const cards = [
    { label: "Réservations", value: counts.bookings, icon: ClipboardList, link: "/admin/bookings", color: "text-blue-500" },
    { label: "En attente", value: counts.pending, icon: CalendarDays, link: "/admin/bookings", color: "text-amber-500" },
    { label: "Prestataires", value: counts.providers, icon: Truck, link: "/admin/providers", color: "text-emerald-500" },
    { label: "Chauffeurs", value: counts.drivers, icon: Users, link: "/admin/drivers", color: "text-violet-500" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <h1 className="font-serif text-xl font-bold text-foreground">KCC Admin</h1>
          <div className="flex items-center gap-4">
            <nav className="hidden md:flex items-center gap-6">
              <Link to="/admin/bookings" className="font-sans text-sm text-muted-foreground hover:text-foreground transition-colors">Réservations</Link>
              <Link to="/admin/providers" className="font-sans text-sm text-muted-foreground hover:text-foreground transition-colors">Prestataires</Link>
              <Link to="/admin/drivers" className="font-sans text-sm text-muted-foreground hover:text-foreground transition-colors">Chauffeurs</Link>
            </nav>
            <button onClick={signOut} className="flex items-center gap-1.5 font-sans text-sm text-muted-foreground hover:text-foreground transition-colors">
              <LogOut size={16} /> Déconnexion
            </button>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <h2 className="font-serif text-2xl font-semibold text-foreground mb-6">Tableau de bord</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map(c => (
            <Link key={c.label} to={c.link} className="rounded-lg border border-border bg-card p-5 hover:border-primary/30 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <span className="font-sans text-sm text-muted-foreground">{c.label}</span>
                <c.icon size={20} className={c.color} />
              </div>
              <span className="font-serif text-3xl font-bold text-foreground">{c.value}</span>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
