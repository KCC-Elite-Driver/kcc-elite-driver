import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { LogOut, Plus, Eye, RotateCcw } from "lucide-react";

type Booking = {
  id: string;
  service_type: string | null;
  pickup: string;
  dropoff: string;
  date: string;
  time: string;
  vehicle: string | null;
  status: string;
  created_at: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  passengers: number;
  luggage: number;
  notes: string | null;
  flight_number: string | null;
  meet_greet: boolean;
  payment_method: string | null;
};

const STATUS_LABELS: Record<string, string> = {
  pending: "En attente",
  confirmed: "Confirmée",
  completed: "Terminée",
  cancelled: "Annulée",
};

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-amber-500/10 text-amber-500",
  confirmed: "bg-emerald-500/10 text-emerald-500",
  completed: "bg-blue-500/10 text-blue-500",
  cancelled: "bg-destructive/10 text-destructive",
};

const ClientBookings = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    if (!user) return;
    supabase.from("bookings").select("*").eq("client_id", user.id).order("created_at", { ascending: false })
      .then(({ data }) => setBookings((data as Booking[]) ?? []));
  }, [user]);

  const handleRebook = (b: Booking) => {
    const params = new URLSearchParams({
      service: b.service_type || "",
      pickup: b.pickup,
      dropoff: b.dropoff,
      vehicle: b.vehicle || "",
      firstname: b.firstname,
      lastname: b.lastname,
      email: b.email,
      phone: b.phone,
    });
    navigate(`/booking?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-serif text-2xl font-bold text-foreground">Mes réservations</h1>
            <p className="font-sans text-sm text-muted-foreground mt-1">{user?.email}</p>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/booking" className="flex items-center gap-1.5 gradient-gold text-primary-foreground font-sans text-sm font-semibold px-4 py-2 rounded-md hover:opacity-90">
              <Plus size={16} /> Nouvelle
            </Link>
            <button onClick={signOut} className="flex items-center gap-1.5 font-sans text-sm text-muted-foreground hover:text-foreground">
              <LogOut size={16} />
            </button>
          </div>
        </div>

        {bookings.length === 0 ? (
          <div className="text-center py-16">
            <p className="font-sans text-muted-foreground mb-4">Aucune réservation pour le moment</p>
            <Link to="/booking" className="gradient-gold text-primary-foreground font-sans text-sm font-semibold px-6 py-2.5 rounded-md hover:opacity-90 inline-block">
              Réserver maintenant
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {bookings.map(b => (
              <div key={b.id} className="rounded-lg border border-border bg-card p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className="font-sans text-sm font-medium text-foreground">{b.service_type || "Réservation"}</span>
                    <span className="font-sans text-xs text-muted-foreground ml-3">{b.date} à {b.time}</span>
                  </div>
                  <span className={`font-sans text-xs px-2 py-1 rounded-full ${STATUS_COLORS[b.status] || ""}`}>
                    {STATUS_LABELS[b.status] || b.status}
                  </span>
                </div>
                <p className="font-sans text-xs text-muted-foreground mb-3">{b.pickup} → {b.dropoff}</p>
                <div className="flex gap-2">
                  <Link to={`/client/bookings/${b.id}`}
                    className="flex items-center gap-1 font-sans text-xs text-primary hover:underline">
                    <Eye size={12} /> Détails
                  </Link>
                  {b.status === "completed" && (
                    <button onClick={() => handleRebook(b)}
                      className="flex items-center gap-1 font-sans text-xs text-primary hover:underline">
                      <RotateCcw size={12} /> Réserver à nouveau
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientBookings;
