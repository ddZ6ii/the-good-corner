import { NavLink } from "react-router-dom";
import Card from "@layouts/Card";

type AdCardProps = {
  id: number;
  title: string;
  src: string;
  alt: string;
  price: number;
};

export default function AdCard({ id, title, src, alt, price }: AdCardProps) {
  return (
    <Card className="ad-card-container">
      <NavLink to={`/ads/${id.toString()}`} className="ad-card-link">
        <img className="ad-card-image" alt={alt} src={src} />
        <div className="ad-card-text">
          <div className="ad-card-title">{title}</div>
          <div className="ad-card-price">{`${price.toString()} $`}</div>
        </div>
      </NavLink>
    </Card>
  );
}
