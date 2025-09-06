
export default function Label({ text, required=false }){
  return <label className="label">{text} {required && <span style={{color:'#ef4444'}}>*</span>}</label>;
}
