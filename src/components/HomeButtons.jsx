export default function HomeButtons(props) {
  return (
    <button
      className={props.isSelected ? "active home-btn" : "home-btn"}
      onClick={props.onSelect}
    >
      {props.children}
    </button>
  );
}
