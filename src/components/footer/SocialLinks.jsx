import Link from "next/link";

const SOCIALS = [
  { id: "facebook", label: "Facebook" },
  { id: "youtube", label: "YouTube" },
  { id: "instagram", label: "Instagram" },
];

export function SocialLinks() {
  return (
    <div className="mt-5 flex gap-3 text-segundo">
      {SOCIALS.map(({ id, label }) => (
        <Link
          key={id}
          href="#"
          aria-label={label}
          className="hover:text-segundo/80"
        >
          ●
        </Link>
      ))}
    </div>
  );
}
