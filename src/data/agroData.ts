import { Testimonial, VideoTestimonial, AgroSegment, TrustedCompany, FaqItem, ScheduleDay } from '../types';

export const HERO_STATS = [
  { value: '+19 Anos', label: 'de Liderança em Capacitação Agro' },
  { value: '+1 BILHÃO', label: 'em Vendas Incrementais Geradas' },
  { value: '+25.000', label: 'Alunos Capacitados no Agro' },
  { value: '98,7%', label: 'Índice de Satisfação de Clientes' },
  { value: '+ de 40', label: 'Segmentos diferentes' },
];

export const AGRO_SEGMENTS: AgroSegment[] = [
  {
    id: 'roi',
    title: '+ROI',
    subtitle: 'Demonstração clara do retorno sobre investimento por hectare para o produtor',
    iconName: 'TrendingUp',
    description: 'Capacite sua força comercial a defender o retorno financeiro da recomendação técnica, mostrando exatamente os ganhos por hectare.',
    challenges: [
      'Dificuldade em provar o valor financeiro das tecnologias',
      'Produtor focado somente no custo inicial dos insumos',
      'Falta de argumentos para defender soluções de alto valor'
    ],
    results: [
      'Demonstração clara do ROI por saca e por hectare',
      'Aumento na aceitação de pacotes tecnológicos avançados',
      'Maior valor percebido na consultoria técnica do seu time'
    ],
    image: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'margem',
    title: '+MARGEM',
    subtitle: 'Proteção de margem e fuga do leilão e guerra de preços no balcão e no campo',
    iconName: 'Percent',
    description: 'Elimine a guerra de preços e os descontos excessivos ensinando tecnicas de negociação que blindam a margem de lucro da empresa.',
    challenges: [
      'Guerra de preços e margens espremidas com a concorrência',
      'Vendedores que cedem desconto logo na primeira objeção',
      'Commoditização da linha de produtos e serviços'
    ],
    results: [
      'Aumento médio de 32% na margem bruta das negociações',
      'Blindagem contra leilão de preços de concorrentes',
      'Venda de especialidades e biológicos com margem superior'
    ],
    image: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'vendas',
    title: '+VENDAS',
    subtitle: 'Aumento na conversão de visitas, abertura de clientes e vendas cruzadas',
    iconName: 'BarChart3',
    description: 'Acelere o ritmo de fechamentos e expanda a área atendida em grandes produtores com uma abordagem proativa e consultiva.',
    challenges: [
      'Ciclos de negociação longos e visitas sem fechamento',
      'Baixa taxa de conversão em novos produtores da região',
      'Dificuldade de realizar vendas cruzadas (cross-selling)'
    ],
    results: [
      'Redução no tempo médio do ciclo de vendas no campo',
      'Prospecção estruturada de grandes produtores rurais',
      'Aumento na taxa de conversão de visitas presenciais'
    ],
    image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'faturamento',
    title: '+FATURAMENTO',
    subtitle: 'Crescimento escalável e previsibilidade de receita safra após safra',
    iconName: 'CircleDollarSign',
    description: 'Estruture uma operação de vendas de alta performance com metas claras, fidelização e previsibilidade de faturamento.',
    challenges: [
      'Oscilações imprevisíveis no faturamento entre safras',
      'Perda de clientes para concorrentes ao final do ciclo',
      'Falta de padronização no processo comercial da equipe'
    ],
    results: [
      'Crescimento consistente e previsível do faturamento',
      'Aumento do share of wallet na carteira de clientes',
      'Fidelização de longo prazo com o produtor rural'
    ],
    image: 'https://images.unsplash.com/photo-1530507629858-e4977d30e9e0?auto=format&fit=crop&w=800&q=80'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Carlos Eduardo Silveira',
    role: 'Diretor Comercial',
    company: 'AgroSul Distribuidora de Insumos',
    category: 'revenda',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
    quote: 'Treinamos nossos 42 RTVs com o Agrovendedor. Em apenas duas safras, dobramos o faturamento da empresa sem aumentar o tamanho da equipe. O foco em valor em vez de preço mudou o nosso negócio!',
    metrics: '+210% de faturamento em 2 safras',
    rating: 5
  },
  {
    id: '2',
    name: 'Mariana Fontes',
    role: 'Gerente Nacional de Vendas',
    company: 'Fertilizantes Serrana / BioAgro',
    category: 'industria',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    quote: 'A linguagem do programa é 100% voltada à realidade da roça. Não é teoria de escritório. Os vendedores saem prontos para negociar com grandes produtores de grãos e pecuaristas.',
    metrics: '+45% de conversão no primeiro trimestre',
    rating: 5
  },
  {
    id: '3',
    name: 'Eng. Agr. Fernando Alencar',
    role: 'Superintendente Comercial',
    company: 'Cooperativa Agroindustrial do Centro-Oeste',
    category: 'cooperativa',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
    quote: 'Quebramos o tabu de que agrônomo não sabe vender. O Agrovendedor deu método e respeito técnico para nossos consultores fecharem pacotes completos de alta tecnologia.',
    metrics: '98,2% de adesão na carteira de cooperados',
    rating: 5
  },
  {
    id: '4',
    name: 'Rodrigo Balthazar',
    role: 'CEO e Fundador',
    company: 'Balthazar Agroconsultoria',
    category: 'consultoria',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    quote: 'Para quem atua no campo, saber vender é o divisor de águas entre cobrar barato ou ter agenda lotada. O treinamento nos ensinou a cobrar pelo valor gerado de produtividade.',
    metrics: '+380% em ticket médio por hectare',
    rating: 5
  }
];

export const VIDEO_TESTIMONIALS: VideoTestimonial[] = [
  {
    id: 'v1',
    youtubeId: '_GYKnnSotwo',
    title: 'Agrovendedor',
    type: 'short',
  },
  {
    id: 'v2',
    youtubeId: 'yQ84q7pWeio',
    title: 'Agrovendedor',
    type: 'short',
  },
  {
    id: 'v3',
    youtubeId: '5k5C4zkThgE',
    title: 'Agrovendedor',
    type: 'short',
  },
  {
    id: 'v4',
    youtubeId: 'caZB1cmenSI',
    title: 'Agrovendedor',
    type: 'short',
  },
  {
    id: 'v5',
    youtubeId: 'i_gMp58OQ00',
    title: 'Agrovendedor',
    type: 'short',
  },
  {
    id: 'v6',
    youtubeId: 'byd4QgVzHh4',
    title: 'Agrovendedor',
    type: 'short',
  },
  {
    id: 'v7',
    youtubeId: 'L7ZL0U42LNU',
    title: 'Agrovendedor',
    type: 'full',
  },
  {
    id: 'v8',
    youtubeId: 'EPyQmB0OBws',
    title: 'Agrovendedor',
    type: 'full',
  },
  {
    id: 'v9',
    youtubeId: '7dFrZpq2Tfw',
    title: 'Agrovendedor',
    type: 'full',
  },
  {
    id: 'v10',
    youtubeId: 'Xq1z6VZAwHM',
    title: 'Agrovendedor',
    type: 'full',
  },
  {
    id: 'v11',
    youtubeId: 'm6EhFsH_Z08',
    title: 'Agrovendedor',
    type: 'full',
  },
  {
    id: 'v12',
    youtubeId: 'm2IOWTTVi9c',
    title: 'Agrovendedor',
    type: 'full',
  },
  {
    id: 'v13',
    youtubeId: '6ajkV5pbEPU',
    title: 'Agrovendedor',
    type: 'full',
  },
  {
    id: 'v14',
    youtubeId: 'Y0XfEYL-6mA',
    title: 'Agrovendedor',
    type: 'short',
  },
  {
    id: 'v15',
    youtubeId: 'IHnIjW6ePg0',
    title: 'Agrovendedor',
    type: 'short',
  }
];

export const TRUSTED_COMPANIES: TrustedCompany[] = [
  { name: 'Matsuda', category: 'Agro', logoText: 'MATSUDA', highlight: 'Parceiro Agrovendedor', logoUrl: '/imagens/logo matsuda.png' },
  { name: 'Grupo Bugio', category: 'Agro', logoText: 'GRUPO BUGIO', highlight: 'Parceiro Agrovendedor', logoUrl: '/imagens/logo bugio.png' },
  { name: 'Multirural', category: 'Agro', logoText: 'MULTIRURAL', highlight: 'Parceiro Agrovendedor', logoUrl: '/imagens/logo multitural.png' },
  { name: 'Fertimig', category: 'Agro', logoText: 'FERTIMIG', highlight: 'Parceiro Agrovendedor', logoUrl: '/imagens/logo fertimig.png' },
  { name: 'Auriverde', category: 'Agro', logoText: 'AURIVERDE', highlight: 'Parceiro Agrovendedor', logoUrl: '/imagens/logo auriverde.png' },
  { name: 'Gasparim', category: 'Agro', logoText: 'GASPARIM', highlight: 'Parceiro Agrovendedor', logoUrl: '/imagens/logo gasparim.png' },
  { name: 'Embreparts', category: 'Agro', logoText: 'EMBREPARTS', highlight: 'Parceiro Agrovendedor', logoUrl: '/imagens/logo embreparts.png' },
  { name: 'Guabi', category: 'Agro', logoText: 'GUABI', highlight: 'Parceiro Agrovendedor', logoUrl: '/imagens/logo guabi 1.png' },
  { name: 'Camisc', category: 'Agro', logoText: 'CAMISC', highlight: 'Parceiro Agrovendedor', logoUrl: '/imagens/logo camisc.png.png' },
  { name: 'DPR Agro', category: 'Agro', logoText: 'DPR AGRO', highlight: 'Parceiro Agrovendedor', logoUrl: '/imagens/logo DPR.png' },
];

export const SCHEDULE_DAYS: ScheduleDay[] = [
  {
    id: 'dia-1',
    dayNumber: '1º ENCONTRO',
    dateLabel: '04 de Dezembro',
    weekday: 'Sexta-feira',
    theme: 'Fundamentos do Agrovendedor, Prospecção & Defesa de Valor no Campo',
    summary: 'Abertura presencial na Faculdade IBG com entrega do kit oficial e imersão prática no Método 21 em 7.',
    activities: [
      {
        time: '08:00',
        period: 'Manhã',
        title: 'Credenciamento, Recepção & Entrega da Camiseta Oficial',
        description: 'Recepção dos participantes no campus da Faculdade IBG em Rondonópolis - MT, validação acadêmica e retirada do kit presencial.',
        highlight: 'Kit Presencial'
      },
      {
        time: '08:30',
        period: 'Manhã',
        title: 'Abertura Institucional: Agrovendedor + Faculdade IBG',
        description: 'Boas-vindas oficiais da parceria educacional, alinhamento de metas da Turma 34 e diagnóstico comercial da sua operação.',
        highlight: 'Turma 34'
      },
      {
        time: '09:30',
        period: 'Manhã',
        title: 'Prospecção Estratégica & Inteligência de Território Rural',
        description: 'Como mapear produtores de alto potencial por cultura, hectare e janela de compra da safra para abordar no timing exato.',
      },
      {
        time: '13:30',
        period: 'Tarde',
        title: 'Conexão Técnica & Demonstração de ROI por Hectare',
        description: 'Transforme recomendação agronômica em retorno financeiro claro por saca e por hectare, saindo da guerra de preços.',
        highlight: 'Prática de Campo'
      },
      {
        time: '16:00',
        period: 'Tarde',
        title: 'Dinâmicas Presenciais & Estudo de Casos do Agro Mato-grossense',
        description: 'Aplicação guiada em grupos com situações reais de revendas, cooperativas, insumos, máquinas e pecuária.',
      }
    ]
  },
  {
    id: 'dia-2',
    dayNumber: '2º ENCONTRO',
    dateLabel: '05 de Dezembro',
    weekday: 'Sábado',
    theme: 'Contorno de Objeções, Negociação de Alta Margem & Certificação',
    summary: 'Consolidação prática em negociação consultiva, simulações ao vivo e cerimônia oficial de entrega de troféus e certificados.',
    activities: [
      {
        time: '08:30',
        period: 'Manhã',
        title: 'Blindagem de Margem & Contorno de Objeções no Balcão e na Fazenda',
        description: 'Roteiros práticos para responder ao "tá caro" e defender especialidades e pacotes tecnológicos sem queimar margem.',
        highlight: 'Método 21 em 7'
      },
      {
        time: '10:30',
        period: 'Manhã',
        title: 'Negociação Avançada, Fechamento & Pós-Venda de Recompras',
        description: 'Condução de propostas com prazos, barter, cross-selling e construção de relacionamento de longo prazo com o produtor.',
      },
      {
        time: '13:30',
        period: 'Tarde',
        title: 'Simulações Reais (Roleplay) & Plano de Ação Imediato',
        description: 'Treinamento prático entre participantes com feedback direto dos treinadores para aplicar na segunda-feira seguinte.',
        highlight: 'Aplicação Imediata'
      },
      {
        time: '16:30',
        period: 'Encerramento',
        title: 'Cerimônia de Encerramento: Entrega de Troféus e Certificados',
        description: 'Formatura presencial da Turma 34 com entrega do Troféu Exclusivo e do Certificado Conjunto Agrovendedor + Faculdade IBG.',
        highlight: 'Troféu + Certificado'
      }
    ]
  }
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: '1',
    question: 'Como funciona a Turma 34 presencial do Agrovendedor?',
    answer: 'A Turma 34 será uma imersão 100% presencial de dois dias completos, realizada nos dias 04 e 05 de Dezembro em parceria com a Faculdade IBG, em Rondonópolis - MT, aplicando o Método 21 em 7 na prática comercial do agronegócio.',
    category: 'geral'
  },
  {
    id: '2',
    question: 'Onde e quando acontecem os dois encontros?',
    answer: 'Os encontros acontecem presencialmente nos dias 04 de Dezembro (sexta-feira) e 05 de Dezembro (sábado), nas dependências da Faculdade IBG em Rondonópolis - MT. Você pode visualizar a localização exata e traçar sua rota na seção "Local" desta página.',
    category: 'local'
  },
  {
    id: '3',
    question: 'O que está incluso na minha inscrição além das aulas presenciais?',
    answer: 'Todos os participantes inscritos recebem a Camiseta Oficial do Agrovendedor, Troféu Exclusivo de Conclusão e Certificado Conjunto emitido em parceria entre o Agrovendedor e a Faculdade IBG, além de todo o material prático dos dois dias de imersão.',
    category: 'entregaveis'
  },
  {
    id: '4',
    question: 'Para quem é indicado este treinamento presencial?',
    answer: 'Para vendedores técnicos (RTVs), agrônomos, consultores, gerentes, diretores comerciais e equipes de revendas, cooperativas, indústrias de insumos, máquinas ou pecuária que desejam aumentar conversão, proteger margem e escalar faturamento.',
    category: 'publico'
  },
  {
    id: '5',
    question: 'Por que a Faculdade IBG é parceira oficial desta edição?',
    answer: 'A Faculdade IBG soma sua credibilidade acadêmica e estrutura presencial em Rondonópolis - MT à experiência de mais de 19 anos do Agrovendedor no campo, garantindo registro acadêmico no Sistema Sophia e certificação conjunta reconhecida.',
    category: 'parceria'
  },
  {
    id: '6',
    question: 'Quais são as formas de pagamento e faturamento disponíveis?',
    answer: 'No formulário oficial de inscrição IBG abaixo, você pode selecionar pagamento À vista, Pix, Cartão ou Outra condição acordada, com faturamento tanto para Pessoa Física quanto para Pessoa Jurídica (com emissão de Nota Fiscal mediante informe do CNPJ).',
    category: 'pagamento'
  },
  {
    id: '7',
    question: 'Até quando vão as inscrições para a Turma 34?',
    answer: 'As inscrições para a Turma 34 encerram no dia 03 de Dezembro (ou antes, caso as vagas presenciais do auditório na Faculdade IBG sejam preenchidas).',
    category: 'inscricao'
  },
  {
    id: '8',
    question: 'Como realizo minha inscrição oficial agora?',
    answer: 'Basta preencher o formulário "INSCRIÇÃO TREINAMENTOS IBG" na seção abaixo com seus dados completos, opção de pagamento e aceite acadêmico, e concluir a confirmação com nossa equipe pelo WhatsApp.',
    category: 'inscricao'
  }
];
