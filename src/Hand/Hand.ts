import { Card } from '../Card';

export class Hand {
  readonly cards: Card[];

  constructor(cards: Card[]) {
    if (cards.length !== 5) {
      throw new Error('A hand must contain exactly 5 cards');
    }
    this.cards = [...cards].sort((a, b) => b.rank - a.rank);
  }
}

export enum HandType {
  HIGH_CARD = 'High Card',
  ONE_PAIR = 'One Pair',
  TWO_PAIR = 'Two Pair',
  THREE_OF_A_KIND = 'Three of a Kind',
  STRAIGHT = 'Straight',
  FLUSH = 'Flush',
  FULL_HOUSE = 'Full House',
  FOUR_OF_A_KIND = 'Four of a Kind',
  STRAIGHT_FLUSH = 'Straight Flush',
  ROYAL_FLUSH = 'Royal Flush',
}
