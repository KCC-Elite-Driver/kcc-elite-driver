import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useTranslation } from "@/i18n/LanguageContext";
import { LogOut, ArrowLeft, Plus, Pencil, Trash2, X, Check } from "lucide-react";

type Provider = { id: string; name: string; phone: string | null; email: string | null; created_at: string };

const AdminProviders = () => {
  const { signOut } = useAuth();
  const { t } = useTranslation();
  const [providers, setProviders] = useState<Provider[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", phone: "", email: "" });

  const load = async () => {
    const { data } = await supabase.from("providers").select("*").order("created_at", { ascending: false });
    setProviders((data as Provider[]) ?? []);
  };

  useEffect(() => { load(); }, []);

  const reset = () => { setForm({ name: "", phone: "", email: "" }); setShowForm(false); setEditId(null); };

  const handleSave = async () => {
    if (!form.name.trim()) return;
    if (editId) {
      await supabase.from("providers").update({ name: form.name, phone: form.phone || null, email: form.email || null }).eq("id", editId);
    } else {
      await supabase.from("providers").insert({ name: form.name, phone: form.phone || null, email: form.email || null });
    }
    reset(); load();
  };

  const handleEdit = (p: Provider) => {
    setForm({ name: p.name, phone: p.phone || "", email: p.email || "" });
    setEditId(p.id); setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm(t.admin_delete_provider_confirm)) return;
    await supabase.from("providers").delete().eq("id", id); load();
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-4">
            <Link to="/admin" className="text-muted-foreground hover:text-foreground"><ArrowLeft size={20} /></Link>
            <h1 className="font-serif text-xl font-bold text-foreground">{t.admin_providers}</h1>
          </div>
          <button onClick={signOut} className="flex items-center gap-1.5 font-sans text-sm text-muted-foreground hover:text-foreground"><LogOut size={16} /></button>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-serif text-lg font-semibold text-foreground">{providers.length} {t.admin_providers.toLowerCase()}</h2>
          <button onClick={() => { reset(); setShowForm(true); }} className="flex items-center gap-1.5 gradient-gold text-primary-foreground font-sans text-sm font-semibold px-4 py-2 rounded-md hover:opacity-90">
            <Plus size={16} /> {t.admin_add}
          </button>
        </div>

        {showForm && (
          <div className="rounded-lg border border-border bg-card p-5 mb-6 space-y-4">
            <h3 className="font-serif text-base font-semibold text-foreground">{editId ? t.admin_edit_provider : t.admin_new_provider}</h3>
            <input placeholder={`${t.admin_name} *`} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
              className="w-full bg-secondary border border-border rounded-md px-3 py-2.5 text-sm font-sans text-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input placeholder={t.admin_phone} value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
                className="bg-secondary border border-border rounded-md px-3 py-2.5 text-sm font-sans text-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
              <input placeholder={t.admin_email_label} value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                className="bg-secondary border border-border rounded-md px-3 py-2.5 text-sm font-sans text-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
            </div>
            <div className="flex gap-2 justify-end">
              <button onClick={reset} className="font-sans text-sm px-4 py-2 rounded-md border border-border text-muted-foreground hover:text-foreground"><X size={14} /></button>
              <button onClick={handleSave} className="flex items-center gap-1.5 gradient-gold text-primary-foreground font-sans text-sm font-semibold px-4 py-2 rounded-md hover:opacity-90">
                <Check size={14} /> {editId ? t.admin_save : t.admin_create}
              </button>
            </div>
          </div>
        )}

        <div className="space-y-3">
          {providers.map(p => (
            <div key={p.id} className="rounded-lg border border-border bg-card p-4 flex items-center justify-between">
              <div>
                <span className="font-sans text-sm font-medium text-foreground">{p.name}</span>
                <div className="flex gap-4 mt-1">
                  {p.phone && <span className="font-sans text-xs text-muted-foreground">{p.phone}</span>}
                  {p.email && <span className="font-sans text-xs text-muted-foreground">{p.email}</span>}
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(p)} className="text-muted-foreground hover:text-foreground"><Pencil size={16} /></button>
                <button onClick={() => handleDelete(p.id)} className="text-muted-foreground hover:text-destructive"><Trash2 size={16} /></button>
              </div>
            </div>
          ))}
          {providers.length === 0 && !showForm && (
            <p className="font-sans text-sm text-muted-foreground text-center py-8">{t.admin_no_providers}</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminProviders;
