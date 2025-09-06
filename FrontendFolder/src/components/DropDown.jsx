export default function DropDown({ options = [], value = '', onChange = ()=>{}, placeholder='Select', disabled=false }){
  // options can be array of {label, value} or simple array of strings/objects from data
  const normalized = options.map(opt => {
    if (typeof opt === 'string') return { label: opt, value: opt };
    if (opt && opt.label && opt.value) return opt;
    // if object with id + name
    if (opt && opt.id && opt.name) return { label: opt.name, value: opt.id, raw: opt };
    if (opt && opt.name && opt.id === undefined) return { label: opt.name, value: opt.name, raw: opt };
    return { label: String(opt), value: opt };
  });

  return (
    <select className="input" value={value || ''} onChange={(e)=>onChange(normalized.find(o=>String(o.value)===e.target.value)?.value ?? e.target.value)} disabled={disabled}>
      <option value="">{placeholder}</option>
      {normalized.map((opt, idx) => (
        <option key={idx} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  );
}
