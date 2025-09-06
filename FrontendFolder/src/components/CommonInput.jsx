export default function CommonInput({ value = '', onChange = ()=>{}, placeholder='', disabled=false, type='text' }){
  return (
    <input
      className="input"
      value={value}
      placeholder={placeholder}
      onChange={(e)=>onChange(type === 'number' ? e.target.value : e.target.value)}
      disabled={disabled}
      type={type}
    />
  );
}
