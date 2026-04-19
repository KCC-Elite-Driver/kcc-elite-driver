import { useState, useMemo, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "@/i18n/LanguageContext";
import { Plane, Clock, Star, Route, MapPin, Calendar as CalendarIcon, Clock as ClockIcon, Users, Briefcase, Check, ArrowRight, ArrowLeft, CheckCircle, CreditCard, Banknote, AlertTriangle, Home, Info, Mail, Phone, Shield, Loader2 } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { format, parseISO } from "date-fns";
import { fr } from "date-fns/locale/fr";
import { enGB } from "date-fns/locale/en-GB";
import { ar } from "date-fns/locale/ar";
import { cn } from "@/lib/utils";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import PageMeta from "@/components/PageMeta";
import GooglePlacesAutocomplete from "@/components/GooglePlacesAutocomplete";
import RouteMap from "@/components/RouteMap";
import mercedesEClass from "@/assets/mercedes-e-class.jpg?format=webp&w=800";
import mercedesSClass from "@/assets/mercedes-s-class.jpg?format=webp&w=800";
import mercedesVClass from "@/assets/mercedes-v-class.jpg?format=webp&w=800";
import soueastSuv from "@/assets/soueast-s07-suv.jpg?format=webp&w=800";
import heroImage from "@/assets/booking-interior-night.jpg?format=webp&w=1920";

type ServiceType = "airport" | "hourly" | "event" | "city";

interface BookingData {
  service: ServiceType | null;
  pickup: string;
  dropoff: string;
  date: string;
  time: string;
  firstname: string;
  lastname: string;
  email: string;
  phoneCode: string;
  phone: string;
  companyInvoice: boolean;
  passengers: number;
  luggage: number;
  notes: string;
  flightNumber: string;
  meetGreet: boolean;
  vehicle: string | null;
  paymentMethod: "card" | "cash";
}

const PHONE_CODES = [
  { code: "+33", flag: "🇫🇷", label: "FR" },
  { code: "+20", flag: "🇪🇬", label: "EG" },
  { code: "+44", flag: "🇬🇧", label: "UK" },
  { code: "+1", flag: "🇺🇸", label: "US" },
];

const HelperText = ({ children }: { children: React.ReactNode }) => (
  <p className="font-sans text-xs text-muted-foreground mt-1.5">{children}</p>
);

const dateLocales = { fr, en: enGB, ar } as const;

const Booking = () => {
  const { t, language } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const [step, setStep] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [pickupPlaceId, setPickupPlaceId] = useState("");
  const [dropoffPlaceId, setDropoffPlaceId] = useState("");
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);
  const [priceCurrency, setPriceCurrency] = useState("");
  const [priceCurrencySymbol, setPriceCurrencySymbol] = useState("");
  const [distanceKm, setDistanceKm] = useState<number | null>(null);
  const [durationMin, setDurationMin] = useState<number | null>(null);
  const [priceLoading, setPriceLoading] = useState(false);
  const [quoteOnly, setQuoteOnly] = useState(false);
  const [hours, setHours] = useState<number>(4);
  const [sphinxSurcharge, setSphinxSurcharge] = useState<number>(0);
  const [data, setData] = useState<BookingData>({
    service: null,
    pickup: "",
    dropoff: "",
    date: "",
    time: "",
    firstname: "",
    lastname: "",
    email: "",
    phoneCode: "+33",
    phone: "",
    companyInvoice: false,
    passengers: 1,
    luggage: 1,
    notes: "",
    flightNumber: "",
    meetGreet: true,
    vehicle: null,
    paymentMethod: "card",
  });

  // Pre-fill from URL params (re-booking or skipTo from homepage widget)
  useEffect(() => {
    const service = searchParams.get("service") as ServiceType | null;
    const pickup = searchParams.get("pickup");
    const dropoff = searchParams.get("dropoff");
    const date = searchParams.get("date");
    const time = searchParams.get("time");
    const skipTo = searchParams.get("skipTo");
    const vehicle = searchParams.get("vehicle");
    const firstname = searchParams.get("firstname");
    const lastname = searchParams.get("lastname");
    const email = searchParams.get("email");
    const phone = searchParams.get("phone");
    if (service || pickup || firstname) {
      setData(prev => ({
        ...prev,
        ...(service && { service }),
        ...(pickup && { pickup }),
        ...(dropoff && { dropoff }),
        ...(date && { date }),
        ...(time && { time }),
        ...(vehicle && { vehicle }),
        ...(firstname && { firstname }),
        ...(lastname && { lastname }),
        ...(email && { email }),
        ...(phone && { phone }),
      }));
    }
    if (skipTo) {
      setStep(Number(skipTo));
    }
    // Resolve placeIds for pre-filled addresses
    const resolvePlace = async (address: string, setter: (id: string) => void) => {
      try {
        const { data: res } = await supabase.functions.invoke("google-places", { body: { input: address } });
        if (res?.predictions?.[0]?.place_id) setter(res.predictions[0].place_id);
      } catch {}
    };
    if (pickup) resolvePlace(pickup, setPickupPlaceId);
    if (dropoff) resolvePlace(dropoff, setDropoffPlaceId);
  }, [searchParams]);

  // Pre-fill email from logged-in user
  useEffect(() => {
    if (user?.email && !data.email) {
      setData(prev => ({ ...prev, email: user.email! }));
    }
  }, [user]);

  // Map UI service key -> backend serviceType
  const mapServiceType = (svc: ServiceType | null): string => {
    if (svc === "event") return "vip";
    if (svc === "city") return "intercity";
    return svc || "airport";
  };

  // Calculate price when pickup (and dropoff if needed) are set
  const calculatePrice = useCallback(async (vehicle?: string) => {
    if (!pickupPlaceId) return;
    const svcType = mapServiceType(data.service);
    // Airport / intercity require dropoff; hourly / vip do not
    if ((svcType === "airport" || svcType === "intercity") && !dropoffPlaceId) return;
    setPriceLoading(true);
    try {
      const { data: res, error } = await supabase.functions.invoke("calculate-distance", {
        body: {
          originPlaceId: pickupPlaceId,
          destinationPlaceId: dropoffPlaceId || undefined,
          vehicle: vehicle || "business",
          serviceType: svcType,
          hours: svcType === "hourly" ? hours : 0,
        },
      });
      if (!error && res) {
        setQuoteOnly(!!res.quote_only);
        setEstimatedPrice(res.price ?? null);
        setPriceCurrency(res.currency ?? "");
        setPriceCurrencySymbol(res.currency_symbol ?? "");
        setDistanceKm(res.distance_km ?? null);
        setDurationMin(res.duration_min ?? null);
        setSphinxSurcharge(res.sphinx_surcharge ?? 0);
      }
    } catch (err) {
      console.error("Price calc error:", err);
    } finally {
      setPriceLoading(false);
    }
  }, [pickupPlaceId, dropoffPlaceId, data.service, hours]);

  // Auto-calculate when relevant inputs change
  useEffect(() => {
    if (!pickupPlaceId) return;
    const svcType = mapServiceType(data.service);
    if ((svcType === "airport" || svcType === "intercity") && !dropoffPlaceId) return;
    calculatePrice(data.vehicle || undefined);
  }, [pickupPlaceId, dropoffPlaceId, data.vehicle, data.service, hours, calculatePrice]);

  const steps = [
    t.booking_step_service,
    t.booking_step_details,
    t.booking_step_passenger,
    t.booking_step_vehicle,
    t.booking_step_confirm,
  ];

  const serviceDescriptions: Record<ServiceType, string> = {
    airport: t.booking_service_airport_desc,
    hourly: t.booking_service_hourly_desc,
    event: t.booking_service_event_desc,
    city: t.booking_service_city_desc,
  };

  const services: { key: ServiceType; icon: React.ElementType; label: string }[] = [
    { key: "airport", icon: Plane, label: t.services_airport_title },
    { key: "hourly", icon: Clock, label: t.services_hourly_title },
    { key: "event", icon: Star, label: t.services_event_title },
    { key: "city", icon: Route, label: t.services_city_title },
  ];

  const vehicles = [
    { key: "suv", name: t.fleet_suv, desc: t.fleet_suv_desc, passengers: 3, luggage: 4, image: soueastSuv },
    { key: "business", name: t.fleet_business, desc: t.fleet_business_desc, passengers: 3, luggage: 2, image: mercedesEClass },
    { key: "first", name: t.fleet_first, desc: t.fleet_first_desc, passengers: 3, luggage: 3, image: mercedesSClass },
    { key: "van", name: t.fleet_van, desc: t.fleet_van_desc, passengers: 7, luggage: 7, image: mercedesVClass },
  ];

  const isAirportOrStation = useMemo(() => {
    const lower = data.pickup.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return lower.includes("aeroport") || lower.includes("airport") || lower.includes("gare") || lower.includes("station") || lower.includes("cdg") || lower.includes("orly") || lower.includes("مطار");
  }, [data.pickup]);

  const canProceed = () => {
    switch (step) {
      case 0: return data.service !== null;
      case 1: {
        const baseOk = data.pickup.trim() !== "" && data.date !== "" && data.time !== "";
        // For airport/intercity we require dropoff; hourly/event do not
        if (data.service === "airport" || data.service === "city") {
          return baseOk && data.dropoff.trim() !== "";
        }
        return baseOk;
      }
      case 2: return data.firstname.trim() !== "" && data.lastname.trim() !== "" && data.email.trim() !== "" && data.phone.trim() !== "";
      case 3: return data.vehicle !== null;
      case 4: return true;
      default: return false;
    }
  };

  const handleConfirm = async () => {
    setSubmitting(true);
    try {
      const bookingPayload = {
        client_id: user?.id || null,
        service_type: data.service,
        pickup: data.pickup,
        dropoff: data.dropoff || "",
        date: data.date,
        time: data.time,
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        phone: `${data.phoneCode} ${data.phone}`,
        passengers: data.passengers,
        luggage: data.luggage,
        notes: data.notes || null,
        flight_number: data.flightNumber || null,
        meet_greet: data.meetGreet,
        vehicle: data.vehicle,
        payment_method: data.paymentMethod,
        status: "pending" as const,
      };
      await supabase.from("bookings").insert(bookingPayload);
      setCompleted(true);
    } catch (err) {
      console.error("Booking error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setData({
      service: null, pickup: "", dropoff: "", date: "", time: "",
      firstname: "", lastname: "", email: "", phoneCode: "+33", phone: "",
      companyInvoice: false, passengers: 1, luggage: 1, notes: "",
      flightNumber: "", meetGreet: true, vehicle: null, paymentMethod: "card",
    });
    setStep(0);
    setCompleted(false);
  };

  const getServiceLabel = (key: ServiceType) => services.find(s => s.key === key)?.label || "";
  const getVehicleName = (key: string) => vehicles.find(v => v.key === key)?.name || "";

  const reservationNumber = useMemo(() => {
    const now = new Date();
    const dateStr = now.toISOString().slice(0, 10).replace(/-/g, "");
    const rand = String(Math.floor(Math.random() * 900) + 100);
    return `RES-${dateStr}-${rand}`;
  }, [completed]);

  if (completed) {
    return (
      <div className="pt-16 min-h-screen gradient-hero">
        <div className="container mx-auto px-4 py-16 max-w-2xl animate-fade-in">
          {/* Icon + Title + Message */}
          <div className="text-center mb-10">
            <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
              <CheckCircle size={40} className="text-primary" />
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">{t.booking_success}</h2>
            <p className="font-sans text-muted-foreground text-base max-w-md mx-auto">{t.booking_success_desc}</p>
          </div>

          {/* Booking details card */}
          <div className="rounded-lg border border-border bg-card p-6 mb-6">
            <h3 className="font-serif text-lg font-semibold text-foreground mb-4">{t.booking_confirmation_details_title}</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-border/50">
                <span className="font-sans text-sm text-muted-foreground">{t.booking_confirmation_number}</span>
                <span className="font-sans text-sm font-semibold text-foreground tracking-wide">{reservationNumber}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-border/50">
                <span className="font-sans text-sm text-muted-foreground">{t.booking_confirmation_email_label}</span>
                <span className="font-sans text-sm text-foreground">{data.email || "—"}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-border/50">
                <span className="font-sans text-sm text-muted-foreground">{t.booking_confirmation_support}</span>
                <span className="font-sans text-sm text-foreground">+33 1 23 45 67 89</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="font-sans text-sm text-muted-foreground">{t.booking_confirmation_status}</span>
                <span className="flex items-center gap-1.5 font-sans text-sm font-semibold text-green-500">
                  <Check size={14} /> {t.booking_confirmation_status_confirmed}
                </span>
              </div>
            </div>
            <p className="font-sans text-xs text-muted-foreground mt-4">{t.booking_confirmation_details_helper}</p>
          </div>

          {/* Next steps */}
          <div className="rounded-lg border border-border bg-card p-6 mb-6">
            <h3 className="font-serif text-lg font-semibold text-foreground mb-4">{t.booking_next_steps_title}</h3>
            <ul className="space-y-3">
              {[t.booking_next_step_1, t.booking_next_step_2, t.booking_next_step_3, t.booking_next_step_4].map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check size={16} className="text-primary mt-0.5 shrink-0" />
                  <span className="font-sans text-sm text-muted-foreground">{step}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Cancellation reminder */}
          <div className="rounded-lg border border-border/50 bg-secondary/50 p-4 mb-10 flex items-start gap-3">
            <Info size={16} className="text-muted-foreground mt-0.5 shrink-0" />
            <p className="font-sans text-xs text-muted-foreground leading-relaxed">{t.booking_cancellation_reminder}</p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => navigate("/")} className="flex items-center justify-center gap-2 border border-border text-foreground font-sans text-sm font-medium px-8 py-3 rounded-md hover:bg-secondary transition-colors duration-200">
              <Home size={14} /> {t.booking_back_home}
            </button>
            <button onClick={handleReset} className="gradient-gold text-primary-foreground font-sans text-sm font-semibold px-8 py-3 rounded-md hover:opacity-90 transition-opacity duration-200">
              {t.booking_new}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16">
      <PageMeta title="Réservation Chauffeur Privé — KCC-EliteDriver" description="Réservez votre chauffeur privé en 3 étapes. Transferts aéroport, mise à disposition, événements. Service disponible 24h/24 au Caire et à Paris." path="/booking" />
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Mercedes interior view at night" className="w-full h-full object-cover" loading="eager" decoding="async" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        </div>
        <div className="relative z-10 container mx-auto px-4 lg:px-8 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4 animate-fade-in">{t.booking_title}</h1>
          <p className="font-sans text-muted-foreground text-base max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.1s" }}>{t.booking_subtitle}</p>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          {/* Steps indicator */}
          <div className="flex items-center justify-between mb-16 max-w-3xl">
            {steps.map((label, i) => (
              <div key={label} className="flex items-center flex-1">
                <div className="flex flex-col items-center gap-2">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-sans font-semibold transition-all duration-300 ${
                    i < step ? "bg-primary text-primary-foreground" : i === step ? "bg-primary/20 border-2 border-primary text-primary" : "bg-secondary text-muted-foreground"
                  }`}>
                    {i < step ? <Check size={16} /> : i + 1}
                  </div>
                  <span className={`font-sans text-xs font-medium hidden sm:block ${i <= step ? "text-foreground" : "text-muted-foreground"}`}>{label}</span>
                </div>
                {i < steps.length - 1 && <div className={`flex-1 h-px mx-3 transition-colors duration-300 ${i < step ? "bg-primary" : "bg-border"}`} />}
              </div>
            ))}
          </div>

          <div className="lg:grid lg:grid-cols-[1fr_320px] gap-8 flex flex-col">
            {/* Left: Form */}
            <div className="max-w-3xl w-full">
              <AnimatePresence mode="wait">
                <motion.div key={step} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>

                  {/* Step 0: Service */}
                  {step === 0 && (
                    <div>
                      <h2 className="font-serif text-2xl font-semibold text-foreground mb-2">{t.booking_select_service}</h2>
                      <p className="font-sans text-sm text-muted-foreground mb-8">{t.booking_select_service_desc}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {services.map((service) => (
                          <button key={service.key} onClick={() => setData({ ...data, service: service.key })}
                            className={`flex items-start gap-4 p-5 rounded-lg border transition-all duration-200 text-left ${data.service === service.key ? "border-primary bg-primary/10" : "border-border bg-card hover:border-primary/30"}`}>
                            <div className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${data.service === service.key ? "bg-primary/20" : "bg-secondary"}`}>
                              <service.icon size={20} className="text-primary" />
                            </div>
                            <div>
                              <span className="font-sans text-sm font-medium text-foreground block">{service.label}</span>
                              <span className="font-sans text-xs text-muted-foreground mt-1 block">{serviceDescriptions[service.key]}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Step 1: Route details */}
                  {step === 1 && (
                    <div>
                      <h2 className="font-serif text-2xl font-semibold text-foreground mb-2">{t.booking_details_title}</h2>
                      <p className="font-sans text-sm text-muted-foreground mb-8">{t.booking_details_desc}</p>
                      <div className="space-y-5">
                        <div>
                          <label className="font-sans text-xs font-medium text-muted-foreground uppercase tracking-wider block mb-2">{t.booking_pickup_field}</label>
                          <GooglePlacesAutocomplete value={data.pickup} onChange={(v) => setData({ ...data, pickup: v })} onPlaceSelect={(id) => setPickupPlaceId(id)} placeholder={t.hero_pickup} iconColor="text-primary" />
                        </div>
                        {data.service !== "hourly" && (
                          <div>
                            <label className="font-sans text-xs font-medium text-muted-foreground uppercase tracking-wider block mb-2">{t.booking_destination_field}</label>
                            <GooglePlacesAutocomplete value={data.dropoff} onChange={(v) => setData({ ...data, dropoff: v })} onPlaceSelect={(id) => setDropoffPlaceId(id)} placeholder={t.hero_dropoff} iconColor="text-muted-foreground" />
                          </div>
                        )}
                        {data.service === "hourly" && (
                          <div>
                            <label className="font-sans text-xs font-medium text-muted-foreground uppercase tracking-wider block mb-2">{t.booking_hours_label || "Durée"}</label>
                            <select
                              value={hours}
                              onChange={(e) => setHours(Number(e.target.value))}
                              className="w-full bg-secondary border border-border rounded-md px-3 py-3 text-sm font-sans text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                            >
                              {[4,5,6,7,8,9,10,11,12].map(h => (
                                <option key={h} value={h}>{h}h{h === 12 ? " (forfait)" : ""}</option>
                              ))}
                              <option value={13}>{t.booking_hours_more || "12h+ (sur devis)"}</option>
                            </select>
                            <HelperText>{t.booking_hours_helper || "Minimum 4 heures"}</HelperText>
                          </div>
                        )}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="font-sans text-xs font-medium text-muted-foreground uppercase tracking-wider block mb-2">{t.booking_date_field}</label>
                            <Popover>
                              <PopoverTrigger asChild>
                                <button
                                  className={cn(
                                    "w-full bg-secondary border border-border rounded-md pl-10 pr-3 py-3 text-sm font-sans text-left relative focus:outline-none focus:ring-1 focus:ring-primary",
                                    data.date ? "text-foreground" : "text-muted-foreground"
                                  )}
                                >
                                  <CalendarIcon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                                  {data.date
                                    ? format(parseISO(data.date), language === "en" ? "MM/dd/yyyy" : "dd/MM/yyyy", { locale: dateLocales[language] })
                                    : t.hero_date}
                                </button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                  mode="single"
                                  selected={data.date ? parseISO(data.date) : undefined}
                                  onSelect={(d) => setData({ ...data, date: d ? format(d, "yyyy-MM-dd") : "" })}
                                  locale={dateLocales[language]}
                                  initialFocus
                                  className={cn("p-3 pointer-events-auto")}
                                />
                              </PopoverContent>
                            </Popover>
                            <HelperText>{t.booking_date_helper}</HelperText>
                          </div>
                          <div>
                            <label className="font-sans text-xs font-medium text-muted-foreground uppercase tracking-wider block mb-2">{t.booking_time_field}</label>
                            <div className="relative">
                              <ClockIcon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                              <input type="time" value={data.time} onChange={(e) => setData({ ...data, time: e.target.value })}
                                className="w-full bg-secondary border border-border rounded-md pl-10 pr-3 py-3 text-sm font-sans text-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
                            </div>
                            <HelperText>{t.booking_time_helper}</HelperText>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Passenger info */}
                  {step === 2 && (
                    <div>
                      <h2 className="font-serif text-2xl font-semibold text-foreground mb-2">{t.booking_passenger_title}</h2>
                      <p className="font-sans text-sm text-muted-foreground mb-8">{t.booking_passenger_desc}</p>
                      <div className="space-y-5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="font-sans text-xs font-medium text-muted-foreground uppercase tracking-wider block mb-2">{t.booking_firstname} *</label>
                            <input type="text" value={data.firstname} onChange={(e) => setData({ ...data, firstname: e.target.value })}
                              className="w-full bg-secondary border border-border rounded-md px-3 py-3 text-sm font-sans text-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
                          </div>
                          <div>
                            <label className="font-sans text-xs font-medium text-muted-foreground uppercase tracking-wider block mb-2">{t.booking_lastname} *</label>
                            <input type="text" value={data.lastname} onChange={(e) => setData({ ...data, lastname: e.target.value })}
                              className="w-full bg-secondary border border-border rounded-md px-3 py-3 text-sm font-sans text-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
                          </div>
                        </div>
                        <div>
                          <label className="font-sans text-xs font-medium text-muted-foreground uppercase tracking-wider block mb-2">{t.booking_email} *</label>
                          <input type="email" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })}
                            className="w-full bg-secondary border border-border rounded-md px-3 py-3 text-sm font-sans text-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
                          <HelperText>{t.booking_email_helper}</HelperText>
                        </div>
                        <div>
                          <label className="font-sans text-xs font-medium text-muted-foreground uppercase tracking-wider block mb-2">{t.booking_phone} *</label>
                          <div className="flex gap-2">
                            <select value={data.phoneCode} onChange={(e) => setData({ ...data, phoneCode: e.target.value })}
                              className="bg-secondary border border-border rounded-md px-2 py-3 text-sm font-sans text-foreground focus:outline-none focus:ring-1 focus:ring-primary w-28">
                              {PHONE_CODES.map((p) => (
                                <option key={p.code} value={p.code}>{p.flag} {p.code}</option>
                              ))}
                            </select>
                            <input type="tel" value={data.phone} onChange={(e) => setData({ ...data, phone: e.target.value })}
                              className="flex-1 bg-secondary border border-border rounded-md px-3 py-3 text-sm font-sans text-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
                          </div>
                          <HelperText>{t.booking_phone_helper}</HelperText>
                        </div>
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input type="checkbox" checked={data.companyInvoice} onChange={(e) => setData({ ...data, companyInvoice: e.target.checked })}
                            className="w-4 h-4 rounded border-border text-primary focus:ring-primary" />
                          <span className="font-sans text-sm text-foreground">{t.booking_company_invoice}</span>
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="font-sans text-xs font-medium text-muted-foreground uppercase tracking-wider block mb-2">{t.booking_passengers_label}</label>
                            <div className="flex items-center gap-3">
                              <Users size={16} className="text-primary" />
                              <select value={data.passengers} onChange={(e) => setData({ ...data, passengers: Number(e.target.value) })}
                                className="bg-secondary border border-border rounded-md px-3 py-2 text-sm font-sans text-foreground focus:outline-none focus:ring-1 focus:ring-primary">
                                {[1,2,3,4,5,6,7].map(n => <option key={n} value={n}>{n}</option>)}
                              </select>
                            </div>
                          </div>
                          <div>
                            <label className="font-sans text-xs font-medium text-muted-foreground uppercase tracking-wider block mb-2">{t.booking_luggage_label}</label>
                            <div className="flex items-center gap-3">
                              <Briefcase size={16} className="text-primary" />
                              <select value={data.luggage} onChange={(e) => setData({ ...data, luggage: Number(e.target.value) })}
                                className="bg-secondary border border-border rounded-md px-3 py-2 text-sm font-sans text-foreground focus:outline-none focus:ring-1 focus:ring-primary">
                                {[0,1,2,3,4,5,6,7].map(n => <option key={n} value={n}>{n}</option>)}
                              </select>
                            </div>
                          </div>
                        </div>
                        <div>
                          <label className="font-sans text-xs font-medium text-muted-foreground uppercase tracking-wider block mb-2">{t.booking_notes_label}</label>
                          <textarea placeholder={t.booking_notes_placeholder} value={data.notes} onChange={(e) => setData({ ...data, notes: e.target.value })} rows={3}
                            className="w-full bg-secondary border border-border rounded-md px-3 py-3 text-sm font-sans text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary resize-none" />
                          <HelperText>{t.booking_notes_helper}</HelperText>
                        </div>

                        {/* Conditional airport/station fields */}
                        {isAirportOrStation && (
                          <div className="space-y-4 pt-4 border-t border-border">
                            <div>
                              <label className="font-sans text-xs font-medium text-muted-foreground uppercase tracking-wider block mb-2">{t.booking_flight_number}</label>
                              <input type="text" value={data.flightNumber} onChange={(e) => setData({ ...data, flightNumber: e.target.value })} placeholder="LH83822"
                                className="w-full bg-secondary border border-border rounded-md px-3 py-3 text-sm font-sans text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
                              <HelperText>{t.booking_flight_helper}</HelperText>
                            </div>
                            <label className="flex items-start gap-3 cursor-pointer">
                              <input type="checkbox" checked={data.meetGreet} onChange={(e) => setData({ ...data, meetGreet: e.target.checked })}
                                className="w-4 h-4 rounded border-border text-primary focus:ring-primary mt-0.5" />
                              <div>
                                <span className="font-sans text-sm text-foreground font-medium">{t.booking_meet_greet}</span>
                                <p className="font-sans text-xs text-muted-foreground">{t.booking_meet_greet_desc}</p>
                                <HelperText>{t.booking_meet_greet_helper}</HelperText>
                              </div>
                            </label>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Step 3: Vehicle selection */}
                  {step === 3 && (
                    <div>
                      <h2 className="font-serif text-2xl font-semibold text-foreground mb-2">{t.booking_vehicle_title}</h2>
                      <p className="font-sans text-sm text-muted-foreground mb-8">{t.booking_vehicle_desc}</p>
                      <div className="space-y-4">
                        {vehicles.map((vehicle) => (
                          <button key={vehicle.key} onClick={() => setData({ ...data, vehicle: vehicle.key })}
                            className={`w-full flex items-center gap-5 p-4 rounded-lg border transition-all duration-200 text-left ${data.vehicle === vehicle.key ? "border-primary bg-primary/10" : "border-border bg-card hover:border-primary/30"}`}>
                            <div className="w-24 h-16 rounded-md overflow-hidden shrink-0">
                              <img src={vehicle.image} alt={vehicle.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-serif text-lg font-semibold text-foreground">{vehicle.name}</h4>
                              <p className="font-sans text-xs text-muted-foreground truncate">{vehicle.desc}</p>
                              <div className="flex items-center gap-4 mt-1.5">
                                <span className="flex items-center gap-1 text-xs text-muted-foreground font-sans"><Users size={12} className="text-primary" /> {vehicle.passengers} {t.fleet_passengers}</span>
                                <span className="flex items-center gap-1 text-xs text-muted-foreground font-sans"><Briefcase size={12} className="text-primary" /> {vehicle.luggage} {t.fleet_luggage}</span>
                              </div>
                              {pickupPlaceId && dropoffPlaceId && (
                                <div className="mt-2">
                                  {priceLoading && data.vehicle === vehicle.key ? (
                                    <span className="flex items-center gap-1 text-xs text-muted-foreground font-sans"><Loader2 size={12} className="animate-spin" /> Calcul...</span>
                                  ) : estimatedPrice !== null && data.vehicle === vehicle.key ? (
                                    <span className="font-sans text-sm font-semibold text-primary">
                                      {estimatedPrice} {priceCurrencySymbol}
                                      {distanceKm && <span className="text-xs text-muted-foreground font-normal ml-2">({distanceKm} km · ~{durationMin} min)</span>}
                                    </span>
                                  ) : null}
                                </div>
                              )}
                            </div>
                            <div className={`w-5 h-5 rounded-full border-2 shrink-0 transition-colors ${data.vehicle === vehicle.key ? "border-primary bg-primary" : "border-border"}`}>
                              {data.vehicle === vehicle.key && <Check size={12} className="text-primary-foreground m-auto mt-0.5" />}
                            </div>
                          </button>
                        ))}
                      </div>
                      <HelperText>{t.booking_vehicle_helper}</HelperText>
                    </div>
                  )}

                  {/* Step 4: Summary + Policy + Payment */}
                  {step === 4 && (
                    <div>
                      <h2 className="font-serif text-2xl font-semibold text-foreground mb-2">{t.booking_summary}</h2>
                      <p className="font-sans text-sm text-muted-foreground mb-8">{t.booking_summary_desc}</p>
                      <div className="bg-card border border-border rounded-lg p-6 space-y-4 mb-6">
                        <SummaryRow label={t.booking_service_label} value={data.service ? getServiceLabel(data.service) : ""} />
                        <SummaryRow label={t.booking_pickup_label} value={data.pickup} />
                        {data.dropoff && <SummaryRow label={t.booking_dropoff_label} value={data.dropoff} />}
                        <SummaryRow label={t.booking_date_label} value={data.date} />
                        <SummaryRow label={t.booking_time_label} value={data.time} />
                        <SummaryRow label={t.booking_firstname + " " + t.booking_lastname} value={`${data.firstname} ${data.lastname}`} />
                        <SummaryRow label={t.booking_email} value={data.email} />
                        <SummaryRow label={t.booking_phone} value={`${data.phoneCode} ${data.phone}`} />
                        <SummaryRow label={t.booking_passengers_label} value={String(data.passengers)} />
                        <SummaryRow label={t.booking_luggage_label} value={String(data.luggage)} />
                        <SummaryRow label={t.booking_vehicle_label} value={data.vehicle ? getVehicleName(data.vehicle) : ""} />
                        {estimatedPrice !== null && (
                          <SummaryRow label="Prix estimé" value={`${estimatedPrice} ${priceCurrencySymbol}`} />
                        )}
                        {distanceKm !== null && (
                          <SummaryRow label="Distance / Durée" value={`${distanceKm} km · ~${durationMin} min`} />
                        )}
                        {data.flightNumber && <SummaryRow label={t.booking_flight_number} value={data.flightNumber} />}
                        {data.notes && <SummaryRow label={t.booking_notes_label} value={data.notes} />}
                      </div>

                      {/* Cancellation policy */}
                      <div className="flex items-start gap-3 bg-primary/5 border border-primary/20 rounded-lg p-4 mb-6">
                        <AlertTriangle size={18} className="text-primary shrink-0 mt-0.5" />
                        <p className="font-sans text-sm text-muted-foreground">{t.booking_cancellation_policy}</p>
                      </div>

                      {/* Payment method */}
                      <div className="mb-6">
                        <h3 className="font-sans text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">{t.booking_payment_method}</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <button onClick={() => setData({ ...data, paymentMethod: "card" })}
                            className={`flex flex-col gap-2 p-4 rounded-lg border transition-all duration-200 ${data.paymentMethod === "card" ? "border-primary bg-primary/10" : "border-border bg-card hover:border-primary/30"}`}>
                            <div className="flex items-center gap-3">
                              <CreditCard size={20} className="text-primary" />
                              <span className="font-sans text-sm font-medium text-foreground">{t.booking_payment_card}</span>
                            </div>
                            <p className="font-sans text-xs text-muted-foreground">{t.booking_payment_card_desc}</p>
                            {data.paymentMethod === "card" && <HelperText>{t.booking_payment_card_helper}</HelperText>}
                          </button>
                          <button onClick={() => setData({ ...data, paymentMethod: "cash" })}
                            className={`flex flex-col gap-2 p-4 rounded-lg border transition-all duration-200 ${data.paymentMethod === "cash" ? "border-primary bg-primary/10" : "border-border bg-card hover:border-primary/30"}`}>
                            <div className="flex items-center gap-3">
                              <Banknote size={20} className="text-primary" />
                              <span className="font-sans text-sm font-medium text-foreground">{t.booking_payment_cash}</span>
                            </div>
                            <p className="font-sans text-xs text-muted-foreground">{t.booking_payment_cash_desc}</p>
                            {data.paymentMethod === "cash" && <HelperText>{t.booking_payment_cash_helper}</HelperText>}
                          </button>
                        </div>
                      </div>

                      {/* Payment reassurance */}
                      <p className="font-sans text-xs text-muted-foreground text-center italic">{t.booking_payment_reassurance}</p>
                    </div>
                  )}

                </motion.div>
              </AnimatePresence>

              {/* Navigation buttons */}
              <div className="flex justify-between mt-12">
                {step > 0 ? (
                  <button onClick={() => setStep(step - 1)}
                    className="flex items-center gap-2 border border-border text-foreground font-sans text-sm font-medium px-6 py-3 rounded-md hover:bg-secondary transition-colors duration-200">
                    <ArrowLeft size={14} /> {t.booking_prev}
                  </button>
                ) : <div />}

                {step < 4 ? (
                  <button onClick={() => canProceed() && setStep(step + 1)} disabled={!canProceed()}
                    className="flex items-center gap-2 gradient-gold text-primary-foreground font-sans text-sm font-semibold px-6 py-3 rounded-md hover:opacity-90 transition-opacity duration-200 disabled:opacity-40 disabled:cursor-not-allowed">
                    {t.booking_next} <ArrowRight size={14} />
                  </button>
                ) : (
                  <button onClick={handleConfirm} disabled={submitting}
                    className="flex items-center gap-2 gradient-gold text-primary-foreground font-sans text-sm font-semibold px-8 py-3 rounded-md hover:opacity-90 transition-opacity duration-200 disabled:opacity-50">
                    <Check size={14} /> {submitting ? "Envoi..." : t.booking_confirm}
                  </button>
                )}
              </div>
            </div>

            {/* Right: Trip Summary Sidebar */}
            <div className="self-start min-h-0">
              <div className="lg:sticky lg:top-24">
                <div className="rounded-lg border border-border bg-card p-5">
                  <h3 className="font-serif text-lg font-semibold text-foreground mb-4">{t.booking_summary || "Récapitulatif"}</h3>

                  {/* Interactive route map */}
                  <div className="mb-4">
                    <RouteMap pickupPlaceId={pickupPlaceId} dropoffPlaceId={dropoffPlaceId} />
                  </div>


                  <div className="space-y-3 text-sm font-sans">
                    {/* Service type */}
                    {data.service && (
                      <div className="flex items-center gap-2 text-foreground">
                        {(() => { const svc = services.find(s => s.key === data.service); return svc ? <svc.icon size={14} className="text-primary shrink-0" /> : null; })()}
                        <span className="font-medium">{getServiceLabel(data.service)}</span>
                      </div>
                    )}

                    {/* Date & Time */}
                    {(data.date || data.time) && (
                      <div className="flex items-center gap-2 text-foreground">
                        <CalendarIcon size={14} className="text-primary shrink-0" />
                        <span>
                          {data.date ? format(parseISO(data.date), "EEE d MMM yyyy", { locale: dateLocales[language] }) : "—"}
                          {data.time ? `, ${data.time}` : ""}
                        </span>
                      </div>
                    )}

                    {/* Pickup */}
                    {data.pickup && (
                      <div className="flex items-start gap-2">
                        <MapPin size={14} className="text-primary shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs text-muted-foreground">{t.booking_pickup_label || "Pickup"}</p>
                          <p className="text-foreground">{data.pickup}</p>
                        </div>
                      </div>
                    )}

                    {/* Destination */}
                    {data.dropoff && (
                      <div className="flex items-start gap-2">
                        <MapPin size={14} className="text-muted-foreground shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs text-muted-foreground">{t.booking_dropoff_label || "Destination"}</p>
                          <p className="text-foreground">{data.dropoff}</p>
                        </div>
                      </div>
                    )}

                    {/* Distance & Duration */}
                    {distanceKm != null && durationMin != null && (
                      <div className="pt-2 border-t border-border space-y-1">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">{t.booking_distance || "Distance"}</span>
                          <span className="text-foreground font-medium">{distanceKm} km</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">{t.booking_duration || "Durée"}</span>
                          <span className="text-foreground font-medium">{Math.floor(durationMin / 60)}h {durationMin % 60}m</span>
                        </div>
                      </div>
                    )}

                    {/* Passenger info */}
                    {(data.firstname || data.lastname) && (
                      <div className="pt-2 border-t border-border space-y-1">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">{t.booking_firstname}</span>
                          <span className="text-foreground font-medium">{data.firstname} {data.lastname}</span>
                        </div>
                        {data.email && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground"><Mail size={12} className="inline mr-1" />{t.booking_email}</span>
                            <span className="text-foreground text-xs truncate max-w-[55%]">{data.email}</span>
                          </div>
                        )}
                        {data.phone && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground"><Phone size={12} className="inline mr-1" />{t.booking_phone}</span>
                            <span className="text-foreground text-xs">{data.phoneCode} {data.phone}</span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">{t.booking_passengers_label}</span>
                          <span className="text-foreground font-medium">{data.passengers}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">{t.booking_luggage_label}</span>
                          <span className="text-foreground font-medium">{data.luggage}</span>
                        </div>
                        {data.flightNumber && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">{t.booking_flight_number}</span>
                            <span className="text-foreground font-medium">{data.flightNumber}</span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Vehicle */}
                    {data.vehicle && (
                      <div className="pt-2 border-t border-border">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">{t.booking_vehicle_label || "Véhicule"}</span>
                          <span className="text-foreground font-medium">{getVehicleName(data.vehicle)}</span>
                        </div>
                      </div>
                    )}

                    {/* Quote-only block (VIP / Intercity / 12h+) */}
                    {quoteOnly && (
                      <div className="pt-2 border-t border-border space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">{t.booking_price_label || "Tarif"}</span>
                          <span className="font-semibold text-primary">{t.booking_quote_only || "Sur devis"}</span>
                        </div>
                        <a
                          href={`https://wa.me/33123456789?text=${encodeURIComponent(
                            `${t.booking_quote_whatsapp_prefix || "Demande de devis"} — ${data.service ? getServiceLabel(data.service) : ""} | ${data.pickup}${data.dropoff ? " → " + data.dropoff : ""} | ${data.date} ${data.time}${data.vehicle ? " | " + getVehicleName(data.vehicle) : ""}${data.service === "hourly" ? ` | ${hours}h` : ""}`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block w-full text-center gradient-gold text-primary-foreground font-sans text-xs font-semibold px-3 py-2 rounded-md hover:opacity-90 transition-opacity"
                        >
                          {t.booking_quote_whatsapp_cta || "Demander un devis sur WhatsApp"}
                        </a>
                      </div>
                    )}

                    {/* Price + Extras + Total */}
                    {!quoteOnly && estimatedPrice != null && (
                      <div className="pt-2 border-t border-border space-y-1">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">{t.booking_price_label || "Prix trajet"}</span>
                          <span className="text-foreground font-medium">{estimatedPrice} {priceCurrencySymbol}</span>
                        </div>
                        {sphinxSurcharge > 0 && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground text-xs">{t.booking_sphinx_surcharge || "Supplément Aéroport du Sphinx"}</span>
                            <span className="text-foreground text-xs">incl. +{sphinxSurcharge} {priceCurrencySymbol}</span>
                          </div>
                        )}
                        {/* Meet & Greet extra */}
                        {data.meetGreet && isAirportOrStation && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground flex items-center gap-1"><Shield size={12} className="text-primary" /> VIP Meet & Greet</span>
                            <span className="text-foreground font-medium">{priceCurrency === "EGP" ? "500 E£" : priceCurrency === "USD" ? "30 $" : "30 €"}</span>
                          </div>
                        )}
                        <div className="flex justify-between pt-2 mt-2 border-t border-border">
                          <span className="font-semibold text-foreground">TOTAL</span>
                          <span className="font-bold text-primary text-base">
                            {(estimatedPrice + (data.meetGreet && isAirportOrStation ? (priceCurrency === "EGP" ? 500 : 30) : 0))} {priceCurrencySymbol}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Loading state */}
                    {priceLoading && (
                      <div className="flex items-center justify-center py-3">
                        <Loader2 size={18} className="animate-spin text-primary" />
                      </div>
                    )}

                    {/* Empty state */}
                    {!data.pickup && !data.date && !data.vehicle && !data.service && !priceLoading && (
                      <p className="text-xs text-muted-foreground italic">{"Les détails de votre trajet s'afficheront ici au fur et à mesure."}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const SummaryRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between items-start py-2 border-b border-border last:border-0">
    <span className="font-sans text-sm text-muted-foreground">{label}</span>
    <span className="font-sans text-sm text-foreground font-medium text-end max-w-[60%]">{value}</span>
  </div>
);

export default Booking;
