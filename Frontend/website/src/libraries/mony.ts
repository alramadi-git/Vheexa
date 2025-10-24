import { LOCALE, routing } from "@/i18n/routing";

enum CURRENCY {
  "en-US" = "USD",
}
class Mony {
  private readonly Locale: LOCALE;
  private readonly Currency: CURRENCY;

  private readonly _Formatter: Intl.NumberFormat;

  constructor() {
    this.Locale = routing.defaultLocale;
    this.Currency = CURRENCY[routing.defaultLocale];

    this._Formatter = new Intl.NumberFormat(this.Locale, {
      style: "currency",
      currency: this.Currency,
    });
  }

  format(value: number): string {
    return this._Formatter.format(value);
  }
}

export { Mony };
