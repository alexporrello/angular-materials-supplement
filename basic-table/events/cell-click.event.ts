import { BasicTableCell } from '../models/basic-table-cell.model';

export interface CellClickEvent {
    row: any;
    cell?: BasicTableCell;
    data?: any;
}
