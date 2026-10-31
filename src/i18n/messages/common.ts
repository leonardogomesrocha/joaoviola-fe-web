import { defineMessages } from "@/i18n";

// Texts shared by every page: menu, top bar, footer.
export const commonMessages = defineMessages({
  pt: {
    nav: {
      plans: "Planos",
      privateLessons: "Aulas Particulares",
      conditions: "Condições",
      contact: "Contacto",
    },
    nextEvent: {
      label: "Próximo evento",
      from: "A partir de",
      book: "Reservar",
      region: "Próximo evento",
    },
    language: { choose: "Escolher idioma" },
    conditionsTitle: "Condições",
  },
  en: {
    nav: {
      plans: "Plans",
      privateLessons: "Private Lessons",
      conditions: "Conditions",
      contact: "Contact",
    },
    nextEvent: { label: "Next event", from: "From", book: "Book now", region: "Next event" },
    language: { choose: "Choose language" },
    conditionsTitle: "Conditions",
  },
  es: {
    nav: {
      plans: "Planes",
      privateLessons: "Clases Particulares",
      conditions: "Condiciones",
      contact: "Contacto",
    },
    nextEvent: {
      label: "Próximo evento",
      from: "Desde el",
      book: "Reservar",
      region: "Próximo evento",
    },
    language: { choose: "Elegir idioma" },
    conditionsTitle: "Condiciones",
  },
});
