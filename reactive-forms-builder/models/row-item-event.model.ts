import { ReactiveFormsBuilderItem } from '../classes/reactive-forms-builder-item';

export interface RowItemEvent {
    item: ReactiveFormsBuilderItem<any>;
    change: string | boolean;
}
