import { HandType } from '../Hand';
import { Card } from '../Card';

export interface GameResult {}

export class Game {
  evaluateWinner(hand1: Card[], hand2: Card[]): GameResult {
    return {
      winningHandIndex: 0,
      winningHandType: HandType.ROYAL_FLUSH,
      losingHandType: HandType.STRAIGHT_FLUSH,
    };
  }
}
