import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "@/i18n/LanguageContext";
import { Plane, Clock, Star, Route, MapPin, Calendar, Clock as ClockIcon, Users, Briefcase, Check, ArrowRight, ArrowLeft, CheckCircle } from "lucide-react";
import mercedesEClass from "@/assets/mercedes-e-class.jpg";
import mercedesSClass from "@/assets/mercedes-s-class.jpg";
import mercedesVClass from "@/assets/mercedes-v-class.jpg";

type ServiceType = "airport" | "hourly" | "event" | "city";

interface BookingData {
  service: ServiceType | null;
  pickup: string;
  dropoff: string;
  date: string;
  time: string;
  passengers: number;
  luggage: number;
  notes: string;
  vehicle: string | null;
}

const Booking = () => {
  const { t } = useTranslation();
  const [step, setStep] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [data, setData] = useState<BookingData>({
    service: null,
    pickup: "",
    dropoff: "",
    date: "",
    time: "",
    passengers: 1,
    luggage: 1,
    notes: "",
    vehicle: null,
  });

  const steps = [
    t.booking_step_service,
    t.booking_step_details,
    t.booking_step_vehicle,
    t.booking_step_confirm,
  ];

  const services: { key: ServiceType; icon: React.ElementType; label: string }[] = [
    { key: "airport", icon: Plane, label: t.services_airport_title },
    { key: "hourly", icon: Clock, label: t.services_hourly_title },
    { key: "event", icon: Star, label: t.services_event_title },
    { key: "city", icon: Route, label: t.services_city_title },
  ];

  const vehicles = [
    { key: "business", name: t.fleet_business, desc: t.fleet_business_desc, passengers: 3, luggage: 2, image: mercedesEClass },
    { key: "first", name: t.fleet_first, desc: t.fleet_first_desc, passengers: 3, luggage: 3, image: mercedesSClass },
    { key: "van", name: t.fleet_van, desc: t.fleet_van_desc, passengers: 7, luggage: 7, image: mercedesVClass },
  ];

  const canProceed = () => {
    switch (step) {
      case 0: return data.service !== null;
      case 1: return data.pickup.trim() !== "" && data.date !== "" && data.time !== "";
      case 2: return data.vehicle !== null;
      case 3: return true;
      default: return false;
    }
  };

  const handleConfirm = () => {
    setCompleted(true);
  };

  const handleReset = () => {
    setData({ service: null, pickup: "", dropoff: "", date: "", time: "", passengers: 1, luggage: 1, notes: "", vehicle: null });
    setStep(0);
    setCompleted(false);
  };

  const getServiceLabel = (key: ServiceType) => {
    return services.find(s => s.key === key)?.label || "";
  };

  const getVehicleName = (key: string) => {
    return vehicles.find(v => v.key === key)?.name || "";
  };

  if (completed) {
    return (
      <div className="pt-16 min-h-screen gradient-hero flex items-center justify-center">
        <div className="container mx-auto px-4 text-center animate-fade-in">
          <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
            <CheckCircle size={40} className="text-primary" />
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">{t.booking_success}</h2>
          <p className="font-sans text-muted-foreground text-base max-w-md mx-auto mb-10">{t.booking_success_desc}</p>
          <button
            onClick={handleReset}
            className="gradient-gold text-primary-foreground font-sans text-sm font-semibold px-8 py-3 rounded-md hover:opacity-90 transition-opacity duration-200"
          >
            {t.booking_new}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="py-16 gradient-hero">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4 animate-fade-in">
            {t.booking_title}
          </h1>
          <p className="font-sans text-muted-foreground text-base max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.1s" }}>
            {t.booking_subtitle}
          </p>
        </div>
      </section>

      {/* Stepper */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          {/* Steps indicator */}
          <div className="flex items-center justify-between mb-16">
            {steps.map((label, i) => (
              <div key={label} className="flex items-center flex-1">
                <div className="flex flex-col items-center gap-2">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-sans font-semibold transition-all duration-300 ${
                      i < step
                        ? "bg-primary text-primary-foreground"
                        : i === step
                          ? "bg-primary/20 border-2 border-primary text-primary"
                          : "bg-secondary text-muted-foreground"
                    }`}
                  >
                    {i < step ? <Check size={16} /> : i + 1}
                  </div>
                  <span className={`font-sans text-xs font-medium hidden sm:block ${i <= step ? "text-foreground" : "text-muted-foreground"}`}>
                    {label}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div className={`flex-1 h-px mx-3 transition-colors duration-300 ${i < step ? "bg-primary" : "bg-border"}`} />
                )}
              </div>
            ))}
          </div>

          {/* Step content */}
          <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {/* Step 0: Service selection */}
            {step === 0 && (
              <div>
                <h2 className="font-serif text-2xl font-semibold text-foreground mb-8">{t.booking_select_service}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {services.map((service) => (
                    <button
                      key={service.key}
                      onClick={() => setData({ ...data, service: service.key })}
                      className={`flex items-center gap-4 p-5 rounded-lg border transition-all duration-200 text-left ${
                        data.service === service.key
                          ? "border-primary bg-primary/10"
                          : "border-border bg-card hover:border-primary/30"
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        data.service === service.key ? "bg-primary/20" : "bg-secondary"
                      }`}>
                        <service.icon size={20} className="text-primary" />
                      </div>
                      <span className="font-sans text-sm font-medium text-foreground">{service.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 1: Details */}
            {step === 1 && (
              <div>
                <h2 className="font-serif text-2xl font-semibold text-foreground mb-8">{t.booking_step_details}</h2>
                <div className="space-y-5">
                  {/* Pickup */}
                  <div className="relative">
                    <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-primary" />
                    <input
                      type="text"
                      placeholder={t.hero_pickup}
                      value={data.pickup}
                      onChange={(e) => setData({ ...data, pickup: e.target.value })}
                      className="w-full bg-secondary border border-border rounded-md pl-10 pr-3 py-3 text-sm font-sans text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  {/* Dropoff */}
                  <div className="relative">
                    <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder={t.hero_dropoff}
                      value={data.dropoff}
                      onChange={(e) => setData({ ...data, dropoff: e.target.value })}
                      className="w-full bg-secondary border border-border rounded-md pl-10 pr-3 py-3 text-sm font-sans text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  {/* Date & Time */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="relative">
                      <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <input
                        type="date"
                        value={data.date}
                        onChange={(e) => setData({ ...data, date: e.target.value })}
                        className="w-full bg-secondary border border-border rounded-md pl-10 pr-3 py-3 text-sm font-sans text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>
                    <div className="relative">
                      <ClockIcon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <input
                        type="time"
                        value={data.time}
                        onChange={(e) => setData({ ...data, time: e.target.value })}
                        className="w-full bg-secondary border border-border rounded-md pl-10 pr-3 py-3 text-sm font-sans text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>
                  </div>
                  {/* Passengers & Luggage */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-sans text-xs font-medium text-muted-foreground uppercase tracking-wider block mb-2">{t.booking_passengers_label}</label>
                      <div className="flex items-center gap-3">
                        <Users size={16} className="text-primary" />
                        <select
                          value={data.passengers}
                          onChange={(e) => setData({ ...data, passengers: Number(e.target.value) })}
                          className="bg-secondary border border-border rounded-md px-3 py-2 text-sm font-sans text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                        >
                          {[1, 2, 3, 4, 5, 6, 7].map(n => <option key={n} value={n}>{n}</option>)}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="font-sans text-xs font-medium text-muted-foreground uppercase tracking-wider block mb-2">{t.booking_luggage_label}</label>
                      <div className="flex items-center gap-3">
                        <Briefcase size={16} className="text-primary" />
                        <select
                          value={data.luggage}
                          onChange={(e) => setData({ ...data, luggage: Number(e.target.value) })}
                          className="bg-secondary border border-border rounded-md px-3 py-2 text-sm font-sans text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                        >
                          {[0, 1, 2, 3, 4, 5, 6, 7].map(n => <option key={n} value={n}>{n}</option>)}
                        </select>
                      </div>
                    </div>
                  </div>
                  {/* Notes */}
                  <div>
                    <label className="font-sans text-xs font-medium text-muted-foreground uppercase tracking-wider block mb-2">{t.booking_notes_label}</label>
                    <textarea
                      placeholder={t.booking_notes_placeholder}
                      value={data.notes}
                      onChange={(e) => setData({ ...data, notes: e.target.value })}
                      rows={3}
                      className="w-full bg-secondary border border-border rounded-md px-3 py-3 text-sm font-sans text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Vehicle selection */}
            {step === 2 && (
              <div>
                <h2 className="font-serif text-2xl font-semibold text-foreground mb-8">{t.booking_select_vehicle}</h2>
                <div className="space-y-4">
                  {vehicles.map((vehicle) => (
                    <button
                      key={vehicle.key}
                      onClick={() => setData({ ...data, vehicle: vehicle.key })}
                      className={`w-full flex items-center gap-5 p-4 rounded-lg border transition-all duration-200 text-left ${
                        data.vehicle === vehicle.key
                          ? "border-primary bg-primary/10"
                          : "border-border bg-card hover:border-primary/30"
                      }`}
                    >
                      <div className="w-24 h-16 rounded-md overflow-hidden shrink-0">
                        <img src={vehicle.image} alt={vehicle.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-serif text-lg font-semibold text-foreground">{vehicle.name}</h4>
                        <p className="font-sans text-xs text-muted-foreground truncate">{vehicle.desc}</p>
                        <div className="flex items-center gap-4 mt-1.5">
                          <span className="flex items-center gap-1 text-xs text-muted-foreground font-sans">
                            <Users size={12} className="text-primary" /> {vehicle.passengers} {t.fleet_passengers}
                          </span>
                          <span className="flex items-center gap-1 text-xs text-muted-foreground font-sans">
                            <Briefcase size={12} className="text-primary" /> {vehicle.luggage} {t.fleet_luggage}
                          </span>
                        </div>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 shrink-0 transition-colors ${
                        data.vehicle === vehicle.key ? "border-primary bg-primary" : "border-border"
                      }`}>
                        {data.vehicle === vehicle.key && <Check size={12} className="text-primary-foreground m-auto mt-0.5" />}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Confirmation */}
            {step === 3 && (
              <div>
                <h2 className="font-serif text-2xl font-semibold text-foreground mb-8">{t.booking_summary}</h2>
                <div className="bg-card border border-border rounded-lg p-6 space-y-4">
                  <SummaryRow label={t.booking_service_label} value={data.service ? getServiceLabel(data.service) : ""} />
                  <SummaryRow label={t.booking_pickup_label} value={data.pickup} />
                  {data.dropoff && <SummaryRow label={t.booking_dropoff_label} value={data.dropoff} />}
                  <SummaryRow label={t.booking_date_label} value={data.date} />
                  <SummaryRow label={t.booking_time_label} value={data.time} />
                  <SummaryRow label={t.booking_passengers_label} value={String(data.passengers)} />
                  <SummaryRow label={t.booking_luggage_label} value={String(data.luggage)} />
                  <SummaryRow label={t.booking_vehicle_label} value={data.vehicle ? getVehicleName(data.vehicle) : ""} />
                  {data.notes && <SummaryRow label={t.booking_notes_label} value={data.notes} />}
                </div>
              </div>
            )}
          </motion.div>
          </AnimatePresence>

          {/* Navigation buttons */}
          <div className="flex justify-between mt-12">
            {step > 0 ? (
              <button
                onClick={() => setStep(step - 1)}
                className="flex items-center gap-2 border border-border text-foreground font-sans text-sm font-medium px-6 py-3 rounded-md hover:bg-secondary transition-colors duration-200"
              >
                <ArrowLeft size={14} />
                {t.booking_prev}
              </button>
            ) : <div />}

            {step < 3 ? (
              <button
                onClick={() => canProceed() && setStep(step + 1)}
                disabled={!canProceed()}
                className="flex items-center gap-2 gradient-gold text-primary-foreground font-sans text-sm font-semibold px-6 py-3 rounded-md hover:opacity-90 transition-opacity duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {t.booking_next}
                <ArrowRight size={14} />
              </button>
            ) : (
              <button
                onClick={handleConfirm}
                className="flex items-center gap-2 gradient-gold text-primary-foreground font-sans text-sm font-semibold px-8 py-3 rounded-md hover:opacity-90 transition-opacity duration-200"
              >
                <Check size={14} />
                {t.booking_confirm}
              </button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

const SummaryRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between items-start py-2 border-b border-border last:border-0">
    <span className="font-sans text-xs font-medium text-muted-foreground uppercase tracking-wider">{label}</span>
    <span className="font-sans text-sm text-foreground text-right max-w-[60%]">{value}</span>
  </div>
);

export default Booking;
