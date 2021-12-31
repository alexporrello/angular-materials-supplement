import { BasicTableCell } from './basic-table-cell.model';

export class BasicTableRow {

    public showProjectedContent = false;
    public projectedContent: object;

    constructor(
        public cells: BasicTableCell[]
    ) {}
}
