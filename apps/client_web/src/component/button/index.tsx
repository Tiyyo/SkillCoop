interface IButton {
  textContent: string;
  onClick: () => void;
  type: "button" | "submit" | undefined;
}


function Button({ textContent, onClick, type} : IButton) {
  return (
    <button type={type} onClick={onClick}>{textContent}</button>
  )
}

export default Button