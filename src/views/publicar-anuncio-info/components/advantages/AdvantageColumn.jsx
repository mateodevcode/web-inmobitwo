export function AdvantageColumn({ title, children }) {
  return (
    <div>
      <h3 className="mb-2 text-base md:text-xl font-semibold text-segundo">
        {title}
      </h3>
      <p className="text-base md:text-lg text-segundo">{children}</p>
    </div>
  );
}
