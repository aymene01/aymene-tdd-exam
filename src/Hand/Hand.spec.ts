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
});
