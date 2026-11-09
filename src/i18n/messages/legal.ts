import { defineMessages } from "@/i18n";

// Cookie banner, footer links and the privacy & cookies page.
// This text is a starting point: have it reviewed before relying on it legally.
export const legalMessages = defineMessages({
  pt: {
    banner: {
      label: "Aviso de cookies",
      title: "Cookies",
      text: "Usamos apenas cookies essenciais (idioma, segurança do formulário e esta escolha). Não usamos cookies de publicidade.",
      more: "Política de privacidade",
      accept: "Aceitar",
      essential: "Apenas essenciais",
    },
    footer: { privacy: "Privacidade e cookies", settings: "Definições de cookies" },
    meta: {
      title: "Política de Privacidade e Cookies — Coach Viola",
      description: "Como o Coach Viola trata os teus dados pessoais e que cookies usa este site.",
    },
    title: "Política de Privacidade e Cookies",
    updated: "Última atualização: 9 de novembro de 2026",
    intro:
      "Respeitamos a tua privacidade. Aqui explicamos que dados recolhemos, porquê, com quem os partilhamos e quais são os teus direitos.",
    sections: [
      {
        heading: "Quem somos",
        body: [
          "Este site é gerido por João Viola (Coach Viola). Para qualquer questão sobre dados pessoais, usa o formulário de contacto do site.",
        ],
        list: [],
      },
      {
        heading: "Que dados recolhemos",
        body: [
          "Só recolhemos os dados que nos envias ou que são necessários para o site funcionar:",
        ],
        list: [
          "Formulário de contacto: nome, e-mail, idade, género, nível de natação, tempo de 100 m livres, assunto e mensagem.",
          "Dados técnicos enviados com o formulário: endereço IP, navegador, idioma e página de origem (para segurança e prevenção de spam).",
          "Preferências guardadas no teu navegador: idioma e escolha de cookies.",
        ],
      },
      {
        heading: "Para que usamos os dados",
        body: [
          "Usamos os dados do formulário para responder ao teu pedido e, se for o caso, preparar a nossa proposta de treino ou aulas. A base legal é o teu consentimento e a execução de diligências pré-contratuais a teu pedido. Os dados técnicos são usados com base no nosso interesse legítimo em manter o site seguro.",
        ],
        list: [],
      },
      {
        heading: "Com quem partilhamos",
        body: ["Não vendemos os teus dados. Usamos prestadores que os tratam por nossa conta:"],
        list: [
          "Fornecedor de e-mail (para te entregar a mensagem a nós e as nossas respostas).",
          "Cloudflare Turnstile (verificação anti-spam no formulário de contacto).",
          "Google Fonts e FlagCDN (tipos de letra e bandeiras; recebem o teu IP ao carregar a página).",
          "Alojamento do site e da API.",
        ],
      },
      {
        heading: "Quanto tempo guardamos",
        body: [
          "Guardamos os dados apenas durante o tempo necessário para responder ao teu pedido e acompanhar a relação que daí resultar, ou enquanto a lei o exigir. Depois, são apagados.",
        ],
        list: [],
      },
      {
        heading: "Os teus direitos",
        body: [
          "Podes pedir acesso, retificação, apagamento, limitação, oposição e portabilidade dos teus dados, e retirar o consentimento a qualquer momento, através do formulário de contacto. Tens também o direito de apresentar reclamação à autoridade de controlo: a CNPD (cnpd.pt), em Portugal.",
        ],
        list: [],
      },
    ],
    cookies: {
      heading: "Cookies",
      intro:
        "Cookies são pequenos ficheiros guardados no teu navegador. Este site usa apenas cookies essenciais, que não precisam de consentimento. Não usamos cookies de análise nem de publicidade.",
      columns: { name: "Nome", purpose: "Finalidade", duration: "Duração" },
      rows: [
        { name: "lang", purpose: "Lembra o idioma escolhido.", duration: "1 ano" },
        {
          name: "cookie_consent",
          purpose: "Lembra a tua escolha sobre cookies.",
          duration: "6 meses",
        },
        {
          name: "Cloudflare Turnstile",
          purpose:
            "Segurança do formulário de contacto (anti-spam). Pode definir cookies próprios.",
          duration: "Sessão",
        },
      ],
      manage: "Alterar a minha escolha",
    },
  },
  en: {
    banner: {
      label: "Cookie notice",
      title: "Cookies",
      text: "We only use essential cookies (language, form security and this choice). We don't use advertising cookies.",
      more: "Privacy policy",
      accept: "Accept",
      essential: "Essential only",
    },
    footer: { privacy: "Privacy & cookies", settings: "Cookie settings" },
    meta: {
      title: "Privacy & Cookies Policy — Coach Viola",
      description: "How Coach Viola handles your personal data and which cookies this site uses.",
    },
    title: "Privacy & Cookies Policy",
    updated: "Last updated: 9 November 2026",
    intro:
      "We respect your privacy. Here we explain what data we collect, why, who we share it with and what your rights are.",
    sections: [
      {
        heading: "Who we are",
        body: [
          "This site is run by João Viola (Coach Viola). For any question about personal data, use the site's contact form.",
        ],
        list: [],
      },
      {
        heading: "What data we collect",
        body: ["We only collect the data you send us or that is needed for the site to work:"],
        list: [
          "Contact form: name, e-mail, age, gender, swim level, 100 m freestyle time, topic and message.",
          "Technical data sent with the form: IP address, browser, language and originating page (for security and spam prevention).",
          "Preferences saved in your browser: language and cookie choice.",
        ],
      },
      {
        heading: "What we use the data for",
        body: [
          "We use the form data to answer your request and, where relevant, prepare our training or lessons proposal. The legal basis is your consent and steps taken at your request before entering a contract. Technical data is used on the basis of our legitimate interest in keeping the site secure.",
        ],
        list: [],
      },
      {
        heading: "Who we share it with",
        body: ["We don't sell your data. We use providers who process it on our behalf:"],
        list: [
          "E-mail provider (to deliver your message to us and our replies to you).",
          "Cloudflare Turnstile (anti-spam check on the contact form).",
          "Google Fonts and FlagCDN (fonts and flags; they receive your IP when the page loads).",
          "Hosting of the site and the API.",
        ],
      },
      {
        heading: "How long we keep it",
        body: [
          "We keep the data only as long as needed to answer your request and handle any relationship that follows, or as long as the law requires. After that it is deleted.",
        ],
        list: [],
      },
      {
        heading: "Your rights",
        body: [
          "You can ask for access, correction, deletion, restriction, objection and portability of your data, and withdraw your consent at any time, through the contact form. You may also complain to the supervisory authority: the CNPD (cnpd.pt) in Portugal.",
        ],
        list: [],
      },
    ],
    cookies: {
      heading: "Cookies",
      intro:
        "Cookies are small files stored in your browser. This site only uses essential cookies, which don't need consent. We don't use analytics or advertising cookies.",
      columns: { name: "Name", purpose: "Purpose", duration: "Duration" },
      rows: [
        { name: "lang", purpose: "Remembers the language you chose.", duration: "1 year" },
        { name: "cookie_consent", purpose: "Remembers your cookie choice.", duration: "6 months" },
        {
          name: "Cloudflare Turnstile",
          purpose: "Contact form security (anti-spam). May set its own cookies.",
          duration: "Session",
        },
      ],
      manage: "Change my choice",
    },
  },
  es: {
    banner: {
      label: "Aviso de cookies",
      title: "Cookies",
      text: "Solo usamos cookies esenciales (idioma, seguridad del formulario y esta elección). No usamos cookies de publicidad.",
      more: "Política de privacidad",
      accept: "Aceptar",
      essential: "Solo esenciales",
    },
    footer: { privacy: "Privacidad y cookies", settings: "Ajustes de cookies" },
    meta: {
      title: "Política de Privacidad y Cookies — Coach Viola",
      description: "Cómo trata Coach Viola tus datos personales y qué cookies usa este sitio.",
    },
    title: "Política de Privacidad y Cookies",
    updated: "Última actualización: 9 de noviembre de 2026",
    intro:
      "Respetamos tu privacidad. Aquí explicamos qué datos recogemos, por qué, con quién los compartimos y cuáles son tus derechos.",
    sections: [
      {
        heading: "Quiénes somos",
        body: [
          "Este sitio lo gestiona João Viola (Coach Viola). Para cualquier cuestión sobre datos personales, usa el formulario de contacto del sitio.",
        ],
        list: [],
      },
      {
        heading: "Qué datos recogemos",
        body: [
          "Solo recogemos los datos que nos envías o que son necesarios para que el sitio funcione:",
        ],
        list: [
          "Formulario de contacto: nombre, e-mail, edad, género, nivel de natación, tiempo de 100 m libres, asunto y mensaje.",
          "Datos técnicos enviados con el formulario: dirección IP, navegador, idioma y página de origen (por seguridad y prevención de spam).",
          "Preferencias guardadas en tu navegador: idioma y elección de cookies.",
        ],
      },
      {
        heading: "Para qué usamos los datos",
        body: [
          "Usamos los datos del formulario para responder a tu solicitud y, en su caso, preparar nuestra propuesta de entrenamiento o clases. La base legal es tu consentimiento y la aplicación de medidas precontractuales a petición tuya. Los datos técnicos se usan por nuestro interés legítimo en mantener el sitio seguro.",
        ],
        list: [],
      },
      {
        heading: "Con quién los compartimos",
        body: ["No vendemos tus datos. Usamos proveedores que los tratan por nuestra cuenta:"],
        list: [
          "Proveedor de e-mail (para entregarnos tu mensaje y enviarte nuestras respuestas).",
          "Cloudflare Turnstile (verificación antispam en el formulario de contacto).",
          "Google Fonts y FlagCDN (tipografías y banderas; reciben tu IP al cargar la página).",
          "Alojamiento del sitio y de la API.",
        ],
      },
      {
        heading: "Cuánto tiempo los guardamos",
        body: [
          "Guardamos los datos solo el tiempo necesario para responder a tu solicitud y atender la relación que de ella resulte, o mientras la ley lo exija. Después se eliminan.",
        ],
        list: [],
      },
      {
        heading: "Tus derechos",
        body: [
          "Puedes solicitar acceso, rectificación, supresión, limitación, oposición y portabilidad de tus datos, y retirar tu consentimiento en cualquier momento, a través del formulario de contacto. También puedes presentar una reclamación ante la autoridad de control: la CNPD (cnpd.pt) en Portugal.",
        ],
        list: [],
      },
    ],
    cookies: {
      heading: "Cookies",
      intro:
        "Las cookies son pequeños archivos guardados en tu navegador. Este sitio solo usa cookies esenciales, que no requieren consentimiento. No usamos cookies de análisis ni de publicidad.",
      columns: { name: "Nombre", purpose: "Finalidad", duration: "Duración" },
      rows: [
        { name: "lang", purpose: "Recuerda el idioma elegido.", duration: "1 año" },
        {
          name: "cookie_consent",
          purpose: "Recuerda tu elección sobre cookies.",
          duration: "6 meses",
        },
        {
          name: "Cloudflare Turnstile",
          purpose:
            "Seguridad del formulario de contacto (antispam). Puede definir cookies propias.",
          duration: "Sesión",
        },
      ],
      manage: "Cambiar mi elección",
    },
  },
});
