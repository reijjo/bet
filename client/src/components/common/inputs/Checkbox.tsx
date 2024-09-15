import "./Checkbox.css";

type CheckboxProps = {
  className?: string;
  label?: string;

  id: string;
  name: string;
  checked: boolean;
  onChange: () => void;
  value?: string;
};

export const Checkbox = ({
  className,
  label,
  id,
  name,
  checked,
  onChange,
  value,
}: CheckboxProps) => {
  return (
    <div className={className}>
      <label htmlFor={name}>{label}</label>
      <input
        type="checkbox"
        id={id}
        name={name}
        checked={checked}
        onChange={onChange}
        value={value}
      />
    </div>
  );
};
