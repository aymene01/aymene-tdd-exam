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

  private isRoyalFlush(): boolean {
    return (
      this.isStraightFlush() && this.cards[0].rank === Rank.ACE && this.cards[4].rank === Rank.TEN
    );
  }

  private isStraightFlush(): boolean {
    return this.isFlush() && this.isStraight();
  }

  private isFourOfAKind(): boolean {
    const rankCounts = this.countRanks();
    for (const rank in rankCounts) {
      if (rankCounts[rank] === 4) {
        return true;
      }
    }
    return false;
  }

  private isFullHouse(): boolean {
    const rankCounts = this.countRanks();
    let hasThree = false;
    let hasTwo = false;

    for (const rank in rankCounts) {
      if (rankCounts[rank] === 3) {
        hasThree = true;
      } else if (rankCounts[rank] === 2) {
        hasTwo = true;
      }
    }

    return hasThree && hasTwo;
  }

  private isFlush(): boolean {
    const firstSuit = this.cards[0].suit;
    return this.cards.every(card => card.suit === firstSuit);
  }

  private isStraight(): boolean {
    if (
      this.cards[0].rank === Rank.ACE &&
      this.cards[1].rank === Rank.FIVE &&
      this.cards[2].rank === Rank.FOUR &&
      this.cards[3].rank === Rank.THREE &&
      this.cards[4].rank === Rank.TWO
    ) {
      return true;
    }

    for (let i = 1; i < this.cards.length; i++) {
      if (this.cards[i - 1].rank !== this.cards[i].rank + 1) {
        return false;
      }
    }
    return true;
  }

  private isThreeOfAKind(): boolean {
    const rankCounts = this.countRanks();

    if (this.isFullHouse()) {
      return false;
    }

    for (const rank in rankCounts) {
      if (rankCounts[rank] === 3) {
        return true;
      }
    }
    return false;
  }

  private isTwoPair(): boolean {
    const rankCounts = this.countRanks();
    let pairCount = 0;

    for (const rank in rankCounts) {
      if (rankCounts[rank] === 2) {
        pairCount++;
      }
    }

    return pairCount === 2;
  }

  private isOnePair(): boolean {
    const rankCounts = this.countRanks();

    if (this.isTwoPair() || this.isThreeOfAKind() || this.isFullHouse() || this.isFourOfAKind()) {
      return false;
    }

    for (const rank in rankCounts) {
      if (rankCounts[rank] === 2) {
        return true;
      }
    }
    return false;
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
