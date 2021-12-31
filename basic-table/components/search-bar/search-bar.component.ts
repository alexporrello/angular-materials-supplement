import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { BasicTable } from '../../models/basic-table.model';
import { BasicTableCell } from '../../models/basic-table-cell.model';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: [ './search-bar.component.scss' ]
})
export class SearchBarComponent implements OnChanges {
  @Input() data: any[];
  @Input() tableDefinition: BasicTable;
  @Input() elevated = true;

  @Output() results = new EventEmitter<any[]>();

  @ViewChild('input') input: ElementRef;

  public searchForm: FormGroup;

  public allColumns: any[];
  public allFields: string[];

  public matchCase = false;
  public wholeWord = false;
  public hasSearched = false;

  constructor() {
    this.searchForm = new FormGroup({
      query: new FormControl('', Validators.required),
      columns: new FormControl([])
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.tableDefinition && this.tableDefinition) {
      this.allColumns = [];
      this.allFields = [];
      this.tableDefinition.cells.forEach((cell: BasicTableCell) => {
        if (cell.label.length > 0 && cell.field.length > 0) {
          this.allColumns.push({
            field: cell.field,
            label: cell.label
          });
          this.allFields.push(cell.field);
        }
      });
    }
  }

  get selectedColumns(): string[] {
    return this.searchForm.controls.columns.value;
  }

  get dropdownText(): string {
    return this.selectedColumns.length === 1 ?
      this.selectedColumns[0] : 'Multiple';
  }

  get isSearching(): boolean {
    return this.input.nativeElement.value.length > 0;
  }

  public search(search: any) {
    const selectedCols = this.selectedColumns.length === 0 ? this.allFields : this.selectedColumns;
    const query = this.matchCase ? search.query : search.query.toLowerCase();

    const searchResults = this.data.filter((row: any) => {
      let isMatch = false;

      if (!this.wholeWord && selectedCols.length === 0) {
        const rowString = JSON.stringify(row);
        isMatch = this.matchCase ?
          rowString.includes(query) : rowString.toLowerCase().includes(query);
      } else {
        for (let i = 0; i < selectedCols.length; i++) {
          const field = selectedCols[i];
          const colVal = this.matchCase || (typeof row[field]) !== 'string' ?
            row[field] : row[field].toLowerCase();

          isMatch = this.wholeWord || (typeof row[field]) !== 'string' ?
            query === colVal :
            colVal.includes(query) || query.includes(colVal);

          if (isMatch) { break; }
        }
      }

      return isMatch;
    });

    this.hasSearched = true;
    this.results.emit(searchResults);
  }

  public clearSearch() {
    this.input.nativeElement.value = '';
    this.hasSearched = false;
    this.results.emit(null);
  }
}
