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
    theme: 'Preparação, Abordagem, Perfil e Necessidade do Cliente',
    summary: 'Programação presencial das 13:00 às 22:30 com recepção, Módulos 1, 2 e 3, atividades práticas e balanço final.',
    activities: [
      {
        time: '13:00 às 13:30',
        period: 'Tarde',
        title: 'RECEPÇÃO',
        description: 'Confirmação da inscrição e entrega de material.',
        highlight: 'Credenciamento'
      },
      {
        time: '13:30 às 14:00',
        period: 'Tarde',
        title: 'INTRODUÇÃO',
        description: '"Desafios das Vendas no Agronegócio: o que o profissional do agro precisa saber e fazer para vender mais e melhor?"'
      },
      {
        time: '14:00 às 15:00',
        period: 'Tarde',
        title: 'MÓDULO 1: Preparação, Planejamento e Estratégia em Vendas',
        description: 'Fundamentos de preparação comercial e gestão estratégica para vendas no agronegócio.',
        bullets: [
          'Uso da Agenda;',
          'Importância da Carteira de clientes;',
          'Estudando melhor aquilo que você vende.'
        ],
        highlight: 'Módulo 1'
      },
      {
        time: '15:00 às 16:00',
        period: 'Tarde',
        title: 'EXERCÍCIO E PRÁTICA: Módulo 1',
        description: 'Aplicação prática dos conceitos do Módulo 1.',
        bullets: [
          'Fazendo na prática: construindo agenda de alta performance e estratégias de segmentação de cliente;',
          'Caderno de Atividades.'
        ],
        highlight: 'Prática'
      },
      {
        time: '16:00 às 16:30',
        period: 'Tarde',
        title: 'INTERVALO',
        description: 'Pausa programada entre os blocos da tarde.'
      },
      {
        time: '16:30 às 17:30',
        period: 'Tarde',
        title: 'MÓDULO 2: Abordagem e Perfil de Clientes',
        description: 'Leitura comportamental e técnicas de conexão inicial com o cliente do agro.',
        bullets: [
          'Estudo detalhado do Perfil de Clientes;',
          'O que é Rapport?',
          'Como gerar sinergia para ganhar a confiança do cliente Agro.'
        ],
        highlight: 'Módulo 2'
      },
      {
        time: '17:30 às 18:00',
        period: 'Tarde',
        title: 'PRÁTICA: Módulo 2',
        description: 'Aplicação prática de abordagem.',
        bullets: [
          'Atividade prática de abordagem.'
        ],
        highlight: 'Prática'
      },
      {
        time: '18:00 às 19:30',
        period: 'Noite',
        title: 'MÓDULO 3: Necessidade do Cliente',
        description: 'Técnicas de investigação consultiva para identificar necessidades reais de compra.',
        bullets: [
          'Perguntas de investigação;',
          'Perguntas de Necessidade;',
          'Motivadores de compra.'
        ],
        highlight: 'Módulo 3'
      },
      {
        time: '19:30 às 20:30',
        period: 'Noite',
        title: 'PRÁTICA: Módulo 3',
        description: 'Exercícios aplicados de investigação e geração de necessidade.',
        bullets: [
          'Construindo na prática perguntas de Investigação e a necessidade do cliente;',
          'Gerando necessidade no cliente;',
          'Caderno de Atividades.'
        ],
        highlight: 'Prática'
      },
      {
        time: '20:30 às 21:00',
        period: 'Noite',
        title: 'INTERVALO',
        description: 'Pausa programada antes da dinâmica final em grande grupo.'
      },
      {
        time: '21:00 às 22:00',
        period: 'Noite',
        title: 'PRÁTICA: unindo os módulos 02 e 03',
        description: 'Integração prática de abordagem, perfil e levantamento de necessidades.',
        bullets: [
          'Apresentação para grande grupo sobre a dinâmica de vendas.'
        ],
        highlight: 'Módulos 02 e 03'
      },
      {
        time: '22:00 às 22:30',
        period: 'Encerramento',
        title: 'BALANÇO FINAL E ENCERRAMENTO',
        description: 'Consolidação dos aprendizados do primeiro encontro.',
        bullets: [
          'Quais os ganhos e conquistas com o conhecimento adquirido no dia?'
        ],
        highlight: 'Encerramento'
      }
    ]
  },
  {
    id: 'dia-2',
    dayNumber: '2º ENCONTRO',
    dateLabel: '05 de Dezembro',
    weekday: 'Sábado',
    theme: 'Negociação, Fechamento, Pós-venda, Recompra & Certificação',
    summary: 'Programação presencial das 07:00 às 12:30 com tema livre, Módulos 5, 6 e 7, apresentação prática dos 7 módulos e entrega de certificados e prêmios.',
    activities: [
      {
        time: '07:00 às 07:30',
        period: 'Manhã',
        title: 'TEMA LIVRE: "Precisa-se de Técnicos que saibam vender"',
        description: 'Abertura do segundo dia sobre o posicionamento comercial e a postura consultiva do profissional técnico no agronegócio.',
        highlight: 'Abertura'
      },
      {
        time: '07:30 às 08:30',
        period: 'Manhã',
        title: 'MÓDULO 5: Negociação e Fechamento',
        description: 'Estratégias práticas para conduzir negociações de alta margem e concretizar o fechamento com segurança.',
        highlight: 'Módulo 5'
      },
      {
        time: '08:30 às 09:30',
        period: 'Manhã',
        title: 'EXERCÍCIO E PRÁTICA: Módulo 5',
        description: 'Aplicação prática em sala das técnicas de negociação e fechamento do Módulo 5.',
        highlight: 'Prática'
      },
      {
        time: '09:30 às 10:00',
        period: 'Manhã',
        title: 'MÓDULO 6: Pós venda',
        description: 'Acompanhamento estruturado após o fechamento para consolidar resultados e confiança com o produtor.',
        highlight: 'Módulo 6'
      },
      {
        time: '10:00 às 10:30',
        period: 'Manhã',
        title: 'INTERVALO',
        description: 'Pausa programada entre os blocos da manhã.'
      },
      {
        time: '10:30 às 11:00',
        period: 'Manhã',
        title: 'MÓDULO 7: Recompra ou Cliente Ativo',
        description: 'Estratégias para manter o cliente ativo na carteira e gerar recompras contínuas safra após safra.',
        highlight: 'Módulo 7'
      },
      {
        time: '11:00 às 12:00',
        period: 'Manhã',
        title: 'EXERCÍCIOS E PRÁTICA COM A APRESENTAÇÃO DOS 7 Módulos',
        description: 'Consolidação e apresentação prática integrando os 7 módulos trabalhados ao longo da imersão.',
        highlight: '7 Módulos'
      },
      {
        time: '12:00 às 12:30',
        period: 'Encerramento',
        title: 'ENCERRAMENTO E ENTREGA DE CERTIFICADO E PRÊMIOS',
        description: 'Encerramento oficial da Turma 34 com entrega de certificados e prêmios aos participantes.',
        highlight: 'Certificado + Prêmios'
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
