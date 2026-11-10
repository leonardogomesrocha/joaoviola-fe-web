/** Section label: "——— O QUE VAIS RECEBER". */
export function SectionLabel({ children }: { children: string }) {
  return (
    <div className="flex items-center gap-4">
      <span className="h-px w-16 bg-gold md:w-20" />
      <span className="font-display text-sm font-semibold uppercase tracking-[0.3em] text-gold-strong">
        {children}
      </span>
    </div>
  );
}
