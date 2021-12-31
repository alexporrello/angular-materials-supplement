import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { BasicTable } from '@basic-table/models/basic-table.model';
import { BasicTableFormatService } from '@basic-table/services/basic-table-format.service';

@Component({
  selector: 'app-basic-table-countdown',
  templateUrl: './basic-table-countdown.component.html',
  styleUrls: ['./basic-table-countdown.component.scss']
})
export class BasicTableCountdownComponent implements OnChanges {
/**
    * The table definition.
    */
 @Input() tableDefinition: BasicTable;

 /**
  * The data to be displayed in the table.
  */
 @Input() tableData: any;

 /**
  * The time in seconds between emitting data refresh.
  */
 @Input() refreshInterval = 30;

 /**
  * True when the data is loading; otherwise, false.
  */
 @Input() loading = false;
 /**
  * Set to true if the data fetch failed.
  */
 @Input() failed = false;

 /**
  * Set if table should be pageable.
  */
 @Input() rowsPerPage: number;

 /**
  * True if table should have search functionality.
  */
 @Input() searchable = false;

 /**
  * Emits when the countdown is done.
  */
 @Output() timerDone = new EventEmitter();

 /**
  * Emits when the user clicks a table row.
  */
 @Output() rowClick = new EventEmitter();

 /**
  * Emits when the user clicks a table cell.
  */
 @Output() cellClick = new EventEmitter();

 public timer: NodeJS.Timer;
 public lastRefresh = '';
 public refreshCountdown = 0;

 constructor(public formatService: BasicTableFormatService) { }

 ngOnChanges(changes: SimpleChanges) {
    if (changes.tableData) {
       if (this.timer) {
          clearTimeout(this.timer);
       }

       if (this.tableData) {
          this.startCountdown();
       }
    }
 }

 private startCountdown() {
    this.lastRefresh = this.formatService.formatDate(new Date(), 'hh:mm:ss');
    this.refreshCountdown = this.refreshInterval;
    const countdown = () => {
       if (this.refreshCountdown === -1) {
          clearTimeout(this.timer);
          this.timerDone.emit();
       } else {
          this.refreshCountdown--;
       }
    };
    this.timer = setInterval(countdown, 1000);
 }
}
