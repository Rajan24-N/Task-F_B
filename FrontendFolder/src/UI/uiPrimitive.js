export function Label({ children, htmlFor, required }) {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700">
      {children} {required && <span className="text-red-500">*</span>}
    </label>
  );
}

export function FieldWrap({ children }) {
  return <div className="space-y-1">{children}</div>;
}

export function Input({ id, type = "text", value, onChange, disabled, placeholder, maxLength, step, min }) {
  return (
    <input
      id={id}
      type={type}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      disabled={disabled}
      placeholder={placeholder}
      maxLength={maxLength}
      step={step}
      min={min}
      className={`w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100`}
    />
  );
}

export function Select({ id, value, onChange, disabled, children }) {
  return (
    <select
      id={id}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      disabled={disabled}
      className="w-full rounded-xl border border-gray-300 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100"
    >
      {children}
    </select>
  );
}

export function Divider() {
  return <div className="h-px w-full bg-gray-200" />;
}