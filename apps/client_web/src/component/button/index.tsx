interface IButton {
  textContent: string;
  onClick?: () => void;
  type: "button" | "submit" | undefined;
}


function Button({ textContent, onClick, type} : IButton) {

  return (
    <button type={type} className="bg-primary-800 hover:bg-primary-900 transition-colors text-white py-2 px-3 w-[70%] max-w-xs rounded-md cursor-pointer font-bold uppercase shadow-sm" onClick={onClick}>{textContent}</button>
  )
}

export default Button