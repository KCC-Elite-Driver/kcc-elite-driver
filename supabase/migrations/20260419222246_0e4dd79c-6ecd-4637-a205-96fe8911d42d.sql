-- ============ Tarifs (pricing_rules) ============
CREATE TABLE public.pricing_rules (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  country TEXT NOT NULL,                -- 'EG' | 'FR'
  service_type TEXT NOT NULL,           -- 'airport' | 'hourly' | 'daily12' | 'vip' | 'intercity'
  vehicle TEXT NOT NULL,                -- 'suv' | 'business' | 'van' | 'first'
  base_price NUMERIC(10,2),             -- forfait fixe (airport, daily12)
  per_km_over_threshold NUMERIC(10,2),  -- surcharge €/km au-delà du seuil (FR airport)
  hourly_rate NUMERIC(10,2),            -- €/h ou $/h (hourly)
  threshold_km INTEGER,                 -- ex 35 pour FR
  sphinx_surcharge NUMERIC(10,2),       -- supplément aéroport Sphinx (EG airport)
  currency TEXT NOT NULL,               -- 'EUR' | 'USD'
  currency_symbol TEXT NOT NULL,        -- '€' | '$'
  quote_only BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (country, service_type, vehicle)
);

ALTER TABLE public.pricing_rules ENABLE ROW LEVEL SECURITY;

-- Lecture publique (nécessaire pour calcul devis depuis edge function & front)
CREATE POLICY "Anyone can view pricing rules"
  ON public.pricing_rules FOR SELECT
  USING (true);

-- Écriture admin uniquement
CREATE POLICY "Admins can manage pricing rules"
  ON public.pricing_rules FOR ALL
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

-- Trigger updated_at
CREATE TRIGGER update_pricing_rules_updated_at
  BEFORE UPDATE ON public.pricing_rules
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- ============ Historique (pricing_history) ============
CREATE TABLE public.pricing_history (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  rule_id UUID REFERENCES public.pricing_rules(id) ON DELETE SET NULL,
  country TEXT NOT NULL,
  service_type TEXT NOT NULL,
  vehicle TEXT NOT NULL,
  old_values JSONB,
  new_values JSONB,
  changed_by UUID,
  changed_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.pricing_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view pricing history"
  ON public.pricing_history FOR SELECT
  TO authenticated
  USING (is_admin());

CREATE POLICY "Admins can insert pricing history"
  ON public.pricing_history FOR INSERT
  TO authenticated
  WITH CHECK (is_admin());

-- Fonction de log automatique
CREATE OR REPLACE FUNCTION public.log_pricing_change()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF TG_OP = 'UPDATE' THEN
    INSERT INTO public.pricing_history (rule_id, country, service_type, vehicle, old_values, new_values, changed_by)
    VALUES (
      NEW.id, NEW.country, NEW.service_type, NEW.vehicle,
      to_jsonb(OLD), to_jsonb(NEW),
      auth.uid()
    );
  ELSIF TG_OP = 'INSERT' THEN
    INSERT INTO public.pricing_history (rule_id, country, service_type, vehicle, old_values, new_values, changed_by)
    VALUES (
      NEW.id, NEW.country, NEW.service_type, NEW.vehicle,
      NULL, to_jsonb(NEW),
      auth.uid()
    );
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER pricing_rules_history
  AFTER INSERT OR UPDATE ON public.pricing_rules
  FOR EACH ROW
  EXECUTE FUNCTION public.log_pricing_change();

-- ============ Pré-remplissage : ÉGYPTE (USD) ============
INSERT INTO public.pricing_rules (country, service_type, vehicle, base_price, sphinx_surcharge, currency, currency_symbol) VALUES
  ('EG', 'airport', 'suv',      70,  40, 'USD', '$'),
  ('EG', 'airport', 'business', 150, 40, 'USD', '$'),
  ('EG', 'airport', 'van',      200, 40, 'USD', '$'),
  ('EG', 'airport', 'first',    300, 40, 'USD', '$');

INSERT INTO public.pricing_rules (country, service_type, vehicle, hourly_rate, currency, currency_symbol) VALUES
  ('EG', 'hourly', 'suv',      45,  'USD', '$'),
  ('EG', 'hourly', 'business', 80,  'USD', '$'),
  ('EG', 'hourly', 'van',      90,  'USD', '$'),
  ('EG', 'hourly', 'first',    140, 'USD', '$');

INSERT INTO public.pricing_rules (country, service_type, vehicle, base_price, currency, currency_symbol) VALUES
  ('EG', 'daily12', 'suv',      250, 'USD', '$'),
  ('EG', 'daily12', 'business', 400, 'USD', '$'),
  ('EG', 'daily12', 'van',      500, 'USD', '$'),
  ('EG', 'daily12', 'first',    650, 'USD', '$');

INSERT INTO public.pricing_rules (country, service_type, vehicle, currency, currency_symbol, quote_only) VALUES
  ('EG', 'vip',       'business', 'USD', '$', true),
  ('EG', 'intercity', 'business', 'USD', '$', true);

-- ============ Pré-remplissage : FRANCE (EUR), seuil 35 km ============
INSERT INTO public.pricing_rules (country, service_type, vehicle, base_price, per_km_over_threshold, threshold_km, currency, currency_symbol) VALUES
  ('FR', 'airport', 'business', 130, 3.0,  35, 'EUR', '€'),
  ('FR', 'airport', 'van',      150, 3.5,  35, 'EUR', '€'),
  ('FR', 'airport', 'first',    200, 4.0,  35, 'EUR', '€');

INSERT INTO public.pricing_rules (country, service_type, vehicle, hourly_rate, currency, currency_symbol) VALUES
  ('FR', 'hourly', 'business', 80,  'EUR', '€'),
  ('FR', 'hourly', 'van',      90,  'EUR', '€'),
  ('FR', 'hourly', 'first',    120, 'EUR', '€');

INSERT INTO public.pricing_rules (country, service_type, vehicle, currency, currency_symbol, quote_only) VALUES
  ('FR', 'vip',       'business', 'EUR', '€', true),
  ('FR', 'intercity', 'business', 'EUR', '€', true);