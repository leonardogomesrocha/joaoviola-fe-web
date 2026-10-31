import { defineMessages } from "@/i18n";

export type Testimonial = {
  name: string;
  /** e.g. "Triatleta" — optional context shown under the name. */
  role: string;
  text: string;
  /** Placeholder entries show an "Exemplo" badge so they're never mistaken for real reviews. */
  placeholder?: boolean;
};

export const privateLessonsMessages = defineMessages({
  pt: {
    meta: {
      title: "Aulas Particulares — Grupo Viola",
      description:
        "Aulas particulares de natação em piscina e águas abertas com o treinador João Viola.",
    },
    hero: {
      eyebrow: "Piscina · Águas abertas",
      title: "Aulas Particulares",
      intro:
        "Sessões individuais de natação adaptadas ao teu nível e aos teus objetivos, com acompanhamento direto do treinador João Viola.",
    },
    offer: {
      label: "O que vais receber",
      headline: "Para seres um nadador mais rápido,",
      highlight: "a tua técnica tem de ser eficiente.",
      lead: "Junta-te às aulas particulares e melhora a tua natação com acompanhamento individual, levando a tua técnica para o próximo nível.",
      paragraphs: [
        "Quer sejas principiante, nadador de competição, nadador de águas abertas ou triatleta, ofereço sessões individuais personalizadas para aperfeiçoar as tuas habilidades e partilhar todas as minhas dicas.",
        "Cada sessão começa com uma conversa para perceber os teus objetivos, seguida de 60 minutos de treino com exercícios de técnica, feedback em tempo real e análise de vídeo. No que vamos trabalhar:",
      ],
      lists: [
        {
          title: "Técnica de crawl:",
          items: ["A captura", "O cotovelo alto", "A impulsão", "A rotação do corpo e ombros"],
        },
        {
          title: "Exercícios de águas abertas:",
          items: ["Avistamento", "Viragem nas boias", "Drafting"],
        },
      ],
      tiles: ["Sessão Individual", "Análise de Vídeo", "Dicas e Truques", "Feedback em Tempo Real"],
    },
    testimonials: {
      label: "Testemunhos",
      title: "O que dizem os alunos",
      exampleBadge: "Exemplo",
      items: [
        {
          name: "Nome do aluno",
          role: "Triatleta",
          text: "Substitui este texto pelo testemunho real de um aluno sobre as aulas particulares.",
          placeholder: true,
        },
        {
          name: "Nome do aluno",
          role: "Nadador de águas abertas",
          text: "Substitui este texto pelo testemunho real de um aluno sobre as aulas particulares.",
          placeholder: true,
        },
        {
          name: "Nome do aluno",
          role: "Principiante",
          text: "Substitui este texto pelo testemunho real de um aluno sobre as aulas particulares.",
          placeholder: true,
        },
      ] as Testimonial[],
    },
    contact: { title: "Marca a tua aula", text: "Fala connosco para combinar horário e local." },
  },
  en: {
    meta: {
      title: "Private Lessons — Grupo Viola",
      description: "Private swimming lessons in the pool and open water with coach João Viola.",
    },
    hero: {
      eyebrow: "Pool · Open water",
      title: "Private Lessons",
      intro:
        "One-to-one swimming sessions tailored to your level and goals, coached directly by João Viola.",
    },
    offer: {
      label: "What you'll get",
      headline: "To become a faster swimmer,",
      highlight: "your technique has to be efficient.",
      lead: "Join the private lessons and improve your swimming with one-to-one coaching that takes your technique to the next level.",
      paragraphs: [
        "Whether you're a beginner, a competitive swimmer, an open water swimmer or a triathlete, I offer personalised one-to-one sessions to sharpen your skills and share all my tips.",
        "Every session starts with a chat about your goals, followed by 60 minutes of training with technique drills, real-time feedback and video analysis. What we'll work on:",
      ],
      lists: [
        {
          title: "Front crawl technique:",
          items: ["The catch", "The high elbow", "The push", "Body and shoulder rotation"],
        },
        { title: "Open water skills:", items: ["Sighting", "Buoy turns", "Drafting"] },
      ],
      tiles: ["One-to-One Session", "Video Analysis", "Tips and Tricks", "Real-Time Feedback"],
    },
    testimonials: {
      label: "Testimonials",
      title: "What students say",
      exampleBadge: "Example",
      items: [
        {
          name: "Student name",
          role: "Triathlete",
          text: "Replace this text with a real student's testimonial about the private lessons.",
          placeholder: true,
        },
        {
          name: "Student name",
          role: "Open water swimmer",
          text: "Replace this text with a real student's testimonial about the private lessons.",
          placeholder: true,
        },
        {
          name: "Student name",
          role: "Beginner",
          text: "Replace this text with a real student's testimonial about the private lessons.",
          placeholder: true,
        },
      ] as Testimonial[],
    },
    contact: { title: "Book your lesson", text: "Get in touch to arrange a time and place." },
  },
  es: {
    meta: {
      title: "Clases Particulares — Grupo Viola",
      description:
        "Clases particulares de natación en piscina y aguas abiertas con el entrenador João Viola.",
    },
    hero: {
      eyebrow: "Piscina · Aguas abiertas",
      title: "Clases Particulares",
      intro:
        "Sesiones individuales de natación adaptadas a tu nivel y a tus objetivos, con seguimiento directo del entrenador João Viola.",
    },
    offer: {
      label: "Lo que vas a recibir",
      headline: "Para ser un nadador más rápido,",
      highlight: "tu técnica tiene que ser eficiente.",
      lead: "Apúntate a las clases particulares y mejora tu natación con un seguimiento individual que lleva tu técnica al siguiente nivel.",
      paragraphs: [
        "Tanto si eres principiante como nadador de competición, nadador de aguas abiertas o triatleta, ofrezco sesiones individuales personalizadas para perfeccionar tus habilidades y compartir todos mis consejos.",
        "Cada sesión empieza con una conversación para entender tus objetivos, seguida de 60 minutos de entrenamiento con ejercicios de técnica, feedback en tiempo real y análisis de vídeo. En qué vamos a trabajar:",
      ],
      lists: [
        {
          title: "Técnica de crol:",
          items: ["El agarre", "El codo alto", "El empuje", "La rotación del cuerpo y los hombros"],
        },
        {
          title: "Ejercicios de aguas abiertas:",
          items: ["Orientación", "Giro en las boyas", "Drafting"],
        },
      ],
      tiles: [
        "Sesión Individual",
        "Análisis de Vídeo",
        "Consejos y Trucos",
        "Feedback en Tiempo Real",
      ],
    },
    testimonials: {
      label: "Testimonios",
      title: "Lo que dicen los alumnos",
      exampleBadge: "Ejemplo",
      items: [
        {
          name: "Nombre del alumno",
          role: "Triatleta",
          text: "Sustituye este texto por el testimonio real de un alumno sobre las clases particulares.",
          placeholder: true,
        },
        {
          name: "Nombre del alumno",
          role: "Nadador de aguas abiertas",
          text: "Sustituye este texto por el testimonio real de un alumno sobre las clases particulares.",
          placeholder: true,
        },
        {
          name: "Nombre del alumno",
          role: "Principiante",
          text: "Sustituye este texto por el testimonio real de un alumno sobre las clases particulares.",
          placeholder: true,
        },
      ] as Testimonial[],
    },
    contact: { title: "Reserva tu clase", text: "Escríbenos para acordar horario y lugar." },
  },
});
