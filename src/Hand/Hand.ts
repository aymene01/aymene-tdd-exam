import { Card } from "../Card";

export class Hand {
  constructor(public readonly cards: Card[]) {}
}

export enum HandType {
  HIGH_CARD = 'high card',
  PAIR = 'pair',
  TWO_PAIR = 'two pair',
  THREE_OF_A_KIND = 'three of a kind',
  STRAIGHT = 'straight',
}