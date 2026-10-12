import { Product } from "@/data/products";
import { getCatalogPriceOverrides } from "@/lib/api";

export function applyCatalogPriceOverrides(
  catalog: Product[],
  overrides: Record<string, number>,
): Product[] {
  return catalog.map((product) => {
    const price = overrides[product.slug];
    if (!Number.isFinite(price) || price <= 0) return product;

    const originalPrice =
      product.originalPrice && product.originalPrice > price
        ? product.originalPrice
        : null;

    return {
      ...product,
      price,
      originalPrice,
      hasDiscount: originalPrice !== null,
    };
  });
}

export async function loadLiveCatalog(catalog: Product[]): Promise<Product[]> {
  const { prices } = await getCatalogPriceOverrides();
  return applyCatalogPriceOverrides(catalog, prices);
}
