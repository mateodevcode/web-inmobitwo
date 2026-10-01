const SOCIALS = [
  { id: "facebook", label: "Facebook" },
  { id: "youtube", label: "YouTube" },
  { id: "instagram", label: "Instagram" },
];

export function SocialLinks() {
  return (
    <div className="mt-5 flex gap-3 text-slate-500">
      {SOCIALS.map(({ id, label }) => (
        <a key={id} href="#" aria-label={label} className="hover:text-slate-700">
          ●
        </a>
      ))}
    </div>
  );
}
