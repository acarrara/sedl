import lordsJson from '../../lords.json';
import {Game} from '../models/Game';
import {Lord} from '../models/Lord';
import {B, G, R, U, V} from './lords';
import {Board} from '../models/Board';

export const world3 = [
  'p', 'p', 'p', 'p', 'f', 'f', 'f', 'p', 'p', 'p',
  'p', 's', 'p', 'p', 'p', 'p', 'p', 'p', 's', 'p',
  'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p',
  'p', 'p', 'p', 'p', 'h', 'h', 'p', 'p', 'p', 'w',
  'f', 'p', 'p', 'h', 'm', 'm', 'h', 'p', 'p', 'w',
  'f', 'p', 'p', 'h', 'm', 'm', 'h', 'f', 'p', 'p',
  'f', 'p', 'p', 'p', 'h', 'h', 'p', 'f', 'p', 'p',
  'p', 'p', 'p', 'p', 'p', 'p', 'p', 'f', 'p', 'p',
  'p', 's', 'p', 'p', 'w', 'p', 'p', 'p', 's', 'p',
  'p', 'p', 'p', 'p', 'w', 'p', 'p', 'p', 'p', 'p'
];
const politics3: string[] = [
  U, G, U, U, U, U, U, U, B, U,
  G, G, G, U, U, U, U, B, B, B,
  U, G, U, U, U, U, U, U, B, U,
  U, U, U, U, U, U, U, U, U, U,
  U, U, U, U, U, U, U, U, U, U,
  U, U, U, U, U, U, U, U, U, U,
  U, U, U, U, U, U, U, U, U, U,
  U, R, U, U, U, U, U, U, V, U,
  R, R, R, U, U, U, U, V, V, V,
  U, R, U, U, U, U, U, U, V, U
];

const lords: () => Lord[] =
  () => lordsJson.map(lordJson => new Lord(lordJson.id, lordJson.name, lordJson.color, lordJson.treasure));

export const game3: () => Game = () => {
  return new Game('Small', new Board(world3, politics3), lords());
};
