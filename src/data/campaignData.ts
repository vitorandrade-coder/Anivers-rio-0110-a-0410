export interface PostItem {
  id: string;
  plataforma: 'Instagram Feed' | 'Instagram Stories' | 'Facebook' | 'Tiktok';
  tipo?: string;
  formato?: string;
  data: string; // YYYY-MM-DD
  dataDisplay: string;
  diaSemana: string;
  horario?: string;
  categoria: string;
  grupo: string;
  subGrupo?: string;
  alcance: number;
  impressoes: number; // ou visualizações
  interacoes: number;
  curtidas: number;
  comentarios?: number;
  compartilhamentos: number; // envios
  salvos?: number;
  cliquesLink?: number;
  respostas?: number;
  visitasPerfil?: number;
  navegacoes?: number;
  engajamento: number; // em %
  link?: string;
}

export const CAMPAIGN_POSTS: PostItem[] = [
  // ==========================================
  // --- INSTAGRAM FEED (8 Publicações) ---
  // ==========================================
  {
    id: 'feed-1',
    plataforma: 'Instagram Feed',
    formato: 'Reels',
    data: '2026-10-01',
    dataDisplay: '01/10/2026',
    diaSemana: 'quinta-feira',
    categoria: 'CAMPANHA (INFLUENCIADOR)',
    grupo: '@rodrigofaro',
    subGrupo: '@rodrigofaro',
    alcance: 67841,
    impressoes: 84213,
    interacoes: 1003,
    curtidas: 780,
    comentarios: 36,
    compartilhamentos: 187,
    salvos: 0,
    engajamento: 1.48,
    link: 'https://www.instagram.com/reel/rodrigofaro'
  },
  {
    id: 'feed-2',
    plataforma: 'Instagram Feed',
    formato: 'Reels',
    data: '2026-10-01',
    dataDisplay: '01/10/2026',
    diaSemana: 'quinta-feira',
    categoria: 'CAMPANHA (INSTITUCIONAL)',
    grupo: 'Começou o aniversário Assaí | Faro | Hero',
    subGrupo: 'Aniversário Assaí',
    alcance: 134032,
    impressoes: 193051,
    interacoes: 1591,
    curtidas: 1435,
    comentarios: 57,
    compartilhamentos: 69,
    salvos: 30,
    engajamento: 1.19,
    link: 'https://www.instagram.com/reel/'
  },
  {
    id: 'feed-3',
    plataforma: 'Instagram Feed',
    formato: 'Carrossel',
    data: '2026-10-01',
    dataDisplay: '01/10/2026',
    diaSemana: 'quinta-feira',
    categoria: 'CAMPANHA (MECÂNICA)',
    grupo: 'VOCÊ SABE COMO LEVAR?',
    subGrupo: 'Aniversário Assaí',
    alcance: 71533,
    impressoes: 160144,
    interacoes: 6022,
    curtidas: 5696,
    comentarios: 46,
    compartilhamentos: 93,
    salvos: 187,
    engajamento: 8.42,
    link: 'https://www.instagram.com/p/'
  },
  {
    id: 'feed-4',
    plataforma: 'Instagram Feed',
    formato: 'Reels',
    data: '2026-10-02',
    dataDisplay: '02/10/2026',
    diaSemana: 'sexta-feira',
    categoria: 'CAMPANHA (INFLUENCIADOR)',
    grupo: '@nicolebahls',
    subGrupo: '@nicolebahls',
    alcance: 3188757,
    impressoes: 4188757,
    interacoes: 232563,
    curtidas: 207804,
    comentarios: 5459,
    compartilhamentos: 19300,
    salvos: 0,
    engajamento: 7.29,
    link: 'https://www.instagram.com/reel/nicolebahls'
  },
  {
    id: 'feed-5',
    plataforma: 'Instagram Feed',
    formato: 'Carrossel',
    data: '2026-10-02',
    dataDisplay: '02/10/2026',
    diaSemana: 'sexta-feira',
    categoria: 'CAMPANHA (HARDSELL)',
    grupo: 'CHEGARAM AS OFERTAS',
    subGrupo: 'Aniversário Assaí',
    alcance: 42386,
    impressoes: 88439,
    interacoes: 520,
    curtidas: 444,
    comentarios: 31,
    compartilhamentos: 28,
    salvos: 17,
    engajamento: 1.23,
    link: 'https://www.instagram.com/p/'
  },
  {
    id: 'feed-6',
    plataforma: 'Instagram Feed',
    formato: 'Reels',
    data: '2026-10-03',
    dataDisplay: '03/10/2026',
    diaSemana: 'sábado',
    categoria: 'CAMPANHA (INFLUENCIADOR)',
    grupo: '@diatv',
    subGrupo: '@diatv',
    alcance: 32392,
    impressoes: 39437,
    interacoes: 227,
    curtidas: 212,
    comentarios: 10,
    compartilhamentos: 5,
    salvos: 0,
    engajamento: 0.70,
    link: 'https://www.instagram.com/reel/diatv'
  },
  {
    id: 'feed-7',
    plataforma: 'Instagram Feed',
    formato: 'Estático',
    data: '2026-10-03',
    dataDisplay: '03/10/2026',
    diaSemana: 'sábado',
    categoria: 'CAMPANHA (FEST + ENT)',
    grupo: 'VOCÊ COLOCARIA NO CARRINHO?',
    subGrupo: 'Aniversário Assaí',
    alcance: 46294,
    impressoes: 77789,
    interacoes: 741,
    curtidas: 549,
    comentarios: 133,
    compartilhamentos: 30,
    salvos: 29,
    engajamento: 1.60,
    link: 'https://www.instagram.com/p/'
  },
  {
    id: 'feed-8',
    plataforma: 'Instagram Feed',
    formato: 'Estático',
    data: '2026-10-04',
    dataDisplay: '04/10/2026',
    diaSemana: 'domingo',
    categoria: 'CAMPANHA (HARDSELL)',
    grupo: 'OFERTAS (HARDSELL)',
    subGrupo: 'Aniversário Assaí',
    alcance: 24996,
    impressoes: 42301,
    interacoes: 151,
    curtidas: 132,
    comentarios: 8,
    compartilhamentos: 4,
    salvos: 7,
    engajamento: 0.60,
    link: 'https://www.instagram.com/p/'
  },

  // ==========================================
  // --- INSTAGRAM STORIES (17 Publicações) ---
  // ==========================================
  {
    id: 'story-1',
    plataforma: 'Instagram Stories',
    formato: 'Stories',
    data: '2026-10-01',
    dataDisplay: '01/10/2026',
    diaSemana: 'quinta-feira',
    categoria: 'CAMPANHA (PRÊMIOS)',
    grupo: 'COMEÇOU',
    subGrupo: 'Aniversário Assaí',
    alcance: 102474,
    impressoes: 147159,
    interacoes: 10905,
    respostas: 28,
    compartilhamentos: 106,
    cliquesLink: 8201,
    visitasPerfil: 2376,
    curtidas: 194,
    navegacoes: 121398,
    engajamento: 10.64
  },
  {
    id: 'story-2',
    plataforma: 'Instagram Stories',
    formato: 'Stories',
    data: '2026-10-02',
    dataDisplay: '02/10/2026',
    diaSemana: 'sexta-feira',
    categoria: 'RELACIONAL',
    grupo: 'REPOST - ANIVERSÁRIO',
    subGrupo: 'Aniversário Assaí',
    alcance: 80051,
    impressoes: 94229,
    interacoes: 1964,
    respostas: 11,
    compartilhamentos: 1,
    cliquesLink: 977,
    visitasPerfil: 843,
    curtidas: 132,
    navegacoes: 86869,
    engajamento: 2.45
  },
  {
    id: 'story-3',
    plataforma: 'Instagram Stories',
    formato: 'Stories',
    data: '2026-10-02',
    dataDisplay: '02/10/2026',
    diaSemana: 'sexta-feira',
    categoria: 'RELACIONAL',
    grupo: 'REPOST - ANIVERSÁRIO',
    subGrupo: 'Aniversário Assaí',
    alcance: 87848,
    impressoes: 103656,
    interacoes: 1304,
    respostas: 15,
    compartilhamentos: 7,
    cliquesLink: 0,
    visitasPerfil: 1036,
    curtidas: 246,
    navegacoes: 94814,
    engajamento: 1.48
  },
  {
    id: 'story-4',
    plataforma: 'Instagram Stories',
    formato: 'Stories',
    data: '2026-10-02',
    dataDisplay: '02/10/2026',
    diaSemana: 'sexta-feira',
    categoria: 'RELACIONAL',
    grupo: 'REPOST - ANIVERSÁRIO',
    subGrupo: 'Aniversário Assaí',
    alcance: 94075,
    impressoes: 110440,
    interacoes: 632,
    respostas: 20,
    compartilhamentos: 50,
    cliquesLink: 0,
    visitasPerfil: 253,
    curtidas: 309,
    navegacoes: 100741,
    engajamento: 0.67
  },
  {
    id: 'story-5',
    plataforma: 'Instagram Stories',
    formato: 'Stories',
    data: '2026-10-02',
    dataDisplay: '02/10/2026',
    diaSemana: 'sexta-feira',
    categoria: 'RELACIONAL',
    grupo: 'REPOST - ANIVERSÁRIO',
    subGrupo: 'Aniversário Assaí',
    alcance: 93490,
    impressoes: 109505,
    interacoes: 673,
    respostas: 14,
    compartilhamentos: 17,
    cliquesLink: 0,
    visitasPerfil: 236,
    curtidas: 406,
    navegacoes: 102084,
    engajamento: 0.72
  },
  {
    id: 'story-6',
    plataforma: 'Instagram Stories',
    formato: 'Stories',
    data: '2026-10-02',
    dataDisplay: '02/10/2026',
    diaSemana: 'sexta-feira',
    categoria: 'RELACIONAL',
    grupo: 'REPOST - ANIVERSÁRIO',
    subGrupo: 'Aniversário Assaí',
    alcance: 95507,
    impressoes: 118244,
    interacoes: 706,
    respostas: 22,
    compartilhamentos: 83,
    cliquesLink: 1,
    visitasPerfil: 213,
    curtidas: 387,
    navegacoes: 104317,
    engajamento: 0.74
  },
  {
    id: 'story-7',
    plataforma: 'Instagram Stories',
    formato: 'Stories',
    data: '2026-10-02',
    dataDisplay: '02/10/2026',
    diaSemana: 'sexta-feira',
    categoria: 'CAMPANHA (HARDSELL)',
    grupo: 'ECONOMIZE DEMAIS',
    subGrupo: 'Aniversário Assaí',
    alcance: 99414,
    impressoes: 124265,
    interacoes: 824,
    respostas: 22,
    compartilhamentos: 41,
    cliquesLink: 3,
    visitasPerfil: 420,
    curtidas: 338,
    navegacoes: 115783,
    engajamento: 0.83
  },
  {
    id: 'story-8',
    plataforma: 'Instagram Stories',
    formato: 'Stories',
    data: '2026-10-03',
    dataDisplay: '03/10/2026',
    diaSemana: 'sábado',
    categoria: 'RELACIONAL',
    grupo: 'REPOST - ANIVERSÁRIO',
    subGrupo: 'Aniversário Assaí',
    alcance: 55537,
    impressoes: 63739,
    interacoes: 1060,
    respostas: 16,
    compartilhamentos: 2,
    cliquesLink: 0,
    visitasPerfil: 879,
    curtidas: 163,
    navegacoes: 60403,
    engajamento: 1.91
  },
  {
    id: 'story-9',
    plataforma: 'Instagram Stories',
    formato: 'Stories',
    data: '2026-10-03',
    dataDisplay: '03/10/2026',
    diaSemana: 'sábado',
    categoria: 'RELACIONAL',
    grupo: 'REPOST - ANIVERSÁRIO',
    subGrupo: 'Aniversário Assaí',
    alcance: 57413,
    impressoes: 65023,
    interacoes: 363,
    respostas: 12,
    compartilhamentos: 12,
    cliquesLink: 0,
    visitasPerfil: 186,
    curtidas: 153,
    navegacoes: 61045,
    engajamento: 0.63
  },
  {
    id: 'story-10',
    plataforma: 'Instagram Stories',
    formato: 'Stories',
    data: '2026-10-03',
    dataDisplay: '03/10/2026',
    diaSemana: 'sábado',
    categoria: 'RELACIONAL',
    grupo: 'REPOST - ANIVERSÁRIO',
    subGrupo: 'Aniversário Assaí',
    alcance: 58692,
    impressoes: 67210,
    interacoes: 227,
    respostas: 8,
    compartilhamentos: 6,
    cliquesLink: 0,
    visitasPerfil: 125,
    curtidas: 88,
    navegacoes: 63120,
    engajamento: 0.39
  },
  {
    id: 'story-11',
    plataforma: 'Instagram Stories',
    formato: 'Stories',
    data: '2026-10-03',
    dataDisplay: '03/10/2026',
    diaSemana: 'sábado',
    categoria: 'RELACIONAL',
    grupo: 'REPOST - ANIVERSÁRIO',
    subGrupo: 'Aniversário Assaí',
    alcance: 61969,
    impressoes: 71390,
    interacoes: 340,
    respostas: 8,
    compartilhamentos: 11,
    cliquesLink: 1,
    visitasPerfil: 196,
    curtidas: 124,
    navegacoes: 67679,
    engajamento: 0.55
  },
  {
    id: 'story-12',
    plataforma: 'Instagram Stories',
    formato: 'Stories',
    data: '2026-10-03',
    dataDisplay: '03/10/2026',
    diaSemana: 'sábado',
    categoria: 'CAMPANHA (MECÂNICA)',
    grupo: 'CONHEÇA A MECÂNICA',
    subGrupo: 'Aniversário Assaí',
    alcance: 65982,
    impressoes: 78778,
    interacoes: 4117,
    respostas: 23,
    compartilhamentos: 43,
    cliquesLink: 3342,
    visitasPerfil: 578,
    curtidas: 131,
    navegacoes: 74294,
    engajamento: 6.24
  },
  {
    id: 'story-13',
    plataforma: 'Instagram Stories',
    formato: 'Stories',
    data: '2026-10-04',
    dataDisplay: '04/10/2026',
    diaSemana: 'domingo',
    categoria: 'RELACIONAL',
    grupo: 'REPOST - ANIVERSÁRIO',
    subGrupo: 'Aniversário Assaí',
    alcance: 47266,
    impressoes: 52985,
    interacoes: 671,
    respostas: 9,
    compartilhamentos: 15,
    cliquesLink: 0,
    visitasPerfil: 557,
    curtidas: 90,
    navegacoes: 51107,
    engajamento: 1.42
  },
  {
    id: 'story-14',
    plataforma: 'Instagram Stories',
    formato: 'Stories',
    data: '2026-10-04',
    dataDisplay: '04/10/2026',
    diaSemana: 'domingo',
    categoria: 'RELACIONAL',
    grupo: 'REPOST - ANIVERSÁRIO',
    subGrupo: 'Aniversário Assaí',
    alcance: 49658,
    impressoes: 53743,
    interacoes: 257,
    respostas: 5,
    compartilhamentos: 3,
    cliquesLink: 0,
    visitasPerfil: 157,
    curtidas: 92,
    navegacoes: 51200,
    engajamento: 0.52
  },
  {
    id: 'story-15',
    plataforma: 'Instagram Stories',
    formato: 'Stories',
    data: '2026-10-04',
    dataDisplay: '04/10/2026',
    diaSemana: 'domingo',
    categoria: 'RELACIONAL',
    grupo: 'REPOST - ANIVERSÁRIO',
    subGrupo: 'Aniversário Assaí',
    alcance: 50957,
    impressoes: 56279,
    interacoes: 211,
    respostas: 9,
    compartilhamentos: 0,
    cliquesLink: 0,
    visitasPerfil: 130,
    curtidas: 72,
    navegacoes: 52378,
    engajamento: 0.41
  },
  {
    id: 'story-16',
    plataforma: 'Instagram Stories',
    formato: 'Stories',
    data: '2026-10-04',
    dataDisplay: '04/10/2026',
    diaSemana: 'domingo',
    categoria: 'RELACIONAL',
    grupo: 'REPOST - ANIVERSÁRIO',
    subGrupo: 'Aniversário Assaí',
    alcance: 54790,
    impressoes: 61939,
    interacoes: 481,
    respostas: 6,
    compartilhamentos: 1,
    cliquesLink: 0,
    visitasPerfil: 329,
    curtidas: 145,
    navegacoes: 58083,
    engajamento: 0.88
  },
  {
    id: 'story-17',
    plataforma: 'Instagram Stories',
    formato: 'Stories',
    data: '2026-10-04',
    dataDisplay: '04/10/2026',
    diaSemana: 'domingo',
    categoria: 'CAMPANHA (MECÂNICA + ACELERADOR)',
    grupo: 'CARTÃO PASSAÍ',
    subGrupo: 'Aniversário Assaí',
    alcance: 59625,
    impressoes: 70248,
    interacoes: 1480,
    respostas: 6,
    compartilhamentos: 9,
    cliquesLink: 834,
    visitasPerfil: 544,
    curtidas: 87,
    navegacoes: 64679,
    engajamento: 2.48
  },

  // ==========================================
  // --- FACEBOOK (6 Publicações) ---
  // ==========================================
  {
    id: 'fb-1',
    plataforma: 'Facebook',
    tipo: 'Vídeo',
    formato: 'Vídeo',
    data: '2026-10-01',
    dataDisplay: '01/10/2026',
    diaSemana: 'quinta-feira',
    categoria: 'CAMPANHA (INSTITUCIONAL)',
    grupo: 'Começou o aniversário Assaí | Faro | Hero',
    subGrupo: 'Aniversário Assaí',
    alcance: 9665,
    impressoes: 15804,
    interacoes: 348,
    curtidas: 347,
    comentarios: 1,
    compartilhamentos: 0,
    engajamento: 3.60,
    link: 'https://www.facebook.com/reel/195047595'
  },
  {
    id: 'fb-2',
    plataforma: 'Facebook',
    tipo: 'Vídeo',
    formato: 'Vídeo',
    data: '2026-10-01',
    dataDisplay: '01/10/2026',
    diaSemana: 'quinta-feira',
    categoria: 'CAMPANHA (INSTITUCIONAL)',
    grupo: 'Começou o aniversário Assaí | Faro | Mecânica',
    subGrupo: 'Aniversário Assaí',
    alcance: 6127,
    impressoes: 10238,
    interacoes: 158,
    curtidas: 146,
    comentarios: 12,
    compartilhamentos: 0,
    engajamento: 2.58,
    link: 'https://www.facebook.com/reel/147947995'
  },
  {
    id: 'fb-3',
    plataforma: 'Facebook',
    tipo: 'Carrossel',
    formato: 'Carrossel',
    data: '2026-10-01',
    dataDisplay: '01/10/2026',
    diaSemana: 'quinta-feira',
    categoria: 'CAMPANHA (MECÂNICA)',
    grupo: 'VOCÊ SABE COMO LEVAR?',
    subGrupo: 'Aniversário Assaí',
    alcance: 14821,
    impressoes: 21596,
    interacoes: 467,
    curtidas: 460,
    comentarios: 7,
    compartilhamentos: 0,
    engajamento: 3.15,
    link: 'https://www.facebook.com/fbid021AUWtXmAYj1wURoUx5i'
  },
  {
    id: 'fb-4',
    plataforma: 'Facebook',
    tipo: 'Estático',
    formato: 'Estático',
    data: '2026-10-02',
    dataDisplay: '02/10/2026',
    diaSemana: 'sexta-feira',
    categoria: 'CAMPANHA (PRÊMIOS)',
    grupo: 'COMPRE, ECONOMIZE E CONCORRA',
    subGrupo: 'Aniversário Assaí',
    alcance: 19487,
    impressoes: 26471,
    interacoes: 540,
    curtidas: 527,
    comentarios: 13,
    compartilhamentos: 0,
    engajamento: 2.77,
    link: 'https://www.facebook.com/bid026GyqCmsH5AdcRfFUQeN8'
  },
  {
    id: 'fb-5',
    plataforma: 'Facebook',
    tipo: 'Estático',
    formato: 'Estático',
    data: '2026-10-03',
    dataDisplay: '03/10/2026',
    diaSemana: 'sábado',
    categoria: 'CAMPANHA (HARDSELL)',
    grupo: 'SEU NEGÓCIO TAMBÉM ENTRA NA FESTA',
    subGrupo: 'Aniversário Assaí',
    alcance: 15990,
    impressoes: 21475,
    interacoes: 371,
    curtidas: 360,
    comentarios: 11,
    compartilhamentos: 0,
    engajamento: 2.32,
    link: 'https://www.facebook.com/bid06ePPhikGTqeLYdg1eJaGxg'
  },
  {
    id: 'fb-6',
    plataforma: 'Facebook',
    tipo: 'Vídeo',
    formato: 'Vídeo',
    data: '2026-10-04',
    dataDisplay: '04/10/2026',
    diaSemana: 'domingo',
    categoria: 'CAMPANHA (MECÂNICA)',
    grupo: 'TIRANDO DÚVIDAS COM A SOL',
    subGrupo: 'Aniversário Assaí',
    alcance: 6002,
    impressoes: 7270,
    interacoes: 77,
    curtidas: 76,
    comentarios: 1,
    compartilhamentos: 0,
    engajamento: 1.28,
    link: 'https://www.facebook.com/reel/141752873'
  },

  // ==========================================
  // --- TIKTOK (6 Publicações) ---
  // ==========================================
  {
    id: 'tt-1',
    plataforma: 'Tiktok',
    tipo: 'Vídeo',
    formato: 'Vídeo Curto',
    data: '2026-10-01',
    dataDisplay: '01/10/2026',
    diaSemana: 'quinta-feira',
    horario: '07:00',
    categoria: 'CAMPANHA (INSTITUCIONAL)',
    grupo: 'COMEÇOU | ANIVERSÁRIO',
    subGrupo: 'ANIVERSÁRIO ASSAÍ',
    alcance: 958,
    impressoes: 958,
    interacoes: 35,
    curtidas: 30,
    comentarios: 0,
    compartilhamentos: 5,
    engajamento: 3.65,
    link: 'https://www.tiktok.com/@assaiatacadistaoficial'
  },
  {
    id: 'tt-2',
    plataforma: 'Tiktok',
    tipo: 'Vídeo',
    formato: 'Vídeo Curto',
    data: '2026-10-01',
    dataDisplay: '01/10/2026',
    diaSemana: 'quinta-feira',
    horario: '10:00',
    categoria: 'CAMPANHA (HARDSELL)',
    grupo: 'CADÊ AS OFERTAS?',
    subGrupo: 'ANIVERSÁRIO ASSAÍ',
    alcance: 1300,
    impressoes: 1300,
    interacoes: 44,
    curtidas: 35,
    comentarios: 2,
    compartilhamentos: 7,
    engajamento: 3.38,
    link: 'https://www.tiktok.com/@assaiatacadistaoficial'
  },
  {
    id: 'tt-3',
    plataforma: 'Tiktok',
    tipo: 'Vídeo',
    formato: 'Vídeo Curto',
    data: '2026-10-01',
    dataDisplay: '01/10/2026',
    diaSemana: 'quinta-feira',
    horario: '17:00',
    categoria: 'CAMPANHA (INSTITUCIONAL)',
    grupo: 'Começou o aniversário Assaí | Faro | Hero',
    subGrupo: 'Aniversário Assaí',
    alcance: 771,
    impressoes: 771,
    interacoes: 23,
    curtidas: 19,
    comentarios: 1,
    compartilhamentos: 3,
    engajamento: 2.98,
    link: 'https://www.tiktok.com/@assaiatacadistaoficial'
  },
  {
    id: 'tt-4',
    plataforma: 'Tiktok',
    tipo: 'Vídeo',
    formato: 'Vídeo Curto',
    data: '2026-10-02',
    dataDisplay: '02/10/2026',
    diaSemana: 'sexta-feira',
    horario: '08:00',
    categoria: 'CAMPANHA (FEST + ENT)',
    grupo: 'FESTA DE SUCESSO',
    subGrupo: 'Aniversário Assaí',
    alcance: 3600,
    impressoes: 3600,
    interacoes: 95,
    curtidas: 78,
    comentarios: 4,
    compartilhamentos: 13,
    engajamento: 2.64,
    link: 'https://www.tiktok.com/@assaiatacadistaoficial'
  },
  {
    id: 'tt-5',
    plataforma: 'Tiktok',
    tipo: 'Vídeo',
    formato: 'Vídeo Curto',
    data: '2026-10-03',
    dataDisplay: '03/10/2026',
    diaSemana: 'sábado',
    horario: '08:00',
    categoria: 'CAMPANHA (HARDSELL)',
    grupo: 'RAZÕES APP MEU ASSAÍ',
    subGrupo: 'Aniversário Assaí',
    alcance: 426,
    impressoes: 426,
    interacoes: 15,
    curtidas: 14,
    comentarios: 1,
    compartilhamentos: 0,
    engajamento: 3.52,
    link: 'https://www.tiktok.com/@assaiatacadistaoficial'
  },
  {
    id: 'tt-6',
    plataforma: 'Tiktok',
    tipo: 'Vídeo',
    formato: 'Vídeo Curto',
    data: '2026-10-04',
    dataDisplay: '04/10/2026',
    diaSemana: 'domingo',
    horario: '08:00',
    categoria: 'CAMPANHA (HARDSELL + MP)',
    grupo: 'ASSAÍ BLOOM',
    subGrupo: 'Aniversário Assaí',
    alcance: 900,
    impressoes: 900,
    interacoes: 23,
    curtidas: 23,
    comentarios: 0,
    compartilhamentos: 0,
    engajamento: 2.56,
    link: 'https://www.tiktok.com/@assaiatacadistaoficial'
  }
];

// Funções de agregação e estatísticas
export function getTotals(posts = CAMPAIGN_POSTS) {
  const alcance = posts.reduce((acc, p) => acc + p.alcance, 0);
  const impressoes = posts.reduce((acc, p) => acc + p.impressoes, 0);
  const interacoes = posts.reduce((acc, p) => acc + p.interacoes, 0);
  const curtidas = posts.reduce((acc, p) => acc + p.curtidas, 0);
  const comentarios = posts.reduce((acc, p) => acc + (p.comentarios || 0), 0);
  const compartilhamentos = posts.reduce((acc, p) => acc + p.compartilhamentos, 0);
  const salvos = posts.reduce((acc, p) => acc + (p.salvos || 0), 0);
  const cliquesLink = posts.reduce((acc, p) => acc + (p.cliquesLink || 0), 0);
  const visitasPerfil = posts.reduce((acc, p) => acc + (p.visitasPerfil || 0), 0);
  const navegacoes = posts.reduce((acc, p) => acc + (p.navegacoes || 0), 0);
  
  // ER médio oficial consolidado dos posts (Stories: 1,94%, Feed: 2,81%)
  const erMedio = posts.length > 0 ? posts.reduce((acc, p) => acc + p.engajamento, 0) / posts.length : 0;

  // ER médio entre as 4 redes sociais (Feed 2,81% + Stories 1,94% + Facebook 2,72% + TikTok 2,95%) / 4 = 2,61%
  const platformList = ['Instagram Feed', 'Instagram Stories', 'Facebook', 'Tiktok'] as const;
  const platformRates: number[] = [];
  platformList.forEach(plat => {
    const list = posts.filter(p => p.plataforma === plat);
    if (list.length > 0) {
      if (plat === 'Instagram Feed') platformRates.push(2.81);
      else if (plat === 'Instagram Stories') platformRates.push(1.94);
      else if (plat === 'Facebook') {
        const alc = list.reduce((a, b) => a + b.alcance, 0);
        const inte = list.reduce((a, b) => a + b.interacoes, 0);
        platformRates.push(alc > 0 ? (inte / alc) * 100 : 2.72);
      } else if (plat === 'Tiktok') {
        const alc = list.reduce((a, b) => a + b.alcance, 0);
        const inte = list.reduce((a, b) => a + b.interacoes, 0);
        platformRates.push(alc > 0 ? (inte / alc) * 100 : 2.95);
      }
    }
  });
  const erMedioRedes = platformRates.length > 0 ? platformRates.reduce((a, b) => a + b, 0) / platformRates.length : 2.61;
  const erPonderadoGlobal = alcance > 0 ? (interacoes / alcance) * 100 : 0;

  return {
    totalPosts: posts.length,
    alcance,
    impressoes,
    interacoes,
    curtidas,
    comentarios,
    compartilhamentos,
    salvos,
    cliquesLink,
    visitasPerfil,
    navegacoes,
    erMedio,
    erMedioRedes,
    erPonderadoGlobal
  };
}

export function getPlatformTotals(posts = CAMPAIGN_POSTS) {
  const platforms = ['Instagram Stories', 'Instagram Feed', 'Facebook', 'Tiktok'] as const;
  return platforms.map(plat => {
    const list = posts.filter(p => p.plataforma === plat);
    const alcance = list.reduce((a, b) => a + b.alcance, 0);
    const impressoes = list.reduce((a, b) => a + b.impressoes, 0);
    const interacoes = list.reduce((a, b) => a + b.interacoes, 0);
    const curtidas = list.reduce((a, b) => a + b.curtidas, 0);
    const comentarios = list.reduce((a, b) => a + (b.comentarios || 0), 0);
    const compartilhamentos = list.reduce((a, b) => a + b.compartilhamentos, 0);
    const cliquesLink = list.reduce((a, b) => a + (b.cliquesLink || 0), 0);
    // Média oficial de engajamento da plataforma (Stories: 1,94%, Feed: 2,81%)
    const er = list.length > 0 ? list.reduce((a, b) => a + b.engajamento, 0) / list.length : 0;
    return {
      plataforma: plat,
      postsCount: list.length,
      alcance,
      impressoes,
      interacoes,
      curtidas,
      comentarios,
      compartilhamentos,
      cliquesLink,
      er
    };
  });
}
