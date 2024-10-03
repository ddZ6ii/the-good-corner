import { Card } from "@layouts/Card";
import { AdNoTags } from "@tgc/common";
import { formatPriceWithCurrency } from "@utils/format";
import { NavLink } from "react-router-dom";

type AdCardProps = {
  ad: AdNoTags;
  children: React.ReactNode;
};

export default function AdCard({
  ad: { id, title, picture, price },
  children,
}: AdCardProps) {
  const formattedPrice = formatPriceWithCurrency(price);

  return (
    <Card>
      <NavLink to={`ads/${id.toString()}`} className="card__link">
        <img className="card__thumbnail" alt={title} src={picture} />
        <div className="card__details">
          <h3 title={title} className="card__title">
            {title}
          </h3>
          <p className="card__price">{formattedPrice}</p>
        </div>
      </NavLink>
      <div className="card__wrapper__cta">{children}</div>
    </Card>
  );
}
