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

export type Contact = { phone: string; email: string; instagram: string };

export type StudioData = {
  brand: string;
  tagline: string;
  plansTitle: string;
  plans: Plan[];
  conditions: string[];
  contact: Contact;
};

const contact: Contact = {
  phone: "916 493 947",
  email: "geral.grupoviola@gmail.com",
  instagram: "joao_viola38",
};

export const studioData: Record<Locale, StudioData> = {
  pt: {
    brand: "Grupo Viola",
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
    brand: "Grupo Viola",
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
    brand: "Grupo Viola",
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
