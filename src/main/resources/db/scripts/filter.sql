-- Function: public.unaccent(text)

-- DROP FUNCTION public.unaccent(text);

CREATE OR REPLACE FUNCTION public.unaccent(text)
  RETURNS text AS
'$libdir/unaccent', 'unaccent_dict'
  LANGUAGE c STABLE STRICT
  COST 1;
ALTER FUNCTION public.unaccent(text)
  OWNER TO projeto;

-- Function: public.unaccent(regdictionary, text)

-- DROP FUNCTION public.unaccent(regdictionary, text);

CREATE OR REPLACE FUNCTION public.unaccent(
    regdictionary,
    text)
  RETURNS text AS
'$libdir/unaccent', 'unaccent_dict'
  LANGUAGE c STABLE STRICT
  COST 1;
ALTER FUNCTION public.unaccent(regdictionary, text)
  OWNER TO projeto;


-- Function: public.unaccent_init(internal)

-- DROP FUNCTION public.unaccent_init(internal);

CREATE OR REPLACE FUNCTION public.unaccent_init(internal)
  RETURNS internal AS
'$libdir/unaccent', 'unaccent_init'
  LANGUAGE c VOLATILE
  COST 1;
ALTER FUNCTION public.unaccent_init(internal)
  OWNER TO projeto;


-- Function: public.unaccent_lexize(internal, internal, internal, internal)

-- DROP FUNCTION public.unaccent_lexize(internal, internal, internal, internal);

CREATE OR REPLACE FUNCTION public.unaccent_lexize(
    internal,
    internal,
    internal,
    internal)
  RETURNS internal AS
'$libdir/unaccent', 'unaccent_lexize'
  LANGUAGE c VOLATILE
  COST 1;
ALTER FUNCTION public.unaccent_lexize(internal, internal, internal, internal)
  OWNER TO projeto;

-- Function: public.filter(text, text[])

-- DROP FUNCTION public.filter(text, text[]);

CREATE OR REPLACE FUNCTION public.filter(
    IN needles text,
    VARIADIC haystacks text[])
  RETURNS boolean AS
$BODY$
SELECT needles IS NULL OR trim(needles) = '' OR EXISTS(
    SELECT DISTINCT 1
    FROM unnest(haystacks) haystack,
          unnest(string_to_array(needles, ',')) needle
    WHERE unaccent(haystack) ILIKE '%' || unaccent(needle) || '%');
$BODY$
  LANGUAGE sql VOLATILE
  COST 100;
ALTER FUNCTION public.filter(text, text[])
  OWNER TO projeto;