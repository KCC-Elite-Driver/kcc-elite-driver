import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useTranslation } from "@/i18n/LanguageContext";
import { LogOut, ArrowLeft, Save, Loader2, History } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

type Rule = {
  id: string;
  country: string;
  service_type: string;
  vehicle: string;
  base_price: number | null;
  per_km_over_threshold: number | null;
  hourly_rate: number | null;
  threshold_km: number | null;
  sphinx_surcharge: number | null;
  currency: string;
  currency_symbol: string;
  quote_only: boolean;
  updated_at: string;
};

type HistoryEntry = {
  id: string;
  country: string;
  service_type: string;
  vehicle: string;
  old_values: any;
  new_values: any;
  changed_at: string;
  changed_by: string | null;
};

const COUNTRIES: Record<string, string> = { EG: "🇪🇬 Égypte (USD)", FR: "🇫🇷 France (EUR)" };
const SERVICE_LABELS: Record<string, string> = {
  airport: "Aéroport",
  hourly: "Mise à disposition",
  daily12: "Forfait 12h",
  vip: "VIP",
  intercity: "Inter-cité",
};
const VEHICLE_LABELS: Record<string, string> = {
  suv: "SUV",
  business: "Class E (Business)",
  van: "Van / Class V",
  first: "Class S (First)",
};

const NumField = ({
  label, value, onChange, suffix, disabled,
}: {
  label: string; value: number | null; onChange: (n: number | null) => void; suffix?: string; disabled?: boolean;
}) => (
  <label className="block">
    <span className="block font-sans text-xs text-muted-foreground mb-1">{label}</span>
    <div className="relative">
      <input
        type="number"
        step="0.01"
        min="0"
        disabled={disabled}
        value={value ?? ""}
        onChange={(e) => {
          const v = e.target.value;
          onChange(v === "" ? null : Number(v));
        }}
        className="w-full bg-secondary/40 border border-border rounded px-3 py-2 font-sans text-sm text-foreground focus:outline-none focus:border-primary disabled:opacity-50"
      />
      {suffix && (
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground pointer-events-none">{suffix}</span>
      )}
    </div>
  </label>
);

const AdminPricing = () => {
  const { signOut } = useAuth();
  const { t } = useTranslation();
  const [rules, setRules] = useState<Rule[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [activeCountry, setActiveCountry] = useState<"EG" | "FR">("FR");
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [drafts, setDrafts] = useState<Record<string, Partial<Rule>>>({});

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("pricing_rules")
      .select("*")
      .order("country")
      .order("service_type")
      .order("vehicle");
    if (error) {
      toast.error("Erreur chargement tarifs");
    } else {
      setRules((data || []) as Rule[]);
    }
    setLoading(false);
  };

  const loadHistory = async () => {
    const { data } = await supabase
      .from("pricing_history")
      .select("*")
      .order("changed_at", { ascending: false })
      .limit(50);
    setHistory((data || []) as HistoryEntry[]);
  };

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    if (showHistory) loadHistory();
  }, [showHistory]);

  const updateDraft = (id: string, field: keyof Rule, value: any) => {
    setDrafts((prev) => ({ ...prev, [id]: { ...prev[id], [field]: value } }));
  };

  const saveRule = async (id: string) => {
    const draft = drafts[id];
    if (!draft) return;
    setSavingId(id);
    const { error } = await supabase
      .from("pricing_rules")
      .update(draft)
      .eq("id", id);
    if (error) {
      toast.error("Erreur sauvegarde : " + error.message);
    } else {
      toast.success("Tarif mis à jour");
      setDrafts((prev) => {
        const { [id]: _, ...rest } = prev;
        return rest;
      });
      load();
    }
    setSavingId(null);
  };

  const getValue = <K extends keyof Rule>(rule: Rule, field: K): Rule[K] => {
    const draft = drafts[rule.id];
    if (draft && field in draft) return draft[field] as Rule[K];
    return rule[field];
  };

  const isDirty = (id: string) => !!drafts[id] && Object.keys(drafts[id]).length > 0;

  const filtered = rules.filter((r) => r.country === activeCountry);
  const grouped = filtered.reduce((acc, r) => {
    (acc[r.service_type] ||= []).push(r);
    return acc;
  }, {} as Record<string, Rule[]>);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-4">
            <Link to="/admin" className="flex items-center gap-1.5 font-sans text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft size={16} /> Retour
            </Link>
            <h1 className="font-serif text-xl font-bold text-foreground">Tarifs</h1>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowHistory((s) => !s)}
              className="flex items-center gap-1.5 font-sans text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <History size={16} /> Historique
            </button>
            <button onClick={signOut} className="flex items-center gap-1.5 font-sans text-sm text-muted-foreground hover:text-foreground transition-colors">
              <LogOut size={16} /> {t.auth_logout}
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Country tabs */}
        <div className="flex gap-2 mb-6">
          {(Object.keys(COUNTRIES) as Array<"EG" | "FR">).map((c) => (
            <button
              key={c}
              onClick={() => setActiveCountry(c)}
              className={`px-4 py-2 rounded-md font-sans text-sm transition-colors ${
                activeCountry === c
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {COUNTRIES[c]}
            </button>
          ))}
        </div>

        <p className="font-sans text-xs text-muted-foreground mb-6">
          Modifiez un tarif puis cliquez sur <span className="text-foreground font-medium">Enregistrer</span>. Les modifications s'appliquent immédiatement aux nouveaux devis. La page publique /services reste statique (modifier le code pour la mettre à jour).
        </p>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="animate-spin text-primary" size={32} />
          </div>
        ) : (
          <div className="space-y-8">
            {Object.entries(grouped).map(([serviceType, serviceRules]) => (
              <section key={serviceType}>
                <h2 className="font-serif text-lg font-semibold text-foreground mb-3">
                  {SERVICE_LABELS[serviceType] || serviceType}
                </h2>
                <div className="space-y-3">
                  {serviceRules.map((rule) => {
                    const dirty = isDirty(rule.id);
                    return (
                      <div
                        key={rule.id}
                        className={`rounded-lg border p-4 transition-colors ${
                          dirty ? "border-primary bg-primary/5" : "border-border bg-card"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <div>
                            <h3 className="font-sans text-sm font-semibold text-foreground">
                              {VEHICLE_LABELS[rule.vehicle] || rule.vehicle}
                            </h3>
                            <p className="font-sans text-xs text-muted-foreground">
                              {rule.quote_only ? "Sur devis (pas de prix calculé)" : `Devise : ${rule.currency_symbol}`}
                            </p>
                          </div>
                          {dirty && (
                            <button
                              onClick={() => saveRule(rule.id)}
                              disabled={savingId === rule.id}
                              className="flex items-center gap-1.5 gradient-gold text-primary-foreground font-sans text-xs font-semibold px-3 py-1.5 rounded-md hover:opacity-90 disabled:opacity-50"
                            >
                              {savingId === rule.id ? (
                                <Loader2 size={12} className="animate-spin" />
                              ) : (
                                <Save size={12} />
                              )}
                              Enregistrer
                            </button>
                          )}
                        </div>

                        {!rule.quote_only && (
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {(serviceType === "airport" || serviceType === "daily12") && (
                              <NumField
                                label="Forfait base"
                                value={getValue(rule, "base_price")}
                                onChange={(v) => updateDraft(rule.id, "base_price", v)}
                                suffix={rule.currency_symbol}
                              />
                            )}
                            {serviceType === "airport" && rule.country === "FR" && (
                              <>
                                <NumField
                                  label="Seuil km"
                                  value={getValue(rule, "threshold_km")}
                                  onChange={(v) => updateDraft(rule.id, "threshold_km", v)}
                                  suffix="km"
                                />
                                <NumField
                                  label="€/km au-delà"
                                  value={getValue(rule, "per_km_over_threshold")}
                                  onChange={(v) => updateDraft(rule.id, "per_km_over_threshold", v)}
                                  suffix={`${rule.currency_symbol}/km`}
                                />
                              </>
                            )}
                            {serviceType === "airport" && rule.country === "EG" && (
                              <NumField
                                label="Suppl. Sphinx"
                                value={getValue(rule, "sphinx_surcharge")}
                                onChange={(v) => updateDraft(rule.id, "sphinx_surcharge", v)}
                                suffix={rule.currency_symbol}
                              />
                            )}
                            {serviceType === "hourly" && (
                              <NumField
                                label="Tarif horaire"
                                value={getValue(rule, "hourly_rate")}
                                onChange={(v) => updateDraft(rule.id, "hourly_rate", v)}
                                suffix={`${rule.currency_symbol}/h`}
                              />
                            )}
                          </div>
                        )}
                        <p className="font-sans text-xs text-muted-foreground mt-3">
                          Dernière mise à jour : {format(new Date(rule.updated_at), "dd/MM/yyyy HH:mm")}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        )}

        {/* History panel */}
        {showHistory && (
          <section className="mt-12">
            <h2 className="font-serif text-lg font-semibold text-foreground mb-4">Historique des modifications (50 dernières)</h2>
            {history.length === 0 ? (
              <p className="font-sans text-sm text-muted-foreground">Aucune modification enregistrée.</p>
            ) : (
              <div className="space-y-2">
                {history.map((h) => {
                  const old = h.old_values || {};
                  const neu = h.new_values || {};
                  const diffs: string[] = [];
                  ["base_price", "per_km_over_threshold", "hourly_rate", "threshold_km", "sphinx_surcharge"].forEach((k) => {
                    if (old[k] !== neu[k] && (old[k] != null || neu[k] != null)) {
                      diffs.push(`${k}: ${old[k] ?? "—"} → ${neu[k] ?? "—"}`);
                    }
                  });
                  return (
                    <div key={h.id} className="rounded border border-border bg-card p-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-sans text-xs font-semibold text-foreground">
                          {h.country} · {SERVICE_LABELS[h.service_type] || h.service_type} · {VEHICLE_LABELS[h.vehicle] || h.vehicle}
                        </span>
                        <span className="font-sans text-xs text-muted-foreground">
                          {format(new Date(h.changed_at), "dd/MM/yyyy HH:mm")}
                        </span>
                      </div>
                      <p className="font-sans text-xs text-muted-foreground">
                        {diffs.length > 0 ? diffs.join(" · ") : (old && Object.keys(old).length === 0 ? "Création" : "Aucun changement de valeur")}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  );
};

export default AdminPricing;
