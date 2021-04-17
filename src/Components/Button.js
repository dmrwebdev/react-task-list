import './Button.css';

const Button = ({ id, className, onClick}) => {
  return (
    <div
    id={id}
    className={className}
    onClick={onClick} >
    </div>
  )
}

export default Button;