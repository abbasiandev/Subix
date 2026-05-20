/**
 * @deprecated Use BrandLogo + IconTile instead.
 * Kept for backward compatibility with any external imports.
 */
import IconTile from "@/components/IconTile";
import { getCategoryGradientClass } from "@/lib/categoryStyles";

interface Props {
  category: string;
  size?: "sm" | "md" | "lg";
  variant?: "color" | "white";
  className?: string;
}

const SIZE_MAP = {
  sm: "md" as const,
  md: "md" as const,
  lg: "lg" as const,
};

export default function CategoryIcon({
  category,
  size = "md",
  className = "",
}: Props) {
  return (
    <IconTile
      brand={category}
      gradient={getCategoryGradientClass(category)}
      size={SIZE_MAP[size]}
      className={className}
    />
  );
}

export function categoryIconPath(_category: string) {
  return null;
}
