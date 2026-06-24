import { ADJACENCY, checkWin, WINNING_LINES } from './gameRules';

import type { CellValue, Phase, Player } from "../types/game";

const AI: Player = "P2";
const HUMAN: Player = "P1";

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

const getPhaseFromBoard = (board: CellValue[]): Phase =>
  board.filter((cell) => cell !== null).length >= 6 ? "movement" : "placement";

const evaluateBoard = (
  board: CellValue[],
  maximizingPlayer: Player,
): number => {
  const opponent = maximizingPlayer === AI ? HUMAN : AI;

  if (checkWin(board, maximizingPlayer)) return 1000;
  if (checkWin(board, opponent)) return -1000;

  return WINNING_LINES.reduce((score, line) => {
    const values = line.map((index) => board[index]);
    const playerCount = values.filter(
      (value) => value === maximizingPlayer,
    ).length;
    const opponentCount = values.filter((value) => value === opponent).length;

    if (playerCount > 0 && opponentCount === 0) {
      return score + playerCount * 12;
    }

    if (opponentCount > 0 && playerCount === 0) {
      return score - opponentCount * 12;
    }

    return score;
  }, 0);
};

function getPlacementMoves(board: CellValue[], player: Player): Move[] {
  const pieces = board.filter((cell) => cell === player).length;
  if (pieces >= 3) return [];

  return board
    .map((value, position) =>
      value === null ? { type: "place" as const, position } : null,
    )
    .filter(
      (move): move is { type: "place"; position: number } => move !== null,
    );
}

function getMovementMoves(board: CellValue[], player: Player): Move[] {
  const moves: Move[] = [];

  for (let from = 0; from < board.length; from++) {
    if (board[from] !== player) continue;

    for (const to of ADJACENCY[from]) {
      if (board[to] === null) {
        moves.push({ type: "move", from, to });
      }
    }
  }

  return moves;
}

function applyMove(
  board: CellValue[],
  move: Move,
  player: Player,
): CellValue[] {
  const nextBoard = [...board];

  if (move.type === "place") {
    nextBoard[move.position] = player;
  } else {
    nextBoard[move.from] = null;
    nextBoard[move.to] = player;
  }

  return nextBoard;
}

function minimax(
  board: CellValue[],
  depth: number,
  alpha: number,
  beta: number,
  player: Player,
  maximizing: boolean,
): number {
  const score = evaluateBoard(board, player);

  if (Math.abs(score) >= 1000 || depth === 0) {
    return score;
  }

  const phase = getPhaseFromBoard(board);
  const moves =
    phase === "placement"
      ? getPlacementMoves(board, player)
      : getMovementMoves(board, player);

  if (moves.length === 0) {
    return 0;
  }

  const nextPlayer = player === AI ? HUMAN : AI;

  if (maximizing) {
    let best = -Infinity;

    for (const move of moves) {
      const nextBoard = applyMove(board, move, player);
      best = Math.max(
        best,
        minimax(nextBoard, depth - 1, alpha, beta, nextPlayer, false),
      );
      alpha = Math.max(alpha, best);
      if (alpha >= beta) {
        break;
      }
    }

    return best;
  }

  let best = Infinity;

  for (const move of moves) {
    const nextBoard = applyMove(board, move, player);
    best = Math.min(
      best,
      minimax(nextBoard, depth - 1, alpha, beta, nextPlayer, true),
    );
    beta = Math.min(beta, best);
    if (beta <= alpha) {
      break;
    }
  }

  return best;
}

export function aiEasy(
  board: CellValue[],
  phase: Phase,
  player: Player,
): Move | null {
  const moves =
    phase === "placement"
      ? getPlacementMoves(board)
      : getMovementMoves(board, player);

  if (moves.length === 0) return null;
  return moves[Math.floor(Math.random() * moves.length)];
}

export function aiMedium(
  board: CellValue[],
  phase: Phase,
  player: Player,
): Move | null {
  const moves =
    phase === "placement"
      ? getPlacementMoves(board)
      : getMovementMoves(board, player);

  if (moves.length === 0) return null;

  let bestMove: Move | null = null;
  let bestScore = -Infinity;

  const opponent = player === AI ? HUMAN : AI;

  for (const move of moves) {
    const newBoard = applyMove(board, move, player);
    const score = minimax(newBoard, 3, -Infinity, Infinity, opponent, false);

    if (score > bestScore) {
      bestScore = score;
      bestMove = move;
    }
  }

  return bestMove;
}

export function aiHard(
  board: CellValue[],
  phase: Phase,
  player: Player,
): Move | null {
  const moves =
    phase === "placement"
      ? getPlacementMoves(board)
      : getMovementMoves(board, player);

  if (moves.length === 0) return null;

  let bestMove: Move | null = null;
  let bestScore = -Infinity;

  const opponent = player === AI ? HUMAN : AI;

  for (const move of moves) {
    const newBoard = applyMove(board, move, player);
    const score = minimax(newBoard, 6, -Infinity, Infinity, opponent, false);

    if (score > bestScore) {
      bestScore = score;
      bestMove = move;
    }
  }

  return bestMove;
}
