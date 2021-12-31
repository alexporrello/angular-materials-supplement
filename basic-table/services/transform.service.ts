import { Injectable } from '@angular/core';

import { BasicTableCell } from '../models/basic-table-cell.model';
import { ReportColumn, ReportDefinition } from '../models/report.model';
import { BasicTable } from '../models/basic-table.model';

@Injectable({
  providedIn: 'root'
})
export class TransformService {
  constructor() { }

  public transformReportDef(toTransform: ReportDefinition): BasicTable {
    const cells: BasicTableCell[] = [];

    toTransform.columns.forEach((column: ReportColumn) => {
        const cell = new BasicTableCell(column.COLUMNNAME, column.COLUMNLABEL);
        cells.push(cell);
    });

    return new BasicTable(cells);
  }
}
