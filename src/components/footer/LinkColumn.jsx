import Link from "next/link";

export function LinkColumn({ title, links }) {
  return (
    <div>
      <h3 className="mb-4 text-base md:text-xl font-semibold text-segundo">
        {title}
      </h3>
      <ul className="flex flex-col gap-3">
        {links.map((label) => (
          <li key={label}>
            <Link
              href="#"
              className="text-base md:text-lg text-decimo hover:underline"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
