import { StringBuilder } from "./stringBuilder";

export class PrimeNgHelper {

  static getDateFromCalendar(date: string): Date | null {
    if (!isNaN(Date.parse(date))) {
      const parsedDate = new Date(date);
      return new Date(Date.UTC(parsedDate.getFullYear(), parsedDate.getMonth(), parsedDate.getDate()));
    }

    return null;
  }

  static getDateFromCalendarAsString(date: Date): string | undefined {
    date = new Date(date);

    if (!date)
      return;

    date = new Date(date.setMinutes(date.getMinutes() - date.getTimezoneOffset()));

    return new StringBuilder(date.getFullYear().toString())
      .append('-')
      .append((date.getMonth() + 1).toLocaleString('pl-PL', { minimumIntegerDigits: 2, useGrouping: false }))
      .append('-')
      .append(date.getDate().toLocaleString('pl-PL', { minimumIntegerDigits: 2, useGrouping: false }))
      .toString();
  }
}