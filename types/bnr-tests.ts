import * as BNR from '.';

let string: string;
let number: number;
let usd: 'USD';

BNR.getRates((err, rates) => {
    if (err) {
        string = err.message;
    }

    number = rates.RON.multiplier;
    number = rates.RON.amount;
    string = rates.RON.name;

    usd = rates['USD'].name;
});