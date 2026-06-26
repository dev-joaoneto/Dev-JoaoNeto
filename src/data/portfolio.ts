import spendnote from '/assets/spendnote.png'
import devburguer from '/assets/Dev-grill.png'
import iphone from '/assets/Dev-iphone.png'
import wagner from '/assets/wagneradv.png'
import digytron from '/assets/digytron.png'

export const navLinks = [
  { label: 'Inicio', href: '#home' },
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
    label: 'Email',
    href: 'mailto:joaonetodevops@gmail.com',
    className: 'text-red-500!',
  },
]

export const skills = [
  {
    group: 'Habilidades',
    items: [
      {
        name: 'JavaScript',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
      },
      {
        name: 'TypeScript',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
      },
      {
        name: 'React',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
      },
      {
        name: 'Next.js',
        icon: 'https://cdn.simpleicons.org/nextdotjs/ffffff',
      },
      {
        name: 'Expo',
        icon: 'https://cdn.simpleicons.org/expo/ffffff',
      },
      {
        name: 'React Native',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
      },
      {
        name: 'Web Responsiva',
        icon: 'https://api.iconify.design/material-symbols:responsive-layout-outline.svg?color=white',
      },
      {
        name: 'WordPress',
        icon: 'https://cdn.simpleicons.org/wordpress/21759B',
      },
      {
        name: 'Figma',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',
      },
      {
        name: 'Node.js',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
      },
      {
        name: 'Firebase',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg',
      },
      {
        name: 'APIs RESTful',
        icon: 'https://cdn.simpleicons.org/openapiinitiative/6BA539',
      },
      {
        name: 'SQL',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
      },
      {
        name: 'NoSQL',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
      },
      {
        name: 'Docker',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
      },
      {
        name: 'Git',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
      },
      {
        name: 'GitHub',
        icon: 'https://cdn.simpleicons.org/github/ffffff',
      },
      {
        name: 'n8n',
        icon: 'https://cdn.simpleicons.org/n8n/EA4B71',
      },
    ],
  },
]

export const projects = [
  {
    title: 'SpendNote',
    description:
      'SpendNote é uma aplicação full stack desenvolvida para gerenciamento de finanças pessoais, permitindo o controle completo de receitas, despesas e análise financeira em tempo real.',
    stack: ['React', 'TypeScript', 'Tailwind', 'Node.js', 'Firebase'],
    repoUrl: 'https://github.com/dev-joaoneto/spendnote-api.git',
    liveUrl: 'https://spendnote-frontend.xgg4n8.easypanel.host/',
    imageUrl: spendnote,
  },
  {
    title: 'Dev Burguer',
    description:
      'Dev Burguer é uma aplicação full stack desenvolvida para simular um sistema completo de pedidos online para uma hamburgueria, contemplando desde a experiência do usuário final até o gerenciamento administrativo dos pedidos.',
    stack: ['React', 'Axios', 'styled-components', 'Node.js', 'Stripe'],
    repoUrl: '#',
    liveUrl: 'https://dev-burguer-frontend.xgg4n8.easypanel.host/',
    imageUrl: devburguer,
  },
  {
    title: 'iPhone17',
    description:
      'O Projeto iPhone17 é uma landing page estática de apresentação de produto, desenvolvida com foco em experiência visual, layout responsivo e performance em navegadores modernos. Inspirada em dispositivos tecnológicos de última geração, com ênfase em organização de conteúdo, tipografia e uso de imagens de alta qualidade.',
    stack: ['React', 'Vite', 'Tailwind'],
    repoUrl: '#',
    liveUrl: 'https://dev-joaoneto.github.io/projeto-iphone17/',
    imageUrl: iphone,
  },
  {
    title: 'Advocacia',
    description:
      'O projeto Wagner Simões Advogados Associados é um site institucional desenvolvido para um escritório de advocacia com atuação em demandas sensíveis nas áreas de Direito Médico, Penal, Imobiliário e Público. O projeto prioriza uma experiência responsiva, estrutura visual sóbria, comunicação objetiva e organização de conteúdo voltada à conversão de visitantes em contatos qualificados.',
    stack: ['React', 'TypeScript'],
    repoUrl: '#',
    liveUrl: 'https://wagnersimoesadv.com.br/',
    imageUrl: wagner,
  },
  {
    title: 'Digytron Lecion',
    description:
      'A Digytron Lecion é uma plataforma educacional com inteligência artificial desenvolvida para apoiar professores na criação de provas, planos de aula, listas de exercícios e materiais didáticos. O projeto foi construído com foco em experiência responsiva, comunicação clara, apresentação de recursos premium e uma jornada de conversão voltada para professores, escolas e redes de ensino.',
    stack: ['React', 'TypeScript', 'Tailwind', 'Supabase', 'Stripe'],
    repoUrl: '#',
    liveUrl: 'https://lecion.digytron.com/',
    imageUrl: digytron,
  },
]
