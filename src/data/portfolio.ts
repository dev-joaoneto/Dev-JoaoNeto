import spendnote from '/assets/spendnote.webp'
import devburguer from '/assets/dev-burguer.webp'
import iphone from '/assets/iphone17.webp'
import wagner from '/assets/wagner-adv.webp'
import lecion from '/assets/lecion.webp'
import digytron from '/assets/digytron.webp'

export const profile = {
  name: 'João Neto',
  role: 'Desenvolvedor Full Stack & Engenheiro de IA',
  whatsappUrl: 'https://contate.me/5561986366632',
  resumeUrl: '/docs/joao-neto-curriculo.pdf',
  email: 'joaonetodevops@gmail.com',
}

export const navLinks = [
  { label: 'Início', href: '#home' },
  { label: 'Sobre', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projetos', href: '#projects' },
  { label: 'Trajetória', href: '#journey' },
  { label: 'Contato', href: '#contact' },
]

export const socialLinks = [
  {
    label: 'GitHub',
    href: 'https://github.com/Dev-JoaoNeto',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/joao-neto-dev/',
  },
  {
    label: 'E-mail',
    href: 'https://mail.google.com/mail/?view=cm&fs=1&to=joaonetodevops@gmail.com',
  },
]

const icon = {
  javascript:
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
  typescript:
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
  react: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  next: 'https://cdn.simpleicons.org/nextdotjs/ffffff',
  expo: 'https://cdn.simpleicons.org/expo/ffffff',
  tailwind:
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
  responsive:
    '/icons/responsive.svg',
  wordpress: 'https://cdn.simpleicons.org/wordpress/21759B',
  figma: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',
  node: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
  firebase:
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg',
  rest: 'https://cdn.simpleicons.org/openapiinitiative/6BA539',
  sql: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
  nosql: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
  docker: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
  git: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
  github: 'https://cdn.simpleicons.org/github/ffffff',
  n8n: 'https://cdn.simpleicons.org/n8n/EA4B71',
  llm: '/icons/llm.svg',
  agent: '/icons/agent.svg',
  prompt: '/icons/prompt.svg',
  rag: '/icons/rag.svg',
  finetune: '/icons/finetune.svg',
  aiSkills: '/icons/skills.svg',
  evals: '/icons/evals.svg',
  claude: 'https://cdn.simpleicons.org/claude/D97757',
  gemini: 'https://cdn.simpleicons.org/googlegemini/8E75B2',
  mcp: 'https://cdn.simpleicons.org/modelcontextprotocol/ffffff',
  supabase: 'https://cdn.simpleicons.org/supabase/3FCF8E',
  stripe: 'https://cdn.simpleicons.org/stripe/635BFF',
}

export const skills = [
  {
    key: 'ia',
    group: 'Inteligência Artificial',
    caption: 'Do dado ao agente em produção: contexto, modelo, ferramentas e avaliação',
    items: [
      { name: 'LLMs e APIs de IA', icon: icon.llm, note: 'Integra modelos via API com streaming, tool calling e controle de custo por requisição.' },
      { name: 'Agentes de IA', icon: icon.agent, note: 'Agentes que planejam, chamam ferramentas e concluem tarefas de várias etapas.' },
      { name: 'RAG e embeddings', icon: icon.rag, note: 'Chunking, embeddings e banco vetorial para respostas com fonte citada.' },
      { name: 'Fine-tuning', icon: icon.finetune, note: 'LoRA e datasets curados quando prompt e RAG não bastam em precisão ou custo.' },
      { name: 'MCP', icon: icon.mcp, note: 'Servidores MCP que dão ao agente acesso seguro a dados e sistemas reais.' },
      { name: 'Skills de agente', icon: icon.aiSkills, note: 'Capacidades empacotadas e reutilizáveis que o agente carrega sob demanda.' },
      { name: 'Evals e guardrails', icon: icon.evals, note: 'Avaliação automática, limites de saída e observabilidade de custo e alucinação.' },
      { name: 'Engenharia de prompt e contexto', icon: icon.prompt, note: 'Prompts versionados e janela de contexto montada para cada tarefa.' },
      { name: 'Claude', icon: icon.claude, note: 'Modelos da Anthropic para raciocínio longo, código e agentes.' },
      { name: 'Gemini', icon: icon.gemini, note: 'Modelos do Google para tarefas multimodais e alto volume.' },
      { name: 'n8n', icon: icon.n8n, note: 'Automações que ligam IA a CRM, e-mail, planilhas e webhooks.' },
    ],
  },
  {
    key: 'front',
    group: 'Front-end',
    caption: 'Interface, responsividade e experiência',
    items: [
      { name: 'JavaScript', icon: icon.javascript, note: 'Base de tudo no navegador, com domínio de assincronia e DOM.' },
      { name: 'TypeScript', icon: icon.typescript, note: 'Tipagem estrita para código previsível e refatoração segura.' },
      { name: 'React', icon: icon.react, note: 'Componentes, hooks e estado pensados para crescer sem virar bagunça.' },
      { name: 'Next.js', icon: icon.next, note: 'SSR, rotas de API e SEO para produtos que precisam ser encontrados.' },
      { name: 'Tailwind', icon: icon.tailwind, note: 'Design system em utilitários, rápido de evoluir e consistente.' },
      { name: 'React Native', icon: icon.react, note: 'Apps móveis com a mesma base de conhecimento do React.' },
      { name: 'Expo', icon: icon.expo, note: 'Build, publicação e atualizações over-the-air de apps móveis.' },
      { name: 'Web Responsiva', icon: icon.responsive, note: 'Layouts que funcionam do celular ao monitor ultrawide.' },
    ],
  },
  {
    key: 'back',
    group: 'Back-end e dados',
    caption: 'APIs, persistência e integrações',
    items: [
      { name: 'Node.js', icon: icon.node, note: 'APIs e serviços com JavaScript no servidor.' },
      { name: 'APIs RESTful', icon: icon.rest, note: 'Contratos claros, validação na entrada e erros consistentes.' },
      { name: 'SQL', icon: icon.sql, note: 'Modelagem relacional, índices e consultas eficientes.' },
      { name: 'NoSQL', icon: icon.nosql, note: 'Documentos e coleções quando o dado pede flexibilidade.' },
      { name: 'Firebase', icon: icon.firebase, note: 'Auth, Firestore e hosting para tempo real com pouco atrito.' },
      { name: 'Supabase', icon: icon.supabase, note: 'Postgres com auth, RLS e storage prontos para produção.' },
      { name: 'Stripe', icon: icon.stripe, note: 'Checkout, assinaturas e webhooks de pagamento.' },
      { name: 'Docker', icon: icon.docker, note: 'Ambientes reproduzíveis do desenvolvimento ao deploy.' },
    ],
  },
  {
    key: 'tools',
    group: 'Ferramentas',
    caption: 'Versionamento, design e publicação',
    items: [
      { name: 'Git', icon: icon.git, note: 'Histórico limpo, branches e revisão antes de juntar.' },
      { name: 'GitHub', icon: icon.github, note: 'Repositórios, pull requests e automações de CI.' },
      { name: 'Figma', icon: icon.figma, note: 'Do protótipo ao componente sem perder fidelidade.' },
      { name: 'WordPress', icon: icon.wordpress, note: 'Sites institucionais editáveis pelo próprio cliente.' },
    ],
  },
]

export type Project = {
  title: string
  kind: 'IA' | 'Full stack' | 'Site'
  tagline: string
  /** problema e solução em uma frase, sempre visível no card */
  challenge: string
  description: string
  stack: string[]
  repoUrl?: string
  liveUrl: string
  imageUrl?: string
  /** print da página inteira, rola dentro da moldura no hover */
  fullImageUrl?: string
  /** gravação real da página rolando; toca no hover do card */
  video?: { webm: string; mp4: string; poster: string }
  ai?: { flow: string[]; points: string[] }
}

export const projects: Project[] = [
  {
    title: 'Digytron Lecion',
    kind: 'IA',
    tagline: 'Plataforma educacional com IA generativa',
    challenge:
      'Professores perdem horas montando provas e planos de aula. A Lecion gera esses materiais em segundos com IA, prontos para editar.',
    description:
      'Plataforma de IA generativa que apoia professores na criação de provas, planos de aula e materiais didáticos em segundos. Integra modelos de linguagem ao fluxo do professor, com experiência responsiva e jornada de assinatura.',
    stack: ['React', 'TypeScript', 'OpenAI', 'Supabase', 'Stripe'],
    fullImageUrl: '/assets/lecion-full.webp',
    ai: {
      flow: ['pedido do professor', 'busca na web com fonte', 'geração com OpenAI', 'PDF editável'],
      points: [
        'Modo Atualidades: antes de gerar a prova, busca fatos recentes na web e guarda as fontes.',
        'Chat com streaming, compactação automática de contexto e teto de tokens por conversa.',
        'Chave da IA só no servidor, com créditos debitados a cada geração.',
        'Provas e materiais saem em PDF editável dentro da própria plataforma.',
      ],
    },
    liveUrl: 'https://lecion.digytron.com/',
    imageUrl: lecion,
  },
  {
    title: 'SpendNote',
    kind: 'Full stack',
    tagline: 'Finanças pessoais em tempo real',
    challenge:
      'Ver para onde o dinheiro vai sem planilha: lançamentos categorizados e um dashboard que recalcula saldo e histórico em tempo real.',
    description:
      'Aplicação full stack de controle financeiro: lançamento de receitas e despesas, categorização e um dashboard que atualiza saldo, histórico mensal e distribuição por categoria em tempo real.',
    stack: ['React', 'TypeScript', 'Tailwind', 'Node.js', 'Firebase'],
    repoUrl: 'https://github.com/dev-joaoneto/spendnote-api',
    fullImageUrl: '/assets/spendnote-full.webp',
    liveUrl: 'https://spendnote.digytron.com/',
    imageUrl: spendnote,
  },
  {
    title: 'Dev&Grill',
    kind: 'Full stack',
    tagline: 'E-commerce com pagamento e painel',
    challenge:
      'Pedido online de ponta a ponta: o cliente paga com Stripe e a cozinha acompanha e muda o status de cada pedido num painel.',
    description:
      'Sistema completo de pedidos online para hamburgueria: catálogo, carrinho e checkout com Stripe do lado do cliente, e painel administrativo para acompanhar e mudar o status de cada pedido.',
    stack: ['React', 'styled-components', 'Axios', 'Node.js', 'Stripe'],
    liveUrl: 'https://devburguer.digytron.com/login',
    imageUrl: devburguer,
  },
  {
    title: 'Digytron',
    kind: 'Site',
    tagline: 'Site institucional e jornada comercial',
    challenge:
      'Transformar visita em conversa comercial, com posicionamento, planos e cases numa jornada com animação e visualização de dados.',
    description:
      'Site institucional da Digytron, apresentando posicionamento, ecossistemas, planos e cases numa jornada pensada para transformar visita em conversa comercial — com animação e visualização de dados como parte da narrativa.',
    stack: ['React', 'TypeScript', 'Tailwind', 'Framer Motion', 'D3.js'],
    video: { webm: '/assets/digytron.webm', mp4: '/assets/digytron.mp4', poster: '/assets/digytron-poster.webp' },
    liveUrl: 'https://digytron.com.br/',
    imageUrl: digytron,
  },
  {
    title: 'Wagner Simões Advogados',
    kind: 'Site',
    tagline: 'Site institucional de advocacia',
    challenge:
      'Apresentar um escritório de várias áreas do Direito com sobriedade e caminhos de contato que qualificam quem chega.',
    description:
      'Site de um escritório com atuação em Direito Médico, Penal, Imobiliário e Público. Estrutura visual sóbria, conteúdo organizado por área de atuação e caminhos de contato pensados para qualificar quem chega.',
    stack: ['React', 'TypeScript'],
    fullImageUrl: '/assets/wagner-adv-full.webp',
    liveUrl: 'https://wagnersimoesadv.com.br/',
    imageUrl: wagner,
  },
  {
    title: 'iPhone 17',
    kind: 'Site',
    tagline: 'Landing page de produto',
    challenge:
      'Landing de produto com impacto visual, tipografia forte e layout responsivo que continua leve.',
    description:
      'Landing page estática de apresentação de produto, com foco em impacto visual, tipografia, imagens de alta qualidade e layout responsivo que se mantém leve em navegadores modernos.',
    stack: ['React', 'Vite', 'Tailwind'],
    fullImageUrl: '/assets/iphone17-full.webp',
    liveUrl: 'https://dev-joaoneto.github.io/projeto-iphone17/',
    imageUrl: iphone,
  },
]

export type Experience = {
  period: string
  current?: boolean
  title: string
  org: string
  badge?: string
  groups?: { label: string; points: string[] }[]
  points?: string[]
  steps?: { period: string; role: string; detail: string }[]
  metric?: { value: string; label: string }
  tags?: string[]
}

export const experience: Experience[] = [
  {
    period: '09/2025 — atual',
    current: true,
    title: 'Programador Web Full Stack & Engenheiro de IA',
    org: 'Freelancer · autônomo',
    groups: [
      {
        label: 'Engenharia de IA',
        points: [
          'Agentes com RAG (embeddings e banco vetorial), tool calling e servidores MCP.',
          'IA generativa em produção, como a Digytron Lecion, que gera provas e planos de aula com OpenAI.',
          'Evals, guardrails e monitoramento de custo, latência e qualidade.',
        ],
      },
      {
        label: 'Web full stack',
        points: [
          'Aplicações web responsivas e PWAs em React, com foco em performance.',
          'Back-end em Node.js e Express, integração de APIs e sistemas administrativos.',
        ],
      },
    ],
    tags: ['OpenAI', 'RAG', 'MCP', 'React', 'TypeScript', 'Node.js'],
  },
  {
    period: '04/2025 — atual',
    current: true,
    title: 'Gerente Operacional',
    org: 'Fiv5 Stream · provedor de internet',
    points: [
      'Responsável pela área técnica, estoque, COP e NOC.',
      'Treinamento da equipe técnica para um atendimento profissional e atualização das tecnologias do setor.',
    ],
    metric: { value: '40 a 80', label: 'novos clientes por mês' },
  },
  {
    period: '09/2023 — 03/2025',
    title: 'De técnico a Gerente Operacional',
    org: 'BSB Internet · provedor de internet',
    badge: '3 cargos em 18 meses',
    steps: [
      { period: '09/2023 — 03/2024', role: 'Técnico FTTH', detail: 'instalação, reparo, roteadores, rede mesh, RouterBoards e switches' },
      { period: '03/2024 — 07/2024', role: 'Supervisor técnico', detail: 'instalação, manutenção e infraestrutura' },
      { period: '07/2024 — 03/2025', role: 'Gerente Operacional', detail: 'área técnica, estoque, COP e NOC' },
    ],
    metric: { value: '100 a 120', label: 'novos clientes por mês' },
  },
]

export const education = [
  { course: 'Formação Programador', school: 'DevClub', year: '2025' },
  { course: 'Pós-graduação em Gestão de Serviços de TI', school: 'FATAP', year: '2022' },
  { course: 'Análise e Desenvolvimento de Sistemas', school: 'FATAP', year: '2021' },
]

export const aiCourses = [
  { school: 'FGV', name: 'IA Generativa e ChatGPT' },
  { school: 'FGV', name: 'Introdução à IA' },
  { school: 'FGV', name: 'IA em Sala de Aula' },
  { school: 'Santander', name: 'Fundamentos do ChatGPT' },
  { school: 'Santander', name: 'Prompting Responsável' },
]

export const availability = [
  { label: 'Inglês', value: 'Intermediário' },
  { label: 'Espanhol', value: 'Intermediário' },
  { label: 'Base', value: 'Valparaíso de Goiás, GO · entorno de Brasília' },
  { label: 'Mobilidade', value: 'Disponível para viagens e mudança para qualquer país' },
]
