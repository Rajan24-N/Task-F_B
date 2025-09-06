export function FieldRow({ children, style }) {
  return <div className="row" style={style}>{children}</div>;
}

export function Col({ children, style }) {
  return <div className="col" style={style}>{children}</div>;
}

export default FieldRow;
