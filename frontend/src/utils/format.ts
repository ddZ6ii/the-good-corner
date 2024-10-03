function capitalizeWord(word: string): string {
  return word.trim().charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

export function capitalize(text: string | undefined): string {
  return (text ?? "").split(" ").map(capitalizeWord).join(" ");
}

export function convertPriceToCents(price: string): number {
  return Number(parseFloat(price || "0").toFixed(2)) * 100;
}

export function convertPriceInCents(priceInCents: number): number {
  const price = priceInCents / 100;
  return Number(price.toFixed(2));
}

export function formatPrice(priceInCents: number): string {
  return convertPriceInCents(priceInCents).toString();
}

export function formatPriceWithCurrency(priceInCents: number): string {
  return `${formatPrice(priceInCents)} $`;
}
