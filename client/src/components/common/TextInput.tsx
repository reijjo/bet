import "./TextInput.css";

type TextInputProps = {
  className?: string;
  type: string;
  placeholder: string;
  id: string;
  name: string;
  size?: number;
  label?: string;
};

export const TextInput = ({
  className,
  label,
  type,
  placeholder,
  id,
  name,
  size,
}: TextInputProps) => {
  return (
    <div className={className}>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
        id={id}
        name={name}
        size={size}
      />
    </div>
  );
};
