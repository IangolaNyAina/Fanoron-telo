import type { GameMode } from "../types/game";
import { FiUser } from 'react-icons/fi';
import { LuBot } from 'react-icons/lu';

type Difficulty = "easy" | "medium" | "hard";

export default function ModeSelector({
  mode,
  setMode,
  difficulty,
  setDifficulty,
}: {
  mode: GameMode;
  setMode: (m: GameMode) => void;

  difficulty: Difficulty;
  setDifficulty: (d: Difficulty) => void;
}) {
  const modes: GameMode[] = ["1 sy 1", "1 sy IA", "IA sy IA"];

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
                <FiUser size={16} />
                sy
                <FiUser size={16} />
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
                <FiUser size={16} />
                sy
                <LuBot size={18} />
              </span>
            ) : m === "IA sy IA" ? (
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  fontWeight: 300,
                  gap: "8px",
                }}
              >
                <LuBot size={18} />
                sy
                <LuBot size={18} />
              </span>
            ) : (
              m
            )}
          </button>
        ))}
      </div>

      {mode !== "1 sy 1" && (
        <div style={{ marginTop: "16px", textAlign: "center" }}>
          <div>
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
              onChange={(e) =>
                setDifficulty(e.target.value as "easy" | "medium" | "hard")
              }
              style={{
                marginTop: "6px",
                padding: "10px 12px",
                borderRadius: "8px",
                border: "1px solid #ddd",
                cursor: "pointer",
                fontWeight: 500,
                fontSize: "14px",
                background: "#fff",
                color: "#111",
                minWidth: 160,
                paddingRight: 28,
                boxShadow: "0 2px 4px rgba(0,0,0,0.06)",
              }}
            >
              {mode === "1 sy IA" ? (
                <>
                  <option value="easy">Mora</option>
                  <option value="medium">Eo ho eo</option>
                </>
              ) : (
                <option value="hard">Sarotra</option>
              )}
            </select>
          </div>
        </div>
      )}
    </div>
  );
}
