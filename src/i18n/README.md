# Languages (PT · EN · ES)

The visitor's language is stored in the `lang` cookie (first visit: the browser's
language, otherwise Portuguese). Pages render on the server in that language, and the
picker in the top bar (`src/components/language-switcher.tsx`) changes it.

## Adding a page or module

1. Create its texts in `src/i18n/messages/<module>.ts`:

   ```ts
   import { defineMessages } from "@/i18n";

   export const campsMessages = defineMessages({
     pt: { meta: { title: "Campos de Treino — Grupo Viola" }, title: "Campos de Treino" },
     en: { meta: { title: "Training Camps — Grupo Viola" }, title: "Training Camps" },
     es: { meta: { title: "Campus de Entrenamiento — Grupo Viola" }, title: "Campus de Entrenamiento" },
   });
   ```

   Portuguese defines the keys; TypeScript fails the build if English or Spanish
   is missing one. Add the module to `src/test/i18n.test.ts` too.

2. Use them in the page:

   ```tsx
   const t = useMessages(campsMessages);
   return <h1>{t.title}</h1>;
   ```

3. For the page `<title>`, return the locale from the loader and read it in `head`
   (see `src/routes/private-lessons.tsx`).

4. Data that depends on the language (like `studioQuery`) takes the locale and
   includes it in the query key, so switching language refetches it.

Texts shared by every page (menu, top bar, footer) live in `messages/common.ts`.

## Adding a language

Add it to `locales` and `localeInfo` in `config.ts`, then add its texts to every
file in `messages/` and to `src/lib/studio-data.ts`.
