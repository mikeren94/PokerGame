"use strict";
const Hand = require("../Classes/Hand");

global.handRankingTest = function handRankingTest()
{
    let holeCards = [{suit: 'd', value: 14}, {suit: 'c', value: 5}];
    let board = [{suit: 'h', value: 12}, {suit: 's', value: 3}, {suit: 'h', value: 2}, {suit: 'h', value: 6}];
    // merge the hole cards with the board cards
    let h = holeCards.concat(board);
    console.log('testing');
    let hand = new Hand(h);
}
