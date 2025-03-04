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

  describe('compareTo', () => {
    it('should rank a royal flush higher than a straight flush', () => {
      const royalFlush = new Hand([
        new Card(Rank.ACE, Suit.HEARTS),
        new Card(Rank.KING, Suit.HEARTS),
        new Card(Rank.QUEEN, Suit.HEARTS),
        new Card(Rank.JACK, Suit.HEARTS),
        new Card(Rank.TEN, Suit.HEARTS),
      ]);

      const straightFlush = new Hand([
        new Card(Rank.NINE, Suit.SPADES),
        new Card(Rank.EIGHT, Suit.SPADES),
        new Card(Rank.SEVEN, Suit.SPADES),
        new Card(Rank.SIX, Suit.SPADES),
        new Card(Rank.FIVE, Suit.SPADES),
      ]);

      expect(royalFlush.compareTo(straightFlush)).toBeGreaterThan(0);
      expect(straightFlush.compareTo(royalFlush)).toBeLessThan(0);
    });

    it('should compare hands correctly', () => {
      const hand1 = new Hand([
        new Card(Rank.ACE, Suit.HEARTS),
        new Card(Rank.KING, Suit.HEARTS),
        new Card(Rank.QUEEN, Suit.HEARTS),
        new Card(Rank.JACK, Suit.HEARTS),
        new Card(Rank.TEN, Suit.HEARTS),
      ]);

      const hand2 = new Hand([
        new Card(Rank.NINE, Suit.SPADES),
        new Card(Rank.EIGHT, Suit.SPADES),
        new Card(Rank.SEVEN, Suit.SPADES),
        new Card(Rank.SIX, Suit.SPADES),
        new Card(Rank.FIVE, Suit.SPADES),
      ]);

      expect(hand1.compareTo(hand2)).toBe(1);
      expect(hand2.compareTo(hand1)).toBe(-1);
    });

    it('should rank a higher straight flush over a lower straight flush', () => {
      const higherStraightFlush = new Hand([
        new Card(Rank.KING, Suit.HEARTS),
        new Card(Rank.QUEEN, Suit.HEARTS),
        new Card(Rank.JACK, Suit.HEARTS),
        new Card(Rank.TEN, Suit.HEARTS),
        new Card(Rank.NINE, Suit.HEARTS),
      ]);

      const lowerStraightFlush = new Hand([
        new Card(Rank.NINE, Suit.SPADES),
        new Card(Rank.EIGHT, Suit.SPADES),
        new Card(Rank.SEVEN, Suit.SPADES),
        new Card(Rank.SIX, Suit.SPADES),
        new Card(Rank.FIVE, Suit.SPADES),
      ]);

      expect(higherStraightFlush.compareTo(lowerStraightFlush)).toBeGreaterThan(0);
      expect(lowerStraightFlush.compareTo(higherStraightFlush)).toBeLessThan(0);
    });

    it('should rank a four of a kind higher than a full house', () => {
      const fourOfAKind = new Hand([
        new Card(Rank.SEVEN, Suit.HEARTS),
        new Card(Rank.SEVEN, Suit.DIAMONDS),
        new Card(Rank.SEVEN, Suit.SPADES),
        new Card(Rank.SEVEN, Suit.CLUBS),
        new Card(Rank.NINE, Suit.HEARTS),
      ]);

      const fullHouse = new Hand([
        new Card(Rank.TEN, Suit.HEARTS),
        new Card(Rank.TEN, Suit.DIAMONDS),
        new Card(Rank.TEN, Suit.SPADES),
        new Card(Rank.FOUR, Suit.CLUBS),
        new Card(Rank.FOUR, Suit.HEARTS),
      ]);

      expect(fourOfAKind.compareTo(fullHouse)).toBeGreaterThan(0);
      expect(fullHouse.compareTo(fourOfAKind)).toBeLessThan(0);
    });

    it('should rank a higher four of a kind over a lower four of a kind', () => {
      const higherFourOfAKind = new Hand([
        new Card(Rank.EIGHT, Suit.HEARTS),
        new Card(Rank.EIGHT, Suit.DIAMONDS),
        new Card(Rank.EIGHT, Suit.SPADES),
        new Card(Rank.EIGHT, Suit.CLUBS),
        new Card(Rank.NINE, Suit.HEARTS),
      ]);

      const lowerFourOfAKind = new Hand([
        new Card(Rank.SEVEN, Suit.HEARTS),
        new Card(Rank.SEVEN, Suit.DIAMONDS),
        new Card(Rank.SEVEN, Suit.SPADES),
        new Card(Rank.SEVEN, Suit.CLUBS),
        new Card(Rank.NINE, Suit.HEARTS),
      ]);

      expect(higherFourOfAKind.compareTo(lowerFourOfAKind)).toBeGreaterThan(0);
      expect(lowerFourOfAKind.compareTo(higherFourOfAKind)).toBeLessThan(0);
    });

    it('should rank a higher full house over a lower full house by comparing the three of a kind', () => {
      const higherFullHouse = new Hand([
        new Card(Rank.JACK, Suit.HEARTS),
        new Card(Rank.JACK, Suit.DIAMONDS),
        new Card(Rank.JACK, Suit.SPADES),
        new Card(Rank.FOUR, Suit.CLUBS),
        new Card(Rank.FOUR, Suit.HEARTS),
      ]);

      const lowerFullHouse = new Hand([
        new Card(Rank.TEN, Suit.HEARTS),
        new Card(Rank.TEN, Suit.DIAMONDS),
        new Card(Rank.TEN, Suit.SPADES),
        new Card(Rank.KING, Suit.CLUBS),
        new Card(Rank.KING, Suit.HEARTS),
      ]);

      expect(higherFullHouse.compareTo(lowerFullHouse)).toBeGreaterThan(0);
      expect(lowerFullHouse.compareTo(higherFullHouse)).toBeLessThan(0);
    });
  });
});
