import { Button } from "@common/Button";
import { Card } from "@layouts/Card";
import { AdNoTags } from "@tgc/common";
import { formatPriceWithCurrency, formatUrl } from "@utils/format";
import { NavLink } from "react-router-dom";

type AdCardProps = {
  ad: AdNoTags;
  onAddPrice: (price: number) => void;
};

export default function AdCard({
  ad: { id, title, picture, price },
  onAddPrice,
}: AdCardProps) {
  const formattedPrice = formatPriceWithCurrency(price);
  const formattedUrl = formatUrl("ads", id);
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    onAddPrice(price);
  };
  return (
    <Card>
      <NavLink to={formattedUrl} className="card__link">
        <img className="card__thumbnail" alt={title} src={picture} />
        <div className="card__details">
          <h3 title={title} className="card__title">
            {title}
          </h3>
          <p className="card__price">{formattedPrice}</p>
        </div>
      </NavLink>
      <div className="card__wrapper__cta">
        <Button className="card__cta" onClick={handleClick}>
          Add price to total
        </Button>
      </div>
    </Card>
  );
}
