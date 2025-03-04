import { describe, expect, it } from 'vitest';
import { Card, Rank, Suit } from '../Card';
import { Hand } from './Hand';

describe('Hand', () => {
  it('should create a hand with 5 cards', () => {
    const cards = [
      new Card(Rank.ACE, Suit.HEARTS),
      new Card(Rank.KING, Suit.HEARTS),
      new Card(Rank.QUEEN, Suit.HEARTS),
      new Card(Rank.JACK, Suit.HEARTS),
      new Card(Rank.TEN, Suit.HEARTS),
    ];

    const hand = new Hand(cards);

    expect(hand.cards).toHaveLength(5);
    expect(hand.cards).toEqual(cards);
  });

  it('should throw an error if not exactly 5 cards are provided', () => {
    const cards = [
      new Card(Rank.ACE, Suit.HEARTS),
      new Card(Rank.KING, Suit.HEARTS),
      new Card(Rank.QUEEN, Suit.HEARTS),
      new Card(Rank.JACK, Suit.HEARTS),
    ];
    
    expect(() => new Hand(cards)).toThrow('A hand must contain exactly 5 cards');
  });
});
