import { eLocale, routing } from "@/i18n/routing";

enum eCurrency {
  "en-US" = "USD",
}

class ClsMonyFormatter {
  private readonly _locale: eLocale;
  private readonly _currency: eCurrency;

  private readonly _formatter: Intl.NumberFormat;

  constructor() {
    this._locale = routing.defaultLocale;
    this._currency = eCurrency[routing.defaultLocale];

    this._formatter = new Intl.NumberFormat(this._locale, {
      style: "currency",
      currency: this._currency,
    });
  }

  format(value: number): string {
    return this._formatter.format(value);
  }
}

export { ClsMonyFormatter };
