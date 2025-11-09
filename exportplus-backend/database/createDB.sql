-- ==============================
-- SCHEMA: public
-- ==============================
CREATE SCHEMA IF NOT EXISTS public;

-- ==========================================
-- 1️⃣  TABELA: perfis (usuário principal)
-- ==========================================
CREATE TABLE IF NOT EXISTS public.perfis (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cpf         VARCHAR(20) UNIQUE NOT NULL,
    nome        VARCHAR(255) NOT NULL,
    email       VARCHAR(255),
    telefone    VARCHAR(50),
    senha       VARCHAR(255),
    created_at  TIMESTAMP DEFAULT NOW()
);

-- ==========================================
-- 2️⃣  TABELA: enderecos (1:N com perfis)
-- ==========================================
CREATE TABLE IF NOT EXISTS public.enderecos (
    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id   UUID NOT NULL,
    cep          VARCHAR(20) NOT NULL,
    logradouro   VARCHAR(255) NOT NULL,
    numero       VARCHAR(50) NOT NULL,
    complemento  VARCHAR(255),
    bairro       VARCHAR(100) NOT NULL,
    cidade       VARCHAR(100) NOT NULL,
    estado       VARCHAR(100) NOT NULL,
    CONSTRAINT fk_enderecos_usuario
        FOREIGN KEY (usuario_id)
        REFERENCES public.perfis (id)
        ON DELETE CASCADE
);

-- ==========================================
-- 3️⃣  TABELA: user_logs (1:N com perfis)
-- ==========================================
CREATE TABLE IF NOT EXISTS public.user_logs (
    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id   UUID NOT NULL,
    alteracoes   JSONB NOT NULL,
    criado_em    TIMESTAMP DEFAULT NOW(),
    CONSTRAINT fk_user_logs_usuario
        FOREIGN KEY (usuario_id)
        REFERENCES public.perfis (id)
        ON DELETE CASCADE
);

-- ==========================================
-- 4️⃣  Opcional: View simples com join
-- ==========================================
CREATE OR REPLACE VIEW public.vw_usuarios_com_enderecos AS
SELECT 
    p.id AS usuario_id,
    p.cpf,
    p.nome,
    p.email,
    p.telefone,
    p.created_at,
    e.id AS endereco_id,
    e.cep,
    e.logradouro,
    e.numero,
    e.complemento,
    e.bairro,
    e.cidade,
    e.estado
FROM public.perfis p
LEFT JOIN public.enderecos e ON e.usuario_id = p.id;

-- ==========================================
-- 5️⃣  Ajustes de permissões (Supabase roles)
-- ==========================================
GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO postgres, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA public
  GRANT ALL ON TABLES TO service_role;


-- DROP SCHEMA IF EXISTS public CASCADE;
-- CREATE SCHEMA public AUTHORIZATION postgres;
-- GRANT ALL ON SCHEMA public TO postgres;
-- GRANT ALL ON SCHEMA public TO anon, authenticated, service_role;
