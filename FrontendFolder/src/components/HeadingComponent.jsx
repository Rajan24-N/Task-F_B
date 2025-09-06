export default function HeadingComponent({ title }){
  return (
    <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12}}>
      <h2 style={{margin:0}}>{title}</h2>
    </div>
  );
}
