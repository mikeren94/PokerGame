class Table {
    deck = [
        {suit: 'h', value: 14},
        {suit: 'h', value: 2},
        {suit: 'h', value: 3},
        {suit: 'h', value: 4},
        {suit: 'h', value: 5},
        {suit: 'h', value: 6},
        {suit: 'h', value: 7},
        {suit: 'h', value: 8},
        {suit: 'h', value: 9},
        {suit: 'h', value: 10},
        {suit: 'h', value: 11},
        {suit: 'h', value: 12},
        {suit: 'h', value: 13},
        {suit: 'd', value: 14},
        {suit: 'd', value: 2},
        {suit: 'd', value: 3},
        {suit: 'd', value: 4},
        {suit: 'd', value: 5},
        {suit: 'd', value: 6},
        {suit: 'd', value: 7},
        {suit: 'd', value: 8},
        {suit: 'd', value: 9},
        {suit: 'd', value: 10},
        {suit: 'd', value: 11},
        {suit: 'd', value: 12},
        {suit: 'd', value: 12},
        {suit: 'd', value: 13},
        {suit: 's', value: 14},
        {suit: 's', value: 2},
        {suit: 's', value: 3},
        {suit: 's', value: 4},
        {suit: 's', value: 5},
        {suit: 's', value: 6},
        {suit: 's', value: 7},
        {suit: 's', value: 8},
        {suit: 's', value: 9},
        {suit: 's', value: 10},
        {suit: 's', value: 11},
        {suit: 's', value: 12},
        {suit: 's', value: 13},
        {suit: 'c', value: 14},
        {suit: 'c', value: 2},
        {suit: 'c', value: 3},
        {suit: 'c', value: 4},
        {suit: 'c', value: 5},
        {suit: 'c', value: 6},
        {suit: 'c', value: 7},
        {suit: 'c', value: 8},
        {suit: 'c', value: 9},
        {suit: 'c', value: 10},
        {suit: 'c', value: 11},
        {suit: 'c', value: 12},
        {suit: 'c', value: 12},
        {suit: 'c', value: 13},
    ];

    board = [];
    constructor() {
        this.deck = this.shuffleDeck(this.deck);
    }

    shuffleDeck(array) {
        let i = array.length;
        while (i--) {
            const ri = Math.floor(Math.random() * i);
            [array[i], array[ri]] = [array[ri], array[i]];
        }
        return array;

    }
}
