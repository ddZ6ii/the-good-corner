import AdCard from "@components/AdCard";

export default function RecentAds() {
  return (
    <>
      <h2>Recent ads</h2>
      <section>
        <ul className="recent-ads">
          {ADS.map((ad) => (
            <li key={ad.id}>
              <AdCard {...ad} />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

const ADS = [
  {
    id: 1,
    title: "Table",
    src: "/assets/images/table.webp",
    alt: "Table",
    price: 120,
    url: "/ads/table",
  },
  {
    id: 2,
    title: "Carboy",
    src: "/assets/images/carboy.webp",
    alt: "Carboy",
    price: 75,
    url: "/ads/carboy",
  },
  {
    id: 3,
    title: "Trinket tray",
    src: "/assets/images/trinket-tray.webp",
    alt: "Trinket tray",
    price: 4,
    url: "/ads/trinket-tray",
  },
  {
    id: 4,
    title: "Dresser",
    src: "/assets/images/dresser.webp",
    alt: "Dresser",
    price: 900,
    url: "/ads/dresser",
  },
  {
    id: 5,
    title: "Candle",
    src: "/assets/images/candle.webp",
    alt: "Candle",
    price: 8,
    url: "/ads/candle",
  },
  {
    id: 6,
    title: "Magazine rack",
    src: "/assets/images/magazine-rack.webp",
    alt: "Magazine rack",
    price: 45,
    url: "/ads/magazine-rack",
  },
];
