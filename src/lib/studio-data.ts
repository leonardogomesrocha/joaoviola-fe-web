// Static content for the studio. Shapes mirror a future backend API —
// swap `getStudioData` for a fetch/server call without touching the UI.

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

export const studioData: StudioData = {
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
  contact: {
    phone: "916 493 947",
    email: "geral.grupoviola@gmail.com",
    instagram: "joao_viola38",
  },
};

export async function getStudioData(): Promise<StudioData> {
  return studioData;
}
