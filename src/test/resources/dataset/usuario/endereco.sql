SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = ON;
SET check_function_bodies = FALSE;
SET client_min_messages = WARNING;
SET default_with_oids = FALSE;

SET search_path TO public;

TRUNCATE "endereco" CASCADE;

INSERT INTO "endereco" (id, created, bairro, cidade, numero)
VALUES (1000, NOW(), 'Bairro 1', 'Foz', '5057');
