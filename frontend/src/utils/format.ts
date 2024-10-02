function capitalizeWord(word: string): string {
  return word.trim().charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

export function capitalize(text: string): string {
  return text.split(" ").map(capitalizeWord).join(" ");
}

export function formatUrl(baseUrl: string, id: number): string {
  return `/${baseUrl}/${id.toString()}`;
}

export function formatPrice(priceInCents: number): string {
  const price = priceInCents / 100;
  return `${price.toFixed(2).toString()} $`;
}
