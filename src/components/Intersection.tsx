import type { CellValue } from "../types/game";

export default function Intersection({
  value,
  isSelected,
  x,
  y,
  onClick,
}: {
  value: CellValue;
  isSelected?: boolean;
  x: number;
  y: number;
  onClick: () => void;
}) {
  return (
    <g onClick={onClick} style={{ cursor: "pointer" }}>
      {!value && <circle cx={x} cy={y} r="3.5" fill="#cbbf9b" opacity="0.55" />}

      {value && (
        <>
          <circle
            cx={x}
            cy={y}
            r="7.5"
            fill={value === "P1" ? "#d8191a" : "#1f7a33"}
            filter="url(#piece-shadow)"
          />
          <circle
            cx={x}
            cy={y}
            r="7.5"
            fill="none"
            stroke={
              isSelected ? (value === "P1" ? "#d8191a" : "#1f7a33") : "#fff"
            }
            strokeWidth={isSelected ? "2.5" : "1.8"}
          />
        </>
      )}
    </g>
  );
}
