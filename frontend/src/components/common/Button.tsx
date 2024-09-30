interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}

export default function Button({
  type = "button",
  variant = "primary",
  children,
  ...rest
}: ButtonProps) {
  return (
    <button type={type} className={`button button-${variant}`} {...rest}>
      {children}
    </button>
  );
}
