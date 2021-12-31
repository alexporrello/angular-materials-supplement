import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';

import { ReactiveFormsBuilderItem, RFBTemplateRowItemAppearance } from '@reactive-forms-builder/classes/reactive-forms-builder-item';
import { RFBTemplate } from '@reactive-forms-builder/classes/rfb-template';
import { RFBType } from '@reactive-forms-builder/models/rfb-type.model';

import { Subscription } from 'rxjs/Subscription';

import isEqual from 'lodash/isEqual';

@Component({
  selector: 'app-reactive-forms-builder',
  templateUrl: './reactive-forms-builder.component.html',
  styleUrls: ['./reactive-forms-builder.component.scss']
})
export class ReactiveFormsBuilderComponent implements OnChanges {
  @Input() template: RFBTemplate;
  @Output() change = new EventEmitter<ReactiveFormsBuilderItem<any>>();
  @Output() error = new EventEmitter<string>();

  @ViewChild('input') input: ElementRef;

  /** Delimits MatChips options */
  readonly separatorKeysCodes = [ENTER, COMMA];

  /** Contains all of the values in the form, including validators. */
  public formGroup: FormGroup;

  /** A copy of the enum for use in the template. */
  public type = RFBType;

  /** A copy of the appearances for use in the template. */
  public appearance = RFBTemplateRowItemAppearance;

  /**
   * We subscribe to all form controls so we can emit when they change
   * and update the value in the template.
   */
  private _templateWatcher: Subscription;


  /**
   * OKAY, my peeps. Here's what's up. The ui is slow. Really slow. Fix that. Also,
   * someitmes when you submit a form, the value doesn't post. Fix that too.
   */
  constructor() { }

  public _change(event): void {
    console.log('changed ', event);
  }

  /**
   * Sets up the differ when we first receive our template.
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.template && this.template) {
      this.evalChanges();

      if (changes.template.firstChange) {
        this.template.updateEmitter.subscribe(() => this.evalChanges());
      }
    }
  }

  /**
   * Since ngOnChanges does not fire when fields are changed within an object,
   * we have to use a template differ to evaluate changes and refresh the view.
   */
  public evalChanges() {
    if (this._templateWatcher) {
      this._templateWatcher.unsubscribe();
    }

    this.formGroup = new FormGroup({});
    const allItems = this.template.allItems;

    allItems.forEach(item => {
      const control = new FormControl(item.value, item.validators);
      this.formGroup.addControl(item.formControlName, control);
      item.valid = control.valid;
    });

    this._templateWatcher = this.formGroup.valueChanges.subscribe(changes => {
      allItems.forEach(item => {
        item.valid = this.formGroup.controls[item.formControlName].valid;
        if (item.valid && (item.value || changes[item.formControlName] || item.value === 0 || changes[item.formControlName] === 0) && !isEqual(item.value, changes[item.formControlName])) {
          item.value = changes[item.formControlName];
          this.change.emit(item);
        }
      });
    });
  }

  /**
   * Used by the mat chips input to add items to the input.
   * @param item The item that the event value will be added to.
   * @param event The event fired by the mat chips input.
   */
  public add(item: ReactiveFormsBuilderItem<any>, event: MatChipInputEvent): void {
    if (event.value.trim().length > 0) {
      item.add(event.value.trim());
      this.input.nativeElement.value = '';
    }
  }

  public setUnderline(item: ReactiveFormsBuilderItem<any>) {
    item.focused = true;

    // This isn't very angular-y. Let's find a better way to do this.
    const input = document.getElementById(item.formControlName + 'input');
    if (input) {
      input.focus();
    }
  }

  public removeUnderline(item: ReactiveFormsBuilderItem<any>) {
    item.touched = true;
    item.focused = false;
  }
}
