import { Injectable } from '@angular/core';

import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class BasicTableFormatService {

  constructor() { }

  public formatDate(
    date: Date | string,
    outputFormat: string,
    inputFormat?: string
  ): string {
    return moment(date, inputFormat).format(outputFormat);
  }
}
