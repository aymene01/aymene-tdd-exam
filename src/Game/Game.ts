import { HandType, Hand } from '../Hand';
import { Card } from '../Card';

export interface GameResult {
  winningHandIndex: number;
  winningHandType: HandType;
  losingHandType: HandType;
}

export class Game {
  evaluateWinner(hand1Cards: Card[], hand2Cards: Card[]): GameResult {
    const hand1 = new Hand(hand1Cards);
    const hand2 = new Hand(hand2Cards);

    const hand1Type = hand1.getHandType();
    const hand2Type = hand2.getHandType();

    const comparison = hand1.compareTo(hand2);

    if (comparison > 0) {
      return {
        winningHandIndex: 0,
        winningHandType: hand1Type,
        losingHandType: hand2Type,
      };
    } else if (comparison < 0) {
      return {
        winningHandIndex: 1,
        winningHandType: hand2Type,
        losingHandType: hand1Type,
      };
    } else {
      return {
        winningHandIndex: -1,
        winningHandType: hand1Type,
        losingHandType: hand2Type,
      };
    }
  }
}
