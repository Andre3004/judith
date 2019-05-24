SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = ON;
SET check_function_bodies = FALSE;
SET client_min_messages = WARNING;
SET default_with_oids = FALSE;

SET search_path TO public;

TRUNCATE "usuario" CASCADE;

INSERT INTO "endereco" (id, created, bairro, cidade, numero)
VALUES (1000, NOW(), 'Bairro 1', 'Foz', '5057');

INSERT INTO "usuario" (id, created, nome, cpf, email, senha, telefone, endereco_id)
VALUES (1000, NOW(), 'André', '089.839.659-82', 'admin@admin.com', '$2a$10$bAdAVLvM.k3DqPaPYi0gnO1OffPSHLref8MElAk.u.fFQ17v9YKC2', '(45) 9 8426-6379', 1000),
        (1001, NOW(), 'Rhuan', '089.839.659-81', 'user@user.com', '$2a$10$bAdAVLvM.k3DqPaPYi0gnO1OffPSHLref8MElAk.u.fFQ17v9YKC2', '(45) 9 8426-6379', 1000);
