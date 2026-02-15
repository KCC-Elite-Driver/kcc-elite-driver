import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { LogOut, ArrowLeft, Plus, Pencil, Trash2, X, Check } from "lucide-react";

type Driver = { id: string; provider_id: string; firstname: string; lastname: string; phone: string | null; email: string | null; created_at: string };
type Provider = { id: string; name: string };

const AdminDrivers = () => {
  const { signOut } = useAuth();
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [providers, setProviders] = useState<Provider[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({ firstname: "", lastname: "", phone: "", email: "", provider_id: "" });

  const load = async () => {
    const [d, p] = await Promise.all([
      supabase.from("drivers").select("*").order("created_at", { ascending: false }),
      supabase.from("providers").select("id, name"),
    ]);
    setDrivers((d.data as Driver[]) ?? []);
    setProviders((p.data as Provider[]) ?? []);
  };

  useEffect(() => { load(); }, []);

  const reset = () => { setForm({ firstname: "", lastname: "", phone: "", email: "", provider_id: "" }); setShowForm(false); setEditId(null); };

  const handleSave = async () => {
    if (!form.firstname.trim() || !form.lastname.trim() || !form.provider_id) return;
    const payload = { firstname: form.firstname, lastname: form.lastname, phone: form.phone || null, email: form.email || null, provider_id: form.provider_id };
    if (editId) {
      await supabase.from("drivers").update(payload).eq("id", editId);
    } else {
      await supabase.from("drivers").insert(payload);
    }
    reset();
    load();
  };

  const handleEdit = (d: Driver) => {
    setForm({ firstname: d.firstname, lastname: d.lastname, phone: d.phone || "", email: d.email || "", provider_id: d.provider_id });
    setEditId(d.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Supprimer ce chauffeur ?")) return;
    await supabase.from("drivers").delete().eq("id", id);
    load();
  };

  const getProviderName = (pid: string) => providers.find(p => p.id === pid)?.name || "—";

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-4">
            <Link to="/admin" className="text-muted-foreground hover:text-foreground"><ArrowLeft size={20} /></Link>
            <h1 className="font-serif text-xl font-bold text-foreground">Chauffeurs</h1>
          </div>
          <button onClick={signOut} className="flex items-center gap-1.5 font-sans text-sm text-muted-foreground hover:text-foreground"><LogOut size={16} /></button>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-serif text-lg font-semibold text-foreground">{drivers.length} chauffeur{drivers.length !== 1 ? "s" : ""}</h2>
          <button onClick={() => { reset(); setShowForm(true); }} className="flex items-center gap-1.5 gradient-gold text-primary-foreground font-sans text-sm font-semibold px-4 py-2 rounded-md hover:opacity-90">
            <Plus size={16} /> Ajouter
          </button>
        </div>

        {showForm && (
          <div className="rounded-lg border border-border bg-card p-5 mb-6 space-y-4">
            <h3 className="font-serif text-base font-semibold text-foreground">{editId ? "Modifier" : "Nouveau"} chauffeur</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input placeholder="Prénom *" value={form.firstname} onChange={e => setForm({ ...form, firstname: e.target.value })}
                className="bg-secondary border border-border rounded-md px-3 py-2.5 text-sm font-sans text-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
              <input placeholder="Nom *" value={form.lastname} onChange={e => setForm({ ...form, lastname: e.target.value })}
                className="bg-secondary border border-border rounded-md px-3 py-2.5 text-sm font-sans text-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input placeholder="Téléphone" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
                className="bg-secondary border border-border rounded-md px-3 py-2.5 text-sm font-sans text-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
              <input placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                className="bg-secondary border border-border rounded-md px-3 py-2.5 text-sm font-sans text-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
            </div>
            <div>
              <label className="font-sans text-xs font-medium text-muted-foreground block mb-1.5">Prestataire *</label>
              <select value={form.provider_id} onChange={e => setForm({ ...form, provider_id: e.target.value })}
                className="w-full bg-secondary border border-border rounded-md px-3 py-2.5 text-sm font-sans text-foreground focus:outline-none focus:ring-1 focus:ring-primary">
                <option value="">Sélectionner...</option>
                {providers.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
            </div>
            <div className="flex gap-2 justify-end">
              <button onClick={reset} className="font-sans text-sm px-4 py-2 rounded-md border border-border text-muted-foreground hover:text-foreground"><X size={14} /></button>
              <button onClick={handleSave} className="flex items-center gap-1.5 gradient-gold text-primary-foreground font-sans text-sm font-semibold px-4 py-2 rounded-md hover:opacity-90">
                <Check size={14} /> {editId ? "Enregistrer" : "Créer"}
              </button>
            </div>
          </div>
        )}

        <div className="space-y-3">
          {providers.map(prov => {
            const provDrivers = drivers.filter(d => d.provider_id === prov.id);
            if (provDrivers.length === 0) return null;
            return (
              <div key={prov.id}>
                <h3 className="font-sans text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 mt-4">{prov.name}</h3>
                {provDrivers.map(d => (
                  <div key={d.id} className="rounded-lg border border-border bg-card p-4 flex items-center justify-between mb-2">
                    <div>
                      <span className="font-sans text-sm font-medium text-foreground">{d.firstname} {d.lastname}</span>
                      <div className="flex gap-4 mt-1">
                        {d.phone && <span className="font-sans text-xs text-muted-foreground">{d.phone}</span>}
                        {d.email && <span className="font-sans text-xs text-muted-foreground">{d.email}</span>}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => handleEdit(d)} className="text-muted-foreground hover:text-foreground"><Pencil size={16} /></button>
                      <button onClick={() => handleDelete(d.id)} className="text-muted-foreground hover:text-destructive"><Trash2 size={16} /></button>
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
          {drivers.length === 0 && !showForm && (
            <p className="font-sans text-sm text-muted-foreground text-center py-8">Aucun chauffeur. Ajoutez d'abord un prestataire, puis un chauffeur.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDrivers;
