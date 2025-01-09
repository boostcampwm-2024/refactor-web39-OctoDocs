interface SkeletonProps {
  className: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div className={className}>
      <div className="h-full animate-pulse bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
    </div>
  );
}
