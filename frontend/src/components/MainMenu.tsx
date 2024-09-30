type MainMenuProps = {
  children: React.ReactNode;
};

export default function MainMenu({ children }: MainMenuProps) {
  return <div className="main-menu">{children}</div>;
}
