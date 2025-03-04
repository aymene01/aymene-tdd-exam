import { describe, expect, it } from 'vitest';
import { Card, Rank, Suit } from './Card';

describe('Card', () => {
  it('should create a card with a valid rank and suit', () => {
    const card = new Card(Rank.ACE, Suit.HEARTS);
    
    expect(card.rank).toBe(Rank.ACE);
    expect(card.suit).toBe(Suit.HEARTS);
  });

  it('should correctly format the card as a string', () => {
    const card = new Card(Rank.ACE, Suit.HEARTS);
    
    expect(card.toString()).toBe('A♥');
  });

  it('should compare cards by rank', () => {
    const aceOfHearts = new Card(Rank.ACE, Suit.HEARTS);
    const kingOfHearts = new Card(Rank.KING, Suit.HEARTS);
    const aceOfSpades = new Card(Rank.ACE, Suit.SPADES);
    
    expect(aceOfHearts.compareByRank(kingOfHearts)).toBeGreaterThan(0);
    expect(kingOfHearts.compareByRank(aceOfHearts)).toBeLessThan(0);
    expect(aceOfHearts.compareByRank(aceOfSpades)).toBe(0);
  });
});