export default function ShopsButtons(props) {
  return (
    <button
      className={props.isSelected ? "active shops-btn" : "shops-btn"}
      onClick={props.onSelect}
    >
      {props.children}
    </button>
  );
}
