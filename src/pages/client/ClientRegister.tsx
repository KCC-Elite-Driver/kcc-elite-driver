import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useTranslation } from "@/i18n/LanguageContext";
import { UserPlus } from "lucide-react";

const ClientRegister = () => {
  const { signUp } = useAuth();
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password.length < 6) { setError(t.auth_password_min); return; }
    if (password !== confirm) { setError(t.auth_password_mismatch); return; }
    setLoading(true);
    const { error } = await signUp(email, password);
    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setSuccess(true);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4 pt-20">
        <div className="w-full max-w-sm text-center">
          <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
            <UserPlus size={24} className="text-primary" />
          </div>
          <h1 className="font-serif text-2xl font-bold text-foreground mb-2">{t.auth_verify_email}</h1>
          <p className="font-sans text-sm text-muted-foreground mb-6">{t.auth_verify_email_desc} <strong>{email}</strong>.</p>
          <Link to="/client/login" className="font-sans text-sm text-primary hover:underline">{t.auth_back_login}</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 pt-20">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
            <UserPlus size={24} className="text-primary" />
          </div>
          <h1 className="font-serif text-2xl font-bold text-foreground">{t.client_register_title}</h1>
          <p className="font-sans text-sm text-muted-foreground mt-1">{t.client_register_desc}</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="font-sans text-xs font-medium text-muted-foreground uppercase tracking-wider block mb-1.5">{t.auth_email}</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
              className="w-full bg-secondary border border-border rounded-md px-3 py-2.5 text-sm font-sans text-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
          </div>
          <div>
            <label className="font-sans text-xs font-medium text-muted-foreground uppercase tracking-wider block mb-1.5">{t.auth_password}</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required
              className="w-full bg-secondary border border-border rounded-md px-3 py-2.5 text-sm font-sans text-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
          </div>
          <div>
            <label className="font-sans text-xs font-medium text-muted-foreground uppercase tracking-wider block mb-1.5">{t.auth_password_confirm}</label>
            <input type="password" value={confirm} onChange={e => setConfirm(e.target.value)} required
              className="w-full bg-secondary border border-border rounded-md px-3 py-2.5 text-sm font-sans text-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
          </div>
          {error && <p className="font-sans text-sm text-destructive">{error}</p>}
          <button type="submit" disabled={loading}
            className="w-full gradient-gold text-primary-foreground font-sans text-sm font-semibold py-2.5 rounded-md hover:opacity-90 transition-opacity disabled:opacity-50">
            {loading ? t.auth_signup_loading : t.auth_signup}
          </button>
        </form>
        <p className="font-sans text-sm text-muted-foreground text-center mt-6">
          {t.auth_has_account}{" "}
          <Link to="/client/login" className="text-primary hover:underline">{t.auth_login}</Link>
        </p>
      </div>
    </div>
  );
};

export default ClientRegister;
