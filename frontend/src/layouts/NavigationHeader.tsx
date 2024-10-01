type NavigationHeaderProps = {
  children: React.ReactNode;
};

export default function NavigationHeader({ children }: NavigationHeaderProps) {
  return <header className="header">{children}</header>;
}
