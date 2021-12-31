import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { BasicTable } from './models/basic-table.model';
import { BasicTableCell } from './models/basic-table-cell.model';
import { BasicTableCellType } from './enums/cell-type.enum';

import { SortDirection } from './enums/sort-direction.enum';
import { CellClickEvent } from './events/cell-click.event';
import { CellProperties } from './models/basic-table-cell-properties.model';
import { FormatService } from '@services/format.service';
import { AnimatedIcon } from '@animated/animated-icon/animated-icon.component';

@Component({
  selector: 'app-basic-table',
  styleUrls: [
    './basic-table.component.scss',
    './sass/card-view.scss',
    './sass/standard-view.scss',
    './sass/pager.scss'
  ],
  templateUrl: './basic-table.component.html'
})
export class BasicTableComponent implements OnInit, OnChanges {

  @Input() tableDefinition: BasicTable;
  @Input() data: any[];
  @Input() loading: boolean;
  @Input() noRecordsMessage = 'No records found.';
  @Input() rowsPerPage: number;
  @Input() searchable = false;
  @Input() sortable = true;
  @Input() searchElevated = true;
  @Input() fullPageTable = true;
  @Input() tinyHeaders = false;
  @Input() cardView = false;
  @Input() injected = false;

  @Output() rowClick = new EventEmitter();
  @Output() cellClick = new EventEmitter<CellClickEvent>();

  public template: BasicTable;

  public numPages: number;
  public pageNum = 0;

  public searchResults: any[];

  public cellType = BasicTableCellType;

  constructor(public formatService: FormatService) { }

  ngOnInit(): void {
    this._initTemplate();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.tableDefinition) {
      this._initTemplate();
    }
  }

  /**
   * When the template comes through, we initialize it, so we don't
   * have to clutter the template with conditionals.
   */
  private _initTemplate() {
    if (this.tableDefinition) {
      const cells: BasicTableCell[] = [];

      if (this.template && this.template.injectedContent) {
        const headerProps = new CellProperties();
        headerProps.hideText = true;

        const bodyProps = new CellProperties();
        bodyProps.clickEvent.subscribe((event: { row: any, cell: BasicTableCell }) => {
          event.cell.body.animatedIcon.state = this._evalForInjected(event.row, event.cell);
        });
        bodyProps.animatedIcon = {
          conditionField: 'show',
          icon: AnimatedIcon.EXPAND_SORT,
          state: false
        };
        cells.push(new BasicTableCell(
          'showInjected',
          'Show Injected',
          false,
          undefined,
          BasicTableCellType.animatedIcon,
          headerProps,
          bodyProps
        ));
      }

      this.tableDefinition.cells.forEach(cell => {
        const headerProperties = cell.header ? new CellProperties(
          cell.header.hide,
          cell.header.hideText,
          cell.header.colspan,
          cell.header.textAlign,
          cell.header.fontWeight,
          cell.header.minWidth,
          cell.header.width,
          cell.header.marquee,
          cell.header.bgColor,
          cell.header.color,
          cell.header.icon,
          cell.header.iconColor,
          cell.header.cursorType,
          cell.header.borderRight,
          cell.header.clickEvent,
          cell.header.conditionalIcon,
          cell.header.animatedIcon
        ) : new CellProperties();

        const bodyProperties = cell.body ? new CellProperties(
          cell.body.hide,
          cell.body.hideText,
          cell.body.colspan,
          cell.body.textAlign,
          cell.body.fontWeight,
          cell.body.minWidth,
          cell.body.width,
          cell.body.marquee,
          cell.body.bgColor,
          cell.body.color,
          cell.body.icon,
          cell.body.iconColor,
          cell.body.cursorType,
          cell.body.borderRight,
          cell.body.clickEvent,
          cell.body.conditionalIcon,
          cell.body.animatedIcon
        ) : new CellProperties();

        cells.push(new BasicTableCell(
          cell.field,
          cell.label,
          cell.sort,
          cell.sortDirection,
          cell.cellType,
          headerProperties,
          bodyProperties,
          cell.actions,
          cell.disabledField
        ));
      });

      this.template = new BasicTable(
        cells, this.tableDefinition.groups,
        this.tableDefinition.outparamName,
        this.tableDefinition.tableName,
        this.tableDefinition.allowCellClick,
        this.tableDefinition.rowColor,
        this.tableDefinition.color,
        this.tableDefinition.injectedContent);
    }
  }

  get tableData(): any[] {
    return this.searchResults ? this.searchResults : this.data;
  }

  set tableData(tableData: any[]) {
    this.searchResults ? this.searchResults = tableData : this.data = tableData;
  }

  get rows(): any[] {
    return this.rowsPerPage ? this.page : this.tableData;
  }

  public isIconCell(cellType: BasicTableCellType) {
    return cellType === BasicTableCellType.icon;
  }

  public isConditionalIcon(cellType: BasicTableCellType) {
    return cellType === BasicTableCellType.conditionalIcon;
  }

  public isAnimatedIcon(cellType: BasicTableCellType) {
    return cellType === BasicTableCellType.animatedIcon;
  }

  get pagerText(): string {
    return this.tableData ?
      `${(this.pageNum * this.rowsPerPage) + 1} - ${this.pagerEndVal} of ${this.tableData.length}` :
      '';
  }

  get pagerButtons(): number[] {
    let pages = new Array<number>();

    if (this.numPages) {
      if (this.numPages <= 3) {
        pages = [];

        for (let i = 0; i < this.numPages; i++) {
          pages.push(i);
        }
      } else if (this.pageNum >= 3 && this.pageNum < this.pagerEndButton - 3) {
        pages = [
          this.pageNum - 2,
          this.pageNum - 1,
          this.pageNum,
          this.pageNum + 1,
          this.pageNum + 2];
      } else if (this.pageNum >= this.pagerEndButton - 3) {
        pages = [
          this.pagerEndButton - 3,
          this.pagerEndButton - 2,
          this.pagerEndButton - 1,
          this.pagerEndButton];
      }
    }

    return pages;
  }

  get pagerEndVal(): number {
    const endVal = (this.pageNum * this.rowsPerPage) + this.rowsPerPage;
    return endVal > this.tableData.length ? this.tableData.length : endVal;
  }

  get pagerEndButton(): number {
    return Math.floor(this.numPages);
  }

  public setPageNumber(pageNum: number) {
    this.pageNum = pageNum;
  }

  get page(): any[] {
    this.numPages = this.tableData.length / this.rowsPerPage;
    const startIndex = this.pageNum * this.rowsPerPage;
    return this.tableData.slice(startIndex, startIndex + this.rowsPerPage);
  }

  public allowCellClick(cell: BasicTableCell): boolean {
    return cell.cellType && (cell.cellType === BasicTableCellType.conditionalIcon ||
      cell.cellType === BasicTableCellType.icon ||
      cell.actions !== undefined || this.tableDefinition.allowCellClick);
  }

  public pageLeft() {
    this.pageNum = this.pageNum > 1 ? this.pageNum - 1 : 0;
  }

  public pageRight() {
    this.pageNum = this.pagerEndVal >= this.tableData.length ? this.pageNum : this.pageNum + 1;
  }

  public sortingDown(sortDirection: SortDirection) {
    return sortDirection === SortDirection.DOWN;
  }

  public processSearchResults(results: any[]) {
    this.searchResults = results;
  }

  public processCell(row: any, cell: BasicTableCell): string {
    let dispText = row[cell.field];

    switch (cell.cellType) {
      case BasicTableCellType.date:
        dispText = this.formatService.getDatetimeSecondMilliReports(new Date(dispText));
        break;
      case BasicTableCellType.trx:
        dispText = '$' + dispText;
        break;
    }

    return dispText;
  }

  /**
   * Emits a click and evaluates whether the click should open injected data.
   * @param row The data row to emit.
   * @param cell The cell to emit.
   * @param data The data to evaluate.
   */
  public emitClick(row: any, cell: BasicTableCell, data: any) {
    if (cell.label === 'showInjected') {
      this._evalForInjected(row, cell);
    } else {
      this.cellClick.emit({
        row,
        cell,
        data
      });
    }
  }

  /**
   * Evaluates whether a click event should show the injected data.
   * @param row The data row.
   * @param cell The cell to be evaluated.
   */
  private _evalForInjected(row: any, cell: BasicTableCell): boolean {
    if (row['injectedDelay']) {
      clearTimeout(row['injectedDelay']);
      row['openInjectedData'] = false;
      row[cell.field] = false;
    }

    if (this.tableDefinition.injectedContent) {
      if (row['showInjectedData']) {
        row['openInjectedData'] = false;
        row[cell.field] = false;
        row['injectedDelay'] = setTimeout(() => {
          delete row['showInjectedData'];
        }, 500);
        return false;
      } else {
        row[cell.field] = true;
        row['showInjectedData'] = true;
        row['openInjectedData'] = true;
        return true;
      }
    }
  }

  /**
   * Checks if the cell is an icon (or "clickable") cell.
   * @param cell The cell to be emitted.
   * @returns true if the cell is an icon (or "clickable") cell.
   */
  public isIconType(cell: BasicTableCell): boolean {
    return cell &&
      cell.cellType === BasicTableCellType.conditionalIcon ||
      cell.cellType === BasicTableCellType.icon ||
      cell.cellType === BasicTableCellType.animatedIcon;
  }

  public sortByColumn(cell: BasicTableCell) {
    if (cell.sort) {
      cell.sortDirection = cell.sortDirection === SortDirection.UP ?
        SortDirection.DOWN : SortDirection.UP;
    } else {
      this.tableDefinition.cells.forEach((tableCell: BasicTableCell) => {
        tableCell.sort = false;
        tableCell.sortDirection = SortDirection.DOWN;
      });
    }

    cell.sort = true;

    const sort = (a: any, b: any) => {
      let aVal: number;
      let bVal: number;

      if (typeof a[cell.field] === 'string') {
        const isTime = /(\d\d:\d\d)$/.test(a[cell.field]);

        if (isTime) {
          const aSplit = a[cell.field].split(':');
          const bSplit = b[cell.field].split(':');

          aVal = (Number.parseInt(aSplit[0], 10) * 60) + Number.parseInt(aSplit[1], 10);
          bVal = (Number.parseInt(bSplit[0], 10) * 60) + Number.parseInt(bSplit[1], 10);
        } else {  // Just a plain 'ol string
          aVal = a[cell.field];
          bVal = b[cell.field];
        }
      } else { // Something that'll sort itself, like a number
        aVal = a[cell.field];
        bVal = b[cell.field];
      }

      const greaterThan = aVal > bVal;
      const lessThan = aVal < bVal;

      return cell.sortDirection === SortDirection.DOWN ?
        greaterThan ? 1 : lessThan ? -1 : 0 :
        greaterThan ? -1 : lessThan ? 1 : 0;
    };

    this.tableData = this.tableData.sort(sort);
  }
}
