'use strict';

const request = require("tinyreq")
    , xml2json = require("xml-jsonify")
    ;

const SOURCE = "http://www.bnro.ro/nbrfxrates.xml";

/**
 * Wrap a callback for promises support.
 *
 * @param {function} callback
 * @param {function} resolve
 * @param {function} reject
 * @returns {function(...[*]=)}
 */
function wrapCallback(callback, resolve, reject) {
    return (error, response) => {
        if (error) {
            reject(error);
            callback(error);
            return;
        }
        callback(null, response);
        resolve(response);
    }
}

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
        return new Promise((resolve, reject) => {
            const callback = wrapCallback(cb, resolve, reject);
            let rates = {
                RON: { multiplier: 1, amount: 1, name: "RON" }
            };
            request({
                url: SOURCE,
                rejectUnauthorized: false
            }, (err, body, res) => {
                if (err) { return callback(err) }
                if (res.statusCode !== 200 && !err) {
                    err = new Error("Cannot get the currency rates.");
                }
                if (err) { return callback(err); }

                xml2json(body, (err, data) => {
                    if (err) { return callback(err); }
                    let rawRates = data.Body.Cube.Rate;
                    rawRates.forEach(c => {
                        rates[c.$.currency] = {
                            amount: +c._
                            , name: c.$.currency
                            , multiplier: +c.$.multiplier || 1
                        };
                    });
                    callback(null, rates);
                });
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
        return new Promise((resolve, reject) => {
            const callback = wrapCallback(cb, resolve, reject);
            this.getRates(function (err, rates) {
                if (err) { return callback(err); }

                let sourceCurrency = rates[inputCurrency];
                if (!sourceCurrency) {
                    return callback(new Error("Invalid input currency: " + inputCurrency));
                }

                let targetCurrency = rates[outputCurrency];
                if (!targetCurrency) {
                    return callback(new Error("Invalid output currency: " + outputCurrency));
                }

                let result = amount * (sourceCurrency.amount / sourceCurrency.multiplier) / (targetCurrency.amount * targetCurrency.multiplier);
                callback(null, result, {
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
        });
    }
};

