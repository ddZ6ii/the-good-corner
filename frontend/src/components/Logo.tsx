import Link from "@components/common/Link";

export default function Logo() {
  return (
    <h1>
      <Link to="/" className="button logo link-button">
        <span className="mobile-short-label">TGC</span>
        <span className="desktop-long-label">THE GOOD CORNER</span>
      </Link>
    </h1>
  );
}
