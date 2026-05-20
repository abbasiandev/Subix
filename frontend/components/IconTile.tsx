import BrandLogo, { BrandKey } from "@/components/BrandLogo";

type TileSize = "md" | "lg";

interface Props {
  brand: BrandKey | string;
  gradient: string;
  size?: TileSize;
  comingSoon?: boolean;
  logoColor?: string;
  className?: string;
}

const TILE_CLASS: Record<TileSize, { tile: string; logo: number }> = {
  md: { tile: "w-12 h-12 rounded-2xl", logo: 28 },
  lg: { tile: "w-14 h-14 rounded-2xl", logo: 32 },
};

export default function IconTile({
  brand,
  gradient,
  size = "md",
  comingSoon = false,
  logoColor,
  className = "",
}: Props) {
  const { tile, logo } = TILE_CLASS[size];

  return (
    <div
      className={`relative flex items-center justify-center flex-shrink-0 ${tile} ${gradient} ${className}`}
    >
      {comingSoon && (
        <>
          <span className="absolute top-0 inset-x-0 z-10 text-center text-[8px] bg-gray-400/80 text-white py-0.5 rounded-t-2xl">
            به زودی
          </span>
          <span className="absolute inset-0 bg-black/20 rounded-2xl" aria-hidden />
        </>
      )}
      <BrandLogo brand={brand} size={logo} color={logoColor} className="relative z-[1]" />
    </div>
  );
}
