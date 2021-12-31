import { BasicTableCellType } from '../enums/cell-type.enum';
import { SortDirection } from '../enums/sort-direction.enum';
import { CellProperties } from './basic-table-cell-properties.model';

export class BasicTableCell {
    constructor(
        /** The object key in the data for this cell. */
        public field: string,

        /** The text displayed for this cell's header. */
        public label: string,

        /** This field is managed by the code for sorting. */
        public sort?: boolean,

        /** This field is managed by the code for sorting. */
        public sortDirection?: SortDirection,

        /** Used to designate options for sorting, formatting, or displaying icons. */
        public cellType?: BasicTableCellType,

        /** Custom cell properties for the table header. */
        public header?: CellProperties,

        /** Custom cell properties for the table body. */
        public body?: CellProperties,

        /** The options displayed in the optional "hamburger" menu item. */
        public actions?: BasicTableCell[],

        /** If this cell is disabled; defaults to true. */
        public disabledField?: string
    ) { }
}
