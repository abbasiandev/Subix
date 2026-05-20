interface Props {
  photoUrl?: string | null;
  name?: string | null;
  size?: "sm" | "md" | "lg";
  shape?: "square" | "circle";
  className?: string;
}

const SIZE_CLASS = {
  sm: "w-10 h-10 text-sm",
  md: "w-12 h-12 text-lg",
  lg: "w-16 h-16 text-xl",
};

export default function UserAvatar({
  photoUrl,
  name,
  size = "sm",
  shape = "circle",
  className = "",
}: Props) {
  const initial = name?.trim()?.[0]?.toUpperCase() ?? "U";
  const radius = shape === "square" ? "rounded-xl" : "rounded-full";

  if (photoUrl) {
    return (
      <img
        src={photoUrl}
        alt={name ?? "کاربر"}
        className={`${radius} object-cover bg-primary-light ${SIZE_CLASS[size]} ${className}`}
      />
    );
  }

  return (
    <div
      className={`${radius} bg-primary-light flex items-center justify-center text-primary font-bold ${SIZE_CLASS[size]} ${className}`}
    >
      {initial}
    </div>
  );
}
