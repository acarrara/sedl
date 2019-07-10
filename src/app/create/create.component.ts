import {ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Game} from '../models/Game';
import {Board} from '../models/Board';
import {Lord} from '../models/Lord';
import lordsJson from '../../lords.json';
import {GameService} from '../game.service';
import {StorageService} from '../storage/storage.service';

@Component({
  selector: 'se-create',
  templateUrl: 'create.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateComponent implements OnInit {

  public game: Game;
  public size: number;
  public brushType: string;
  public seed: string;
  public collapsed = true;

  @ViewChild('nameInput', {static: true})
  private nameInput: ElementRef;
  @ViewChild('sizeInput', {static: true})
  private sizeInput: ElementRef;

  private lords: Lord[] = lordsJson.map(lordJson => new Lord(lordJson.id, lordJson.name, lordJson.color, lordJson.treasure));

  constructor(private gameService: GameService, private storage: StorageService) {
  }

  ngOnInit(): void {
    this.reset();
  }

  public reset() {
    this.size = 12;
    this.brushType = 'single';
    this.seed = 'p';
    this.game = new Game(
      'Custom',
      new Board(
        new Array(this.size * this.size).fill('u'),
        new Array(this.size * this.size).fill('u'),
      ),
      []
    );
  }

  onTap(i: number) {
    if (this.brushType === 'cross') {
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

  startCreatedGame() {
    this.gameService.newGame(this.game);
    window.location.href = '#';
  }

  save() {
    this.storage.saveCreatedGame(this.game);
  }

  onNameInput() {
    this.game.name = this.nameInput.nativeElement.value;
  }

  onSizeInput() {
    this.size = this.sizeInput.nativeElement.value;
    this.game = new Game(
      this.game.name,
      new Board(
        new Array(this.size * this.size).fill('u'),
        new Array(this.size * this.size).fill('u'),
      ),
      []
    );
  }

  fill(type: string) {
    this.game.board.world.fill(type);
    this.game.board.regions.forEach(region => region.type = type);
  }

  toggleCollapsed() {
    this.collapsed = !this.collapsed;
  }
}
