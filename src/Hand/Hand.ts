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

type RankCount = Record<number, number>;

export class Hand {
  readonly cards: Card[];

  constructor(cards: Card[]) {
    if (cards.length !== 5) {
      throw new Error('A hand must contain exactly 5 cards');
    }
    this.cards = [...cards].sort((a, b) => b.rank - a.rank);
  }

  getHandType(): HandType {
    const handCheckers: Array<[() => boolean, HandType]> = [
      [() => this.isRoyalFlush(), HandType.ROYAL_FLUSH],
      [() => this.isStraightFlush(), HandType.STRAIGHT_FLUSH],
      [() => this.isFourOfAKind(), HandType.FOUR_OF_A_KIND],
      [() => this.isFullHouse(), HandType.FULL_HOUSE],
      [() => this.isFlush(), HandType.FLUSH],
      [() => this.isStraight(), HandType.STRAIGHT],
      [() => this.isThreeOfAKind(), HandType.THREE_OF_A_KIND],
      [() => this.isTwoPair(), HandType.TWO_PAIR],
      [() => this.isOnePair(), HandType.ONE_PAIR]
    ];

    for (const [checkFn, handType] of handCheckers) {
      if (checkFn()) {
        return handType;
      }
    }

    return HandType.HIGH_CARD;
  }

  private isRoyalFlush(): boolean {
    return (
      this.isStraightFlush() && 
      this.cards[0].rank === Rank.ACE && 
      this.cards[4].rank === Rank.TEN
    );
  }

  private isStraightFlush(): boolean {
    return this.isFlush() && this.isStraight();
  }

  private isFourOfAKind(): boolean {
    const rankCounts = this.countRanks();
    return Object.values(rankCounts).some(count => count === 4);
  }

  private isFullHouse(): boolean {
    const rankCounts = this.countRanks();
    const counts = Object.values(rankCounts);
    return counts.includes(3) && counts.includes(2);
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

    return this.cards.every((card, index) => 
      index === 0 || this.cards[index - 1].rank === card.rank + 1
    );
  }

  private isThreeOfAKind(): boolean {
    if (this.isFullHouse()) {
      return false;
    }
    
    const rankCounts = this.countRanks();
    return Object.values(rankCounts).some(count => count === 3);
  }

  private isTwoPair(): boolean {
    const rankCounts = this.countRanks();
    const pairs = Object.values(rankCounts).filter(count => count === 2);
    return pairs.length === 2;
  }

  private isOnePair(): boolean {
    if (this.isTwoPair() || this.isThreeOfAKind() || this.isFullHouse() || this.isFourOfAKind()) {
      return false;
    }
    
    const rankCounts = this.countRanks();
    return Object.values(rankCounts).some(count => count === 2);
  }

  private countRanks(): RankCount {
    return this.cards.reduce((counts, card) => ({
      ...counts,
      [card.rank]: (counts[card.rank] || 0) + 1
    }), {} as RankCount);
  }

  compareTo(other: Hand): number {
    const thisHandType = this.getHandType();
    const otherHandType = other.getHandType();

    if (thisHandType !== otherHandType) {
      return HAND_TYPE_RANKS[thisHandType] - HAND_TYPE_RANKS[otherHandType];
    }

    return 0;
  }

  toString(): string {
    return this.cards.map(card => card.toString()).join(' ');
  }
}