import { BasicTable } from './basic-table.model';

export interface BasicTableMulti {
    dynamic: boolean;
    tables: {
        [key: string]: BasicTable;
    };
}
