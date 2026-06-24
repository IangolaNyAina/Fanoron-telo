import { useCallback, useEffect, useState } from 'react';

import { aiEasy, aiHard, aiMedium } from '../logic/ai';
import { ADJACENCY, checkDraw, checkWin } from '../logic/gameRules';

import type {
  CellValue,
  GameMode,
  GameState,
  Phase,
  Player,
} from "../types/game";

type Difficulty = "easy" | "medium" | "hard";

type Move =
  | {
      type: "place";
      position: number;
    }
  | {
      type: "move";
      from: number;
      to: number;
    };

const initialBoard: CellValue[] = Array(9).fill(null);

const createInitialState = (): GameState => ({
  board: [...initialBoard],
  currentPlayer: "P1",
  phase: "placement",
  winner: null,
});

const getPhaseFromBoard = (board: CellValue[]): Phase =>
  board.filter((cell) => cell !== null).length >= 6 ? "movement" : "placement";

const nextPlayer = (player: Player): Player => (player === "P1" ? "P2" : "P1");

const getStateAfterMove = (
  state: GameState,
  move: Move,
  player: Player,
): GameState => {
  const board = [...state.board];

  if (move.type === "place") {
    board[move.position] = player;
  } else {
    board[move.from] = null;
    board[move.to] = player;
  }

  const winner = checkWin(board, player);
  if (winner) {
    return {
      board,
      currentPlayer: player,
      phase: state.phase,
      winner,
    };
  }

  const next = nextPlayer(player);
  const phase =
    state.phase === "movement" || getPhaseFromBoard(board) === "movement"
      ? "movement"
      : "placement";

  if (phase === "movement" && checkDraw(board, next)) {
    return {
      board,
      currentPlayer: next,
      phase: "draw",
      winner: null,
    };
  }

  return {
    board,
    currentPlayer: next,
    phase,
    winner: null,
  };
};

const isHumanTurn = (gameMode: GameMode, currentPlayer: Player) =>
  gameMode === "1 sy 1" || (gameMode === "1 sy IA" && currentPlayer === "P1");

export const useGame = () => {
  const [gameMode, setGameModeState] = useState<GameMode>("1 sy 1");
  const [difficultyState, setDifficultyState] = useState<Difficulty>("medium");
  const [history, setHistory] = useState<GameState[]>([createInitialState()]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [selectedPiece, setSelectedPiece] = useState<number | null>(null);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const state = history[historyIndex];
  const { board, currentPlayer, phase, winner } = state;

  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;
  const hasStarted = Boolean(startTime);
  const isGameEnded = winner !== null || phase === "draw";

  const resetGame = (
    mode: GameMode = gameMode,
    difficulty: Difficulty = difficultyState,
  ) => {
    setHistory([createInitialState()]);
    setHistoryIndex(0);
    setSelectedPiece(null);
    setStartTime(null);
    setElapsedSeconds(0);
    setIsPaused(false);
    setGameModeState(mode);
    setDifficultyState(
      mode === "IA sy IA" ? "hard" : mode === "1 sy 1" ? "medium" : difficulty,
    );
  };

  const setGameMode = (mode: GameMode) => {
    resetGame(mode, mode === "IA sy IA" ? "hard" : difficultyState);
  };

  const setDifficulty = (difficulty: Difficulty) => {
    resetGame(gameMode, difficulty);
  };

  const pauseGame = () => {
    if (!hasStarted || isGameEnded) return;
    setIsPaused((current) => !current);
  };

  const pushState = (newState: GameState) => {
    setHistory((previousHistory) => {
      const nextHistory = previousHistory.slice(0, historyIndex + 1);
      return [...nextHistory, newState];
    });
    setHistoryIndex((index) => index + 1);
    setSelectedPiece(null);
  };

  const undo = () => {
    if (!canUndo) return;
    setHistoryIndex((index) => index - 1);
    setSelectedPiece(null);
  };

  const redo = () => {
    if (!canRedo) return;
    setHistoryIndex((index) => index + 1);
    setSelectedPiece(null);
  };

  const applyMove = (move: Move, player: Player) => {
    if (isPaused) return;
    if (!startTime) {
      setStartTime(Date.now());
    }
    const nextState = getStateAfterMove(state, move, player);
    pushState(nextState);
  };

  const handleClick = useCallback(
    (index: number) => {
      if (winner || phase === "draw") return;
      if (!isHumanTurn(gameMode, currentPlayer)) return;

      if (phase === "placement") {
        if (board[index]) return;

        const existingPieces = board.filter(
          (cell) => cell === currentPlayer,
        ).length;
        if (existingPieces >= 3) return;

        applyMove({ type: "place", position: index }, currentPlayer);
        return;
      }

      if (phase === "movement") {
        if (board[index] === currentPlayer) {
          setSelectedPiece((current) => (current === index ? null : index));
          return;
        }

        if (selectedPiece === null) return;
        if (board[index] !== null) return;
        if (!ADJACENCY[selectedPiece].includes(index)) return;

        applyMove(
          { type: "move", from: selectedPiece, to: index },
          currentPlayer,
        );
      }
    },
    [board, currentPlayer, phase, selectedPiece, winner, gameMode],
  );

  useEffect(() => {
    if (winner || phase === "draw" || isPaused) return;
    if (gameMode === "1 sy 1") return;

    const isAITurn =
      gameMode === "IA sy IA" ||
      (gameMode === "1 sy IA" && currentPlayer === "P2");

    if (!isAITurn) return;

    const delay = gameMode === "IA sy IA" ? 900 : 700;

    const timer = setTimeout(() => {
      const move =
        difficultyState === "easy"
          ? aiEasy(board, phase, currentPlayer)
          : difficultyState === "medium"
            ? aiMedium(board, phase, currentPlayer)
            : aiHard(board, phase, currentPlayer);

      if (!move) return;

      applyMove(move, currentPlayer);
    }, delay);

    return () => clearTimeout(timer);
  }, [
    board,
    currentPlayer,
    gameMode,
    phase,
    winner,
    difficultyState,
    isPaused,
  ]);

  useEffect(() => {
    if (!startTime || isPaused || winner || phase === "draw") return;

    const interval = setInterval(() => {
      setElapsedSeconds(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime, isPaused, winner, phase]);

  return {
    board,
    currentPlayer,
    phase,
    winner,
    gameMode,
    selectedPiece,
    difficulty: difficultyState,
    elapsedSeconds,
    hasStarted,
    setGameMode,
    setDifficulty,
    handleClick,
    resetGame,
    undo,
    redo,
    canUndo,
    canRedo,
    isPaused,
    pauseGame,
  };
};
