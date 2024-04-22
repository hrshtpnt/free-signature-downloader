"use client";

interface IButtonProps {
  title: string;
  onClick: () => void;
  className: string;
  disabled?: boolean;
}
const Button = (props: IButtonProps) => {
  const {disabled, title, className, onClick } = props;
  return (
    <button
      type="button"
      className={`${className} hover:bg-blue-100 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 active:bg-blue-200 disabled:opacity-50 disabled:pointer-events-none`}
      onClick={onClick}
      disabled={disabled}
    >
      {title}
    </button>
  );
};
export default Button;
