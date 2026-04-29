import { useEffect, useState } from "react";

const Unsubscribe = () => {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;

  const [status, setStatus] = useState<
    "loading" | "valid" | "already" | "invalid" | "submitting" | "success" | "error"
  >("loading");

  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");

  useEffect(() => {
    if (!token) { setStatus("invalid"); return; }
    (async () => {
      try {
        const res = await fetch(
          `${supabaseUrl}/functions/v1/handle-email-unsubscribe?token=${encodeURIComponent(token)}`,
          { headers: { apikey: supabaseAnonKey } },
        );
        const data = await res.json();
        if (data.valid) setStatus("valid");
        else if (data.reason === "already_unsubscribed") setStatus("already");
        else setStatus("invalid");
      } catch {
        setStatus("invalid");
      }
    })();
  }, [token, supabaseUrl, supabaseAnonKey]);

  const handleConfirm = async () => {
    if (!token) return;
    setStatus("submitting");
    try {
      const res = await fetch(
        `${supabaseUrl}/functions/v1/handle-email-unsubscribe`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json", apikey: supabaseAnonKey },
          body: JSON.stringify({ token }),
        },
      );
      const data = await res.json();
      if (data.success || data.reason === "already_unsubscribed") setStatus("success");
      else setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <h1 className="font-serif text-3xl text-foreground mb-4">Email preferences</h1>

        {status === "loading" && (
          <p className="font-sans text-muted-foreground">Verifying your link…</p>
        )}

        {status === "valid" && (
          <>
            <p className="font-sans text-muted-foreground mb-8">
              Click below to unsubscribe from KCC EliteDriver emails.
            </p>
            <button
              onClick={handleConfirm}
              className="gradient-gold text-primary-foreground font-sans text-sm font-semibold px-8 py-3 rounded-md hover:opacity-90"
            >
              Confirm unsubscribe
            </button>
          </>
        )}

        {status === "submitting" && (
          <p className="font-sans text-muted-foreground">Processing…</p>
        )}

        {status === "success" && (
          <p className="font-sans text-foreground">
            You have been unsubscribed. We are sorry to see you go.
          </p>
        )}

        {status === "already" && (
          <p className="font-sans text-muted-foreground">
            This email address is already unsubscribed.
          </p>
        )}

        {status === "invalid" && (
          <p className="font-sans text-destructive">
            This unsubscribe link is invalid or has expired.
          </p>
        )}

        {status === "error" && (
          <p className="font-sans text-destructive">
            Something went wrong. Please try again later.
          </p>
        )}
      </div>
    </div>
  );
};

export default Unsubscribe;