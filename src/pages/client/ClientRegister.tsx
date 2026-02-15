import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { UserPlus } from "lucide-react";

const ClientRegister = () => {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password.length < 6) { setError("Le mot de passe doit contenir au moins 6 caractères"); return; }
    if (password !== confirm) { setError("Les mots de passe ne correspondent pas"); return; }
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
          <h1 className="font-serif text-2xl font-bold text-foreground mb-2">Vérifiez votre email</h1>
          <p className="font-sans text-sm text-muted-foreground mb-6">Un lien de confirmation a été envoyé à <strong>{email}</strong>. Cliquez dessus pour activer votre compte.</p>
          <Link to="/client/login" className="font-sans text-sm text-primary hover:underline">Retour à la connexion</Link>
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
          <h1 className="font-serif text-2xl font-bold text-foreground">Créer un compte</h1>
          <p className="font-sans text-sm text-muted-foreground mt-1">Inscrivez-vous pour gérer vos réservations</p>
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
          <div>
            <label className="font-sans text-xs font-medium text-muted-foreground uppercase tracking-wider block mb-1.5">Confirmer le mot de passe</label>
            <input type="password" value={confirm} onChange={e => setConfirm(e.target.value)} required
              className="w-full bg-secondary border border-border rounded-md px-3 py-2.5 text-sm font-sans text-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
          </div>
          {error && <p className="font-sans text-sm text-destructive">{error}</p>}
          <button type="submit" disabled={loading}
            className="w-full gradient-gold text-primary-foreground font-sans text-sm font-semibold py-2.5 rounded-md hover:opacity-90 transition-opacity disabled:opacity-50">
            {loading ? "Inscription..." : "S'inscrire"}
          </button>
        </form>
        <p className="font-sans text-sm text-muted-foreground text-center mt-6">
          Déjà un compte ?{" "}
          <Link to="/client/login" className="text-primary hover:underline">Se connecter</Link>
        </p>
      </div>
    </div>
  );
};

export default ClientRegister;
