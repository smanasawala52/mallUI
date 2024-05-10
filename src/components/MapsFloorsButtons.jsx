export default function MapsFloorsButtons(props) {
  return (
    <button
      className={props.isSelected ? "active map-btn" : "map-btn"}
      onClick={props.onSelect}
    >
      {props.children}
    </button>
  );
}
