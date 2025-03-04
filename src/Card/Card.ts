export enum Rank {
    TWO = 2,
    THREE = 3,
    FOUR = 4,
    FIVE = 5,
    SIX = 6,
    SEVEN = 7,
    EIGHT = 8,
    NINE = 9,
    TEN = 10,
    JACK = 11,
    QUEEN = 12,
    KING = 13,
    ACE = 14,
  }
  
  export enum Suit {
    HEARTS = '♥',
    DIAMONDS = '♦',
    CLUBS = '♣',
    SPADES = '♠',
  }

export class Card {
  constructor(
    public readonly rank: Rank,
    public readonly suit: Suit,
  ) {}
  
  toString(): string {
    const rankSymbol = this.getRankSymbol();
    return `${rankSymbol}${this.suit}`;
  }

  private getRankSymbol(): string {
    switch (this.rank) {
      case Rank.ACE:
        return 'A';
      case Rank.KING:
        return 'K';
      case Rank.QUEEN:
        return 'Q';
      case Rank.JACK:
        return 'J';
      default:
        return this.rank.toString();
    }
  }
}
