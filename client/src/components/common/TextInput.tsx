import "./TextInput.css";

type TextInputProps = {
  className?: string;
  type: string;
  placeholder: string;
  id: string;
  name: string;
  size?: number;
  label?: string;
  optional?: boolean;
};

export const TextInput = ({
  className,
  label,
  optional,
  type,
  placeholder,
  id,
  name,
  size,
}: TextInputProps) => {
  return (
    <div className={className}>
      {label && (
        <label htmlFor={name}>
          {label} {optional && <p>(optional)</p>}
        </label>
      )}
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
