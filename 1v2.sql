--
-- PostgreSQL database dump
--

-- Dumped from database version 12.2 (Debian 12.2-2.pgdg100+1)
-- Dumped by pg_dump version 12.2 (Debian 12.2-2.pgdg100+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: aplicaciones; Type: TABLE; Schema: public; Owner: rusa
--

CREATE TABLE public.aplicaciones (
    id_aplicaciones integer NOT NULL,
    n_aplicaciones character varying(60) NOT NULL
);


ALTER TABLE public.aplicaciones OWNER TO rusa;

--
-- Name: aplicaciones_id_aplicaciones_seq; Type: SEQUENCE; Schema: public; Owner: rusa
--

CREATE SEQUENCE public.aplicaciones_id_aplicaciones_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.aplicaciones_id_aplicaciones_seq OWNER TO rusa;

--
-- Name: aplicaciones_id_aplicaciones_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: rusa
--

ALTER SEQUENCE public.aplicaciones_id_aplicaciones_seq OWNED BY public.aplicaciones.id_aplicaciones;


--
-- Name: certificados; Type: TABLE; Schema: public; Owner: rusa
--

CREATE TABLE public.certificados (
    id integer NOT NULL,
    nombre character varying(40) NOT NULL,
    pais character varying(15) NOT NULL,
    emisor character varying(20) NOT NULL,
    reponsable character varying(30) NOT NULL,
    telefono character varying(15) NOT NULL,
    vencimiento date NOT NULL
);


ALTER TABLE public.certificados OWNER TO rusa;

--
-- Name: certificados_id_seq; Type: SEQUENCE; Schema: public; Owner: rusa
--

CREATE SEQUENCE public.certificados_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.certificados_id_seq OWNER TO rusa;

--
-- Name: certificados_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: rusa
--

ALTER SEQUENCE public.certificados_id_seq OWNED BY public.certificados.id;


--
-- Name: det_aplicaciones; Type: TABLE; Schema: public; Owner: rusa
--

CREATE TABLE public.det_aplicaciones (
    id_aplica integer NOT NULL,
    resp integer,
    esc_1 integer,
    esc_2 integer,
    esc_3 integer
);


ALTER TABLE public.det_aplicaciones OWNER TO rusa;

--
-- Name: det_serv; Type: TABLE; Schema: public; Owner: rusa
--

CREATE TABLE public.det_serv (
    id_serv integer NOT NULL,
    id_prod integer NOT NULL,
    id_pai integer NOT NULL,
    id_aplica integer NOT NULL,
    ponderacion integer DEFAULT 100 NOT NULL
);


ALTER TABLE public.det_serv OWNER TO rusa;

--
-- Name: paises; Type: TABLE; Schema: public; Owner: rusa
--

CREATE TABLE public.paises (
    id_paises integer NOT NULL,
    n_paises character varying(20)
);


ALTER TABLE public.paises OWNER TO rusa;

--
-- Name: paises_id_paises_seq; Type: SEQUENCE; Schema: public; Owner: rusa
--

CREATE SEQUENCE public.paises_id_paises_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.paises_id_paises_seq OWNER TO rusa;

--
-- Name: paises_id_paises_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: rusa
--

ALTER SEQUENCE public.paises_id_paises_seq OWNED BY public.paises.id_paises;


--
-- Name: productos; Type: TABLE; Schema: public; Owner: rusa
--

CREATE TABLE public.productos (
    id_productos integer NOT NULL,
    n_productos character varying(20)
);


ALTER TABLE public.productos OWNER TO rusa;

--
-- Name: productos_id_productos_seq; Type: SEQUENCE; Schema: public; Owner: rusa
--

CREATE SEQUENCE public.productos_id_productos_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.productos_id_productos_seq OWNER TO rusa;

--
-- Name: productos_id_productos_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: rusa
--

ALTER SEQUENCE public.productos_id_productos_seq OWNED BY public.productos.id_productos;


--
-- Name: servicios; Type: TABLE; Schema: public; Owner: rusa
--

CREATE TABLE public.servicios (
    id_servicios integer NOT NULL,
    n_servicios character varying(40)
);


ALTER TABLE public.servicios OWNER TO rusa;

--
-- Name: servicios_id_servicios_seq; Type: SEQUENCE; Schema: public; Owner: rusa
--

CREATE SEQUENCE public.servicios_id_servicios_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.servicios_id_servicios_seq OWNER TO rusa;

--
-- Name: servicios_id_servicios_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: rusa
--

ALTER SEQUENCE public.servicios_id_servicios_seq OWNED BY public.servicios.id_servicios;


--
-- Name: usuarios; Type: TABLE; Schema: public; Owner: rusa
--

CREATE TABLE public.usuarios (
    id_user integer NOT NULL,
    usuario character varying(15) NOT NULL,
    pass character varying(20) NOT NULL,
    nombre character varying(40) NOT NULL,
    email character varying(30) DEFAULT 'averiguar'::character varying,
    rol integer DEFAULT 1 NOT NULL
);


ALTER TABLE public.usuarios OWNER TO rusa;

--
-- Name: user_id_user_seq; Type: SEQUENCE; Schema: public; Owner: rusa
--

CREATE SEQUENCE public.user_id_user_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_id_user_seq OWNER TO rusa;

--
-- Name: user_id_user_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: rusa
--

ALTER SEQUENCE public.user_id_user_seq OWNED BY public.usuarios.id_user;


--
-- Name: veladores; Type: TABLE; Schema: public; Owner: rusa
--

CREATE TABLE public.veladores (
    id_veladores integer NOT NULL,
    telefono character varying(20) NOT NULL,
    sup_inmediato character varying(30) DEFAULT 'Averiguar'::character varying,
    departamento character varying(15) NOT NULL,
    persona character varying(40)
);


ALTER TABLE public.veladores OWNER TO rusa;

--
-- Name: veladores_id_veladores_seq; Type: SEQUENCE; Schema: public; Owner: rusa
--

CREATE SEQUENCE public.veladores_id_veladores_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.veladores_id_veladores_seq OWNER TO rusa;

--
-- Name: veladores_id_veladores_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: rusa
--

ALTER SEQUENCE public.veladores_id_veladores_seq OWNED BY public.veladores.id_veladores;


--
-- Name: aplicaciones id_aplicaciones; Type: DEFAULT; Schema: public; Owner: rusa
--

ALTER TABLE ONLY public.aplicaciones ALTER COLUMN id_aplicaciones SET DEFAULT nextval('public.aplicaciones_id_aplicaciones_seq'::regclass);


--
-- Name: certificados id; Type: DEFAULT; Schema: public; Owner: rusa
--

ALTER TABLE ONLY public.certificados ALTER COLUMN id SET DEFAULT nextval('public.certificados_id_seq'::regclass);


--
-- Name: paises id_paises; Type: DEFAULT; Schema: public; Owner: rusa
--

ALTER TABLE ONLY public.paises ALTER COLUMN id_paises SET DEFAULT nextval('public.paises_id_paises_seq'::regclass);


--
-- Name: productos id_productos; Type: DEFAULT; Schema: public; Owner: rusa
--

ALTER TABLE ONLY public.productos ALTER COLUMN id_productos SET DEFAULT nextval('public.productos_id_productos_seq'::regclass);


--
-- Name: servicios id_servicios; Type: DEFAULT; Schema: public; Owner: rusa
--

ALTER TABLE ONLY public.servicios ALTER COLUMN id_servicios SET DEFAULT nextval('public.servicios_id_servicios_seq'::regclass);


--
-- Name: usuarios id_user; Type: DEFAULT; Schema: public; Owner: rusa
--

ALTER TABLE ONLY public.usuarios ALTER COLUMN id_user SET DEFAULT nextval('public.user_id_user_seq'::regclass);


--
-- Name: veladores id_veladores; Type: DEFAULT; Schema: public; Owner: rusa
--

ALTER TABLE ONLY public.veladores ALTER COLUMN id_veladores SET DEFAULT nextval('public.veladores_id_veladores_seq'::regclass);


--
-- Data for Name: aplicaciones; Type: TABLE DATA; Schema: public; Owner: rusa
--

COPY public.aplicaciones (id_aplicaciones, n_aplicaciones) FROM stdin;
1	AU2
2	TOA (ZM)
3	OSCM
4	HSP+
5	Optimus
6	Optimus Refactor
7	Optimus Plus
8	SIEBEL
9	Geomanagement
10	Ares
11	SSI
12	Oficina Virtual
13	ESB
14	DTVWEB Tarjeta de Credito VTOL
15	Imputaciones Online
16	VTOL Synthesis
17	DTVWEB VTOL Online
18	Recaudacion
19	Azimut LAN
20	Cobro Online Prepaid Monitor
21	Cobro Online Payment Proxy
22	Cobro Online Payment
23	DTVWEB Modulo Activaciones
24	DTVWEB Modulo Cobranzas
25	Bonificador Prepago (drools)
26	Coordinador Prepago
27	Promo Recargas
28	IVR Tecnico
29	Activacion Prepago
30	Offer SOS
31	Offer DAME SALDO
32	Compra PPV
33	Compra Adultos
34	HBO
35	MovieCity
36	SMS Recargas
37	SDS
38	EquiFax (Directo al Blanco)\nSDS (Nosis)
39	Esales
40	Score
41	GEOSwitch
42	DTVWEB Sdsnet Windows
43	DTVWEB Wssdsnet Tmobile
44	DTVWEB Wssdsnet Carga
45	DTVWEB Sdsnet
46	DTVWEB Ibs Host
47	Estaciones de Referencia
48	DTVWEB Dtvnet
49	MIDIRECTV
50	Midirectv Prepayment Invoices
51	Midirectv ws IBS Synapses
52	WS MAIL
53	Insite Autoimpresion de Facturas
54	Cosulta de Saldo Prepago
55	Midirectv Account Bills
56	Midirectv Barcode Generator
57	Midirectv Decoder Alias
58	Midirectv DTVLAWS
59	Midirectv My Account
60	USSD
61	Whatsapp
62	AIS
63	Api Manager
64	Malbec
65	IVRU
66	IBS
67	SGI QUARTZ
68	SGI SERVICES
69	SGI PORTAL
70	Ambiente Prefacturacion
71	GEOConciliator
72	GEO Consola
73	GEOConciliator MCR
74	Hub Cobranza GEOSwitch
75	Virtual Payments
76	Vivi Plus
77	Pos Virtual
78	Pagos Online
79	PCP Background
80	IBS Provisioning (IC)
81	Telegestion Mora
82	Age Diario
83	Envio de Facturas
84	Pasarela de Pagos
85	Envio de Comandos OSD
86	Archivos de Imprenta
87	AppWEB
88	Gestion de FTS (Financial Transaction)
89	Herramientas Promociones Prepago
90	Herramientas Churn Involuntario
91	Ventas Premium
92	Cupones de Pago
93	IVRO
94	Acepta
95	Barra CTI
96	Bion
97	CTI Contacto
98	Desconexiones
99	Directo al Blanco
100	eBuilding
101	EncolaTxRec
102	EService
103	eSupply
104	Extractor SQL
105	Facility Rec
106	Formularios Web
107	Gestor de Certificaciones
108	Gestor PosVenta
109	InfoPlus
110	IVR Client (servicios backend)
111	K2View
112	OFSC (TOA)
113	PDA Web
114	Portal de Recargas
115	Poseidon
116	Robot
117	Scoredboard
118	Vizor
119	WebLogin
120	Bonificaciones
121	Calculadora Prepago
122	CRM Engage
123	Envio de Comandos
124	ORN (FSA)
125	CRM ENGAGE V5.7
126	INSITE
127	AVAYA
128	Aspect
129	ENGAGE
130	Azimut DMZ
131	Recaudacion
132	IVR
133	Servicios de Recaudacion
134	Alertas Devoluciones de Dinero
135	Bestfit
136	DTVIVRATC
137	Envio de Formato
138	Geomarketing
139	Masivo de Direcciones
140	Migracion Pre a Post
141	Plantillas
142	W.S. IVR - Clientes
143	ABM INSITE
144	CRM ENGAGE V5
145	INSITE - CONSULTA SALDO PREPAGO
146	INSITE - CUENTA NO CLIENTE
147	INSITE - CUPONES DE PAGO
148	INSITE - CUSTOMER PPV
149	INSITE - DEPORTES
150	INSITE - EASY GUIDE
151	INSITE - ENCUESTAS NET
152	INSITE - FRIENDS ABM
153	INSITE - INSTRUCTIVOSNET
154	INSITE - L10L11
155	INSITE - MIDTV USER REGISTRATION
156	INSITE - MODIFY NID
157	INSITE - PROMOCIONES
158	INSITE - REMOTE CONTROL
159	INSITE - SERVICE IBS SYNAPSES
160	SEGURIDAD INSITE
\.


--
-- Data for Name: certificados; Type: TABLE DATA; Schema: public; Owner: rusa
--

COPY public.certificados (id, nombre, pais, emisor, reponsable, telefono, vencimiento) FROM stdin;
1	heavymetal	argentina	rusatti	lucas	666	2015-06-25
2	heavymetal2	argentina2	rusatti2	lucas2	6662	2015-06-24
3	gaston	Salum	Rusa	lucas rusatti	6632	2020-01-24
4	Enrico	Marcetti	Rusa	lucas rusatti	6632	2020-01-24
5	Enrico	Massas	Rusa	lucas rusatti	6632	2020-01-24
\.


--
-- Data for Name: det_aplicaciones; Type: TABLE DATA; Schema: public; Owner: rusa
--

COPY public.det_aplicaciones (id_aplica, resp, esc_1, esc_2, esc_3) FROM stdin;
10	2	4	3	1
5	2	1	4	3
4	1	3	4	2
\.


--
-- Data for Name: det_serv; Type: TABLE DATA; Schema: public; Owner: rusa
--

COPY public.det_serv (id_serv, id_prod, id_pai, id_aplica, ponderacion) FROM stdin;
1	2	1	10	100
1	2	1	5	100
1	1	1	5	100
2	1	7	4	100
\.


--
-- Data for Name: paises; Type: TABLE DATA; Schema: public; Owner: rusa
--

COPY public.paises (id_paises, n_paises) FROM stdin;
1	Argentina
2	Colombia
3	Venezuela
4	Puerto Rico
5	Caribe
6	Ecuador
7	Chile
8	Peru
9	Uruguay
\.


--
-- Data for Name: productos; Type: TABLE DATA; Schema: public; Owner: rusa
--

COPY public.productos (id_productos, n_productos) FROM stdin;
1	pospago
2	prepago
\.


--
-- Data for Name: servicios; Type: TABLE DATA; Schema: public; Owner: rusa
--

COPY public.servicios (id_servicios, n_servicios) FROM stdin;
1	Activaciones
2	Atencion al Cliente
3	Cobranzas
4	Facturacion
5	Retenciones
6	Soporte a Usuarios
7	Ventas
\.


--
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: rusa
--

COPY public.usuarios (id_user, usuario, pass, nombre, email, rol) FROM stdin;
1	Admin	metal	Rusa Admin	Rusa-adm@gmail.com	0
2	lucas	metal	lucas jojo	Rusa-adm@gmail.com	0
\.


--
-- Data for Name: veladores; Type: TABLE DATA; Schema: public; Owner: rusa
--

COPY public.veladores (id_veladores, telefono, sup_inmediato, departamento, persona) FROM stdin;
4	15-666-7892	Lucas Jojo	S&P	Esequiel Poket
1	15-666-6666	Matias Camigliano	S&P	Lucas Jojo
2	15-666-5689	Carolina Pecot	incendiado	Gaston Cat
3	15-666-1234	Gabriel Principato	Networking	Jorge Billete Krenz
\.


--
-- Name: aplicaciones_id_aplicaciones_seq; Type: SEQUENCE SET; Schema: public; Owner: rusa
--

SELECT pg_catalog.setval('public.aplicaciones_id_aplicaciones_seq', 160, true);


--
-- Name: certificados_id_seq; Type: SEQUENCE SET; Schema: public; Owner: rusa
--

SELECT pg_catalog.setval('public.certificados_id_seq', 5, true);


--
-- Name: paises_id_paises_seq; Type: SEQUENCE SET; Schema: public; Owner: rusa
--

SELECT pg_catalog.setval('public.paises_id_paises_seq', 9, true);


--
-- Name: productos_id_productos_seq; Type: SEQUENCE SET; Schema: public; Owner: rusa
--

SELECT pg_catalog.setval('public.productos_id_productos_seq', 2, true);


--
-- Name: servicios_id_servicios_seq; Type: SEQUENCE SET; Schema: public; Owner: rusa
--

SELECT pg_catalog.setval('public.servicios_id_servicios_seq', 7, true);


--
-- Name: user_id_user_seq; Type: SEQUENCE SET; Schema: public; Owner: rusa
--

SELECT pg_catalog.setval('public.user_id_user_seq', 2, true);


--
-- Name: veladores_id_veladores_seq; Type: SEQUENCE SET; Schema: public; Owner: rusa
--

SELECT pg_catalog.setval('public.veladores_id_veladores_seq', 4, true);


--
-- Name: aplicaciones aplicaciones_pkey; Type: CONSTRAINT; Schema: public; Owner: rusa
--

ALTER TABLE ONLY public.aplicaciones
    ADD CONSTRAINT aplicaciones_pkey PRIMARY KEY (id_aplicaciones);


--
-- Name: certificados certificados_pkey; Type: CONSTRAINT; Schema: public; Owner: rusa
--

ALTER TABLE ONLY public.certificados
    ADD CONSTRAINT certificados_pkey PRIMARY KEY (id);


--
-- Name: paises paises_pkey; Type: CONSTRAINT; Schema: public; Owner: rusa
--

ALTER TABLE ONLY public.paises
    ADD CONSTRAINT paises_pkey PRIMARY KEY (id_paises);


--
-- Name: productos productos_pkey; Type: CONSTRAINT; Schema: public; Owner: rusa
--

ALTER TABLE ONLY public.productos
    ADD CONSTRAINT productos_pkey PRIMARY KEY (id_productos);


--
-- Name: servicios servicios_pkey; Type: CONSTRAINT; Schema: public; Owner: rusa
--

ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_pkey PRIMARY KEY (id_servicios);


--
-- Name: veladores veladores_pkey; Type: CONSTRAINT; Schema: public; Owner: rusa
--

ALTER TABLE ONLY public.veladores
    ADD CONSTRAINT veladores_pkey PRIMARY KEY (id_veladores);


--
-- Name: det_aplicaciones det_aplicaciones_id_aplica_fkey; Type: FK CONSTRAINT; Schema: public; Owner: rusa
--

ALTER TABLE ONLY public.det_aplicaciones
    ADD CONSTRAINT det_aplicaciones_id_aplica_fkey FOREIGN KEY (id_aplica) REFERENCES public.aplicaciones(id_aplicaciones) NOT VALID;


--
-- Name: det_aplicaciones esc_1; Type: FK CONSTRAINT; Schema: public; Owner: rusa
--

ALTER TABLE ONLY public.det_aplicaciones
    ADD CONSTRAINT esc_1 FOREIGN KEY (esc_1) REFERENCES public.veladores(id_veladores) NOT VALID;


--
-- Name: det_aplicaciones esc_2; Type: FK CONSTRAINT; Schema: public; Owner: rusa
--

ALTER TABLE ONLY public.det_aplicaciones
    ADD CONSTRAINT esc_2 FOREIGN KEY (esc_2) REFERENCES public.veladores(id_veladores) NOT VALID;


--
-- Name: det_aplicaciones esc_3; Type: FK CONSTRAINT; Schema: public; Owner: rusa
--

ALTER TABLE ONLY public.det_aplicaciones
    ADD CONSTRAINT esc_3 FOREIGN KEY (esc_3) REFERENCES public.veladores(id_veladores) NOT VALID;


--
-- Name: det_serv id_app; Type: FK CONSTRAINT; Schema: public; Owner: rusa
--

ALTER TABLE ONLY public.det_serv
    ADD CONSTRAINT id_app FOREIGN KEY (id_aplica) REFERENCES public.aplicaciones(id_aplicaciones) NOT VALID;


--
-- Name: det_serv id_pai; Type: FK CONSTRAINT; Schema: public; Owner: rusa
--

ALTER TABLE ONLY public.det_serv
    ADD CONSTRAINT id_pai FOREIGN KEY (id_pai) REFERENCES public.paises(id_paises);


--
-- Name: det_serv id_prod; Type: FK CONSTRAINT; Schema: public; Owner: rusa
--

ALTER TABLE ONLY public.det_serv
    ADD CONSTRAINT id_prod FOREIGN KEY (id_prod) REFERENCES public.productos(id_productos);


--
-- Name: det_serv id_serv; Type: FK CONSTRAINT; Schema: public; Owner: rusa
--

ALTER TABLE ONLY public.det_serv
    ADD CONSTRAINT id_serv FOREIGN KEY (id_serv) REFERENCES public.servicios(id_servicios);


--
-- Name: det_aplicaciones resp; Type: FK CONSTRAINT; Schema: public; Owner: rusa
--

ALTER TABLE ONLY public.det_aplicaciones
    ADD CONSTRAINT resp FOREIGN KEY (resp) REFERENCES public.veladores(id_veladores) NOT VALID;


--
-- PostgreSQL database dump complete
--

