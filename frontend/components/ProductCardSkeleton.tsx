import GlassContainer from './GlassContainer';

interface ProductCardSkeletonProps {
  delay?: number;
}

export default function ProductCardSkeleton({ delay = 0 }: ProductCardSkeletonProps) {
  return (
    <GlassContainer
      elevation="light"
      className={`
        rounded-3xl p-6
        animate-fade-up
        ${delay > 0 ? `stagger-${Math.min(delay, 8)}` : ''}
      `}
      style={{ animationDelay: delay > 8 ? `${delay * 0.1}s` : undefined }}
    >
      {/* Icon and Badge Skeleton */}
      <div className="mb-4 flex items-start justify-between">
        <div className="w-16 h-16 rounded-2xl bg-white/20 animate-pulse" />
        <div className="w-20 h-7 rounded-full bg-white/20 animate-pulse" />
      </div>

      {/* Title Skeleton */}
      <div className="space-y-2 mb-4">
        <div className="h-5 bg-white/20 rounded-lg animate-pulse w-4/5" />
        <div className="h-5 bg-white/20 rounded-lg animate-pulse w-3/5" />
      </div>

      {/* Description Skeleton */}
      <div className="space-y-2 mb-4">
        <div className="h-3 bg-white/15 rounded animate-pulse w-full" />
        <div className="h-3 bg-white/15 rounded animate-pulse w-4/5" />
      </div>

      {/* Info Grid Skeleton */}
      <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/20">
        <div>
          <div className="h-3 bg-white/15 rounded animate-pulse w-12 mb-2" />
          <div className="h-6 bg-white/20 rounded-lg animate-pulse w-24" />
        </div>
        <div className="text-left">
          <div className="h-3 bg-white/15 rounded animate-pulse w-12 mb-2" />
          <div className="h-5 bg-white/20 rounded-lg animate-pulse w-16" />
        </div>
      </div>
    </GlassContainer>
  );
}
