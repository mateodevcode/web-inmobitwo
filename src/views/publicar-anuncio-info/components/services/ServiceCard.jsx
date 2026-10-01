import Link from "next/link";

export function ServiceCard({ title, children, linkLabel, href = "#" }) {
  return (
    <div className="rounded-md bg-white p-6">
      <h3 className="mb-2 text-base md:text-xl font-semibold text-segundo">
        {title}
      </h3>
      <p className="mb-4 text-base text-segundo">{children}</p>
      <Link
        href={href}
        className="text-base md:text-xl font-semibold text-decimo hover:underline"
      >
        {linkLabel}
      </Link>
    </div>
  );
}
