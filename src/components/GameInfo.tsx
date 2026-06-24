import type { Player, Phase, GameMode } from "../types/game";
import { FiUser, FiZap } from "react-icons/fi";

const getPlayerColorName = (player: Player): string => {
  return player === "P1" ? "rouge" : "bleu";
};

const getPlayerColorCode = (player: Player): string => {
  return player === "P1" ? "#d8191a" : "#2563eb";
};

export default function GameInfo({
  winner,
  phase,
  player,
  gameMode,
}: {
  winner: Player | null;
  phase: Phase;
  player: Player;
  gameMode?: string;
}) {
  const getPlayerIcon = (p: Player, mode?: GameMode) => {
    if (mode === "1 sy 1") return <FiUser size={18} />;
    if (mode === "IA sy IA") return <FiZap size={18} />;
    return p === "P1" ? <FiUser size={18} /> : <FiZap size={18} />;
  };

  const colorName = getPlayerColorName(player);
  const colorCode = getPlayerColorCode(player);

  return (
    <div
      style={{
        padding: "12px 16px",
        borderRadius: "8px",
        textAlign: "center",
        fontWeight: 600,
        letterSpacing: "0.5px",
        color: "#1a1a1a",
        fontSize: "15px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
      }}
    >
      {phase === "draw" ? (
        <span style={{ color: "#666" }}>Match nul</span>
      ) : winner ? (
        <span style={{ color: "#1a1a1a" }}>
          {getPlayerColorName(winner).charAt(0).toUpperCase() +
            getPlayerColorName(winner).slice(1)}{" "}
          a gagné
        </span>
      ) : (
        <>
          {getPlayerIcon(player, gameMode)}
          <span style={{ color: colorCode }}>Tour du {colorName}</span>
        </>
      )}
    </div>
  );
}
