import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, HostBinding, Input, OnDestroy, OnInit, Optional, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material';
import { Subject } from 'rxjs/Subject';

@Component({
    selector: 'app-rfb-animated-select',
    templateUrl: './rfb-animated-select.component.html',
    styleUrls: ['./rfb-animated-select.component.scss']
})
export class RfbAnimatedSelectComponent<T> implements ControlValueAccessor, MatFormFieldControl<T>, OnDestroy {

    constructor(
        @Optional() @Self() public ngControl: NgControl
    ) {
        if (this.ngControl != null) {
            this.ngControl.valueAccessor = this;
        }
    }

    public updateValue(value: T) {
        this.value = value;
        this.showPicker = false;
    }

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
    get value(): T | null {
        return null;
    }
    set value(value: T | null) {
        this.value = value;
        this.stateChanges.next();
        this.onChange(this.value);
    }

    public controlType = 'app-date-input';
    public id = `app-date-input-${RfbAnimatedSelectComponent.nextId++}`;

    public empty = false;
    public shouldLabelFloat = true;
    public showPicker = false;
    public focused = false;
    public stateChanges = new Subject<void>();
    public onChange = (_: any) => { };
    public onTouched = () => { };
    public setDescribedByIds(ids: string[]) { this.describedBy = ids.join(' '); }
    public writeValue(date: T | null): void {
        this.value = date;
    }
    public registerOnChange(fn: any): void { this.onChange = fn; }
    public registerOnTouched(fn: any): void { this.onTouched = fn; }
    public setDisabledState(disabled: boolean): void { this.disabled = disabled; }
    public onContainerClick(): void { }
    public autofille = false;

    private _required = false;
    private _placeholder: string;
    private _disabled = false;

    static ngAcceptInputType_disabled: any;
    static ngAcceptInputType_required: any;
    static nextId = 0;

    get errorState(): boolean { return false; }

    public ngOnDestroy() {
        this.stateChanges.complete();
    }
}
