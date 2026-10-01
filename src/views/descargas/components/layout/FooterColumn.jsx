import Link from "next/link";

export function FooterColumn({ titulo, links }) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-segundo">{titulo}</h3>
      <ul className="mt-4 flex flex-col gap-2.5">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.to}
              className="text-sm text-segundo/60 transition-colors hover:text-segundo"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
