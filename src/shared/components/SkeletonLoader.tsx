import React from "react";
import "./SkeletonLoader.css";

type Props = {
  rows?: number;
  columns?: number;
  rowHeight?: number; // px
  gap?: number; // px
  borderRadius?: number; // px
  className?: string;
};

const SkeletonLoader: React.FC<Props> = ({
  rows = 5,
  columns = 1,
  rowHeight = 20,
  gap = 12,
  borderRadius = 4,
  className = "",
}) => {
  const total = rows * columns;

  const gridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gap: `${gap}px`,
  };

  const itemStyle: React.CSSProperties = {
    height: `${rowHeight}px`,
    borderRadius: `${borderRadius}px`,
  };

  return (
    <div className={`skeleton-loader ${className}`}>
      <div className="skeleton-grid" style={gridStyle}>
        {Array.from({ length: total }).map((_, i) => (
          <div key={i} className="skeleton-item">
            <div className="skeleton-shimmer" style={itemStyle} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkeletonLoader;
