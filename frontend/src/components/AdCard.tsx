import { NavLink } from "react-router-dom";
import { Card } from "@layouts/Card";

type AdCardProps = {
  id: number;
  title: string;
  src: string;
  alt: string;
  price: number;
};

export default function AdCard({ id, title, src, alt, price }: AdCardProps) {
  return (
    <Card>
      <NavLink to={`/ads/${id.toString()}`} className="card__link">
        <img className="card__thumbnail" alt={alt} src={src} />
        <div className="card__details">
          <h3 className="card__title">{title}</h3>
          <p className="card__price">{`${price.toString()} $`}</p>
        </div>
      </NavLink>
    </Card>
  );
}
