import type { CellValue } from "../types/game";
import Intersection from './Intersection';

export default function Board({
  board,
  selectedPiece,
  onClick,
}: {
  board: CellValue[];
  selectedPiece: number | null;
  onClick: (i: number) => void;
}) {
  const positions = [
    { x: 15, y: 15 },
    { x: 50, y: 15 },
    { x: 85, y: 15 },
    { x: 15, y: 50 },
    { x: 50, y: 50 },
    { x: 85, y: 50 },
    { x: 15, y: 85 },
    { x: 50, y: 85 },
    { x: 85, y: 85 },
  ];

  return (
    <div
      style={{
        width: 420,
        height: 420,
        background: "#fff",
        borderRadius: 12,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
        border: "1px solid #e7e1d8",
      }}
    >
      <svg viewBox="0 0 100 100" style={{ width: "96%", height: "96%" }}>
        <defs>
          <filter
            id="piece-shadow"
            x="-40%"
            y="-40%"
            width="180%"
            height="180%"
          >
            <feDropShadow
              dx="0"
              dy="2"
              stdDeviation="1.4"
              floodColor="#000"
              floodOpacity="0.16"
            />
          </filter>
        </defs>
        <line
          x1="15"
          y1="15"
          x2="85"
          y2="15"
          stroke="#8b7355"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <line
          x1="15"
          y1="50"
          x2="85"
          y2="50"
          stroke="#8b7355"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <line
          x1="15"
          y1="85"
          x2="85"
          y2="85"
          stroke="#8b7355"
          strokeWidth="1.4"
          strokeLinecap="round"
        />

        <line
          x1="15"
          y1="15"
          x2="15"
          y2="85"
          stroke="#8b7355"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <line
          x1="50"
          y1="15"
          x2="50"
          y2="85"
          stroke="#8b7355"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <line
          x1="85"
          y1="15"
          x2="85"
          y2="85"
          stroke="#8b7355"
          strokeWidth="1.4"
          strokeLinecap="round"
        />

        <line
          x1="15"
          y1="15"
          x2="85"
          y2="85"
          stroke="#8b7355"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <line
          x1="85"
          y1="15"
          x2="15"
          y2="85"
          stroke="#8b7355"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <line
          x1="15"
          y1="85"
          x2="85"
          y2="85"
          stroke="#8b7355"
          strokeWidth="1.2"
        />

        <line
          x1="15"
          y1="15"
          x2="15"
          y2="85"
          stroke="#8b7355"
          strokeWidth="1.2"
        />
        <line
          x1="50"
          y1="15"
          x2="50"
          y2="85"
          stroke="#8b7355"
          strokeWidth="1.2"
        />
        <line
          x1="85"
          y1="15"
          x2="85"
          y2="85"
          stroke="#8b7355"
          strokeWidth="1.2"
        />

        <line
          x1="15"
          y1="15"
          x2="85"
          y2="85"
          stroke="#8b7355"
          strokeWidth="1.2"
        />
        <line
          x1="85"
          y1="15"
          x2="15"
          y2="85"
          stroke="#b49d7d"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* POINTS */}
        {board.map((cell, i) => (
          <Intersection
            key={i}
            value={cell}
            x={positions[i].x}
            y={positions[i].y}
            isSelected={selectedPiece === i}
            onClick={() => onClick(i)}
          />
        ))}
      </svg>
    </div>
  );
}
