-- Fix Artigo trigger - use quoted column name for camelCase identifier
-- The trigger was referencing 'atualizado_em' (snake_case) instead of 'atualizadoEm' (camelCase)
-- causing "column does not exist" errors during UPDATE operations

DROP TRIGGER IF EXISTS update_artigo_updated_at ON "Artigo";

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger AS $$
BEGIN
  NEW."atualizadoEm" = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_artigo_updated_at
BEFORE UPDATE ON "Artigo"
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
