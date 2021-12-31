import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, ElementRef, EventEmitter, HostBinding, Input, OnDestroy, Optional, Output, Self, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormControl, FormGroup, NgControl, Validators } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material';
import { FormatService } from '@services/format.service';
import { Subject } from 'rxjs/Subject';

@Component({
    selector: 'app-date-input',
    templateUrl: './date-input.component.html',
    styleUrls: ['./date-input.component.scss'],
    providers: [{ provide: MatFormFieldControl, useExisting: DateInputComponent }],
    host: {
        '[class.example-floating]': 'shouldLabelFloat',
        '[attr.aria-describedby]': 'describedBy',
        '[id]': 'id',
    }
})
export class DateInputComponent implements ControlValueAccessor, MatFormFieldControl<Date>, OnDestroy {
    @ViewChild('input') input: ElementRef;

    @Output() focus = new EventEmitter();
    @Input() _id: string;

    private _navKeys = ['ArrowLeft', 'ArrowRight', 'Tab', 'a', 'v', 'c'];
    private _delKeys = ['Delete', 'Backspace', 'Control'];
    private _validKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    private _isControlDown = false;

    constructor(
        public formBuilder: FormBuilder,
        private _formatService: FormatService,
        @Optional() @Self() public ngControl: NgControl
    ) {
        if (this.ngControl != null) {
            this.ngControl.valueAccessor = this;
        }
    }

    onKeyDown(event: KeyboardEvent) {
        if (!this._isControlDown) {
            this._isControlDown = event.key === 'Control';
        }

        if (this._isNavKey(event)) {
            this._processNav(event);
        } else {
            this._processKeyDown(event);
        }
    }

    onKeyUp(event: KeyboardEvent) {
        if (this._isControlDown) {
            this._isControlDown = event.key === 'Control';
        }
        event.preventDefault();
    }

    private _processNav(event: KeyboardEvent) {
        switch (event.key) {
            case 'a':
                event.preventDefault();
                if (this._isControlDown) {
                    this._selectAll();
                }
                break;
            case 'c':
                break;
            case 'v':
                break;
            case 'ArrowLeft':
                this._handleArrow(event, ArrowDirection.LEFT);
                break;
            case 'ArrowRight':
                this._handleArrow(event, ArrowDirection.RIGHT);
                break;
            case 'Delete':
                this._handleBackspaceDelete(event);
                break;
            case 'Backspace':
                this._handleBackspaceDelete(event);
                break;
            case 'Tab':
                this._handleTab(event);
                break;
        }
    }

    private _handleArrow(event: KeyboardEvent, direction: ArrowDirection) {
        event.preventDefault();

        if (direction === ArrowDirection.RIGHT) {
            if (this._inMonth) {
                this._selectDay();
            } else if (this._inDate) {
                this._selectYear();
            }
        } else if (direction === ArrowDirection.LEFT) {
            if (this._inYear) {
                this._selectDay();
            } else if (this._inDate) {
                this._selectMonth();
            }
        }
    }

    private _handleBackspaceDelete(event: KeyboardEvent) {
        event.preventDefault();
        if (this._allSelected) {
            this._value = 'day/month/year';
            this._selectMonth();
        } else if (this._monthSelected || this._inMonth) {
            this._month = 'month';
            this._selectMonth();
        } else if (this._dateSelected || this._inDate) {
            this._day = 'day';
            this._selectDay();
        } else if (this._yearSelected || this._inYear) {
            this._year = 'year';
            this._selectYear();
        }
    }

    private _handleTab(event: KeyboardEvent) {
        if (this._inMonth) {
            event.preventDefault();
            if (this._month.length === 1) {
                this._month = this._makeTwoDigits(this._month);
            }
            this._validateDateAgainstMonth();
            this._selectDay();
        } else if (this._inDate) {
            event.preventDefault();
            if (this._day.length === 1) {
                this._day = this._makeTwoDigits(this._day);
            }
            this._selectYear();
        }
    }

    private _processKeyDown(event: KeyboardEvent) {
        event.preventDefault();

        if (this._validKeys.includes(event.key)) {
            if (this._inMonth) {
                this._processMonth(event);
            } else if (this._inDate) {
                this._processDate(event);
            } else if (this._inYear) {
                this._processYear(event);
            }
        }
    }

    private _processMonth(event: KeyboardEvent) {
        if (this._month === 'month' || this._month.length === 2) {
            this._month = '';
        }

        if (this._month.length === 0) {
            this._month = event.key;
        } else if (this._month.length === 1) {
            this._month = this._month + event.key;
        }

        this._selectionStart = this._firstSlashPosn;
        this._selectionEnd = this._firstSlashPosn;
        this._caretPosn = this._firstSlashPosn;

        if (parseInt(this._month, 10) > 1) {
            this._month = this._makeTwoDigits(this._month);
        }

        if (this._month.length >= 2) {
            if (parseInt(this._month, 10) > 12) {
                this._month = `12`;
            }

            this._validateDateAgainstMonth();
            this._selectDay();
        }
    }

    private _validateDateAgainstMonth(): void {
        if (this._day.length >= 2 && this._day !== 'day') {
            if (parseInt(this._day, 10) > this._lastDayOfSelectedMonth) {
                this._day = `${this._lastDayOfSelectedMonth}`;
            }
        }
    }

    private _processDate(event: KeyboardEvent) {
        if (this._day === 'day' || this._day.length === 2) {
            this._day = '';
        }

        if (this._day.length === 0) {
            this._day = event.key;
        } else if (this._day.length === 1) {
            this._day = this._day + event.key;
        }

        this._selectionStart = this._lastSlashPosn;
        this._selectionEnd = this._lastSlashPosn;
        this._caretPosn = this._lastSlashPosn;

        if (parseInt(this._day, 10) > 3) {
            this._day = this._makeTwoDigits(this._day);
        }

        if (this._day.length >= 2) {
            if (parseInt(this._day, 10) > this._lastDayOfSelectedMonth) {
                this._day = `${this._lastDayOfSelectedMonth}`;
            }

            this._selectYear();
        }
    }

    private _processYear(event: KeyboardEvent) {
        if (this._year === 'year' || this._year.length === 4) {
            this._year = '';
        }

        if (this._year.length === 0) {
            this._year = event.key;
        } else if (this._year.length < 4) {
            this._year = this._year + event.key;
        }

        this._selectionStart = this._value.length;
        this._selectionEnd = this._value.length;
        this._caretPosn = this._value.length;
    }

    onClick() {
        if (this._inDate) {
            this._selectDay();
        } else if (this._inMonth) {
            this._selectMonth();
        } else if (this._inYear) {
            this._selectYear();
        }
    }

    onPaste(event: ClipboardEvent) {
        event.preventDefault();
        const clipboardData = event.clipboardData || window['clipboardData'];
        const pastedText = clipboardData.getData('text');

        const pastedContent = pastedText.split(' ');

        pastedContent.forEach((pasted: string) => {
            this._processPasteText(pasted);
        });
    }

    public handleFocus() {
        this.focus.emit();
        this._selectMonth();
    }

    public updateValue(date: Date) {
        this.value = date;
        this.showPicker = false;
    }

    private _processPasteText(text: string) {
        const newDate = this._isDateString(text);

        if (newDate) {
            this._month = this._makeTwoDigits(`${newDate.getMonth() + 1}`);
            this._day = this._makeTwoDigits(`${newDate.getDate()}`);
            this._year = this._makeTwoDigits(`${newDate.getFullYear()}`);
        }
    }

    private _isDateString(text: string): Date | null {
        const isValidDate = this.dateRegex.test(text);

        if (isValidDate) {
            return new Date(text);
        }

        return null;
    }

    private _selectAll(): void {
        this.input.nativeElement.setSelectionRange(0, this._value.length);
    }

    private _isNavKey(keyCode: KeyboardEvent): boolean {
        return this._delKeys.concat(this._navKeys).includes(keyCode.key);
    }

    private _selectMonth(): void {
        this.input.nativeElement.setSelectionRange(0, this._firstSlashPosn);
    }

    private _selectDay(): void {
        this.input.nativeElement.setSelectionRange(
            this._firstSlashPosn + 1,
            this._lastSlashPosn
        );
    }

    private _selectYear(): void {
        this.input.nativeElement.setSelectionRange(
            this._lastSlashPosn + 1,
            this._value.length
        );
    }

    private _makeTwoDigits(make: number | string): string {
        return `${make}`.length === 1 ? `0${make}` : `${make}`;
    }

    private get _value(): string {
        return this.input.nativeElement.value;
    }
    private set _value(value: string) {
        this.input.nativeElement.value = value;
    }

    private get _inMonth(): boolean {
        return this._caretPosn >= 0 && this._caretPosn <= this._firstSlashPosn;
    }
    private get _inDate(): boolean {
        return (
            this._caretPosn >= this._firstSlashPosn &&
            this._caretPosn <= this._lastSlashPosn
        );
    }
    private get _inYearField(): boolean {
        return (
            this._caretPosn > this._lastSlashPosn &&
            this._caretPosn <= this._value.length
        );
    }
    private get _inYear(): boolean {
        return (
            this._caretPosn >= this._lastSlashPosn &&
            this._caretPosn <= this._value.length
        );
    }

    private get _monthSelected(): boolean {
        return (
            this._selectionStart === 0 &&
            this._selectionEnd === this._firstSlashPosn
        );
    }
    private get _dateSelected(): boolean {
        return (
            this._selectionStart === this._firstSlashPosn + 1 &&
            this._selectionEnd === this._lastSlashPosn
        );
    }
    private get _yearSelected(): boolean {
        return (
            this._selectionStart === this._lastSlashPosn + 1 &&
            this._selectionEnd === this._value.length
        );
    }
    public get _allSelected(): boolean {
        return (
            this._selectionStart === 0 &&
            this._selectionEnd === this._value.length
        );
    }

    private get _lastDayOfSelectedMonth(): number {
        return new Date(this.value.getFullYear() || 1994, parseInt(this._month, 10), 0).getDate();
    }

    private get _selectionStart(): number {
        return this.input.nativeElement.selectionStart;
    }
    private set _selectionStart(posn: number) {
        this.input.nativeElement.selectionStart = posn;
    }
    private get _selectionEnd(): number {
        return this.input.nativeElement.selectionEnd;
    }
    private set _selectionEnd(posn: number) {
        this.input.nativeElement.selectionEnd = posn;
    }

    private get _firstSlashPosn(): number {
        return this._value.indexOf('/');
    }
    private get _lastSlashPosn(): number {
        return this._value.lastIndexOf('/');
    }

    private get _caretPosn(): number {
        return this.input.nativeElement.selectionStart;
    }
    private set _caretPosn(posn: number) {
        this.input.nativeElement.selectionStart = posn;
    }

    private get _lastChar(): string {
        return this._value.substring(this._caretPosn - 1, this._caretPosn);
    }
    private get _nextChar(): string {
        return this._value.substring(this._caretPosn, this._caretPosn + 1);
    }

    private get _month(): string {
        return this._value.split('/')[0];
    }
    private set _month(month: string) {
        this._value = `${month}/${this._day}/${this._year}`;
        this._caretPosn = this._firstSlashPosn;
        this.onChange(this.value);
    }

    private get _day(): string {
        return this._value.split('/')[1];
    }
    private set _day(date: string) {
        this._value = `${this._month}/${date}/${this._year}`;
        this._caretPosn = this._lastSlashPosn;
        this.onChange(this.value);
    }

    private get _year(): string {
        return this._value.split('/')[2];
    }
    private set _year(year: string) {
        this._value = `${this._month}/${this._day}/${year}`;
        this._caretPosn = this._value.length;
        this.onChange(this.value);
    }

    dateRegex = /^(0[1-9]|1[0-2])(\/|-)(0[1-9]|1[0-9]|2[0-9]|3[0-1])\2([0-9][0-9][0-9][0-9])/;


    /** All the stuff that makes this compatible with Reactive Forms **/

    @HostBinding('attr.aria-describedby') describedBy = '';

    @Input('aria-describedby') userAriaDescribedBy: string;
    @Input()
    get placeholder(): string { return this._placeholder; }
    set placeholder(value: string) {
        this._placeholder = value;
        this.stateChanges.next();
    }
    @Input()
    get required(): boolean { return this._required; }
    set required(value: boolean) {
        this._required = coerceBooleanProperty(value);
        this.stateChanges.next();
    }
    @Input()
    get disabled(): boolean { return this._disabled; }
    set disabled(value: boolean) {
        this._disabled = coerceBooleanProperty(value);
        this.stateChanges.next();
    }
    @Input()
    get value(): Date | null {
        const date = new Date(
            parseInt(this._year, 10),
            parseInt(this._month, 10) - 1,
            parseInt(this._day, 10));
        return date;
    }
    set value(date: Date | null) {
        if (!(date instanceof Date)) {
            date = this._formatService.getDateFromString(date);
        }

        if (date instanceof Date) {
            this._month = this._makeTwoDigits(date.getMonth() + 1);
            this._day = this._makeTwoDigits(date.getDate());
            this._year = this._makeTwoDigits(date.getFullYear());
        } else {
            const today = new Date();
            this._month = this._makeTwoDigits(today.getMonth() + 1);
            this._day = this._makeTwoDigits(today.getDate());
            this._year = this._makeTwoDigits(today.getFullYear());
        }

        this.stateChanges.next();
        this.onChange(this.value);
    }

    public controlType = 'app-date-input';
    public id = `app-date-input-${DateInputComponent.nextId++}`;

    public empty = false;
    public shouldLabelFloat = true;
    public showPicker = false;
    public focused = false;
    public stateChanges = new Subject<void>();
    public onChange = (_: any) => {};
    public onTouched = () => { };
    public setDescribedByIds(ids: string[]) { this.describedBy = ids.join(' '); }
    public writeValue(date: Date | null): void {
        this.value = date;
    }
    public registerOnChange(fn: any): void { this.onChange = fn; }
    public registerOnTouched(fn: any): void { this.onTouched = fn; }
    public setDisabledState(disabled: boolean): void { this.disabled = disabled; }
    public onContainerClick(): void {}
    public autofille = false;

    private _required = false;
    private _placeholder: string;
    private _disabled = false;

    static ngAcceptInputType_disabled: any;
    static ngAcceptInputType_required: any;
    static nextId = 0;

    get errorState(): boolean { return !this.dateRegex.test(this._value); }

    public ngOnDestroy() {
        this.stateChanges.complete();
    }
}

export enum ArrowDirection {
    LEFT, RIGHT
}
