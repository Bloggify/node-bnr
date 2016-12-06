'use strict';

const request = require("tinyreq")
    , xml2json = require("xml-jsonify")
    ;

const SOURCE = "http://www.bnro.ro/nbrfxrates.xml";

module.exports = class BNR {

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

    static convert (amount, firstCurrency, secondCurrency, cb) {
        this.getRates(function (err, rates) {
            if (err) { return cb(err); }
            var sourceCurrency = rates[firstCurrency];
            if (!sourceCurrency) {
                return cb(new Error("Invalid first currency: " + firstCurrency));
            }
            var targetCurrency = rates[secondCurrency];
            if (!targetCurrency) {
                return cb(new Error("Invalid second currency: " + secondCurrency));
            }
            var result = amount * (sourceCurrency.amount / sourceCurrency.multiplier) / (targetCurrency.amount * targetCurrency.multiplier);
            cb(null, result, {
                input: {
                    currency: firstCurrency,
                    currency_obj: sourceCurrency,
                    amount: amount
                },
                output: {
                    currency: secondCurrency,
                    currency_obj: targetCurrency,
                    amount: result
                }
            });
        });
    }
};

