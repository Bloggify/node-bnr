/**
 * Callback error.
 */
export type CallbackError = Error | null;

/**
 * Currency code string.
 */
export type CurrencyCode = string;

/**
 * Exchange rate object.
 */
export interface ExchangeRate<Currency = CurrencyCode> {
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
export type Rates = {
    [Key in CurrencyCode]: ExchangeRate<Key>;
}

/**
 * BNR main export.
 */
export class BNR {

    /**
     * Fetch currency exchange rates.
     */
    static getRates(callback: (err: CallbackError, rates: Rates) => any): void;

}