import type { CellValue, Player } from "../types/game";

export const ADJACENCY: Record<number, number[]> = {
  0: [1, 3, 4],
  1: [0, 2, 4],
  2: [1, 4, 5],
  3: [0, 4, 6],
  4: [0, 1, 2, 3, 5, 6, 7, 8],
  5: [2, 4, 8],
  6: [3, 4, 7],
  7: [6, 4, 8],
  8: [5, 4, 7],
};

export const WINNING_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export const checkWin = (board: CellValue[], player: Player) =>
  WINNING_LINES.some((line) => line.every((i) => board[i] === player));

export const checkDraw = (board: CellValue[], player: Player) => {
  const pieces = board
    .map((v, i) => (v === player ? i : null))
    .filter((v): v is number => v !== null);

  return !pieces.some((p) => ADJACENCY[p].some((n) => board[n] === null));
};
