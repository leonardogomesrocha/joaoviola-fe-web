import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useMessages } from "@/i18n";
import { contactMessages } from "@/i18n/messages/contact";
import {
  contactTopics,
  freestyleTimes,
  genders,
  sendContact,
  swimLevels,
  type ContactResult,
} from "@/lib/contact-api";

// Same rules as the API's ContactInputValidator, so most mistakes are caught before sending.
const namePattern = /^\p{L}[\p{L}\p{M} .'-]*$/u;

function createSchema(e: (typeof contactMessages)["pt"]["errors"]) {
  const name = z.string().trim().min(1, e.required).max(50, e.max).regex(namePattern, e.name);
  return z.object({
    firstName: name,
    lastName: name,
    age: z
      .string()
      .trim()
      .refine((v) => v === "" || (/^\d+$/.test(v) && Number(v) >= 3 && Number(v) <= 110), e.age),
    gender: z.enum(genders).optional(),
    email: z.string().trim().min(1, e.required).max(254, e.max).email(e.email),
    swimLevel: z.enum(swimLevels, { errorMap: () => ({ message: e.required }) }),
    freestyleTime: z.enum(freestyleTimes, { errorMap: () => ({ message: e.required }) }),
    topic: z.enum(contactTopics, { errorMap: () => ({ message: e.required }) }),
    message: z.string().trim().min(10, e.messageMin).max(5000, e.max),
    consentAccepted: z.literal(true, { errorMap: () => ({ message: e.consent }) }),
    website: z.string().optional(),
  });
}

type FormValues = z.infer<ReturnType<typeof createSchema>>;

const defaults = {
  firstName: "",
  lastName: "",
  age: "",
  gender: undefined,
  email: "",
  swimLevel: undefined,
  freestyleTime: undefined,
  topic: undefined,
  message: "",
  consentAccepted: false,
  website: "",
} as unknown as FormValues;

const fieldClass = "h-12 rounded-md border-border bg-white text-base shadow-none md:text-base";

export function ContactForm() {
  const t = useMessages(contactMessages);
  const schema = useMemo(() => createSchema(t.errors), [t.errors]);
  const form = useForm<FormValues>({ resolver: zodResolver(schema), defaultValues: defaults });
  const [status, setStatus] = useState<
    "idle" | "sent" | Exclude<ContactResult, { ok: true }>["reason"]
  >("idle");

  async function onSubmit(values: FormValues) {
    setStatus("idle");
    const result = await sendContact({
      ...values,
      age: values.age ? Number(values.age) : undefined,
    });

    if (result.ok) {
      form.reset(defaults);
      setStatus("sent");
      return;
    }

    if (result.reason === "validation") {
      for (const [field, messages] of Object.entries(result.fields)) {
        if (field in defaults) form.setError(field as keyof FormValues, { message: messages[0] });
      }
    }
    setStatus(result.reason);
  }

  if (status === "sent") {
    return (
      <div role="status" className="flex flex-col items-start gap-4 rounded-2xl bg-card p-8">
        <CheckCircle2 className="size-10 text-gold" />
        <p className="text-lg font-semibold">{t.success}</p>
      </div>
    );
  }

  const submitting = form.formState.isSubmitting;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="grid gap-4 sm:grid-cols-2">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">{t.fields.firstName}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder={t.fields.firstName}
                  autoComplete="given-name"
                  className={fieldClass}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">{t.fields.lastName}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder={t.fields.lastName}
                  autoComplete="family-name"
                  className={fieldClass}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">{t.fields.age}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder={t.fields.age}
                  inputMode="numeric"
                  maxLength={3}
                  className={fieldClass}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem className="flex items-center">
              <FormLabel className="sr-only">{t.fields.gender}</FormLabel>
              <FormControl>
                <RadioGroup
                  value={field.value ?? ""}
                  onValueChange={field.onChange}
                  className="flex h-12 items-center gap-6"
                >
                  {genders.map((g) => (
                    <label key={g} className="flex cursor-pointer items-center gap-2 text-base">
                      <RadioGroupItem value={g} />
                      {t.genders[g]}
                    </label>
                  ))}
                </RadioGroup>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="sm:col-span-2">
              <FormLabel className="sr-only">{t.fields.email}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  placeholder={t.fields.email}
                  autoComplete="email"
                  className={fieldClass}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="swimLevel"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">{t.fields.swimLevel}</FormLabel>
              <Select value={field.value ?? ""} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger className={fieldClass}>
                    <SelectValue placeholder={t.fields.swimLevel} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {swimLevels.map((v) => (
                    <SelectItem key={v} value={v}>
                      {t.swimLevels[v]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="freestyleTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">{t.fields.freestyleTime}</FormLabel>
              <Select value={field.value ?? ""} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger className={fieldClass}>
                    <SelectValue placeholder={t.fields.freestyleTime} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {freestyleTimes.map((v) => (
                    <SelectItem key={v} value={v}>
                      {t.freestyleTimes[v]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="topic"
          render={({ field }) => (
            <FormItem className="sm:col-span-2">
              <FormLabel className="sr-only">{t.fields.topic}</FormLabel>
              <Select value={field.value ?? ""} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger className={fieldClass}>
                    <SelectValue placeholder={t.fields.topic} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {contactTopics.map((v) => (
                    <SelectItem key={v} value={v}>
                      {t.topics[v]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem className="sm:col-span-2">
              <FormLabel className="sr-only">{t.fields.message}</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder={t.fields.message}
                  rows={7}
                  maxLength={5000}
                  className="rounded-md border-border bg-white text-base shadow-none md:text-base"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Anti-spam trap: hidden from people, bots fill it in. */}
        <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <input type="text" tabIndex={-1} autoComplete="off" {...form.register("website")} />
        </div>

        <FormField
          control={form.control}
          name="consentAccepted"
          render={({ field }) => (
            <FormItem className="sm:col-span-2">
              <div className="flex items-start gap-3">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={(v) => field.onChange(v === true)}
                    className="mt-0.5"
                  />
                </FormControl>
                <FormLabel className="cursor-pointer text-base font-normal leading-snug">
                  {t.fields.consent}
                </FormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col items-center gap-4 sm:col-span-2">
          {status !== "idle" && (
            <p role="alert" className="text-center text-sm font-medium text-destructive">
              {t.failed[status]}
            </p>
          )}
          <Button
            type="submit"
            disabled={submitting}
            className="h-12 rounded-full bg-gold px-10 font-display text-base uppercase tracking-wider text-gold-foreground shadow-[var(--shadow-gold)] hover:bg-gold/90"
          >
            {submitting && <Loader2 className="size-4 animate-spin" />}
            {submitting ? t.sending : t.submit}
          </Button>
        </div>
      </form>
    </Form>
  );
}
