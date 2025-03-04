import { describe, expect, it } from 'vitest';
import { Card, Rank, Suit } from '../Card';
import { Game } from './Game';
import { HandType } from '../Hand';

describe('Game', () => {
  it('should evaluate the winning hand between two hands', () => {
    const hand1 = [
      new Card(Rank.ACE, Suit.HEARTS),
      new Card(Rank.KING, Suit.HEARTS),
      new Card(Rank.QUEEN, Suit.HEARTS),
      new Card(Rank.JACK, Suit.HEARTS),
      new Card(Rank.TEN, Suit.HEARTS),
    ];

    const hand2 = [
      new Card(Rank.NINE, Suit.SPADES),
      new Card(Rank.EIGHT, Suit.SPADES),
      new Card(Rank.SEVEN, Suit.SPADES),
      new Card(Rank.SIX, Suit.SPADES),
      new Card(Rank.FIVE, Suit.SPADES),
    ];

    const game = new Game();
    const result = game.evaluateWinner(hand1, hand2);

    expect(result.winningHandIndex).toBe(0);
    expect(result.winningHandType).toBe(HandType.ROYAL_FLUSH);
    expect(result.losingHandType).toBe(HandType.STRAIGHT_FLUSH);
  });
});
