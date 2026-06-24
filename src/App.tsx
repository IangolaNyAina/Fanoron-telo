import { useEffect, useRef, useState } from "react";
import { FiPause, FiPlay, FiRotateCcw, FiRotateCw } from "react-icons/fi";

import Board from "./components/Board";
import GameInfo from "./components/GameInfo";
import ModeSelector from "./components/ModeSelector";
import { useGame } from "./hooks/useGame";

export default function App() {
  const game = useGame();
  const [wins, setWins] = useState<{
    "1 sy 1": { P1: number; P2: number };
    "1 sy IA": { P1: number; P2: number };
    "IA sy IA": { P1: number; P2: number };
  }>({
    "1 sy 1": { P1: 0, P2: 0 },
    "1 sy IA": { P1: 0, P2: 0 },
    "IA sy IA": { P1: 0, P2: 0 },
  });

  const lastRecorded = useRef<{ mode?: string; winner?: string }>({});

  useEffect(() => {
    if (!game.winner) return;
    const mode = game.gameMode || "1 sy 1";
    if (
      lastRecorded.current.mode === mode &&
      lastRecorded.current.winner === game.winner
    )
      return;
    setWins((prev) => ({
      ...prev,
      [mode]: {
        ...prev[mode as keyof typeof prev],
        [game.winner as string]:
          prev[mode as keyof typeof prev][game.winner as "P1" | "P2"] + 1,
      },
    }));
    lastRecorded.current = { mode, winner: game.winner };
  }, [game.winner, game.gameMode]);

  return (
    <div style={styles.container}>
      <div style={styles.navbar}>
        <h1 style={styles.title}>Fanoron-telo</h1>
        <p style={styles.subtitle}>
          Lalao hevitra malagasy • Mampifandray ny rehetra
        </p>
      </div>
      <div style={styles.panel}>
        <ModeSelector
          mode={game.gameMode}
          setMode={game.setGameMode}
          difficulty={game.difficulty}
          setDifficulty={game.setDifficulty}
          difficultyP1={game.difficultyP1}
          difficultyP2={game.difficultyP2}
          setDifficultyForPlayer={game.setDifficultyForPlayer}
        />
      </div>

      <div style={styles.infoBox}>
        <GameInfo
          winner={game.winner}
          phase={game.phase}
          player={game.currentPlayer}
          gameMode={game.gameMode}
        />
      </div>

      {game.hasStarted && (
        <div style={styles.timerBox}>
          <span style={styles.timerLabel}>Fotoana :</span>
          <span style={styles.timerValue}>
            {Math.floor(game.elapsedSeconds / 60)}:
            {String(game.elapsedSeconds % 60).padStart(2, "0")}
          </span>
        </div>
      )}

      <div
        style={{
          display: "flex",
          gap: 20,
          alignItems: "flex-start",
          marginBottom: 24,
        }}
      >
        <div style={styles.boardWrapper}>
          <Board
            board={game.board}
            selectedPiece={game.selectedPiece}
            onClick={game.handleClick}
            currentPlayer={game.currentPlayer}
            phase={game.phase}
          />
        </div>
      </div>

      <div style={styles.controls}>
        <button
          style={{
            ...styles.controlButton,
            opacity: game.canUndo ? 1 : 0.4,
            cursor: game.canUndo ? "pointer" : "not-allowed",
          }}
          onClick={game.undo}
          disabled={!game.canUndo}
          title="Undo"
        >
          <FiRotateCcw size={18} />
        </button>
        <button
          style={{
            ...styles.controlButton,
            opacity: game.canRedo ? 1 : 0.4,
            cursor: game.canRedo ? "pointer" : "not-allowed",
          }}
          onClick={game.redo}
          disabled={!game.canRedo}
          title="Redo"
        >
          <FiRotateCw size={18} />
        </button>
        <button
          style={{
            ...styles.controlButton,
            opacity: game.hasStarted ? 1 : 0.4,
            cursor: game.hasStarted ? "pointer" : "not-allowed",
          }}
          onClick={game.pauseGame}
          disabled={!game.hasStarted}
          title={game.isPaused ? "Reprendre" : "Pause"}
        >
          {game.isPaused ? <FiPlay size={18} /> : <FiPause size={18} />}
        </button>
      </div>

      <button style={styles.reset} onClick={() => game.resetGame()}>
        AVERINA
      </button>
    </div>
  );
}

/* ================= STYLES ================= */

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: '"Segoe UI", Roboto, sans-serif',
    background: "#f8f9fa",
  },
  navbar: {
    width: "100%",
    height: "50px",
    padding: "20px",
    backgroundColor: "#ffffff",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
  },
  header: {
    textAlign: "center",
    marginBottom: "30px",
  },
  title: {
    margin: 0,
    fontSize: "32px",
    fontWeight: 900,
    color: "#0d8352",
    letterSpacing: "0.5px",
  },
  subtitle: {
    marginTop: "8px",
    fontSize: "14px",
    color: "#0d8352",
    fontWeight: 500,
  },
  panel: {
    width: "100%",
    margin: "20px 24px",
    gap: "12px",
  },
  infoBox: {
    width: "100%",
    maxWidth: "400px",
    background: "#fff",
    padding: "14px",
    borderRadius: "8px",
    textAlign: "center",
    marginBottom: "20px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  },
  boardWrapper: {
    width: "420px",
    height: "420px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "24px",
  },
  controls: {
    display: "flex",
    gap: "12px",
    marginBottom: "16px",
    width: "100%",
    maxWidth: "400px",
  },
  controlButton: {
    flex: 1,
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    background: "#fff",
    color: "#1a1a1a",
    fontWeight: 600,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
    transition: "all 0.2s",
  },
  timerBox: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
    marginBottom: "16px",
    fontSize: "14px",
    color: "#1a1a1a",
  },
  timerLabel: {
    fontWeight: 600,
  },
  timerValue: {
    fontFamily: "monospace",
    fontSize: "16px",
    fontWeight: 700,
    color: "#0d8352",
  },
  reset: {
    width: "100%",
    maxWidth: "400px",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #0d8352",
    background: "#fff",
    color: "#0d8352",
    fontWeight: 700,
    fontSize: "16px",
    cursor: "pointer",
    boxShadow: "0 3px 8px rgba(102, 126, 234, 0.15)",
    transition: "all 0.2s",
  },
};
