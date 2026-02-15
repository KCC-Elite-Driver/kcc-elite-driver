import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { LogIn } from "lucide-react";
import { useTranslation } from "@/i18n/LanguageContext";

const ClientLogin = () => {
  const { signIn } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { error } = await signIn(email, password);
    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      navigate("/client/bookings");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 pt-20">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
            <LogIn size={24} className="text-primary" />
          </div>
          <h1 className="font-serif text-2xl font-bold text-foreground">Mon espace</h1>
          <p className="font-sans text-sm text-muted-foreground mt-1">Connectez-vous pour gérer vos réservations</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="font-sans text-xs font-medium text-muted-foreground uppercase tracking-wider block mb-1.5">Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
              className="w-full bg-secondary border border-border rounded-md px-3 py-2.5 text-sm font-sans text-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
          </div>
          <div>
            <label className="font-sans text-xs font-medium text-muted-foreground uppercase tracking-wider block mb-1.5">Mot de passe</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required
              className="w-full bg-secondary border border-border rounded-md px-3 py-2.5 text-sm font-sans text-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
          </div>
          {error && <p className="font-sans text-sm text-destructive">{error}</p>}
          <button type="submit" disabled={loading}
            className="w-full gradient-gold text-primary-foreground font-sans text-sm font-semibold py-2.5 rounded-md hover:opacity-90 transition-opacity disabled:opacity-50">
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>
        <p className="font-sans text-sm text-muted-foreground text-center mt-6">
          Pas encore de compte ?{" "}
          <Link to="/client/register" className="text-primary hover:underline">Créer un compte</Link>
        </p>
      </div>
    </div>
  );
};

export default ClientLogin;
