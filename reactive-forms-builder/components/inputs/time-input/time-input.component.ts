import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, ElementRef, EventEmitter, HostBinding, Input, OnDestroy, Optional, Output, Self, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormBuilder, NgControl } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material';
import { FormatService } from '@services/format.service';
import { Subject } from 'rxjs/Subject';
import { ArrowDirection } from '../date-input/date-input.component';

@Component({
    selector: 'app-time-input',
    templateUrl: './time-input.component.html',
    styleUrls: ['./time-input.component.scss'],
    providers: [{ provide: MatFormFieldControl, useExisting: TimeInputComponent }],
    host: {
        '[class.example-floating]': 'shouldLabelFloat',
        '[attr.aria-describedby]': 'describedBy',
        '[id]': 'id',
    }
})
export class TimeInputComponent implements ControlValueAccessor, MatFormFieldControl<Date>, OnDestroy {
    @Input() showSeconds = true;
    @Input() _id: string;

    @Output() focus = new EventEmitter();

    @ViewChild('input') input: ElementRef;

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

    public onKeyDown(event: KeyboardEvent) {
        if (!this._isControlDown) {
            this._isControlDown = event.key === 'Control';
        }

        if (this._isNavKey(event)) {
            this._processNav(event);
        } else {
            this._processKeyDown(event);
        }
    }

    public onKeyUp(event: KeyboardEvent) {
        if (this._isControlDown) {
            this._isControlDown = event.key === 'Control';
        }
        event.preventDefault();
    }

    public onClick() {
        if (this._inMM) {
            this._selectMM();
        } else if (this._inHH) {
            this._selectHH();
        } else if (this._inSS) {
            this._selectSS();
        }
    }

    public onPaste(event: ClipboardEvent) {
        event.preventDefault();
        const clipboardData = event.clipboardData || window['clipboardData'];
        const pastedText = clipboardData.getData('text');

        const pastedContent = pastedText.split(' ');

        pastedContent.forEach((pasted: string) => {
            this._processPasteText(pasted);
        });
    }

    public onFocus() {
        this.focus.emit();
        this._selectHH();
    }

    public updateValue(date: Date) {
        this.value = date;
        this.showPicker = false;
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
            if (this._inHH) {
                this._selectMM();
            } else if (this._inMM) {
                this._selectSS();
            }
        } else if (direction === ArrowDirection.LEFT) {
            if (this._inSS) {
                this._selectMM();
            } else if (this._inMM) {
                this._selectHH();
            }
        }
    }

    private _handleBackspaceDelete(event: KeyboardEvent) {
        event.preventDefault();
        if (this._allSelected) {
            this._value = 'hours:minutes:seconds';
            this._selectHH();
        } else if (this._hhSelected || this._inHH) {
            this._hh = 'hours';
            this._selectHH();
        } else if (this._mmSelected || this._inMM) {
            this._mm = 'minutes';
            this._selectMM();
        } else if (this._ssSelected || this._inSS) {
            this._ss = 'seconds';
            this._selectSS();
        }
    }

    private _handleTab(event: KeyboardEvent) {
        if (this._inHH) {
            event.preventDefault();
            if (this._hh.length === 1) {
                this._hh = this._makeTwoDigits(this._hh);
            }
            this._selectMM();
        } else if (this._inMM) {
            event.preventDefault();
            if (this._mm.length === 1) {
                this._mm = this._makeTwoDigits(this._mm);
            }
            this._selectSS();
        }
    }

    private _processKeyDown(event: KeyboardEvent) {
        event.preventDefault();

        if (this._validKeys.includes(event.key)) {
            if (this._inHH) {
                this._processHours(event);
            } else if (this._inMM) {
                this._processMinutes(event);
            } else if (this._inSS) {
                this._processSeconds(event);
            }
        }
    }

    private _processHours(event: KeyboardEvent) {
        if (this._hh === 'hours' || this._hh.length === 2) {
            this._hh = '';
        }

        if (this._hh.length === 0) {
            this._hh = event.key;
        } else if (this._hh.length === 1) {
            this._hh = this._hh + event.key;
        }

        this._selectionStart = this._firstSlashPosn;
        this._selectionEnd = this._firstSlashPosn;
        this._caretPosn = this._firstSlashPosn;

        if (parseInt(this._hh, 10) > 2) {
            this._hh = this._makeTwoDigits(this._hh);
        }

        if (this._hh.length >= 2) {
            if (parseInt(this._hh, 10) > 23) {
                this._hh = `23`;
            }

            this._selectMM();
        }
    }

    private _processMinutes(event: KeyboardEvent) {
        if (this._mm === 'minutes' || this._mm.length === 2) {
            this._mm = '';
        }

        if (this._mm.length === 0) {
            this._mm = event.key;
        } else if (this._mm.length === 1) {
            this._mm = this._mm + event.key;
        }

        this._selectionStart = this._lastSlashPosn;
        this._selectionEnd = this._lastSlashPosn;
        this._caretPosn = this._lastSlashPosn;

        if (parseInt(this._mm, 10) > 6) {
            this._mm = this._makeTwoDigits(this._mm);
        }

        if (this._mm.length >= 2) {
            if (parseInt(this._mm, 10) > 59) {
                this._mm = `${59}`;
            }

            this._selectSS();
        }
    }

    private _processSeconds(event: KeyboardEvent) {
        if (this._ss === 'seconds' || this._ss.length === 2) {
            this._ss = '';
        }

        if (this._ss.length === 0) {
            this._ss = event.key;
        } else if (this._ss.length === 1) {
            this._ss = this._ss + event.key;
        }

        this._selectionStart = this._value.length;
        this._selectionEnd = this._value.length;
        this._caretPosn = this._value.length;

        if (parseInt(this._ss, 10) > 6) {
            this._ss = this._makeTwoDigits(this._ss);
        }

        if (this._ss.length >= 2) {
            if (parseInt(this._ss, 10) > 59) {
                this._ss = `${59}`;
            }
        }
    }

    private _processPasteText(text: string) {
        const newDate = this._isTimeString(text);

        if (newDate) {
            this._hh = this._makeTwoDigits(`${newDate.getHours()}`);
            this._mm = this._makeTwoDigits(`${newDate.getMinutes()}`);
            this._ss = this._makeTwoDigits(`${newDate.getSeconds()}`);
        }
    }

    private _isTimeString(text: string): Date | null {
        const parsedTime = text.split(':');

        if (parsedTime.length > 1) {
            const newDate = new Date();
            newDate.setHours(
                this.value.getHours(),
                this.value.getMinutes(),
                this.value.getSeconds());

            let index = 0;
            parsedTime.forEach((value: string) => {
                const parsedVal = parseInt(value, 10);

                if (!isNaN(parsedVal)) {
                    switch (index) {
                        case 0:
                            newDate.setHours(parseInt(value, 10));
                            break;
                        case 1:
                            newDate.setMinutes(parseInt(value, 10));
                            break;
                        case 2:
                            newDate.setSeconds(parseInt(value, 10));
                            break;
                        case 3:
                            newDate.setMilliseconds(parseInt(value, 10));
                            break;
                    }
                }

                index++;
            });

            return newDate;
        }

        return null;
    }

    private _isNavKey(keyCode: KeyboardEvent): boolean {
        return this._delKeys.concat(this._navKeys).includes(keyCode.key);
    }

    private _selectAll(): void {
        this.input.nativeElement.setSelectionRange(0, this._value.length);
    }

    private _selectHH(): void {
        this.input.nativeElement.setSelectionRange(0, this._firstSlashPosn);
    }

    private _selectMM(): void {
        this.input.nativeElement.setSelectionRange(
            this._firstSlashPosn + 1,
            this._lastSlashPosn
        );
    }

    private _selectSS(): void {
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

    private get _inHH(): boolean {
        return this._caretPosn >= 0 && this._caretPosn <= this._firstSlashPosn;
    }
    private get _inMM(): boolean {
        return (
            this._caretPosn >= this._firstSlashPosn &&
            this._caretPosn <= this._lastSlashPosn
        );
    }
    private get _inSS(): boolean {
        return (
            this._caretPosn >= this._lastSlashPosn &&
            this._caretPosn <= this._value.length
        );
    }

    private get _hhSelected(): boolean {
        return (
            this._selectionStart === 0 &&
            this._selectionEnd === this._firstSlashPosn
        );
    }
    private get _mmSelected(): boolean {
        return (
            this._selectionStart === this._firstSlashPosn + 1 &&
            this._selectionEnd === this._lastSlashPosn
        );
    }
    private get _ssSelected(): boolean {
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
        return this._value.indexOf(':');
    }
    private get _lastSlashPosn(): number {
        return this._value.lastIndexOf(':');
    }

    private get _caretPosn(): number {
        return this.input.nativeElement.selectionStart;
    }
    private set _caretPosn(posn: number) {
        this.input.nativeElement.selectionStart = posn;
    }

    private get _hh(): string {
        return this._value.split(':')[0];
    }
    private set _hh(hh: string) {
        this._value = `${hh}:${this._mm || '00'}:${this._ss || '00'}`;
        this._caretPosn = this._firstSlashPosn;
        this.onChange(this.value);
    }

    private get _mm(): string {
        return this._value.split(':')[1];
    }
    private set _mm(mm: string) {
        this._value = `${this._hh || '00'}:${mm}:${this._ss || '00'}`;
        this._caretPosn = this._lastSlashPosn;
        this.onChange(this.value);
    }

    private get _ss(): string {
        return this._value.split(':')[2];
    }
    private set _ss(ss: string) {
        this._value = `${this._hh || '00'}:${this._mm || '00'}:${ss}`;
        this._caretPosn = this._value.length;
        this.onChange(this.value);
    }

    timeRegex = /^(0[0-9]|1[0-9]|2[0-3]):(0[0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]):(0[0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9])/;

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
        const date = new Date();
        date.setHours(
            parseInt(this._hh, 10),
            parseInt(this._mm, 10),
            parseInt(this._ss, 10));
        return date;
    }
    set value(date: Date | null) {
        if (!(date instanceof Date)) {
            date = this._formatService.getDateFromString(date);
        }

        if (date instanceof Date) {
            this._hh = this._makeTwoDigits(date.getHours());
            this._mm = this._makeTwoDigits(date.getMinutes());
            this._ss = this._makeTwoDigits(date.getSeconds());
        } else {
            const today = new Date();
            this._hh = this._makeTwoDigits(today.getHours());
            this._mm = this._makeTwoDigits(today.getMinutes());
            this._ss = this._makeTwoDigits(today.getSeconds());
        }

        this.stateChanges.next();
    }

    public controlType = 'app-time-input';
    public id = `app-time-input-${TimeInputComponent.nextId++}`;

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

    get errorState(): boolean { return !this.timeRegex.test(this._value); }

    public ngOnDestroy() {
        this.stateChanges.complete();
    }
}
