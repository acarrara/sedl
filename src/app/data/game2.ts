import lordsJson from '../../lords.json';
import {Game} from '../models/Game';
import {Board} from '../models/Board';
import {Lord} from '../models/Lord';
import {B, G, R, U, V} from './lords';

export const world2 = [
  'h', 'p', 'p', 'p', 'f', 'f', 'w', 'p', 'p', 'h', 'm', 'm',
  'h', 'h', 'p', 's', 'f', 'f', 'w', 'p', 'p', 'h', 'm', 'h',
  'm', 'h', 'p', 'p', 'w', 'w', 'w', 'p', 'p', 'p', 'h', 'h',
  'm', 'm', 'h', 'p', 'w', 'p', 'p', 'p', 'p', 'p', 'p', 'h',
  'h', 'h', 'h', 'p', 'p', 'p', 'p', 'p', 'p', 'p', 's', 'p',
  'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p',
  'p', 'p', 'p', 'p', 'p', 'p', 'p', 'w', 'p', 'f', 'f', 'p',
  'p', 's', 'p', 'p', 'p', 'p', 'p', 'w', 'p', 'f', 'p', 'p',
  'f', 'p', 'p', 'p', 'p', 'p', 'p', 'w', 'p', 'p', 'p', 'p',
  'f', 'f', 'f', 'p', 'p', 'p', 'p', 'w', 'p', 'p', 'p', 'h',
  'p', 'p', 'p', 'p', 'p', 'w', 'w', 'w', 'p', 's', 'p', 'h',
  'p', 'p', 'p', 'p', 'p', 'w', 'p', 'p', 'p', 'p', 'p', 'p'
];
const board: () => Board = () => new Board([
  U, U, U, V, U, U, U, U, U, U, U, U,
  U, U, V, V, V, U, U, U, U, U, U, U,
  U, U, U, V, U, U, U, U, U, U, U, U,
  U, U, U, U, U, U, U, U, U, U, B, U,
  U, U, U, U, U, U, U, U, U, B, B, B,
  U, U, U, U, U, U, U, U, U, U, B, U,
  U, R, U, U, U, U, U, U, U, U, U, U,
  R, R, R, U, U, U, U, U, U, U, U, U,
  U, R, U, U, U, U, U, U, U, U, U, U,
  U, U, U, U, U, U, U, U, U, G, U, U,
  U, U, U, U, U, U, U, U, G, G, G, U,
  U, U, U, U, U, U, U, U, U, G, U, U
], [...world2]);

const lords: (newBoard) => Lord[] =
  (newBoard: Board) => lordsJson.map(lordJson => new Lord(lordJson.id, lordJson.name, lordJson.color, lordJson.treasure, newBoard));

export const game2: () => Game = () => {
  const newBoard = board();
  return new Game(newBoard, lords(newBoard));
};

