
















# bnr

Access resources (e.g. exchange rates) provided by the National Bank of Romania.




## Installation

```sh
$ npm i bnr
```









## Example






```js
"use strict";

const bnr = require("..");

// Get the currency rates
bnr.getRates((err, rates) => {
    console.log(err || rates);
    // { RON: { multiplier: 1, amount: 1, name: 'RON' },
    //   AED: { amount: 1.1375, name: 'AED', multiplier: 1 },
    //   AUD: { amount: 3.1078, name: 'AUD', multiplier: 1 },
    //   BGN: { amount: 2.3013, name: 'BGN', multiplier: 1 },
    //   BRL: { amount: 1.2211, name: 'BRL', multiplier: 1 },
    //   CAD: { amount: 3.1515, name: 'CAD', multiplier: 1 },
    //   CHF: { amount: 4.1492, name: 'CHF', multiplier: 1 },
    //   CNY: { amount: 0.6073, name: 'CNY', multiplier: 1 },
    //   CZK: { amount: 0.1664, name: 'CZK', multiplier: 1 },
    //   DKK: { amount: 0.605, name: 'DKK', multiplier: 1 },
    //   EGP: { amount: 0.2324, name: 'EGP', multiplier: 1 },
    //   EUR: { amount: 4.5008, name: 'EUR', multiplier: 1 },
    //   GBP: { amount: 5.3302, name: 'GBP', multiplier: 1 },
    //   HRK: { amount: 0.597, name: 'HRK', multiplier: 1 },
    //   HUF: { amount: 1.4308, name: 'HUF', multiplier: 100 },
    //   INR: { amount: 0.0615, name: 'INR', multiplier: 1 },
    //   JPY: { amount: 3.6641, name: 'JPY', multiplier: 100 },
    //   KRW: { amount: 0.357, name: 'KRW', multiplier: 100 },
    //   MDL: { amount: 0.208, name: 'MDL', multiplier: 1 },
    //   MXN: { amount: 0.2036, name: 'MXN', multiplier: 1 },
    //   NOK: { amount: 0.5001, name: 'NOK', multiplier: 1 },
    //   NZD: { amount: 2.9782, name: 'NZD', multiplier: 1 },
    //   PLN: { amount: 0.9992, name: 'PLN', multiplier: 1 },
    //   RSD: { amount: 0.0365, name: 'RSD', multiplier: 1 },
    //   RUB: { amount: 0.0655, name: 'RUB', multiplier: 1 },
    //   SEK: { amount: 0.4581, name: 'SEK', multiplier: 1 },
    //   TRY: { amount: 1.1887, name: 'TRY', multiplier: 1 },
    //   UAH: { amount: 0.1602, name: 'UAH', multiplier: 1 },
    //   USD: { amount: 4.1782, name: 'USD', multiplier: 1 },
    //   XAU: { amount: 157.3266, name: 'XAU', multiplier: 1 },
    //   XDR: { amount: 5.6865, name: 'XDR', multiplier: 1 },
    //   ZAR: { amount: 0.3065, name: 'ZAR', multiplier: 1 } }
});

// Convert 100 EUR into USD
bnr.convert(100, "EUR", "USD", function (err, amount, output) {
    if (err) { return console.error(err); }
    console.log(`Result: ${amount}`);
    console.log(`${output.input.amount} ${output.input.currency} is ${output.output.amount} ${output.output.currency}`);
    // Result: 107.72102819395911
    // 100 EUR is 107.72102819395911 USD
});

// Using promises
bnr.getRates().then((rates) => {
    console.log(rates);
    // { RON: { multiplier: 1, amount: 1, name: 'RON' },
    //   AED: { amount: 1.1375, name: 'AED', multiplier: 1 },
    //   ...
    //   ZAR: { amount: 0.3065, name: 'ZAR', multiplier: 1 }
    // }
})
```






## Documentation





### `getRates(cb)`
Get the currency exchange rates.

#### Params
- **Function** `cb`: The callback function.

### `convert(amount, inputCurrency, outputCurrency, cb)`
Convert currencies.

#### Params
- **Number** `amount`: The amount of the input currency.
- **String** `inputCurrency`: The input currency name (e.g. `EUR`).
- **String** `outputCurrency`: The output currency (e.g. `USD`).
- **Function** `cb`: The callback function.






## How to contribute
Have an idea? Found a bug? See [how to contribute][contributing].



## License
See the [LICENSE][license] file.


[license]: /LICENSE
[contributing]: /CONTRIBUTING.md
[docs]: /DOCUMENTATION.md
