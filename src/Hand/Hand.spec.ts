import { describe, expect, it } from 'vitest';
import { Card, Rank, Suit } from '../Card';
import { Hand, HandType } from './Hand';

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

  it('should identify a royal flush', () => {
    const cards = [
      new Card(Rank.ACE, Suit.HEARTS),
      new Card(Rank.KING, Suit.HEARTS),
      new Card(Rank.QUEEN, Suit.HEARTS),
      new Card(Rank.JACK, Suit.HEARTS),
      new Card(Rank.TEN, Suit.HEARTS),
    ];

    const hand = new Hand(cards);

    expect(hand.getHandType()).toBe(HandType.ROYAL_FLUSH);
  });

  it('should identify a four of a kind', () => {
    const cards = [
      new Card(Rank.SEVEN, Suit.HEARTS),
      new Card(Rank.SEVEN, Suit.DIAMONDS),
      new Card(Rank.SEVEN, Suit.SPADES),
      new Card(Rank.SEVEN, Suit.CLUBS),
      new Card(Rank.NINE, Suit.HEARTS),
    ];
    
    const hand = new Hand(cards);
    
    expect(hand.getHandType()).toBe(HandType.FOUR_OF_A_KIND);
  });

  it('should identify a full house', () => {
    const cards = [
      new Card(Rank.TEN, Suit.HEARTS),
      new Card(Rank.TEN, Suit.DIAMONDS),
      new Card(Rank.TEN, Suit.SPADES),
      new Card(Rank.FOUR, Suit.CLUBS),
      new Card(Rank.FOUR, Suit.HEARTS),
    ];
    
    const hand = new Hand(cards);
    
    expect(hand.getHandType()).toBe(HandType.FULL_HOUSE);
  });

  it('should identify a flush', () => {
    const cards = [
      new Card(Rank.ACE, Suit.CLUBS),
      new Card(Rank.TEN, Suit.CLUBS),
      new Card(Rank.SEVEN, Suit.CLUBS),
      new Card(Rank.SIX, Suit.CLUBS),
      new Card(Rank.TWO, Suit.CLUBS),
    ];
    
    const hand = new Hand(cards);
    
    expect(hand.getHandType()).toBe(HandType.FLUSH);
  });

  it('should identify a straight', () => {
    const cards = [
      new Card(Rank.NINE, Suit.HEARTS),
      new Card(Rank.EIGHT, Suit.CLUBS),
      new Card(Rank.SEVEN, Suit.SPADES),
      new Card(Rank.SIX, Suit.DIAMONDS),
      new Card(Rank.FIVE, Suit.HEARTS),
    ];
    
    const hand = new Hand(cards);
    
    expect(hand.getHandType()).toBe(HandType.STRAIGHT);
  });

  it('should identify a three of a kind', () => {
    const cards = [
      new Card(Rank.EIGHT, Suit.HEARTS),
      new Card(Rank.EIGHT, Suit.DIAMONDS),
      new Card(Rank.EIGHT, Suit.SPADES),
      new Card(Rank.KING, Suit.CLUBS),
      new Card(Rank.THREE, Suit.DIAMONDS),
    ];
    
    const hand = new Hand(cards);
    
    expect(hand.getHandType()).toBe(HandType.THREE_OF_A_KIND);
  });

  it('should identify two pairs', () => {
    const cards = [
      new Card(Rank.JACK, Suit.HEARTS),
      new Card(Rank.JACK, Suit.CLUBS),
      new Card(Rank.FOUR, Suit.SPADES),
      new Card(Rank.FOUR, Suit.HEARTS),
      new Card(Rank.ACE, Suit.DIAMONDS),
    ];
    
    const hand = new Hand(cards);
    
    expect(hand.getHandType()).toBe(HandType.TWO_PAIR);
  });

  it('should identify one pair', () => {
    const cards = [
      new Card(Rank.TEN, Suit.HEARTS),
      new Card(Rank.TEN, Suit.CLUBS),
      new Card(Rank.KING, Suit.SPADES),
      new Card(Rank.FOUR, Suit.HEARTS),
      new Card(Rank.THREE, Suit.DIAMONDS),
    ];
    
    const hand = new Hand(cards);
    
    expect(hand.getHandType()).toBe(HandType.ONE_PAIR);
  });

  it('should identify high card', () => {
    const cards = [
      new Card(Rank.ACE, Suit.HEARTS),
      new Card(Rank.QUEEN, Suit.CLUBS),
      new Card(Rank.NINE, Suit.SPADES),
      new Card(Rank.SEVEN, Suit.HEARTS),
      new Card(Rank.TWO, Suit.DIAMONDS),
    ];
    
    const hand = new Hand(cards);
    
    expect(hand.getHandType()).toBe(HandType.HIGH_CARD);
  });
});
