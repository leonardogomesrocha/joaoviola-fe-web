/** Numbered section label: "1 ——— O QUE VAIS RECEBER". */
export function SectionLabel({ number, children }: { number: number; children: string }) {
  return (
    <div className="flex items-center gap-4">
      <span className="font-display text-xl font-medium text-foreground">{number}</span>
      <span className="h-px w-16 bg-gold md:w-20" />
      <span className="font-display text-sm font-semibold uppercase tracking-[0.3em] text-gold">
        {children}
      </span>
    </div>
  );
}
