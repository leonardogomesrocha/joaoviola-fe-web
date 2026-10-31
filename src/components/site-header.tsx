import { Link } from "@tanstack/react-router";

type Props = {
  brand: string;
  /** Overlay the header on top of a hero image (home page). */
  overlay?: boolean;
};

const links = [
  { href: "/#planos", label: "Planos" },
  { href: "/#condicoes", label: "Condições" },
  { href: "/#contacto", label: "Contacto" },
];

export function SiteHeader({ brand, overlay = false }: Props) {
  return (
    <header className={overlay ? "absolute inset-x-0 top-0 z-10" : "bg-ink"}>
      <nav className="container mx-auto flex items-center justify-between px-6 py-5 text-ink-foreground">
        <Link to="/" className="font-display text-xl font-bold uppercase tracking-wider">
          {brand}
        </Link>
        <div className="hidden gap-8 text-sm font-medium uppercase tracking-wider md:flex">
          <a href={links[0].href} className="hover:text-gold">
            {links[0].label}
          </a>
          <Link
            to="/private-lessons"
            className="hover:text-gold"
            activeProps={{ className: "text-gold" }}
          >
            Aulas Particulares
          </Link>
          {links.slice(1).map((link) => (
            <a key={link.href} href={link.href} className="hover:text-gold">
              {link.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}
