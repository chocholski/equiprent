import { HttpClient } from "@angular/common/http";
import { Component, OnInit, ViewChild } from "@angular/core";
import { FullCalendarComponent } from "@fullcalendar/angular";
import { CalendarOptions, DatesSetArg, EventInput } from "@fullcalendar/core";
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { TranslateService } from "@ngx-translate/core";
import { API_ROUTES } from "src/app/constants/api-routes.constants";
import { RentalEventListModel } from "src/app/interfaces/rental";

@Component({
  selector: "rental-create-calendar",
  templateUrl: "./rental-create-calendar.component.html"
})
export class RentalCreationCalendarComponent
  implements OnInit {

  equipmentId: string;
  events: EventInput[] = [];
  options: CalendarOptions;

  @ViewChild('calendar') calendar: FullCalendarComponent;

  constructor(
    private readonly httpClient: HttpClient,
    public readonly translate: TranslateService,
  ) {
    this.initializeOptions();
  }

  ngOnInit(): void {
  }

  private initializeOptions() {
    this.options = {
      allDaySlot: true,
      aspectRatio: 2.0,
      datesSet: this.onDaysSet.bind(this),
      displayEventTime: false,
      eventOrder: 'title,-duration',
      eventOverlap: false,
      headerToolbar: {
        left: 'prev,next',
        center: '',
        right: ''
      },
      height: 420,
      initialView: 'dayGridMonth',
      nowIndicator: true,
      plugins: [
        dayGridPlugin,
        interactionPlugin,
        timeGridPlugin
      ],
      weekends: true,
    };
  }

  public onSelectedEquipment(equipmentId: string) {
    this.equipmentId = equipmentId;
    const calendarApi = this.calendar.getApi();
    const currentCalendarDateSelected = calendarApi.getDate();
    this.httpClient
      .get<RentalEventListModel>(API_ROUTES.rental.getAsEvents(
        this.equipmentId,
        currentCalendarDateSelected.getFullYear(),
        currentCalendarDateSelected.getMonth() + 1))
      .subscribe({
        next: result => {
          for (const event of result.List) {
            const endDate = new Date(event.End);
            endDate.setDate(endDate.getDate() + 2);

            this.events = [...this.events, <EventInput>{
              allDay: true,
              backgroundColor: '#FFF895',
              borderColor: '#FFF895',
              end: endDate.toISOString().replace(/T.*$/, ''),
              start: event.Start,
              title: this.translate.instant('Rental.Calendar.Rented')
            }];
          }
        }
      });
  }

  private onDaysSet() {
    if (!this.equipmentId)
      return;

    this.onSelectedEquipment(this.equipmentId);
  }
}