import { Injectable } from "@angular/core";
import { PrimeNgHelper } from "src/app/tools/primeNgHelper";

@Injectable()
export class DateService {

  constructor() { }

  getDateFromCalendar(date: string): Date | null {
    return PrimeNgHelper.getDateFromCalendar(date);
  }

  getDateFromCalendarAsString(date: Date): string | undefined {
    return PrimeNgHelper.getDateFromCalendarAsString(date);
  }
}