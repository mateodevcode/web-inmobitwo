import { Check } from "lucide-react";
import { HERO_BULLETS } from "./hero-bullets.data";

const HeroBullets = () => (
  <ul className="mb-6 flex flex-col gap-3">
    {HERO_BULLETS.map(({ id, content }) => (
      <li key={id} className="flex items-start gap-3">
        <Check
          className="mt-1 h-5 w-5 shrink-0 text-emerald-600"
          strokeWidth={2.5}
        />
        <p className="text-base text-slate-900">{content}</p>
      </li>
    ))}
  </ul>
);

export default HeroBullets;
