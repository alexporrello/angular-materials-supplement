import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormatService } from '@services/format.service';

@Component({
    selector: 'app-calendar',
    templateUrl: 'calendar.component.html',
    styleUrls: ['calendar.component.scss']
})
export class CalendarComponent implements OnInit {
    @Input() date: Date;

    @Output() update = new EventEmitter<Date>();
    @Output() cancel = new EventEmitter();

    days = ['s', 'm', 't', 'w', 't', 'f', 's'];
    months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun',
        'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
    years = [];
    calendar = [];

    private _date: Date;

    constructor(private _formatService: FormatService) {  }

    public ngOnInit(): void {
        this._date = new Date(this.date.getFullYear(),
            this.date.getMonth(), this.date.getDate());
        this._makeCalendar();
    }

    get formattedMonth(): string {
        return this._formatService.formatDate(this._date, 'll');
    }

    get selectedYear(): number {
        return this._date.getFullYear();
    }

    get selectedMonth(): number {
        return this._date.getMonth();
    }

    get selectedDate(): number {
        return this._date.getDate();
    }

    public getClassForYear(year: number): string {
        return year === this.selectedYear ? 'selected' : '';
    }

    public getClassForMonth(month: number): string {
        return month === this.selectedMonth ? 'selected' : '';
    }

    public getClassForDate(date: number): string {
        return date === this.selectedDate ? 'day selected' : 'day';
    }

    public updateYear(year: number): void {
        this._date.setFullYear(year);
        this._makeCalendar();
    }

    public updateMonth(left: string): void {
        this._date.setMonth(this.months.indexOf(left));
        this._makeCalendar();
    }

    public updateDate(day: number): void {
        this._date.setDate(day);
    }

    public emitNewDate(): void {
        this.update.emit(this._date);
    }

    getToday() {
        const today = new Date();
        this._date.setFullYear(today.getFullYear());
        this._date.setMonth(today.getMonth());
        this._date.setDate(today.getDate());
        this._makeCalendar();
    }

    public rotateYears(val: number) {
        this.years = this.years.map(year =>
            val > 0 ? year += 1 : year -= 1);
    }

    private _makeCalendar(): void {
        const date = new Date(this._date.getFullYear(), this._date.getMonth(), 1);

        const firstDayOfWeek  = date.getDay();
        const lastDateOfMonth = this._daysInMonth(date);

        this.calendar.length = 0;

        let counter = 1;
        for (let i = 0; counter <= lastDateOfMonth; i++) {
            if (i >= firstDayOfWeek) {
                this.calendar[i] = counter;
                counter++;
            } else {
                this.calendar[i] = null;
            }
        }

        const year = date.getFullYear();

        this.years.length = 0;
        for (let i = 3; i >= 0; i--) {
            this.years.push(year - i);
        }
    }

    private _daysInMonth(date: Date) {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    }
}
