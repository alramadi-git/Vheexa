import { eLocale, routing } from "@/i18n/routing";

enum eCurrency {
  "en-US" = "USD",
}
class MonyFormatter {
  private readonly Locale: eLocale;
  private readonly Currency: eCurrency;

  private readonly _Formatter: Intl.NumberFormat;

  constructor();
  constructor(local: eLocale);
  constructor(local: eLocale = routing.defaultLocale) {
    this.Locale = local;
    this.Currency = eCurrency[this.Locale];

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
