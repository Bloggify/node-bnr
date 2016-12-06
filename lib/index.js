'use strict';

const request = require("tinyreq")
    , xml2json = require("xml-jsonify")
    ;

const SOURCE = "http://www.bnro.ro/nbrfxrates.xml";

module.exports = class BNR {

    /**
     * getRates
     * Get the currency exchange rates.
     *
     * @name getRates
     * @function
     * @param {Function} cb The callback function.
     */
    static getRates (cb) {
        let rates = {
            RON: { multiplier: 1, amount: 1, name: "RON" }
        };
        request(SOURCE, (err, body, res) => {
            if (res.statusCode !== 200 && !err) {
                err = new Error("Cannot get the currency rates.");
            }
            if (err) { return cb(err); }

            xml2json(body, (err, data) => {
                if (err) { return cb(err); }
                let rawRates = data.Body.Cube.Rate;
                rawRates.forEach(c => {
                    rates[c.$.currency] = {
                        amount: +c._
                      , name: c.$.currency
                      , multiplier: +c.$.multiplier || 1
                    };
                });
                cb(null, rates);
            });
        });
    }

    /**
     * convert
     * Convert currencies.
     *
     * @name convert
     * @function
     * @param {Number} amount The amount of the input currency.
     * @param {String} inputCurrency The input currency name (e.g. `EUR`).
     * @param {String} outputCurrency The output currency (e.g. `USD`).
     * @param {Function} cb The callback function.
     */
    static convert (amount, inputCurrency, outputCurrency, cb) {
        this.getRates(function (err, rates) {
            if (err) { return cb(err); }

            let sourceCurrency = rates[inputCurrency];
            if (!sourceCurrency) {
                return cb(new Error("Invalid input currency: " + inputCurrency));
            }

            let targetCurrency = rates[outputCurrency];
            if (!targetCurrency) {
                return cb(new Error("Invalid output currency: " + outputCurrency));
            }

            let result = amount * (sourceCurrency.amount / sourceCurrency.multiplier) / (targetCurrency.amount * targetCurrency.multiplier);
            cb(null, result, {
                input: {
                    currency: inputCurrency,
                    currency_obj: sourceCurrency,
                    amount: amount
                },
                output: {
                    currency: outputCurrency,
                    currency_obj: targetCurrency,
                    amount: result
                }
            });
        });
    }
};

