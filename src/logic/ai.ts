import { ADJACENCY, checkWin, WINNING_LINES } from "./gameRules";

import type { CellValue, Phase, Player } from "../types/game";

const AI: Player = "P2";
const HUMAN: Player = "P1";

// -------------------- MOVE TYPE --------------------

type Move =
  | { type: "place"; position: number }
  | { type: "move"; from: number; to: number };

// -------------------- PHASE --------------------

const getPhaseFromBoard = (board: CellValue[]): Phase =>
  board.filter((c) => c !== null).length >= 6 ? "movement" : "placement";

// -------------------- EVALUATION (AMÉLIORÉE) --------------------

function evaluateBoard(board: CellValue[], player: Player): number {
  const opponent = player === AI ? HUMAN : AI;

  if (checkWin(board, player)) return 1000;
  if (checkWin(board, opponent)) return -1000;

  let score = 0;

  for (const line of WINNING_LINES) {
    const values = line.map((i) => board[i]);

    const pCount = values.filter((v) => v === player).length;
    const oCount = values.filter((v) => v === opponent).length;

    // attaque
    if (pCount > 0 && oCount === 0) {
      if (pCount === 2) score += 200;
      else if (pCount === 1) score += 20;
    }

    // défense
    if (oCount > 0 && pCount === 0) {
      if (oCount === 2) score -= 250;
      else if (oCount === 1) score -= 25;
    }
  }

  // centre très important
  if (board[4] === player) score += 50;
  if (board[4] === opponent) score -= 50;

  return score;
}

// -------------------- MOVES --------------------

function getPlacementMoves(board: CellValue[]): Move[] {
  return board
    .map((v, i) => (v === null ? { type: "place", position: i } : null))
    .filter(Boolean) as Move[];
}

function getMovementMoves(board: CellValue[], player: Player): Move[] {
  const moves: Move[] = [];

  for (let from = 0; from < 9; from++) {
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
  const next = [...board];

  if (move.type === "place") {
    next[move.position] = player;
  } else {
    next[move.from] = null;
    next[move.to] = player;
  }

  return next;
}

// -------------------- MINIMAX CORRIGÉ --------------------

function minimax(
  board: CellValue[],
  depth: number,
  alpha: number,
  beta: number,
  currentPlayer: Player,
  maximizing: boolean,
  aiPlayer: Player,
): number {
  const score = evaluateBoard(board, aiPlayer);

  if (Math.abs(score) >= 1000 || depth === 0) return score;

  const phase = getPhaseFromBoard(board);

  const moves =
    phase === "placement"
      ? getPlacementMoves(board)
      : getMovementMoves(board, currentPlayer);

  if (moves.length === 0) return 0;

  const opponent = aiPlayer === AI ? HUMAN : AI;

  if (maximizing) {
    let best = -Infinity;

    for (const move of moves) {
      const nextBoard = applyMove(board, move, aiPlayer);

      const val = minimax(
        nextBoard,
        depth - 1,
        alpha,
        beta,
        opponent,
        false,
        aiPlayer,
      );

      best = Math.max(best, val);
      alpha = Math.max(alpha, best);

      if (alpha >= beta) break;
    }

    return best;
  }

  let best = Infinity;

  for (const move of moves) {
    const nextBoard = applyMove(board, move, opponent);

    const val = minimax(
      nextBoard,
      depth - 1,
      alpha,
      beta,
      aiPlayer,
      true,
      aiPlayer,
    );

    best = Math.min(best, val);
    beta = Math.min(beta, best);

    if (beta <= alpha) break;
  }

  return best;
}

// -------------------- EASY IA --------------------

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

  const opponent = player === AI ? HUMAN : AI;

  // 1. gagner immédiatement
  for (const move of moves) {
    const next = applyMove(board, move, player);
    if (checkWin(next, player)) return move;
  }

  // 2. bloquer victoire adverse
  for (const move of moves) {
    const next = applyMove(board, move, player);

    const oppMoves =
      phase === "placement"
        ? getPlacementMoves(next)
        : getMovementMoves(next, opponent);

    const danger = oppMoves.some((m) =>
      checkWin(applyMove(next, m, opponent), opponent),
    );

    if (!danger) return move;
  }

  // 3. random
  return moves[Math.floor(Math.random() * moves.length)];
}

// -------------------- MEDIUM IA (MINIMAX) --------------------

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
    const next = applyMove(board, move, player);

    const score = minimax(
      next,
      4,
      -Infinity,
      Infinity,
      opponent,
      false,
      player,
    );

    if (score > bestScore) {
      bestScore = score;
      bestMove = move;
    }
  }

  return bestMove;
}

// -------------------- HARD IA (ALPHA-BETA OPTIMISÉ) --------------------

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

  const opponent = player === AI ? HUMAN : AI;

  // tri des coups (optimisation alpha-beta)
  moves.sort((a, b) => {
    const scoreA = evaluateBoard(applyMove(board, a, player), player);
    const scoreB = evaluateBoard(applyMove(board, b, player), player);
    return scoreB - scoreA;
  });

  let bestMove: Move | null = null;
  let bestScore = -Infinity;

  for (const move of moves) {
    const next = applyMove(board, move, player);

    const score = minimax(
      next,
      7,
      -Infinity,
      Infinity,
      opponent,
      false,
      player,
    );

    if (score > bestScore) {
      bestScore = score;
      bestMove = move;
    }
  }

  return bestMove;
}
