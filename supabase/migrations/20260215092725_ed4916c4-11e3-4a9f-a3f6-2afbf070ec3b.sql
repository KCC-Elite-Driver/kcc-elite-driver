
-- Allow anonymous (non-authenticated) users to insert bookings with null client_id
CREATE POLICY "Anyone can insert bookings" ON public.bookings
  FOR INSERT TO anon
  WITH CHECK (client_id IS NULL);
