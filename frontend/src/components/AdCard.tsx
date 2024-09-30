import Card from "@components/layout/Card";
import Link from "@components/common/Link";

type AdCardProps = {
  id?: number;
  title: string;
  src: string;
  alt: string;
  price: number;
  url: string;
};

export default function AdCard({ title, src, alt, price, url }: AdCardProps) {
  return (
    <Card className="ad-card-container">
      <Link to={url} className="ad-card-link">
        <img className="ad-card-image" alt={alt} src={src} />
        <div className="ad-card-text">
          <div className="ad-card-title">{title}</div>
          <div className="ad-card-price">{`${price.toString()} $`}</div>
        </div>
      </Link>
    </Card>
  );
}
