export function TextField({
  label,
  optional = false,
  ...inputProps
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-black mb-1">
        {label} {optional && <span className="text-black/60">(opcional)</span>}
      </label>
      <input
        {...inputProps}
        className="w-full border border-black/50 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-black/60 text-black"
      />
    </div>
  );
}
