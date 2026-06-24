import type { GameMode } from "../types/game";
import { FiUser } from "react-icons/fi";
import { LuBot } from "react-icons/lu";

type Difficulty = "easy" | "medium" | "hard";

export default function ModeSelector({
  mode,
  setMode,
  difficulty,
  setDifficulty,
  difficultyP1,
  difficultyP2,
  setDifficultyForPlayer,
}: {
  mode: GameMode;
  setMode: (m: GameMode) => void;
  difficulty: Difficulty;
  setDifficulty: (d: Difficulty) => void;
  difficultyP1: Difficulty;
  difficultyP2: Difficulty;
  setDifficultyForPlayer: (player: "P1" | "P2", d: Difficulty) => void;
}) {
  const modes: GameMode[] = ["1 sy 1", "1 sy IA", "IA sy IA"];

  const difficultyOptions = [
    { value: "easy", label: "Mora" },
    { value: "medium", label: "Eo ho eo" },
    { value: "hard", label: "Sarotra" },
  ];

  const selectStyle = {
    marginTop: "6px",
    padding: "10px 12px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    cursor: "pointer",
    fontWeight: 500,
    fontSize: "14px",
    background: "#fff",
    color: "#111",
    minWidth: 140,
    boxShadow: "0 2px 4px rgba(0,0,0,0.06)",
  };

  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          display: "flex",
          gap: "12px",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {modes.map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            style={{
              padding: "10px 16px",
              borderRadius: "8px",
              border: "1px solid",
              borderColor: mode === m ? "#0d8352" : "#ddd",
              cursor: "pointer",
              fontWeight: 700,
              fontSize: "14px",
              background: mode === m ? "#0d8352" : "#fff",
              color: mode === m ? "#fff" : "#1f2937",
              transform: mode === m ? "scale(1.02)" : "scale(1)",
              transition: "0.2s",
              boxShadow:
                mode === m
                  ? "0 6px 18px rgba(30, 64, 175, 0.12)"
                  : "0 1px 3px rgba(0,0,0,0.06)",
            }}
          >
            {m === "1 sy 1" ? (
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  fontWeight: 300,
                  gap: "8px",
                }}
              >
                <FiUser size={16} /> sy <FiUser size={16} />
              </span>
            ) : m === "1 sy IA" ? (
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  fontWeight: 300,
                  gap: "8px",
                }}
              >
                <FiUser size={16} /> sy <LuBot size={18} />
              </span>
            ) : (
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  fontWeight: 300,
                  gap: "8px",
                }}
              >
                <LuBot size={18} /> sy <LuBot size={18} />
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Mode 1 sy IA: single difficulty selector */}
      {mode === "1 sy IA" && (
        <div style={{ marginTop: "16px", textAlign: "center" }}>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: 700,
              color: "#1a1a1a",
              fontSize: "14px",
            }}
          >
            Safidy hoan'ny fahasarotana
          </label>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value as Difficulty)}
            style={selectStyle}
          >
            <option value="easy">Mora</option>
            <option value="medium">Eo ho eo</option>
          </select>
        </div>
      )}

      {/* Mode IA sy IA: separate difficulty per AI player */}
      {mode === "IA sy IA" && (
        <div
          style={{
            marginTop: "16px",
            display: "flex",
            gap: "24px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {/* P1 (mena/rouge) */}
          <div style={{ textAlign: "center" }}>
            <label
              style={{
                display: "block",
                marginBottom: "6px",
                fontWeight: 700,
                color: "#d8191a",
                fontSize: "14px",
              }}
            >
              <LuBot size={14} />
              IA Mena (P1)
            </label>
            <select
              value={difficultyP1}
              onChange={(e) =>
                setDifficultyForPlayer("P1", e.target.value as Difficulty)
              }
              style={{ ...selectStyle, borderColor: "#d8191a33" }}
            >
              {difficultyOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>

          {/* P2 (maitso/vert) */}
          <div style={{ textAlign: "center" }}>
            <label
              style={{
                display: "block",
                marginBottom: "6px",
                fontWeight: 700,
                color: "#0d8352",
                fontSize: "14px",
              }}
            >
              <LuBot size={14} />
              IA Maitso (P2)
            </label>
            <select
              value={difficultyP2}
              onChange={(e) =>
                setDifficultyForPlayer("P2", e.target.value as Difficulty)
              }
              style={{ ...selectStyle, borderColor: "#0d835233" }}
            >
              {difficultyOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
}
