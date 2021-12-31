import { EventEmitter } from '@angular/core';
import { ReactiveFormsBuilderItem } from './reactive-forms-builder-item';

export class RFBTemplate {
    /**
     * Reactive Forms Builder displays each section in its own div.
     */
    public sections?: RFBTemplateSection[];

    /**
     * Items can be added directly to a template to create a flat form
     * without any rows or sections.
     */
    public items?: ReactiveFormsBuilderItem<any>[];

    /** When set to true, form inputs display as cards. */
    public cardView: boolean;

    /** When the form is updated, this should be called. */
    public updateEmitter = new EventEmitter();

    constructor(cardView = false) {
        this.cardView = cardView;
    }

    /**
     * Get all of the form's items as a flat array.
     */
    public get allItems(): ReactiveFormsBuilderItem<any>[] {
        const allItems: ReactiveFormsBuilderItem<any>[] = [];

        if (this.sections) {
            this.sections.forEach(section => {
                if (section.rows) {
                    section.rows.forEach(row => {
                        row.items.forEach(item => allItems.push(item));
                    });
                }

                if (section.items) {
                    section.items.forEach(item => allItems.push(item));
                }
            });
        }

        if (this.items) {
            this.items.forEach(item => allItems.push(item));
        }

        return allItems;
    }

    /**
     * Given a form's control name (generated when a ReactiveFormsBuilderItem is created),
     * returns the item or undefined if the item cannot be found.
     * @param formControlName The name of the item's form control.
     * @returns Either the item if it exists; otherwise, undefined.
     */
    public findByFormControlName(formControlName: string): ReactiveFormsBuilderItem<any> | undefined {
        let toReturn: ReactiveFormsBuilderItem<any>;

        if (this.items) {
            toReturn = this.items.find(item => item.formControlName === formControlName);
            if (toReturn) {
                return toReturn;
            }
        }

        if (this.sections) {
            for (const section of this.sections) {
                for (const row of section.rows) {
                    toReturn = row.findByFormControlName(formControlName);
                    if (toReturn) {
                        return toReturn;
                    }
                }
            }
        }
    }

    /**
     * After a form has been updated, this method should be called to alert
     * ReactiveFormsBuilder component that the template has been updated.
     */
    public updatesComplete(): void {
        this.updateEmitter.emit();
    }

    /**
     * Resets a form to its default state.
     */
    public reset(): void {
        if (this.sections) {
            this.sections.length = 0;
        }

        if (this.items) {
            this.items.length = 0;
        }
    }
}

export class RFBTemplateSection {
    sectionName: string;
    rows?: RFBTemplateRow[];
    items?: ReactiveFormsBuilderItem<any>[];

    constructor(sectionName: string, rows: RFBTemplateRow[]) {
        this.sectionName = sectionName;
        this.rows = rows;
    }

    public findByFormControlName(formControlName: string): ReactiveFormsBuilderItem<any> | undefined {
        let toReturn: ReactiveFormsBuilderItem<any>;

        if (this.items) {
            toReturn = this.items.find(item => item.formControlName === formControlName);
            if (toReturn) {
                return toReturn;
            }
        }

        if (this.rows) {
            for (const row of this.rows) {
                toReturn = row.findByFormControlName(formControlName);
                if (toReturn) {
                    return toReturn;
                }
            }
        }
    }
}

export class RFBTemplateRow {
    items: ReactiveFormsBuilderItem<any>[];

    constructor(items: ReactiveFormsBuilderItem<any>[] = []) {
        this.items = items;
    }

    public findByFormControlName(formControlName: string): ReactiveFormsBuilderItem<any> | undefined {
        return this.items.find(item => item.formControlName === formControlName);
    }
}
