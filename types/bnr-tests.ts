import * as BNR from '.';

let string: string;
let number: number;
let usd: 'USD';
let ron: 'RON';

BNR.getRates((err, rates) => {
    if (err) {
        string = err.message;
    }

    number = rates.RON.multiplier;
    number = rates.RON.amount;
    string = rates.RON.name;

    usd = rates['USD'].name;
});

BNR.getRates().then((rates) => {
    number = rates.RON.multiplier;
    number = rates.RON.amount;
    string = rates.RON.name;

    usd = rates['USD'].name;
}).catch((err) => {
    string = err.message;
});

BNR.convert(55, 'USD', 'RON', (err, result, summary) => {
    usd = summary.input.currency;
    usd = summary.input.currency_obj.name;
    number = summary.input.amount;

    ron = summary.output.currency;
    ron = summary.output.currency_obj.name;
    number = summary.output.amount;
});

BNR.convert(55, 'USD', 'RON').then((convertedAmount) => {
    number = convertedAmount;
}).catch((error) => {
    string = error.message;
});