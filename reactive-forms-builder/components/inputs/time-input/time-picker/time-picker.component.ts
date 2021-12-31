import { Component, EventEmitter, Input, OnInit, Output, Pipe, PipeTransform } from '@angular/core';

@Component({
    selector: 'app-time-picker',
    templateUrl: 'time-picker.component.html',
    styleUrls: ['time-picker.component.scss']
})
export class TimePickerComponent implements OnInit {
    @Input() currentTime: Date;
    @Input() showSeconds = false;

    @Output() updateTime = new EventEmitter<Date>();
    @Output() cancel = new EventEmitter();

    hours: number[] = [];
    minutes: number[] = [];
    seconds: number[] = [];

    clicked = Clicked;

    colonDisplay = ['&nbsp;', '&nbsp;', '&nbsp;', '&#58;',
    '&nbsp;', '&nbsp;', '&nbsp;', '&nbsp;', '&nbsp;'];
    private _displayNum = 9;

    constructor() {
        this.hours = Array.from({length: this._displayNum}).map((_, i) => i);
        this.minutes = Array.from({length: this._displayNum}).map((_, i) => i);
        this.seconds = Array.from({length: this._displayNum}).map((_, i) => i);
    }

    ngOnInit() {
        if (this.currentTime) {
            this.setVal(Clicked.hour, this.currentTime.getHours());
            this.setVal(Clicked.minute, this.currentTime.getMinutes());
            this.setVal(Clicked.second, this.currentTime.getSeconds());
        }
    }

    get gridWidth(): string {
        return this.showSeconds ? 'time-grid seconds' : 'time-grid no-seconds';
    }

    get actionsWidth(): string {
        return this.showSeconds ? 'actions actions--seconds' : 'actions actions--no-seconds';
    }

    get selectedHour(): number { return this.hours[3]; }
    get selectedMinute(): number { return this.minutes[3]; }
    get selectedsecond(): number { return this.seconds[3]; }

    public displayNum(number: number, maxVal: number): number | string {
        return number >= 0 && number <= maxVal ? number : '';
    }

    public setVal(clicked: Clicked, newVal: number) {
        if (this._validNumber(newVal, clicked === Clicked.hour ? 23 : 59)) {
            newVal = newVal - 3;

            switch (clicked) {
                case Clicked.hour:
                    this.hours = this._manageValClick(newVal, this.hours);
                    break;
                case Clicked.minute:
                    this.minutes = this._manageValClick(newVal, this.minutes);
                    break;
                case Clicked.second:
                    this.seconds = this._manageValClick(newVal, this.seconds);
                    break;
            }
        }
    }

    scrollHours(event: WheelEvent) {
        this.hours = this._manageScroll(event.deltaY, this.hours, 23);
    }

    scrollMinutes(event: WheelEvent) {
        this.minutes = this._manageScroll(event.deltaY, this.minutes, 59);
    }

    scrollSeconds(event: WheelEvent) {
        this.seconds = this._manageScroll(event.deltaY, this.seconds, 59);
    }

    public preventDefaultScroll(event: any) {
        event.preventDefault();
    }

    public set() {
        const newDate = new Date();
        newDate.setHours(this.selectedHour);
        newDate.setMinutes(this.selectedMinute);
        newDate.setSeconds(this.selectedsecond);

        this.updateTime.emit(newDate);
    }

    public getNow() {
        const now = new Date();
        this.setVal(Clicked.hour, now.getHours());
        this.setVal(Clicked.minute, now.getMinutes());
        this.setVal(Clicked.second, now.getSeconds());
    }

    private _manageScroll(offset: number, array: number[], maxVal: number): number[] {
        if (offset > 0 && array[this._displayNum - 1] < (maxVal + 5)) {
            array = array.map(value => value += 1);
        } else if (offset < 0 && array[0] >= (-2)) {
            array = array.map(value => value -= 1);
        }

        return array;
    }

    private _manageValClick(newVal: number, array: number[]): number[] {
        for (let i = 0; i < this._displayNum; i++) {
            array[i] = newVal;
            newVal = newVal + 1;
        }

        return array;
    }

    private _validNumber(number: number, maxVal: number) {
        return number >= 0 && number <= maxVal;
    }
}

enum Clicked {
    hour, minute, second
}

@Pipe({name: 'makeTwoDigits'})
export class MakeTwoDigitsPipe implements PipeTransform {
  transform(value: number): string {
    return `${value}`.length === 1 ? `0${value}` : `${value}`;
  }
}
