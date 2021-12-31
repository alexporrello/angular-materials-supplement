/** 'number-searchable-dropdown' is not implemented **/

import { ValidatorFn } from '@angular/forms';
import { Inparam } from '@models/imparams/inparam.model';
import { Service } from '@models/reporting/service.model';

import { InparamSoapUpdate } from '@reactive-forms-builder/models/inparam-soap-update.model';
import { RFBType } from '@reactive-forms-builder/models/rfb-type.model';
import { Observable } from 'rxjs/Observable';
import { ServicesService } from '@services/services.service';

export class ReactiveFormsBuilderItem<T> {
    /** Generated in the constructor */
    public formControlName: string;

    /** The type of the reactive forms builder item. */
    public type!: RFBType;

    /** The form's identifying text. */
    public label!: string;

    /** The form's actual value, updated when the input is updated. */
    public value!: T;

    /** Defines whether this is a required input. Defaults to true.*/
    public required!: boolean;

    /** Defines whether this input is visible. Defaults to true.*/
    public visible!: boolean;

    /** Defines whether the input is disabled. Defaults to false. */
    public disabled = false;

    /** Used for the underline color. */
    public focused = false;

    /** Used for the underline color. */
    public valid = false;

    /** Used to determine if validity should be taken into account. */
    public touched = false;

    /** The text of a mat-suffix */
    public suffix: string;

    /** Define the input's width. All width's for a row should add up to 100. */
    public widthAsPercent: number;

    /** Defines the input's pixel width. */
    public widthAsPx: number;

    /** Defines the input's flex width. All widths for row should add up to 100. */
    public flexBasis: number | string;

    /** The look and feel of this item's UI mat-form-field. Defaults to standard. */
    public appearance: RFBTemplateRowItemAppearance;

    /** The name of the input parameter */
    public param: string;

    /** The output parameters for this input, grabbed from the service. */
    public outparams: string;

    /** The system for this input, grabbed from the service. */
    public system: string;

    /** The stored procedure for this input, grabbed from the service. */
    public storedProcedure: string;

    /** String of comma separated values defining imparam interdependency. */
    public dependsOn?: string;

    /** Service name used for API calls when applicable, usually for dropdowns. */
    public serviceName?: string;

    /** UI-defined dropdown options. Accessors should match `id` and `name` */
    public dropdownOptions?: Object[];

    /** The acessor for dropdown ID values. */
    public dropdownIDKey?: string;

    /** The accessor for dropdown display values */
    public dropdownValKey?: string;

    /** True for optional params that should be displayed. */
    public defaultDisp?: boolean;

    /** Defines whether all should be selected initially. */
    public isAll?: boolean;

    /**
     * If today's date is start, value is set to zero.
     * Otherwise, subtract or add from today's date based on value.
     */
    public initDate?: number;

    /** Is either 'start' or 'end'. For date/time inputs. */
    public when?: any;

    /** For number inputs. Defines minimum number. */
    public min?: number;

    /** For number inputs. Defines maximum number. */
    public max?: number;

    /** For text inputs. Defines maximum string length. */
    public maxLength?: number;

    /** For text inputs. Defines min string length. */
    public minLength?: number;

    /** Angular Reactive Forms Validators */
    public validators?: ValidatorFn[];

    /** Error message should this input not be valid. */
    public errorMessage?: string;

    /** Placeholder. Currently not used on MDTA. */
    public shift?: any;

    /** Placeholder. Currently not used on MDTA. */
    public category?: string;

    /** Placeholder. Always set to 0. */
    public initTime?: number;

    /** Placeholder. Currently not used on MDTA. */
    public isSearchable?: boolean;

    /** Placeholder. Currently not used on MDTA. */
    public formattedValue?: string;

    /** Specifically for RfbDropdown */
    public withChips = false;

    /** A regex to validate the form value against. */
    public validatorRegex?: RegExp;

    /** For mat chips input. Shows up if nothings been entered yet. */
    public placeholder?: string;

    /** Allows the user to transform dropdown options with a pipe. */
    public textTransformOption: TextTransform = TextTransform.default;

    /** The network service for getting dropdown options. */
    private _servicesService?: ServicesService;

    constructor(type: RFBType, label: string, value: T, inparam?: Inparam, service?: Service, dropdownOptions?: any[], servicesService?: ServicesService) {
        this.type = type;
        this.label = label;
        this.value = value;
        this.required = true;
        this.appearance = RFBTemplateRowItemAppearance.standard;
        this.dropdownOptions = dropdownOptions;

        this.formControlName = this.generateKey(15);

        if (inparam) {
            this._initFromInparam(inparam);
        } else {
            this.required = true;
            this.visible = true;
        }

        if (service) {
            this.outparams = service.OUTPARAMS;
            this.system = service.SYSTEM;
            this.storedProcedure = service.STOREDPROCEDURE;
            this.serviceName = service.SERVICENAME;

            if (servicesService) {
                this._servicesService = servicesService;
                this.getDropdownData(servicesService).subscribe((data: any[]) => {
                    this.dropdownOptions = data;
                    if (!this.dropdownOptions[1][this.dropdownIDKey] && this.dropdownOptions[1][this.dropdownValKey]) {
                        this.dropdownOptions.forEach(option => {
                            option[this.dropdownIDKey] = option[this.dropdownValKey];
                        })
                    }
                });
            }
        }
    }

    /**
     * An array of the dropdown options values.
     */
    public get dropdownOptionsVals(): any[] {
        const toReturn = [];

        this.dropdownOptions.forEach(option => {
            toReturn.push(option[this.dropdownIDKey]);
        });

        return toReturn;
    }

    /**
     * Calls the provided seWrvice to populate the dropdowns.
     * @param paramsToSend The soap parameters to send.
     */
    public getDropdownData(servicesService: ServicesService, paramsToSend?: InparamSoapUpdate[]): Observable<Object> {
        if (servicesService && this.serviceName) {
            const serviceQuery = {};

            if (paramsToSend) {
                paramsToSend.forEach(param => serviceQuery[param.inparamName] = param.inparamVal);
            }

            return servicesService.callServiceByServiceQuery(this.serviceName, serviceQuery);
        }

        return undefined;
    }

    /**
     * For dropdowns. Removes a value from the array of selected items.
     */
    public remove(value: string) {
        if (this.value instanceof Array) {
            this.value.splice(this.value.indexOf(value), 1);
        }
    }

    /**
     * For dropdowns. Adds a value to the array of selected items.
     */
    public add(value: string): void {
        if (this.value instanceof Array) {
            this.value.push(value);
        }
    }

    /**
     * If in input parameter is passed into the constructor, many of the values
     * for this reactive form builder's will be populated. Note that some inparams
     * have counter-intuitive names that are re-mapped in this method, such as...
     * * `required === disabled`
     * * `visible === !defaultDisp`
     * * `formValue === value`
     * * `dropdownOptions === array`
     * @param inparam The input parameter that may be associated with this report.
     */
    private _initFromInparam(inparam: Inparam) {
        this.required = inparam.required === undefined ? false : inparam.required;
        this.param = inparam.param;
        this.dropdownIDKey = inparam.dropdownIDKey;
        this.dropdownValKey = inparam.dropdownValKey,
            this.initDate = inparam.initDate;
        this.initTime = inparam.initTime;
        this.when = inparam.when;
        this.shift = inparam.shift;
        this.category = inparam.category;
        this.defaultDisp = inparam.defaultDisp === undefined ? this.required : inparam.defaultDisp;
        this.visible = this.defaultDisp;
        this.dependsOn = inparam.dependsOn;
        this.serviceName = inparam.serviceName;
        this.isAll = inparam.isAll;
        this.isSearchable = inparam.isSearchable;
        this.dropdownOptions = this.dropdownOptions ? this.dropdownOptions : inparam.dropdownOptions;
        // this.formValue = inparam.value as T;
        this.min = inparam.min;
        this.max = inparam.max;
        this.formattedValue = inparam.formattedValue;
        this.maxLength = inparam.maxLength;
        this.minLength = inparam.minLength;
        this.validators = inparam.validators;
        this.errorMessage = inparam.errorMessage;
    }

    private generateKey(length: number): string {
        let result = '';

        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;

        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    public dropdownDispValue(option: any) {
        return this.dropdownValKey ? option[this.dropdownValKey] : option;
    }

    public dropdownValue(option: any): string | null {
        return this.dropdownIDKey ? option[this.dropdownIDKey] : option;
    }

    public optionsTextTransform(value: string): string {
        switch (this.textTransformOption) {
            case TextTransform.default:
                return value;
            case TextTransform.titlecase:
                return value.charAt(0).toUpperCase() + value.toLowerCase().slice(1);
            case TextTransform.uppercase:
                return value.toUpperCase();
            case TextTransform.lowercase:
                return value.toLowerCase();
            default:
                return value;
        }
    }
}

export enum RFBTemplateRowItemAppearance {
    fill = 'fill', legacy = 'legacy', standard = 'standard', outline = 'outline',
    elevated = 'elevation_2'
}

export enum TextTransform {
    default, uppercase, lowercase, titlecase
}

export class ValidatorRegex {
    static dateTimeSecondsMS = /(\d\d)\/(\d\d)\/(\d\d\d\d)\s(\d\d):(\d\d):(\d\d)\.(\d\d\d)/g;
    static timeSeconds = /(\d\d):(\d\d):(\d\d)/g;
    static time = /(\d\d):(\d\d)/g;
    static date = /(\d\d)\/(\d\d)\/(\d\d\d\d)/g;
}
