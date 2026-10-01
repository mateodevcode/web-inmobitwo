export function OtpInput({ value, onChange }) {
  return (
    <input
      type="text"
      inputMode="numeric"
      maxLength={6}
      value={value}
      onChange={(e) => onChange(e.target.value.replace(/\D/g, ""))}
      placeholder="000000"
      className="border border-gray-300 rounded-md p-3 text-black text-center text-2xl tracking-[0.5em] focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
    />
  );
}
