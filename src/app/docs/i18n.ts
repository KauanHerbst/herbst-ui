export type Locale = 'en' | 'pt';

export const DEFAULT_LOCALE: Locale = 'en';

export type Dict = Record<string, string>;

export const MESSAGES: Record<Locale, Dict> = {
  en: {
    'nav.docs': 'Docs',
    'nav.components': 'Components',
    'nav.theme': 'Theme',
    'nav.colors': 'Colors',

    'search.trigger': 'Search…',
    'search.placeholder': 'Search the documentation…',
    'search.pages': 'Pages',
    'search.components': 'Components',
    'search.empty': 'No results found.',

    'a11y.skip': 'Skip to content',
    'a11y.menu': 'Open menu',
    'a11y.theme': 'Toggle dark mode',
    'a11y.language': 'Language',
    'a11y.mainNav': 'Main',
    'a11y.docsNav': 'Documentation',
    'doc.error': 'This page could not be loaded. It may have drifted away with the wind.',
    'notfound.title': 'Page not found',
    'notfound.desc': 'The leaf you are looking for has already fallen.',
    'notfound.back': 'Back to the start',
    'meta.description':
      'More than 65 open source Angular components with the colors of a German autumn. Built with signals, easy to theme and copied into your project.',

    'group.gettingStarted': 'Getting Started',
    'group.styling': 'Styling',
    'group.components': 'Components',

    'page.introduction': 'Introduction',
    'page.installation': 'Installation',
    'page.cli': 'CLI',
    'page.dark-mode': 'Dark mode',
    'page.contributing': 'Contributing',
    'page.theme': 'Theme',
    'page.colors': 'Colors',

    'toc.title': 'On this page',
    'footer.docs': 'Docs',
    'footer.components': 'Components',

    'index.eyebrow': 'Herbst UI · Catalogue',
    'index.title': 'Components',
    'index.desc': 'Each component is a mounted specimen. Pick one to read its examples and API.',

    'colors.eyebrow': 'Styling',
    'colors.title': 'Colors',
    'colors.desc':
      'The palette comes from an autumn in Central Europe: gold and rust leaves, bare branches and a grey sky. The swatches read the current theme, so they follow light and dark mode.',
    'colors.group.surfaces': 'Surfaces & ink',
    'colors.group.accent': 'Accent',
    'colors.group.status': 'Status',

    'theme.eyebrow': 'Styling',
    'theme.title': 'Theme',
    'theme.intro':
      'The whole look of Herbst lives in one file of CSS variables. Every component reads these semantic tokens, so changing them updates the whole library at once and lets you make the palette your own.',
    'theme.h2.tokens': 'The token system',
    'theme.tokens.desc':
      'Tokens are defined in oklch under :root and redefined under .dark. The table reads from the live theme, so each swatch follows the current mode.',
    'theme.h2.editing': 'Editing the theme',
    'theme.editing.desc':
      'Open theme.css and change any value, like a warmer accent, a cooler background or a different radius. The change reaches all 68 components.',
    'theme.h2.rest': 'Radius, fonts and shadows',
    'theme.rest.desc':
      'The base radius is small and crisp. Type is a serif for headings, a grotesque for body, and a monospace for labels and code. Elevation is carried by hairline borders.',

    'doc.eyebrow': 'Component',
    'placeholder.body':
      'Documentation for this component is on the way. Its examples and API reference will be generated from the component source files.',
    'placeholder.back': '← Back to all components',
    'pager.prev': 'Previous',
    'pager.next': 'Next',
    'api.reference': 'API reference',
    'api.property': 'Property',
    'api.description': 'Description',
    'api.type': 'Type',
    'api.default': 'Default',

    'landing.hero.title': 'Bring Autumn Into Your Project',
    'landing.hero.desc':
      'More than 65 Angular components with the colors of a German autumn. Install with the CLI, get the code in your project and change whatever you want.',
    'landing.hero.start': 'Get started',
    'landing.hero.view': 'View components',
    'landing.hero.arrived': 'Autumn has arrived!',
    'landing.hero.season': 'Your project, now in the best season of the year',
    'landing.hero.scroll': 'the components below',
    'landing.install.eyebrow': 'Get started',
    'landing.install.title': 'Ready in minutes, not days.',
    'landing.install.desc':
      'One CLI command copies a component into your project. The code is yours, already typed, accessible and using the theme.',
    'landing.install.read': 'Read the docs',
    'landing.install.copy': 'Copy',
    'landing.install.copied': 'Copied',
    'landing.install.mounted': '✓ 3 components added to src/app/shared/ui',
    'landing.install.catalogued': 'button, calendar and command ready to import',
    'landing.spec.eyebrow': 'Live components',
    'landing.spec.title': 'Every component, live on the page.',
    'landing.spec.desc':
      'A sample of the library to try right here: click, toggle and type. The examples run the real code, and the docs have every detail.',
    'landing.spec.browse': 'Browse all components',
    'landing.theme.eyebrow': 'Theming',
    'landing.theme.title': 'Paper by day, Dusk by night.',
    'landing.theme.desc':
      'Every color and size lives in one file, theme.css, as oklch CSS variables on Tailwind v4. Change a value and every component follows, in light and dark mode.',
    'landing.theme.view': 'Explore the theme',
    'landing.build.eyebrow': 'Build',
    'landing.build.title': 'Build interfaces with little code.',
    'landing.build.desc':
      'Import the component, add the selector to your template and you are done. Typed inputs, signals and accessibility come built in. The code on the side renders exactly what you see below it.',
    'landing.build.preview': 'Preview',
    'landing.build.start': 'Start building',
    'landing.cta.eyebrow': 'Open source',
    'landing.cta.title': 'Build Herbst UI with us.',
    'landing.cta.desc':
      'Herbst UI is open source. Open an issue, contribute a component or star the repository to follow the updates.',
    'landing.cta.star': 'Star on GitHub',
    'landing.github.hint': 'Herbst UI lives here. Issues and PRs are welcome.',
    'landing.cta.contributing': 'Contributing guide',
    'landing.footer.tagline': 'Angular interface components in the warm light of a German autumn.',
    'landing.footer.docs': 'Docs',
    'landing.footer.library': 'Library',
    'landing.footer.community': 'Community',
    'landing.footer.introduction': 'Introduction',
    'landing.footer.cli': 'CLI',
    'landing.footer.blocks': 'Blocks',
    'landing.footer.changelog': 'Changelog',
    'landing.footer.github': 'GitHub',
    'landing.footer.issues': 'Issues',
    'landing.footer.discussions': 'Discussions',
    'landing.footer.copyright': 'MIT © 2026 Herbst UI',
    'landing.footer.credit': 'Developed by Kauan Herbst 🧡',
  },
  pt: {
    'nav.docs': 'Docs',
    'nav.components': 'Componentes',
    'nav.theme': 'Tema',
    'nav.colors': 'Cores',

    'search.trigger': 'Buscar…',
    'search.placeholder': 'Buscar na documentação…',
    'search.pages': 'Páginas',
    'search.components': 'Componentes',
    'search.empty': 'Nenhum resultado.',

    'a11y.skip': 'Pular para o conteúdo',
    'a11y.menu': 'Abrir menu',
    'a11y.theme': 'Alternar modo escuro',
    'a11y.language': 'Idioma',
    'a11y.mainNav': 'Principal',
    'a11y.docsNav': 'Documentação',
    'doc.error': 'Não foi possível carregar esta página. Ela pode ter voado com o vento.',
    'notfound.title': 'Página não encontrada',
    'notfound.desc': 'A folha que você procura já caiu.',
    'notfound.back': 'Voltar ao início',
    'meta.description':
      'Mais de 65 componentes Angular open source com as cores de um outono alemão. Feitos com signals, fáceis de tematizar e copiados para o seu projeto.',

    'group.gettingStarted': 'Primeiros passos',
    'group.styling': 'Estilo',
    'group.components': 'Componentes',

    'page.introduction': 'Introdução',
    'page.installation': 'Instalação',
    'page.cli': 'CLI',
    'page.dark-mode': 'Modo escuro',
    'page.contributing': 'Contribuição',
    'page.theme': 'Tema',
    'page.colors': 'Cores',

    'toc.title': 'Nesta página',
    'footer.docs': 'Docs',
    'footer.components': 'Componentes',

    'index.eyebrow': 'Herbst UI · Catálogo',
    'index.title': 'Componentes',
    'index.desc': 'Cada componente é um espécime montado. Escolha um para ver os exemplos e a API.',

    'colors.eyebrow': 'Estilo',
    'colors.title': 'Cores',
    'colors.desc':
      'A paleta vem de um outono no centro da Europa: folhas douradas e cor de ferrugem, galhos secos e céu cinza. As amostras leem o tema atual, então acompanham os modos claro e escuro.',
    'colors.group.surfaces': 'Superfícies & tinta',
    'colors.group.accent': 'Acento',
    'colors.group.status': 'Status',

    'theme.eyebrow': 'Estilo',
    'theme.title': 'Tema',
    'theme.intro':
      'Todo o visual do Herbst fica em um único arquivo de variáveis CSS. Todo componente lê esses tokens semânticos, então mudar um valor atualiza a biblioteca inteira de uma vez e deixa a paleta com a sua cara.',
    'theme.h2.tokens': 'O sistema de tokens',
    'theme.tokens.desc':
      'Os tokens são definidos em oklch sob :root e redefinidos sob .dark. A tabela lê o tema ao vivo, então cada amostra acompanha o modo atual.',
    'theme.h2.editing': 'Editando o tema',
    'theme.editing.desc':
      'Abra o theme.css e mude qualquer valor, como um destaque mais quente, um fundo mais frio ou outro radius. A mudança chega aos 68 componentes.',
    'theme.h2.rest': 'Radius, fontes e sombras',
    'theme.rest.desc':
      'O radius base é pequeno e nítido. A tipografia é uma serifa para títulos, uma grotesca para o corpo e uma monoespaçada para rótulos e código. A elevação vem das bordas hairline.',

    'doc.eyebrow': 'Componente',
    'placeholder.body':
      'A documentação deste componente está a caminho. Seus exemplos e a referência de API serão gerados a partir dos arquivos-fonte do componente.',
    'placeholder.back': '← Voltar para todos os componentes',
    'pager.prev': 'Anterior',
    'pager.next': 'Próximo',
    'api.reference': 'Referência de API',
    'api.property': 'Propriedade',
    'api.description': 'Descrição',
    'api.type': 'Tipo',
    'api.default': 'Padrão',

    'landing.hero.title': 'Leve o Outono Para o seu Projeto',
    'landing.hero.desc':
      'Mais de 65 componentes Angular com as cores de um outono alemão. Instale pela CLI, receba o código no seu projeto e mude o que quiser.',
    'landing.hero.start': 'Começar',
    'landing.hero.view': 'Ver componentes',
    'landing.hero.arrived': 'O outono chegou!',
    'landing.hero.season': 'Seu projeto agora na melhor estação do ano',
    'landing.hero.scroll': 'os componentes abaixo',
    'landing.install.eyebrow': 'Começar',
    'landing.install.title': 'Pronto em minutos, não em dias.',
    'landing.install.desc':
      'Um comando da CLI copia o componente para o seu projeto. O código fica com você, já tipado, acessível e com o tema aplicado.',
    'landing.install.read': 'Ler a documentação',
    'landing.install.copy': 'Copiar',
    'landing.install.copied': 'Copiado',
    'landing.install.mounted': '✓ 3 componentes adicionados em src/app/shared/ui',
    'landing.install.catalogued': 'button, calendar e command prontos para importar',
    'landing.spec.eyebrow': 'Componentes ao vivo',
    'landing.spec.title': 'Cada componente, ao vivo na página.',
    'landing.spec.desc':
      'Uma amostra da biblioteca para testar aqui mesmo: clique, alterne e digite. Os exemplos usam o código real, e a documentação traz todos os detalhes.',
    'landing.spec.browse': 'Ver todos os componentes',
    'landing.theme.eyebrow': 'Tema',
    'landing.theme.title': 'Paper de dia, Dusk à noite.',
    'landing.theme.desc':
      'Todas as cores e medidas ficam em um único arquivo, o theme.css, com variáveis CSS em oklch no Tailwind v4. Mude um valor e todos os componentes acompanham, no modo claro e no escuro.',
    'landing.theme.view': 'Explorar o tema',
    'landing.build.eyebrow': 'Construir',
    'landing.build.title': 'Monte interfaces com pouco código.',
    'landing.build.desc':
      'Importe o componente, coloque o seletor no template e pronto. Inputs tipados, signals e acessibilidade já vêm incluídos. O código ao lado gera exatamente o que aparece embaixo dele.',
    'landing.build.preview': 'Prévia',
    'landing.build.start': 'Começar a construir',
    'landing.cta.eyebrow': 'Open source',
    'landing.cta.title': 'Construa o Herbst UI com a gente.',
    'landing.cta.desc':
      'O Herbst UI é open source. Abra uma issue, contribua com um componente ou dê uma estrela no repositório para acompanhar as novidades.',
    'landing.cta.star': 'Estrela no GitHub',
    'landing.github.hint': 'O Herbst UI fica aqui. Issues e PRs são bem-vindos.',
    'landing.cta.contributing': 'Guia de contribuição',
    'landing.footer.tagline': 'Componentes de interface Angular na luz quente de um outono alemão.',
    'landing.footer.docs': 'Docs',
    'landing.footer.library': 'Biblioteca',
    'landing.footer.community': 'Comunidade',
    'landing.footer.introduction': 'Introdução',
    'landing.footer.cli': 'CLI',
    'landing.footer.blocks': 'Blocks',
    'landing.footer.changelog': 'Changelog',
    'landing.footer.github': 'GitHub',
    'landing.footer.issues': 'Issues',
    'landing.footer.discussions': 'Discussões',
    'landing.footer.copyright': 'MIT © 2026 Herbst UI',
    'landing.footer.credit': 'Desenvolvido por Kauan Herbst 🧡',
  },
};
