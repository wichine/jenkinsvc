--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.3
-- Dumped by pg_dump version 9.6.3

-- Started on 2017-08-10 12:23:57 CST

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'SQL_ASCII';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 1 (class 3079 OID 12393)
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- TOC entry 2144 (class 0 OID 0)
-- Dependencies: 1
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 185 (class 1259 OID 16385)
-- Name: job; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE job (
    job_name character varying,
    description text,
    result character varying,
    project character varying,
    version character varying
);


ALTER TABLE job OWNER TO postgres;

--
-- TOC entry 186 (class 1259 OID 16391)
-- Name: project; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE project (
    title character varying(20) NOT NULL,
    description text
);


ALTER TABLE project OWNER TO postgres;

--
-- TOC entry 187 (class 1259 OID 16397)
-- Name: version; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE version (
    version character varying(10) NOT NULL,
    pack_time timestamp without time zone,
    status character varying(10),
    action character varying[],
    description text
);


ALTER TABLE version OWNER TO postgres;

--
-- TOC entry 2135 (class 0 OID 16385)
-- Dependencies: 185
-- Data for Name: job; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY job (job_name, description, result, project, version) FROM stdin;
\.


--
-- TOC entry 2136 (class 0 OID 16391)
-- Dependencies: 186
-- Data for Name: project; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY project (title, description) FROM stdin;
\.


--
-- TOC entry 2137 (class 0 OID 16397)
-- Dependencies: 187
-- Data for Name: version; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY version (version, pack_time, status, action, description) FROM stdin;
\.


--
-- TOC entry 2015 (class 2606 OID 16404)
-- Name: project projects_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY project
    ADD CONSTRAINT projects_pkey PRIMARY KEY (title);


--
-- TOC entry 2017 (class 2606 OID 16406)
-- Name: version versions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY version
    ADD CONSTRAINT versions_pkey PRIMARY KEY (version);


-- Completed on 2017-08-10 12:23:58 CST

--
-- PostgreSQL database dump complete
--

