import { Card, Rank } from '../Card';

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

const HAND_TYPE_RANKS: Record<HandType, number> = {
  [HandType.HIGH_CARD]: 1,
  [HandType.ONE_PAIR]: 2,
  [HandType.TWO_PAIR]: 3,
  [HandType.THREE_OF_A_KIND]: 4,
  [HandType.STRAIGHT]: 5,
  [HandType.FLUSH]: 6,
  [HandType.FULL_HOUSE]: 7,
  [HandType.FOUR_OF_A_KIND]: 8,
  [HandType.STRAIGHT_FLUSH]: 9,
  [HandType.ROYAL_FLUSH]: 10,
};

export class Hand {
  readonly cards: Card[];

  constructor(cards: Card[]) {
    if (cards.length !== 5) {
      throw new Error('A hand must contain exactly 5 cards');
    }
    this.cards = [...cards].sort((a, b) => b.rank - a.rank);
  }

  getHandType(): HandType {
    if (this.isRoyalFlush()) {
      return HandType.ROYAL_FLUSH;
    }
    if (this.isStraightFlush()) {
      return HandType.STRAIGHT_FLUSH;
    }
    if (this.isFourOfAKind()) {
      return HandType.FOUR_OF_A_KIND;
    }
    if (this.isFullHouse()) {
      return HandType.FULL_HOUSE;
    }
    if (this.isFlush()) {
      return HandType.FLUSH;
    }
    if (this.isStraight()) {
      return HandType.STRAIGHT;
    }
    if (this.isThreeOfAKind()) {
      return HandType.THREE_OF_A_KIND;
    }
    if (this.isTwoPair()) {
      return HandType.TWO_PAIR;
    }
    if (this.isOnePair()) {
      return HandType.ONE_PAIR;
    }
    return HandType.HIGH_CARD;
  }

  // helper function to count the number of cards of each rank
  private countRanks(): Record<number, number> {
    const rankCounts: Record<number, number> = {};
    
    for (const card of this.cards) {
      rankCounts[card.rank] = (rankCounts[card.rank] || 0) + 1;
    }
    
    return rankCounts;
  }
}
