import { ConvertedOutput, CurrencyCode } from './index';

declare namespace BNR {
    /**
     * Callback error.
     */
    type CallbackError = Error | null;

    /**
     * Currency code string.
     */
    type CurrencyCode = 'RON' | 'AED' | 'AUD' | 'BGN' | 'BRL' | 'CAD' | 'CHF' | 'CNY' | 'CZK' | 'DKK' | 'EGP' | 'EUR' | 'GBP' | 'HRK' | 'HUF' | 'INR' | 'JPY' | 'KRW' | 'MDL' | 'MXN' | 'NOK' | 'NZD' | 'PLN' | 'RSD' | 'RUB' | 'SEK' | 'THB' | 'TRY' | 'UAH' | 'USD' | 'XAU' | 'XDR' | 'ZAR';

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

    /**
     * Output object for converted currencies.
     */
    interface ConvertedOutput<Currency = CurrencyCode> {
        currency: Currency;
        currency_obj: ExchangeRate<Currency>
        amount: number;
    }
}

declare class BNR {
    /**
     * Fetch currency exchange rates.
     */
    static getRates(callback: (err: BNR.CallbackError, rates: BNR.Rates) => any): void;

    /**
     * Convert currencies.
     */
    static convert<Input extends CurrencyCode, Output extends CurrencyCode>(
        amount: number,
        inputCurrency: Input,
        outputCurrency: Output,
        callback: (err: BNR.CallbackError, result: number, summary: { input: ConvertedOutput<Input>, output: ConvertedOutput<Output> }) => any
    ): void;
}

/**
 * BNR main export.
 */
export = BNR;