import { Link } from "@tanstack/react-router";
import { useMessages } from "@/i18n";
import { commonMessages } from "@/i18n/messages/common";

type Props = {
  brand: string;
  /** Overlay the header on top of a hero image (home page). */
  overlay?: boolean;
};

export function SiteHeader({ brand, overlay = false }: Props) {
  const t = useMessages(commonMessages).nav;

  return (
    <header className={overlay ? "absolute inset-x-0 top-0 z-10" : "bg-ink"}>
      <nav className="container mx-auto flex items-center justify-between px-6 py-5 text-ink-foreground">
        <Link to="/" className="font-display text-xl font-bold uppercase tracking-wider">
          {brand}
        </Link>
        <div className="hidden gap-8 text-sm font-medium uppercase tracking-wider md:flex">
          <a href="/#planos" className="hover:text-gold">
            {t.plans}
          </a>
          <Link
            to="/private-lessons"
            className="hover:text-gold"
            activeProps={{ className: "text-gold" }}
          >
            {t.privateLessons}
          </Link>
          <a href="/#condicoes" className="hover:text-gold">
            {t.conditions}
          </a>
          <a href="#contacto" className="hover:text-gold">
            {t.contact}
          </a>
        </div>
      </nav>
    </header>
  );
}
