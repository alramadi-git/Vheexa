import { LOCALE, routing } from "@/i18n/routing";

enum eCurrency {
  "en-US" = "USD",
}
class MonyFormatter {
  private readonly Locale: LOCALE;
  private readonly Currency: eCurrency;

  private readonly _Formatter: Intl.NumberFormat;

  constructor() {
    this.Locale = routing.defaultLocale;
    this.Currency = eCurrency[routing.defaultLocale];

    this._Formatter = new Intl.NumberFormat(this.Locale, {
      style: "currency",
      currency: this.Currency,
    });
  }

  format(value: number): string {
    return this._Formatter.format(value);
  }
}

export { MonyFormatter };
