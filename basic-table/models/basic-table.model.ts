import { BasicTableCell } from './basic-table-cell.model';
import { BasicTableGroup } from './basic-table-group.model';

export class BasicTable {
    constructor(
        /** An array of the cells, which include cell data and heading data. */
        public cells: BasicTableCell[],

        /** Some reports require two heading levels. The uppermost level is for groups. */
        public groups?: BasicTableGroup[],

        /** This field is used for potential service calls when cells are clicked. */
        public outparamName?: string,

        /** Will display a header above the table if set. */
        public tableName?: string,

        /** If set to true, this option will only allow row click, with the exception of action cells. */
        public allowCellClick = true,

        /** If an entire row has a color, it is defined here. */
        public rowColor?: string,

        /** Text color. */
        public color?: string,

        /** Each row can have its own injected content. */
        public injectedContent?: BasicTable,
    ) { }
}
