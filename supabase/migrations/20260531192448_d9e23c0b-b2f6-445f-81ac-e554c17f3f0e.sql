
-- Bookings payment fields
ALTER TABLE public.bookings
  ADD COLUMN IF NOT EXISTS payment_status text NOT NULL DEFAULT 'awaiting',
  ADD COLUMN IF NOT EXISTS payment_provider text,
  ADD COLUMN IF NOT EXISTS payment_intent_id text,
  ADD COLUMN IF NOT EXISTS payment_order_id text,
  ADD COLUMN IF NOT EXISTS payment_transaction_id text,
  ADD COLUMN IF NOT EXISTS amount_charged numeric,
  ADD COLUMN IF NOT EXISTS currency_charged text,
  ADD COLUMN IF NOT EXISTS amount_display numeric,
  ADD COLUMN IF NOT EXISTS currency_display text,
  ADD COLUMN IF NOT EXISTS fx_rate numeric;

CREATE INDEX IF NOT EXISTS idx_bookings_payment_intent_id ON public.bookings(payment_intent_id);
CREATE INDEX IF NOT EXISTS idx_bookings_payment_order_id ON public.bookings(payment_order_id);

-- Payment events log
CREATE TABLE IF NOT EXISTS public.payment_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid REFERENCES public.bookings(id) ON DELETE SET NULL,
  provider text NOT NULL,
  event_type text NOT NULL,
  intent_id text,
  order_id text,
  transaction_id text,
  amount numeric,
  currency text,
  success boolean,
  raw_payload jsonb NOT NULL,
  hmac_valid boolean,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT ON public.payment_events TO authenticated;
GRANT ALL ON public.payment_events TO service_role;

ALTER TABLE public.payment_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view payment events"
  ON public.payment_events FOR SELECT TO authenticated
  USING (public.is_admin());

CREATE POLICY "Service role can insert payment events"
  ON public.payment_events FOR INSERT
  WITH CHECK (auth.role() = 'service_role');

CREATE INDEX IF NOT EXISTS idx_payment_events_booking_id ON public.payment_events(booking_id);
CREATE INDEX IF NOT EXISTS idx_payment_events_intent_id ON public.payment_events(intent_id);
