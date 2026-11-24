import spendnote from '/assets/spendnote.webp'
import devburguer from '/assets/dev-burguer.webp'
import iphone from '/assets/iphone17.webp'
import wagner from '/assets/wagner-adv.webp'
import lecion from '/assets/lecion.webp'
import digytron from '/assets/digytron.webp'

export const profile = {
  name: 'João Neto',
  role: 'Desenvolvedor Full Stack & Engenheiro de IA',
  shortRole: 'Full Stack & IA',
  whatsappUrl: 'https://contate.me/5561986366632',
  resumeUrl: '/docs/joao-neto-curriculo.pdf',
  email: 'joaonetodevops@gmail.com',
}

export const navLinks = [
  { label: 'Início', href: '#home' },
  { label: 'Sobre', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projetos', href: '#projects' },
  { label: 'Contato', href: '#contact' },
]

export const socialLinks = [
  {
    label: 'GitHub',
    href: 'https://github.com/Dev-JoaoNeto',
    className: 'text-zinc-300!',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/joao-neto-dev/',
    className: 'text-blue-400!',
  },
  {
    label: 'E-mail',
    href: 'https://mail.google.com/mail/?view=cm&fs=1&to=joaonetodevops@gmail.com',
    className: 'text-red-500!',
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
    group: 'Inteligência Artificial',
    caption: 'Do dado ao agente em produção: contexto, modelo, ferramentas e avaliação',
    items: [
      { name: 'LLMs e APIs de IA', icon: icon.llm },
      { name: 'Agentes de IA', icon: icon.agent },
      { name: 'RAG e embeddings', icon: icon.rag },
      { name: 'Fine-tuning', icon: icon.finetune },
      { name: 'MCP', icon: icon.mcp },
      { name: 'Skills de agente', icon: icon.aiSkills },
      { name: 'Evals e guardrails', icon: icon.evals },
      { name: 'Engenharia de prompt e contexto', icon: icon.prompt },
      { name: 'Claude', icon: icon.claude },
      { name: 'Gemini', icon: icon.gemini },
      { name: 'n8n', icon: icon.n8n },
    ],
  },
  {
    group: 'Front-end',
    caption: 'Interface, responsividade e experiência',
    items: [
      { name: 'JavaScript', icon: icon.javascript },
      { name: 'TypeScript', icon: icon.typescript },
      { name: 'React', icon: icon.react },
      { name: 'Next.js', icon: icon.next },
      { name: 'Tailwind', icon: icon.tailwind },
      { name: 'React Native', icon: icon.react },
      { name: 'Expo', icon: icon.expo },
      { name: 'Web Responsiva', icon: icon.responsive },
    ],
  },
  {
    group: 'Back-end e dados',
    caption: 'APIs, persistência e integrações',
    items: [
      { name: 'Node.js', icon: icon.node },
      { name: 'APIs RESTful', icon: icon.rest },
      { name: 'SQL', icon: icon.sql },
      { name: 'NoSQL', icon: icon.nosql },
      { name: 'Firebase', icon: icon.firebase },
      { name: 'Supabase', icon: icon.supabase },
      { name: 'Stripe', icon: icon.stripe },
      { name: 'Docker', icon: icon.docker },
    ],
  },
  {
    group: 'Ferramentas',
    caption: 'Versionamento, design e publicação',
    items: [
      { name: 'Git', icon: icon.git },
      { name: 'GitHub', icon: icon.github },
      { name: 'Figma', icon: icon.figma },
      { name: 'WordPress', icon: icon.wordpress },
    ],
  },
]

export type Project = {
  title: string
  tagline: string
  description: string
  stack: string[]
  repoUrl?: string
  liveUrl: string
  imageUrl?: string
  imageFit?: 'cover' | 'contain'
}

export const projects: Project[] = [
  {
    title: 'SpendNote',
    tagline: 'Finanças pessoais em tempo real',
    description:
      'Aplicação full stack de controle financeiro: lançamento de receitas e despesas, categorização e um dashboard que atualiza saldo, histórico mensal e distribuição por categoria em tempo real.',
    stack: ['React', 'TypeScript', 'Tailwind', 'Node.js', 'Firebase'],
    repoUrl: 'https://github.com/dev-joaoneto/spendnote-api',
    liveUrl: 'https://spendnote.digytron.com/',
    imageUrl: spendnote,
  },
  {
    title: 'Dev&Grill',
    tagline: 'E-commerce com pagamento e painel',
    description:
      'Sistema completo de pedidos online para hamburgueria: catálogo, carrinho e checkout com Stripe do lado do cliente, e painel administrativo para acompanhar e mudar o status de cada pedido.',
    stack: ['React', 'styled-components', 'Axios', 'Node.js', 'Stripe'],
    liveUrl: 'https://devburguer.digytron.com/login',
    imageUrl: devburguer,
  },
  {
    title: 'Digytron',
    tagline: 'Site institucional e jornada comercial',
    description:
      'Site institucional da Digytron, apresentando posicionamento, ecossistemas, planos e cases numa jornada pensada para transformar visita em conversa comercial — com animação e visualização de dados como parte da narrativa.',
    stack: ['React', 'TypeScript', 'Tailwind', 'Framer Motion', 'D3.js'],
    liveUrl: 'https://digytron.com.br/',
    imageUrl: digytron,
  },
  {
    title: 'Digytron Lecion',
    tagline: 'Plataforma educacional com IA generativa',
    description:
      'Plataforma de IA generativa que apoia professores na criação de provas, planos de aula e materiais didáticos em segundos. Integra modelos de linguagem ao fluxo do professor, com experiência responsiva e jornada de assinatura.',
    stack: ['React', 'TypeScript', 'IA generativa', 'Supabase', 'Stripe'],
    liveUrl: 'https://lecion.digytron.com/',
    imageUrl: lecion,
  },
  {
    title: 'Wagner Simões Advogados',
    tagline: 'Site institucional de advocacia',
    description:
      'Site de um escritório com atuação em Direito Médico, Penal, Imobiliário e Público. Estrutura visual sóbria, conteúdo organizado por área de atuação e caminhos de contato pensados para qualificar quem chega.',
    stack: ['React', 'TypeScript'],
    liveUrl: 'https://wagnersimoesadv.com.br/',
    imageUrl: wagner,
  },
  {
    title: 'iPhone 17',
    tagline: 'Landing page de produto',
    description:
      'Landing page estática de apresentação de produto, com foco em impacto visual, tipografia, imagens de alta qualidade e layout responsivo que se mantém leve em navegadores modernos.',
    stack: ['React', 'Vite', 'Tailwind'],
    liveUrl: 'https://dev-joaoneto.github.io/projeto-iphone17/',
    imageUrl: iphone,
  },
]
