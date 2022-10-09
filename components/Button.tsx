interface ButtonProps {
  icon?: JSX.Element;
  text?: string;
  type: string;
  handleClick?: React.MouseEventHandler;
}

const Button = ({ icon, text, type, handleClick }: ButtonProps) => {
  return (
    <button className={`btn btn-icon ${type}`} onClick={handleClick}>
      {icon && icon}
      {text && <span>{text}</span>}
    </button>
  );
};

export default Button;
