import { describe, expect, it } from 'vitest';
import { Card, Rank, Suit } from './Card';

describe('Card', () => {
  it('should create a card with a valid rank and suit', () => {
    const card = new Card(Rank.ACE, Suit.HEARTS);
    
    expect(card.rank).toBe(Rank.ACE);
    expect(card.suit).toBe(Suit.HEARTS);
  });
});