// Studio content (plans, conditions, contact) per language. Shapes mirror a future
// backend API — swap `getStudioData` for a fetch/server call without touching the UI.

import type { Locale } from "@/i18n/config";

export type Plan = {
  id: string;
  icon: "stopwatch" | "dumbbell";
  title: string;
  features: string[];
  price: number;
  currency: string;
  period: string;
};

export type ServiceRow = {
  label: string;
  price: number;
  /** Optional price per session, e.g. "35 €/sessão". */
  perSession?: string;
};

export type ServiceGroup = {
  id: string;
  icon: "openWater" | "group" | "pool";
  title: string;
  subtitle: string;
  /** "PT DUO" promo badge (discount for a second person). */
  duo?: { badge: string; discount: string; note: string };
  rows: ServiceRow[];
};

export type Contact = {
  phone: string;
  /** International number for wa.me links, digits only. */
  whatsapp: string;
  email: string;
  instagram: string;
};

export type StudioData = {
  brand: string;
  tagline: string;
  plansTitle: string;
  plans: Plan[];
  servicesTitle: string;
  services: ServiceGroup[];
  conditions: string[];
  contact: Contact;
};

const contact: Contact = {
  phone: "916 493 947",
  whatsapp: "351916493947",
  email: "geral.grupoviola@gmail.com",
  instagram: "joao_viola38",
};

export const studioData: Record<Locale, StudioData> = {
  pt: {
    brand: "Coach Viola",
    tagline: "Treino de natação, triatlo e musculação com acompanhamento personalizado.",
    plansTitle: "Planos de Treino Online",
    plans: [
      {
        id: "swim-tri-ironman",
        icon: "stopwatch",
        title: "Natação | Triatlo | Ironman",
        features: [
          "Até 20 treinos mensais",
          "Planeamento personalizado",
          "Ajustes regulares do treino",
          "Acompanhamento técnico online",
          "Acesso à aplicação TrainingPeaks",
        ],
        price: 100,
        currency: "€",
        period: "mês",
      },
      {
        id: "strength-online",
        icon: "dumbbell",
        title: "Acompanhamento Online de Musculação",
        features: ["Plano personalizado", "Acompanhamento remoto", "Ajustes periódicos"],
        price: 50,
        currency: "€",
        period: "mês",
      },
    ],
    servicesTitle: "Aulas e Serviços",
    services: [
      {
        id: "private-open-water",
        icon: "openWater",
        title: "Aulas Privadas",
        subtitle: "Natação em Águas Abertas",
        duo: { badge: "PT DUO", discount: "50%", note: "Desconto na segunda pessoa" },
        rows: [
          { label: "1 aula", price: 40 },
          { label: "Pack 5 aulas", price: 175, perSession: "35 €/sessão" },
          { label: "Pack 10 aulas", price: 300, perSession: "30 €/sessão" },
        ],
      },
      {
        id: "group-open-water",
        icon: "group",
        title: "Aulas de Grupo",
        subtitle: "Natação em Águas Abertas",
        rows: [
          { label: "1 aula", price: 35 },
          { label: "Pack 5 aulas", price: 150, perSession: "30 €/sessão" },
        ],
      },
      {
        id: "private-pool",
        icon: "pool",
        title: "Aulas Privadas",
        subtitle: "Natação em Piscina",
        duo: { badge: "PT DUO", discount: "50%", note: "Desconto na segunda pessoa" },
        rows: [
          { label: "1 aula", price: 35 },
          { label: "Pack 5 aulas", price: 150, perSession: "30 €/sessão" },
          { label: "Pack 10 aulas", price: 280, perSession: "28 €/sessão" },
        ],
      },
    ],
    conditions: [
      "Sessões com duração de 60 minutos.",
      "Horários definidos mediante disponibilidade do treinador, do atleta e das instalações.",
      "As aulas em águas abertas dependem das condições meteorológicas e do estado do mar, podendo ser alteradas ou canceladas por motivos de segurança.",
      "O pagamento deve ser efetuado antes do início da sessão.",
      "O comprovativo de pagamento deverá ser enviado por mensagem ou e-mail.",
      "O cancelamento no próprio dia implica a cobrança integral da sessão.",
      "Nos planos de treino online, os objetivos, a metodologia e a periodicidade da comunicação são definidos previamente entre treinador e atleta.",
    ],
    contact,
  },
  en: {
    brand: "Coach Viola",
    tagline: "Swimming, triathlon and strength training with personal coaching.",
    plansTitle: "Online Training Plans",
    plans: [
      {
        id: "swim-tri-ironman",
        icon: "stopwatch",
        title: "Swimming | Triathlon | Ironman",
        features: [
          "Up to 20 sessions a month",
          "Personalised planning",
          "Regular training adjustments",
          "Online technical coaching",
          "Access to the TrainingPeaks app",
        ],
        price: 100,
        currency: "€",
        period: "month",
      },
      {
        id: "strength-online",
        icon: "dumbbell",
        title: "Online Strength Coaching",
        features: ["Personalised plan", "Remote coaching", "Periodic adjustments"],
        price: 50,
        currency: "€",
        period: "month",
      },
    ],
    servicesTitle: "Lessons & Services",
    services: [
      {
        id: "private-open-water",
        icon: "openWater",
        title: "Private Lessons",
        subtitle: "Open Water Swimming",
        duo: { badge: "PT DUO", discount: "50%", note: "Discount for the second person" },
        rows: [
          { label: "1 lesson", price: 40 },
          { label: "5-lesson pack", price: 175, perSession: "35 €/session" },
          { label: "10-lesson pack", price: 300, perSession: "30 €/session" },
        ],
      },
      {
        id: "group-open-water",
        icon: "group",
        title: "Group Lessons",
        subtitle: "Open Water Swimming",
        rows: [
          { label: "1 lesson", price: 35 },
          { label: "5-lesson pack", price: 150, perSession: "30 €/session" },
        ],
      },
      {
        id: "private-pool",
        icon: "pool",
        title: "Private Lessons",
        subtitle: "Pool Swimming",
        duo: { badge: "PT DUO", discount: "50%", note: "Discount for the second person" },
        rows: [
          { label: "1 lesson", price: 35 },
          { label: "5-lesson pack", price: 150, perSession: "30 €/session" },
          { label: "10-lesson pack", price: 280, perSession: "28 €/session" },
        ],
      },
    ],
    conditions: [
      "Sessions last 60 minutes.",
      "Times are set according to the availability of the coach, the athlete and the facilities.",
      "Open water lessons depend on the weather and sea conditions and may be changed or cancelled for safety reasons.",
      "Payment must be made before the session starts.",
      "Proof of payment should be sent by message or email.",
      "Same-day cancellations are charged in full.",
      "For online training plans, goals, methodology and how often we communicate are agreed between coach and athlete beforehand.",
    ],
    contact,
  },
  es: {
    brand: "Coach Viola",
    tagline: "Entrenamiento de natación, triatlón y musculación con seguimiento personalizado.",
    plansTitle: "Planes de Entrenamiento Online",
    plans: [
      {
        id: "swim-tri-ironman",
        icon: "stopwatch",
        title: "Natación | Triatlón | Ironman",
        features: [
          "Hasta 20 entrenamientos al mes",
          "Planificación personalizada",
          "Ajustes regulares del entrenamiento",
          "Seguimiento técnico online",
          "Acceso a la aplicación TrainingPeaks",
        ],
        price: 100,
        currency: "€",
        period: "mes",
      },
      {
        id: "strength-online",
        icon: "dumbbell",
        title: "Seguimiento Online de Musculación",
        features: ["Plan personalizado", "Seguimiento a distancia", "Ajustes periódicos"],
        price: 50,
        currency: "€",
        period: "mes",
      },
    ],
    servicesTitle: "Clases y Servicios",
    services: [
      {
        id: "private-open-water",
        icon: "openWater",
        title: "Clases Privadas",
        subtitle: "Natación en Aguas Abiertas",
        duo: { badge: "PT DUO", discount: "50%", note: "Descuento en la segunda persona" },
        rows: [
          { label: "1 clase", price: 40 },
          { label: "Pack 5 clases", price: 175, perSession: "35 €/sesión" },
          { label: "Pack 10 clases", price: 300, perSession: "30 €/sesión" },
        ],
      },
      {
        id: "group-open-water",
        icon: "group",
        title: "Clases de Grupo",
        subtitle: "Natación en Aguas Abiertas",
        rows: [
          { label: "1 clase", price: 35 },
          { label: "Pack 5 clases", price: 150, perSession: "30 €/sesión" },
        ],
      },
      {
        id: "private-pool",
        icon: "pool",
        title: "Clases Privadas",
        subtitle: "Natación en Piscina",
        duo: { badge: "PT DUO", discount: "50%", note: "Descuento en la segunda persona" },
        rows: [
          { label: "1 clase", price: 35 },
          { label: "Pack 5 clases", price: 150, perSession: "30 €/sesión" },
          { label: "Pack 10 clases", price: 280, perSession: "28 €/sesión" },
        ],
      },
    ],
    conditions: [
      "Las sesiones duran 60 minutos.",
      "Los horarios se fijan según la disponibilidad del entrenador, del atleta y de las instalaciones.",
      "Las clases en aguas abiertas dependen de la meteorología y del estado del mar, y pueden modificarse o cancelarse por motivos de seguridad.",
      "El pago debe realizarse antes del inicio de la sesión.",
      "El justificante de pago debe enviarse por mensaje o correo electrónico.",
      "Las cancelaciones el mismo día se cobran íntegramente.",
      "En los planes de entrenamiento online, los objetivos, la metodología y la frecuencia de comunicación se acuerdan previamente entre entrenador y atleta.",
    ],
    contact,
  },
};

export async function getStudioData(locale: Locale): Promise<StudioData> {
  return studioData[locale];
}
