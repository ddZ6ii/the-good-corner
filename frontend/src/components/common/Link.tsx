type LinkProps = {
  to: string;
  className?: string;
  children: React.ReactNode;
};

export default function Link({ to, className = "", children }: LinkProps) {
  return (
    <a href={to} className={className}>
      {children}
    </a>
  );
}
