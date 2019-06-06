import {Injectable} from '@angular/core';
import {Conqueror} from './models/Conqueror';
import {BehaviorSubject, Observable} from 'rxjs';
import {Dominion} from './models/Dominion';
import {yieldOf} from './models/resources';
import {board, conquerors} from './models/game';

@Injectable()
export class GameService {

  private conquerorIndex = 0;

  private dominionsSubject: BehaviorSubject<Dominion[]> = new BehaviorSubject(board.dominions);
  private conquerorSubject: BehaviorSubject<Conqueror> = new BehaviorSubject(conquerors[0]);

  public readonly dominions$: Observable<Dominion[]> = this.dominionsSubject.asObservable();
  public readonly conqueror$: Observable<Conqueror> = this.conquerorSubject.asObservable();

  public conquerors: Conqueror[] = conquerors;

  conquer(i: number) {
    if (board.conquer(i, this.currentConqueror())) {
      this.dominionsSubject.next(board.dominions);
    }
  }

  public pass(): void {
    this.harvest();
    this.conquerorIndex = (this.conquerorIndex + 1) % conquerors.length;
    this.conquerorSubject.next(conquerors[this.conquerorIndex]);
  }

  private currentConqueror() {
    return this.conquerorSubject.getValue();
  }

  private harvest() {
    this.currentConqueror().treasure =
      this.dominionsSubject.getValue()
        .filter(dominion => dominion.conqueror === this.currentConqueror().id)
        .map(dominion => yieldOf(dominion.type))
        .reduce((previousValue, currentValue) => previousValue + currentValue, this.currentConqueror().treasure);
  }

  public seeds(): string[] {
    return board.map;
  }

  public dimension(): number {
    return Math.sqrt(board.dominions.length);
  }
}
