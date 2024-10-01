export function formatUrl(baseUrl: string, id: number): string {
  return `/${baseUrl}/${id.toString()}`;
}

export function formatPrice(priceInCents: number): string {
  const price = priceInCents / 100;
  return `${price.toFixed(2).toString()} $`;
}
