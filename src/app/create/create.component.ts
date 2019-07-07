import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Game} from '../models/Game';
import {Board} from '../models/Board';
import {Lord} from '../models/Lord';
import lordsJson from '../../lords.json';
import {GameService} from '../game.service';

@Component({
  selector: 'se-create',
  templateUrl: 'create.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateComponent implements OnInit {

  public game: Game;
  public dimension;
  public brushSize;
  public seed;

  private lords: Lord[] = lordsJson.map(lordJson => new Lord(lordJson.id, lordJson.name, lordJson.color, lordJson.treasure));

  constructor(private gameService: GameService) {
  }

  ngOnInit(): void {
    this.reset();
  }

  public reset() {
    this.dimension = 12;
    this.brushSize = 1;
    this.seed = 'p';
    this.game = new Game(
      new Board(
        new Array(this.dimension * this.dimension).fill('u'),
        new Array(this.dimension * this.dimension).fill('u'),
      ),
      []
    );
  }

  onTap(i: number) {
    if (this.brushSize === 3) {
      this.game.board.grid.getNeighbourhood(i).forEach(current => this.paint(current));
    } else {
      this.paint(i);
    }
  }

  private paint(i: number) {
    this.game.board.regions[i].type = this.seed;
    this.game.board.world[i] = this.seed;
  }

  onEnter(i: number, $event: MouseEvent) {
    if ($event.buttons === 1) {
      this.onTap(i);
    }
  }

  currentSeed(seed: string) {
    this.seed = seed;
  }

  onPress(i: number) {
    const currentLords = this.game.lords.length;
    if (currentLords < this.lords.length) {
      const {id, name, color, treasure} = this.lords[currentLords];
      const settler = new Lord(id, name, color, treasure);
      settler.board = this.game.board;
      const settledRegion = this.game.board.regions[i];
      settledRegion.lord = settler.id;
      settledRegion.type = 's';
      this.game.board.world[i] = 's';
      this.game.board.getNeighbours(settledRegion).forEach(region => region.lord = settler.id);
      this.game.board.updateNeighbourhood(settledRegion);
      this.game.lords.push(settler);
    }
  }

  canStart() {
    return this.game.board.regions.every(region => region.type !== 'u') && this.game.lords.length > 1;
  }

  startCreatedGame() {
    this.gameService.newGame(this.game);
    window.location.href = '#';
  }

  save() {
    console.log('saved');
  }
}
