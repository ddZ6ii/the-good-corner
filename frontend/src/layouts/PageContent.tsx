type PageContentProps = {
  children: React.ReactNode;
};

export default function PageContent({ children }: PageContentProps) {
  return <main className="main-content">{children}</main>;
}
