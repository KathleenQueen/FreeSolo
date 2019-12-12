//贪心算法找零钱，不允许使用10美分，假设要找的零钱一共是30美分，请尝试找到一个解。这个解是最优解吗？
function makeChange(origAmt, coins) {
    origAmt = origAmt*100;
    var remainAmt = 0;
    if (origAmt % 25 < origAmt) {
        coins[3] = parseInt(origAmt / 25);
        remainAmt = origAmt -25 * coins[3];
        origAmt = remainAmt;
    }
   /* if (origAmt % 10 < origAmt) {
        coins[2] = parseInt(origAmt / 10);
        remainAmt = origAmt % 10;
        origAmt = remainAmt;
    }*/
    if (origAmt % .05 < origAmt) {
        coins[1] = parseInt(origAmt / 5);
        remainAmt = origAmt - 5 * coins[1];
        origAmt = remainAmt;
    }
    coins[0] = parseInt(origAmt / 1);
}

function showChange(coins) {
    if (coins[3] > 0) {
        console.log("Number of quarters - " + coins[3] + " - " + coins[3] * .25);
    }
    if (coins[2] > 0) {
        console.log("Number of dimes - " + coins[2] + " - " + coins[2] * .10);
    }
    if (coins[1] > 0) {
        console.log("Number of nickels - " + coins[1] + " - " + coins[1] * .05);
    }
    if (coins[0] > 0) {
        console.log("Number of pennies - " + coins[0] + " - " + coins[0] * .01);
    }
}

var origAmt = 0.3;
var coins = [];
makeChange(origAmt, coins);
showChange(coins);

//finished