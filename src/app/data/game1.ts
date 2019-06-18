import lordsJson from '../../lords.json';
import {Game} from '../models/Game';
import {Board} from '../models/Board';
import {Lord} from '../models/Lord';
import {B, R, U} from './lords';

const board: Board = new Board([
  U, U, U, U, U, U, U, U, U, U, U, U, U, U, U, U,
  U, U, U, U, U, U, U, U, U, U, U, U, U, U, U, U,
  U, U, U, U, U, U, U, U, U, U, U, U, U, U, U, U,
  U, U, U, U, U, U, U, U, U, U, U, U, U, U, U, U,
  U, U, U, U, U, U, U, U, U, U, U, U, U, U, U, U,
  U, U, U, U, U, U, U, U, U, U, U, U, U, U, U, U,
  U, U, U, U, U, U, U, U, U, U, U, U, U, U, U, U,
  U, U, U, U, U, U, U, U, U, U, U, U, U, B, U, U,
  U, U, U, U, U, U, U, U, U, U, U, U, B, B, B, U,
  U, U, U, U, R, U, U, U, U, U, U, U, U, B, U, U,
  U, U, U, R, R, R, U, U, U, U, U, U, U, U, U, U,
  U, U, U, U, R, U, U, U, U, U, U, U, U, U, U, U,
  U, U, U, U, U, U, U, U, U, U, U, U, U, U, U, U,
  U, U, U, U, U, U, U, U, U, U, U, U, U, U, U, U,
  U, U, U, U, U, U, U, U, U, U, U, U, U, U, U, U,
  U, U, U, U, U, U, U, U, U, U, U, U, U, U, U, U,
], [
  'w', 'p', 'p', 'h', 'h', 'm', 'm', 'm', 'm', 'm', 'm', 'h', 'p', 'p', 'p', 'p',
  'w', 'p', 'p', 'h', 'm', 'm', 'm', 'm', 'm', 'm', 'h', 'h', 'p', 'p', 'f', 'f',
  'w', 'w', 'p', 'h', 'm', 'm', 'h', 'm', 'm', 'm', 'h', 'h', 'p', 'p', 'p', 'p',
  'w', 'w', 'p', 'h', 'h', 'h', 'h', 'h', 'h', 'h', 'h', 'p', 'f', 'f', 'p', 'p',
  'w', 'w', 'p', 'p', 'p', 'h', 'h', 'p', 'h', 'p', 'h', 'p', 'f', 'f', 'f', 'p',
  'w', 'w', 'p', 'p', 'p', 'p', 'p', 'p', 'h', 'p', 'p', 'p', 'p', 'f', 'p', 'p',
  'w', 'w', 'p', 'p', 'f', 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p',
  'w', 'w', 'p', 'f', 'f', 'f', 'p', 'f', 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'w',
  'w', 'w', 'p', 'f', 'f', 'p', 'p', 'f', 'p', 'h', 'p', 'p', 'p', 's', 'p', 'w',
  'w', 'w', 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'h', 'p', 'p', 'p', 'p', 'p', 'w',
  'w', 'w', 'w', 'p', 's', 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'w', 'w',
  'w', 'w', 'w', 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'w', 'w',
  'w', 'w', 'w', 'w', 'p', 'p', 'p', 'p', 'w', 'w', 'p', 'p', 'w', 'w', 'w', 'w',
  'w', 'w', 'w', 'w', 'p', 'p', 'p', 'w', 'w', 'w', 'p', 'w', 'w', 'w', 'w', 'w',
  'w', 'w', 'w', 'w', 'w', 'p', 'p', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w',
  'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w',
]);

const lords: Lord[] = lordsJson.map(lordJson => new Lord(lordJson.id, lordJson.name, lordJson.color, lordJson.treasure, board));

export const game1: Game = new Game(board, lords);
