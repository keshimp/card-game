import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Card, CreateCardStack, Player } from '../../models/card';
import { Stack } from '../../models/stack';

@Component({
  selector: 'cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
})
export class CardsComponent implements OnInit {
  Players: Player[] = [];
  Cards: Stack<Card> = new Stack<Card>();
  InputForm: FormGroup;

  Error: string = '';

  PlayerAndCardInputs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  constructor() {
    this.InputForm = new FormGroup({
      PlayerInput: new FormControl(''),
      NumberCardInput: new FormControl(''),
    });
  }

  /**
   * Init lifecycle hook
   */
  ngOnInit(): void {
    // Initialize the deck and shuffle the cards
    this.InitializeDeck();
  }

  /**
   * Creates the initial deck of cards and adds it to the stack
   * @param shouldShuffle whether the deck should be reshuffled
   */
  InitializeDeck(
    shouldShuffle: boolean = true,
    shouldRedeal: boolean = true
  ): void {
    // Create the initial deck
    let cards = CreateCardStack();

    // re-initialize the stack of cards
    this.Cards = new Stack<Card>();

    // push the deck onto the stack
    cards.forEach((card) => {
      this.Cards.push(card);
    });

    if (shouldShuffle) {
      // Shuffle the deck
      this.ShuffleCards();
    }

    // If we should re-deal the cards, reset players
    if (shouldRedeal) {
      this.Players = [];
    }
  }

  /**
   * Shuffles the deck by creating a new stack, and then placing each card to a new temporary spot in the array, pushing the cards onto the new stack
   */
  ShuffleCards(): void {
    /**
     * NOTE: This uses the Fisher-Yates shuffle Algorithm: https://www.geeksforgeeks.org/shuffle-a-given-array-using-fisher-yates-shuffle-algorithm/
     */
    // Start from the last element and swap
    // one by one. We don't need to run for
    // the first element that's why i > 0
    for (let i = this.Cards.size() - 1; i > 0; i--) {
      // Pick a random index from 0 to i inclusive
      let j = Math.floor(Math.random() * (i + 1));

      // Swap arr[i] with the element
      // at random index
      [this.Cards.data[i], this.Cards.data[j]] = [
        this.Cards.data[j],
        this.Cards.data[i],
      ];
    }
  }

  /**
   * Deals the cards by popping the stack to a passed in amount of players: NOTE, we can build on this in the future by building the players outside of this function
   */
  DealCards(numberOfPlayers: number, numberOfCards: number): void {
    this.Error = '';

    // If there aren't enough cards to deal out to each player, throw an error
    if (numberOfPlayers * numberOfCards > this.Cards.size()) {
      this.Error =
        'There are not enough cards to deal out to all players! Either reduce the player amount or reduce the card amount';
      return;
    }

    // Reset players after initializing the deck
    this.Players = [];

    // Loop through number of players and deal the cards
    for (let i = 1; i <= numberOfPlayers; i++) {
      // Create an array of cards to deal
      let cardsToDeal: Card[] = [];

      // loop through number of cards and pop a card into the cards to deal
      for (let j = 0; j < numberOfCards; j++) {
        if (this.Cards.peek()) {
          cardsToDeal.push(this.Cards.pop());
        }
      }

      // Push the player with their name and cards to deal
      this.Players.push({
        Cards: cardsToDeal,
        Name: `Player ${i}`,
      });
    }
  }

  /**
   * Wrapper function that deals cards based on form inputs
   */
  Deal(): void {
    this.Error = '';
    let numberOfPlayers = this.InputForm.get('PlayerInput').value;
    let numberOfCards = this.InputForm.get('NumberCardInput').value;

    // If there is a missing input, throw an error
    if (numberOfPlayers && numberOfCards) {
      this.DealCards(numberOfPlayers, numberOfCards);
    } else {
      this.Error =
        'Must provide a number of players and number of cards to deal';
    }
  }

  /**
   * Gets the image source for the given suit
   */
  GetIconForSuit(suit: string): string {
    switch (suit.toLowerCase()) {
      case 'spade':
        return 'https://fonts.gstatic.com/s/e/notoemoji/14.0/2660/32.png';
      case 'heart':
        return 'https://fonts.gstatic.com/s/e/notoemoji/14.0/2665/32.png';
      case 'diamond':
        return 'https://fonts.gstatic.com/s/e/notoemoji/14.0/2666/32.png';
      case 'club':
        return 'https://fonts.gstatic.com/s/e/notoemoji/14.0/2663/32.png';
      default:
        return null;
    }
  }
}
