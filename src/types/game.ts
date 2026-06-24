export type Player = "P1" | "P2";
export type CellValue = Player | null;
export type Phase = "placement" | "movement" | "draw";
export type GameMode = "1 sy 1" | "1 sy IA" | "IA sy IA";

export type GameState = {
  board: CellValue[];
  currentPlayer: Player;
  phase: Phase;
  winner: Player | null;
};

export type GameState = {
  board: CellValue[];
  currentPlayer: Player;
  phase: Phase;
  selectedPiece: number | null;
  winner: Player | null;
};
