import { Link } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useMessages } from "@/i18n";
import { commonMessages } from "@/i18n/messages/common";

type Props = {
  brand: string;
  /** Overlay the header on top of a hero image (home page). */
  overlay?: boolean;
};

type NavLabels = (typeof commonMessages)["pt"]["nav"];

/** Menu entries, shared by the desktop bar and the mobile panel. Sections of the home page use anchors. */
const items: { label: keyof NavLabels; to?: "/private-lessons" | "/contact"; href?: string }[] = [
  { label: "plans", href: "/#planos" },
  { label: "privateLessons", to: "/private-lessons" },
  { label: "contact", to: "/contact" },
];

function NavItems({
  t,
  className,
  onNavigate,
}: {
  t: NavLabels;
  className: string;
  onNavigate?: () => void;
}) {
  return (
    <>
      {items.map((item) =>
        item.to ? (
          <Link
            key={item.label}
            to={item.to}
            onClick={onNavigate}
            className={className}
            activeProps={{ className: "text-gold" }}
          >
            {t[item.label]}
          </Link>
        ) : (
          <a key={item.label} href={item.href} onClick={onNavigate} className={className}>
            {t[item.label]}
          </a>
        ),
      )}
    </>
  );
}

export function SiteHeader({ brand, overlay = false }: Props) {
  const t = useMessages(commonMessages).nav;
  const [open, setOpen] = useState(false);

  return (
    <header className={overlay ? "absolute inset-x-0 top-0 z-10" : "bg-ink"}>
      <nav className="container mx-auto flex items-center justify-between px-6 py-5 text-ink-foreground">
        <Link to="/" className="font-display text-xl font-bold uppercase tracking-wider">
          {brand}
        </Link>

        <div className="hidden gap-8 text-sm font-medium uppercase tracking-wider md:flex">
          <NavItems t={t} className="hover:text-gold" />
        </div>

        {/* Mobile: menu button opening a side panel */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            aria-label={t.openMenu}
            className="-mr-2 inline-flex size-11 items-center justify-center rounded-lg text-ink-foreground transition-colors hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold md:hidden"
          >
            <Menu className="size-7" />
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-[85vw] max-w-sm border-l-ink-foreground/10 bg-ink text-ink-foreground [&>button]:text-ink-foreground [&>button>svg]:size-6"
          >
            <SheetTitle className="font-display text-xl font-bold uppercase tracking-wider text-ink-foreground">
              {brand}
            </SheetTitle>
            <SheetDescription className="sr-only">{t.menu}</SheetDescription>
            <div className="mt-10 flex flex-col divide-y divide-ink-foreground/10 border-y border-ink-foreground/10">
              <NavItems
                t={t}
                onNavigate={() => setOpen(false)}
                className="py-4 font-display text-2xl font-medium uppercase tracking-wider transition-colors hover:text-gold"
              />
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
