import { eLocale } from "@/i18n/routing";

class ClsDateFormatter {
  private readonly _locale: eLocale;
  private readonly _formatter: Intl.DateTimeFormat;

  constructor(locale: eLocale) {
    this._locale = locale;

    this._formatter = new Intl.DateTimeFormat(this._locale, {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  }

  format(value: Date): string {
    return this._formatter.format(value);
  }
}

export { ClsDateFormatter };
