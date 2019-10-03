declare namespace BNR {
    /**
     * Callback error.
     */
    type CallbackError = Error | null;

    /**
     * Currency code string.
     */
    type CurrencyCode = string;

    /**
     * Exchange rate object.
     */
    interface ExchangeRate<Currency = CurrencyCode> {
        /**
         * Currency multiplier. Used for currencies like Japanese Yen that don't support decimals.
         * E.g. USD = 1, JPY = 100
         */
        multiplier: number;

        /**
         * Exchange rate of the current currency to RON.
         * E.g. USD = 4.1782
         */
        amount: number;

        /**
         * Currency code of the selected currency.
         */
        name: Currency;
    }

    /**
     * Exchange rate object.
     */
    type Rates = {
        [Key in CurrencyCode]: ExchangeRate<Key>;
    }
}

declare class BNR {
    /**
     * Fetch currency exchange rates.
     */
    static getRates(callback: (err: BNR.CallbackError, rates: BNR.Rates) => any): void;
}

/**
 * BNR main export.
 */
export = BNR;