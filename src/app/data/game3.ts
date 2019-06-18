import lordsJson from '../../lords.json';
import {Game} from '../models/Game';
import {Board} from '../models/Board';
import {Lord} from '../models/Lord';
import {B, R, U} from './lords';

const board: Board = new Board([
  U, U, U, U, U, U, U, U, B, U,
  U, U, U, U, U, U, U, B, B, B,
  U, U, U, U, U, U, U, U, B, U,
  U, U, U, U, U, U, U, U, U, U,
  U, U, U, U, U, U, U, U, U, U,
  U, U, U, U, U, U, U, U, U, U,
  U, U, U, U, U, U, U, U, U, U,
  U, R, U, U, U, U, U, U, U, U,
  R, R, R, U, U, U, U, U, U, U,
  U, R, U, U, U, U, U, U, U, U
], [
  'p', 'p', 'p', 'p', 'f', 'f', 'f', 'p', 'p', 'p',
  'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p', 's', 'p',
  'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p',
  'p', 'p', 'p', 'p', 'h', 'h', 'p', 'p', 'p', 'w',
  'f', 'p', 'p', 'h', 'm', 'm', 'h', 'p', 'p', 'w',
  'f', 'p', 'p', 'h', 'm', 'm', 'h', 'f', 'p', 'p',
  'f', 'p', 'p', 'p', 'h', 'h', 'p', 'f', 'p', 'p',
  'p', 'p', 'p', 'p', 'p', 'p', 'p', 'f', 'p', 'p',
  'p', 's', 'p', 'p', 'w', 'p', 'p', 'p', 'p', 'p',
  'p', 'p', 'p', 'p', 'w', 'p', 'p', 'p', 'p', 'p'
]);

const lords: Lord[] = lordsJson.map(lordJson => new Lord(lordJson.id, lordJson.name, lordJson.color, lordJson.treasure, board));

export const game3: Game = new Game(board, lords);
