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
      [() => this.isOnePair(), HandType.ONE_PAIR],
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
      this.isStraightFlush() && this.cards[0].rank === Rank.ACE && this.cards[4].rank === Rank.TEN
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

    return this.cards.every(
      (card, index) => index === 0 || this.cards[index - 1].rank === card.rank + 1
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
    return this.cards.reduce(
      (counts, card) => ({
        ...counts,
        [card.rank]: (counts[card.rank] || 0) + 1,
      }),
      {} as RankCount
    );
  }

  compareTo(other: Hand): number {
    const thisType = this.getHandType();
    const otherType = other.getHandType();

    const typeComparison = HAND_TYPE_RANKS[thisType] - HAND_TYPE_RANKS[otherType];
    if (typeComparison !== 0) {
      return typeComparison;
    }

    switch (thisType) {
      case HandType.ROYAL_FLUSH:
        return 0;

      case HandType.STRAIGHT_FLUSH:
      case HandType.STRAIGHT:
        return this.compareHighCard(other);

      case HandType.FOUR_OF_A_KIND:
        return this.compareFourOfAKind(other);

      case HandType.FULL_HOUSE:
        return this.compareFullHouse(other);

      case HandType.FLUSH:
      case HandType.HIGH_CARD:
        return this.compareHighCard(other);

      case HandType.THREE_OF_A_KIND:
        return this.compareThreeOfAKind(other);

      case HandType.TWO_PAIR:
        return this.compareTwoPair(other);

      case HandType.ONE_PAIR:
        return this.compareOnePair(other);

      default:
        return 0;
    }
  }

  private compareHighCard(other: Hand): number {
    for (let i = 0; i < this.cards.length; i++) {
      const comparison = this.cards[i].rank - other.cards[i].rank;
      if (comparison !== 0) {
        return comparison;
      }
    }
    return 0;
  }

  private getFourOfAKindRank(): number {
    const rankCounts = this.countRanks();
    for (const rank in rankCounts) {
      if (rankCounts[rank] === 4) {
        return parseInt(rank);
      }
    }
    return 0;
  }

  private compareFourOfAKind(other: Hand): number {
    const thisRank = this.getFourOfAKindRank();
    const otherRank = other.getFourOfAKindRank();
    return thisRank - otherRank;
  }

  private getThreeOfAKindRank(): number {
    const rankCounts = this.countRanks();
    for (const rank in rankCounts) {
      if (rankCounts[rank] === 3) {
        return parseInt(rank);
      }
    }
    return 0;
  }

  private getPairRanks(): number[] {
    const rankCounts = this.countRanks();
    const pairRanks: number[] = [];

    for (const rank in rankCounts) {
      if (rankCounts[rank] === 2) {
        pairRanks.push(parseInt(rank));
      }
    }

    return pairRanks.sort((a, b) => b - a);
  }

  private compareFullHouse(other: Hand): number {
    const thisThreeRank = this.getThreeOfAKindRank();
    const otherThreeRank = other.getThreeOfAKindRank();

    if (thisThreeRank !== otherThreeRank) {
      return thisThreeRank - otherThreeRank;
    }

    const thisPairRank = this.getPairRanks()[0];
    const otherPairRank = other.getPairRanks()[0];

    return thisPairRank - otherPairRank;
  }

  private compareThreeOfAKind(other: Hand): number {
    const thisThreeRank = this.getThreeOfAKindRank();
    const otherThreeRank = other.getThreeOfAKindRank();

    if (thisThreeRank !== otherThreeRank) {
      return thisThreeRank - otherThreeRank;
    }

    const thisRemainingCards = this.cards.filter(card => card.rank !== thisThreeRank);
    const otherRemainingCards = other.cards.filter(card => card.rank !== otherThreeRank);

    for (let i = 0; i < thisRemainingCards.length; i++) {
      const comparison = thisRemainingCards[i].rank - otherRemainingCards[i].rank;
      if (comparison !== 0) {
        return comparison;
      }
    }

    return 0;
  }

  private compareTwoPair(other: Hand): number {
    const thisPairRanks = this.getPairRanks();
    const otherPairRanks = other.getPairRanks();

    if (thisPairRanks[0] !== otherPairRanks[0]) {
      return thisPairRanks[0] - otherPairRanks[0];
    }

    if (thisPairRanks[1] !== otherPairRanks[1]) {
      return thisPairRanks[1] - otherPairRanks[1];
    }

    const thisRemainingCard = this.cards.find(card => !thisPairRanks.includes(card.rank));
    const otherRemainingCard = other.cards.find(card => !otherPairRanks.includes(card.rank));

    if (thisRemainingCard && otherRemainingCard) {
      return thisRemainingCard.rank - otherRemainingCard.rank;
    }

    return 0;
  }

  private compareOnePair(other: Hand): number {
    const thisPairRank = this.getPairRanks()[0];
    const otherPairRank = other.getPairRanks()[0];

    if (thisPairRank !== otherPairRank) {
      return thisPairRank - otherPairRank;
    }

    const thisRemainingCards = this.cards.filter(card => card.rank !== thisPairRank);
    const otherRemainingCards = other.cards.filter(card => card.rank !== otherPairRank);

    for (let i = 0; i < thisRemainingCards.length; i++) {
      const comparison = thisRemainingCards[i].rank - otherRemainingCards[i].rank;
      if (comparison !== 0) {
        return comparison;
      }
    }

    return 0;
  }

  toString(): string {
    return this.cards.map(card => card.toString()).join(' ');
  }
}
