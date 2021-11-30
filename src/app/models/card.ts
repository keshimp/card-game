/**
 * Stringified figures and suits
 */
const VALID_SUITS: string[] = ['Spade', 'Club', 'Heart', 'Diamond'];
const VALID_FIGURES: string[] = [
  'A',
  'K',
  'Q',
  'J',
  '10',
  '9',
  '8',
  '7',
  '6',
  '5',
  '4',
  '3',
  '2',
];

export class Card {
  /**
   * the figure of the card (Ex. Ace, King, 2, 3, 4)
   */
  Figure: string;

  /**
   * The suit of the card (Ex. Spade, Club, etc.)
   */
  Suit: string;
}

export class Player {
  /**
   * The friendly name of the player
   */
  Name: string;

  /**
   * The current playing cards the player has
   */
  Cards: Card[];
}

/**
 * Initializes an array of cards
 */
export function CreateCardStack() {
  // Create initial list of cards to return
  let cardsToReturn: Card[] = [];

  // Loop through all suits and figures to create the stack of cards
  VALID_SUITS.forEach((suit) => {
    VALID_FIGURES.forEach((figure) => {
      cardsToReturn.push({
        Suit: suit,
        Figure: figure,
      });
    });
  });

  // Return the cards
  return cardsToReturn;
}
