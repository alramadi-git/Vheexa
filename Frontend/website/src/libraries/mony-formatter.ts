import { eLocale } from "@/i18n/routing";

enum eCurrency {
  "en-US" = "USD",
}

class ClsMonyFormatter {
  private readonly _locale: eLocale;
  private readonly _currency: eCurrency;
  private readonly _formatter: Intl.NumberFormat;

  constructor(locale: eLocale, currency: eCurrency) {
    this._locale = locale;
    this._currency = currency;

    this._formatter = new Intl.NumberFormat(this._locale, {
      style: "currency",
      currency: this._currency,
    });
  }

  get options(): Intl.NumberFormatOptions {
    return this._formatter.resolvedOptions();
  }

  format(value: number): string {
    return this._formatter.format(value);
  }
}

export { eCurrency, ClsMonyFormatter };
