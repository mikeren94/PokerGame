class Hand {
    // define a constant of the hand size, this is the number of cards used in a hand
    handSize = 5;
    // array of cards we are finding the hand strength of
    cards = [];

    // boolean value to see if players hand contains a flush
    flush = false;
    // boolean value to see if players hand contains a straight
    straight = false;

    // object of suits we have found and number of times that suit occurs
    foundSuits = {};

    // an array of values that we will constantly update as we check wether the player has a straight
    consecutiveValues = [];

    // Array of card objects that we will use to display the strongest possible hand that can be made by the provided
    // cards
    strongestHand = [];

    // numeric value to determine the hands strength
    strengthValue = 0;

    // string to represent the strongest hand for visibility
    handStrength = '';

    // Object to determine how many times a card value repeats in the hand
    repeatingCards = {};

    // Char to represent the suit of the flush if a flush is detected
    flushSuit = '';
    constructor(cards) {
        this.cards = cards;
        this.addLowerBoundAces();
        // reorder the cards from highest to lowest.
        this.cards.sort( this.orderByHighestCard );
        this.getHandRanking();

        console.log(this.strongestHand);
        console.log(this.handStrength);
    }

    /**
     * Function to reorder the array of cards so that the highest card value is first in the array
     * @param a
     * @param b
     */
    orderByHighestCard(a,b)
    {
        if ( a.value > b.value ){
            return -1;
        }
        if ( a.value < b.value ){
            return 1;
        }
        return 0;
    }

    /**
     * Get the best hand ranking we can make from the cards provided
     */
    getHandRanking()
    {
        this.getSpecialHandTypes();

        // Now we have checked if the player has a straight and a flush we can check if they have the best possible
        // hand (royal flush & straight flush)
        if(this.straight && this.flush)
        {
            // Check if the player has a straight flush
            this.checkStraightFlush();
            // at this point if the strongest hand array has a length equal or greater than the handSize variable then
            // we have a straight flush
            if(this.strongestHand.length >= this.handSize) {
                // if the first card in the array is an ace then this is a royal flush, otherwise it is a straight flush
                if(this.cards[0].value == 14) {
                    this.strengthValue = 10;
                    this.handStrength = 'ROYAL FLUSH';
                } else {
                    this.strengthValue = 9;
                    this.handStrength = 'STRAIGHT FLUSH';
                }
            }
        }
        else
        {
            this.getRepeatingCards();
        }
        if(this.strongestHand.length < this.handSize)
        {
            // if we don't have a hand equal to the hand size then we need to get the kicker cards for the hand
            this.getKickers()
        }

    }

    /**
     * Here we will complete the 5 card hand with the highest value cards
     */
    getKickers()
    {
        let i = 0;
        while(this.strongestHand.length < this.handSize)
        {
            // Find the highest card in the hand that isn't already in the strongest hand array
            if(this.strongestHand.indexOf(this.cards[i]) == -1)
            {
                this.strongestHand.push(this.cards[i]);
            }
            i++;
        }
    }
    /**
     * We will use this function to determine how many times the same value card appears in the hand
     */
    getRepeatingCards()
    {
        // Count the number of repeating crards in the card array
        this.cards.forEach((card) => {
            if(card.value in this.repeatingCards)
            {
                this.repeatingCards[card.value]++;
            }
            else
            {
                this.repeatingCards[card.value] = 1;
            }
        });

        // get the highest value in the repeating cards object
        let arr = Object.values(this.repeatingCards);
        let max = Math.max(...arr);

        if(max == 4)
        {
            this.strengthValue = 8;
            this.handStrength = 'FOUR OF A KIND';

            // get the key of the repeating cards array to find the repeating value
            let key = Object.keys(this.repeatingCards).find(key => this.repeatingCards[key] == 4)
            // loop through the cards again to find when they have this key
            this.cards.forEach((card) => {
                if(card.value == key)
                {
                    this.strongestHand.push(card);
                }

                // break the array if we have added all 4 matching cards to the strongest hand array
                if(this.strongestHand.length == 4)
                {
                    return;
                }
            });
        }
        else
        {
            // We now need to check if the player has a full house (3 of a kind and a pair)
            if(max == 3 && Object.keys(this.repeatingCards).find(key => this.repeatingCards[key] == 2))
            {
                // Player has a full house
                this.handStrength = 'FULL HOUSE';
                this.strengthValue = 7;
                // We need to find the repeating values in the hand and push them to the strongest hand array
                this.cards.forEach((card) => {
                    this.pushRepeatingCards(card, 3);
                    this.pushRepeatingCards(card,2);
                });
            }

            // now we have elimiated royal flush, straight flush, four of a kind and full houses from the hand strength
            // we can use the straight and flush booleans to determine if the player has those
            if(this.flush)
            {
                this.handStrength = 'FLUSH';
                this.strengthValue = 6;
                this.getFlushCards();
                return;
            }

            if(this.straight)
            {
                this.handStrength = 'STRAIGHT';
                this.strengthValue = 5;
                this.getStraightCards();
                return;
            }

            // check if player has three of a kind
            if(max == 3)
            {
                this.handStrength = 'THREE OF A KIND';
                this.strengthValue = 4;
                this.cards.forEach((card) => {
                    // skip if this is an ace
                    if(card.value != 1)
                    {
                        this.pushRepeatingCards(card, 3);
                    }
                });
                return;
            }

            if(max == 2)
            {
                // we need to check if player has two pair
                let pairCount = 0;
                for (const key in this.repeatingCards) {
                    if(key == 1)
                    {
                        // skip if this is the lower bound ace
                        continue;
                    }

                    if(this.repeatingCards[key] == 2) {
                        // we have found a pair value, we now need to add every card with this value to the strongest
                        // hand array
                        pairCount++;
                        this.cards.forEach((card) => {
                            if(card.value == key)
                            {
                                this.strongestHand.push(card);
                            }
                        });
                    }
                }

                if(pairCount == 2) {
                    this.handStrength = 'TWO PAIR';
                    this.strengthValue = 3;
                } else {
                    this.handStrength = 'ONE PAIR';
                    this.strengthValue = 2;
                }

            } else {
                this.handStrength = 'HIGH CARD';
                this.strengthValue = 1;
            }
        }
    }

    /**
     * We will use this function to determine the consecutive cards that need to be added to the strongest hand array
     */
    getStraightCards()
    {
        // create a temp array for holidng the consecutive card values
        let tempConsecutive = [];

        for(let i = 0; i < this.cards.length; i++)
        {
            if(i != this.cards.length - 1)
            {
                // If this is not the last loop in the array
                if(this.cards[i + 1].value < this.cards[i].value && this.cards[i + 1].value == this.cards[i].value - 1)
                {
                    // add both these values to the coonsecutive cards array of they have not been added
                    if(tempConsecutive.indexOf(this.cards[i]) == -1)
                    {
                        console.log('add value ' + this.cards[i].value + 'to the array');
                        tempConsecutive.push(this.cards[i]);
                    }

                    if(tempConsecutive.indexOf(this.cards[i + 1]) == -1)
                    {
                        console.log('add value ' + this.cards[i + 1].value + 'to the array');
                        tempConsecutive.push(this.cards[i + 1]);
                    }
                }
                else
                {
                    // if we have made the straight then we can break the loop
                    if(tempConsecutive.length >= this.handSize)
                    {
                        break;
                    }
                    // otherwise this is not part of the consectuvie array so we need to empty it
                    tempConsecutive = [];
                }
            }
            else
            {
                // we already know that we have a straight so if the length of the consecutive cards array is still 0
                // then we can add thus card to the array if it isn't already present
                if(tempConsecutive.indexOf(this.cards[i]) == -1)
                {
                    tempConsecutive.push(this.cards[i]);
                }
            }
        }
        this.strongestHand = tempConsecutive;
    }

    /**
     * We will use this function to populate the strongest hand array with the repeating suited cards
     */
    getFlushCards()
    {
        this.cards.forEach((card) => {
            if(card.suit == this.flushSuit)
            {
                this.strongestHand.push(card);
            }
        });
    }
    /**
     * We will use this function to push repeating cards into the strongest hand array
     */
    pushRepeatingCards(card, value)
    {
        if(this.repeatingCards[card.value] == value)
        {
            this.strongestHand.push(card);
        }
    }

    /**
     * Here we will check if the player has a striaght flush. We will only call this function if this.straight and
     * this.flush are true
     */
    checkStraightFlush()
    {
        // loop through the hand starting from the highest card in the array
        for(let i = 0; i < this.cards.length; i++)
        {
            // if this is not the last card in the loop
            if(i != this.cards.length - 1)
            {
                // loop through the next cards and find the next one with a value different to the current card
                let c = i + 1;
                while(c < this.cards.length)
                {
                    if(this.cards[i].value != this.cards[c].value) {

                        if (this.cards[i].suit == this.cards[c].suit && this.cards[i].value - 1 == this.cards[c].value) {
                            // both of these cards are part of the straight flush, add them to the strongest hand if they
                            // are not present. If the card we are oyshung is not consecutive to the previous value in the
                            // strongest hand array then we need to empty the strongest hand array
                            if (i > 0) {
                                // if this isn't the first iteration of the loop
                                if (this.strongestHand.length > 0 && this.strongestHand[this.strongestHand.length - 1].value != this.cards[c].value + 1) {
                                    // empty the stongest hand array
                                    this.strongestHand = [];
                                }
                            }
                            if (this.strongestHand.indexOf(this.cards[i]) == -1) {
                                this.strongestHand.push(this.cards[i]);
                            }
                            if (this.strongestHand.indexOf(this.cards[c]) == -1) {
                                this.strongestHand.push(this.cards[c]);
                            }
                        } else if (this.cards[i].value - 1 > this.cards[c].value) {
                            // only break if the next card is not consecutive
                            break;
                        }
                    }
                    c++;
                }
            } else
            {
                // loop back up through the cards until we find a non consecutive value
                for(let c = this.cards.length-1; c >= 0; c--)
                {
                    if(this.cards[c].value > this.cards[i].value)
                    {
                        // we have found a higher card, if the value is 1 greater and the suit is the same then it is
                        // part of the straight flush
                        let higherVal = this.cards[c].value;
                        let curVal = this.cards[i].value;
                        let higherSuit = this.cards[c].suit;
                        let curSuit = this.cards[i].suit;

                        if(curSuit == higherSuit && higherVal == curVal + 1)
                        {
                            // add the current card to the strongest hand
                            this.strongestHand.push(this.cards[i]);
                        } else
                        {
                            // break the loop
                            break;
                        }
                    }
                }
            }
        }
    }

    /**
     * There are two special hand types we need to look out for
     * 1. flush (all hands are of the same suit)
     * 2. straight (all hands are in consecutive order)
     *
     * We check these first because if both are true for the player then it is possible they have a straight flush
     */
    getSpecialHandTypes()
    {
        // loop through every card in the hand
        this.cards.forEach((card) => {
            this.checkCardForFlush(card);
            this.checkCardForStraight(card);
        });
    }

    /**
     * Get the value of the card and check it against the last value of the hand
     * @param card
     */
    checkCardForStraight(card)
    {
        // If the consecutive values array lenght is equal to the hand size then we can skip
        if(this.consecutiveValues.length == this.handSize)
        {
            return;
        }

        // if this is not the last value in the array
        let length = this.cards.length;
        let index = this.cards.indexOf(card);

        // loop through the remaining cards in the array until we find the next one that isn't the same value
        // (Player could have (A,A,K,Q,J,10) which is still a striaght
        while(index <= length)
        {
            if(index != length)
            {
                // If the next card in the array has a value less than the current card
                if(this.cards[index].value < card.value)
                {
                    // if the value is 1 less than the current value and both cards are not in the straight array then
                    // add them to the straight array
                    if(this.cards[index].value == card.value - 1)
                    {
                        if(this.consecutiveValues.length > 0)
                        {
                            // We may need to empty the array if the previous value is not 1 higher than this value
                            // (player could have A,K,J,10,9,8,7 which would begin counting two straights)
                            if(this.consecutiveValues[this.consecutiveValues.length - 1] != card.value && this.consecutiveValues.indexOf(card.value) == -1)
                            {
                                // empty the array
                                this.consecutiveValues = [];
                            }
                        }

                        // push the value and the next value to the array if they are not present
                        if(this.consecutiveValues.indexOf(card.value) == -1)
                        {
                            this.consecutiveValues.push(card.value);
                        }

                        if(this.consecutiveValues.indexOf(this.cards[index].value == -1))
                        {
                            this.consecutiveValues.push(this.cards[index].value);
                        }
                    }
                    // exit the array
                    break;
                }
            }
            else
            {
                // if the consecutive values array is empty then exit the loop
                if(this.consecutiveValues.length == 0) {
                    return;
                }

                // if this is the last value in the array, if it is consecutive to the previous value in consecutive
                // values then we can add it to the array
                if(this.consecutiveValues[this.consecutiveValues.length - 1] == this.cards[index - 1].value + 1)
                {
                    if(this.consecutiveValues.indexOf(this.cards[index].value) == -1)
                    {
                        this.consecutiveValues.push(this.cards[index].value);
                    }
                }
            }

            // increment the index
            index++;
        }

        // if at any point the consecutive values length is equal to the hand size then the player has a striaght
        if(this.consecutiveValues.length >= this.handSize)
        {
            this.straight = true;
        }
    }

    /**
     * Find the suit of the card and add increment the found suits array based off of it
     * @param card
     */
    checkCardForFlush(card)
    {
        // if this is the lower ace card we can skip it
        if(card.value == 1)
        {
            return;
        }

        if(card.suit in this.foundSuits)
        {
            this.foundSuits[card.suit]++;

            // if the number in found suits is equal to the hand size then we have a flush
            if(this.foundSuits[card.suit] >= this.handSize)
            {
                this.flush = true;
                this.flushSuit = card.suit;
            }
        } else {
            // create the key
            this.foundSuits[card.suit] = 1;
        }
    }

    /**
     * If there is an ace present in the hand we need to add the lower bound value to the hands array as well as the
     * higher bound value so we can check for consecutive hands
     */
    addLowerBoundAces()
    {
        let addAces = [];
        // If an ACE (value 14) is present then we are going to duplicate it with the low value of 1
        this.cards.forEach((card) =>
            {
                if(card.value == 14)
                {
                addAces.push({suit: card.suit, value: 1})
                }
            });

        for(let i = 0; i < addAces.length; i++)
        {
            this.cards.push(addAces[i]);
        }
    }
}

module.exports = Hand
