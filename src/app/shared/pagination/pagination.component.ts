import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { AppConst } from 'src/app/app.constant';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  // MatPaginator Inputs
  length: any;
  pageSize = AppConst.pageSize;
  pageSizeOptions: number[] = AppConst.pageSizeOptions;
  pageEvent: PageEvent | undefined;
  offSet: any = 1;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @Input() childMessage!: number;
  @Input() index: number | undefined;
  @Output() messageEvent = new EventEmitter<any>();
  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
  }
  /** Change pagination page index */
  ngOnChanges() {
    this.cdr.detectChanges();
    this.paginator.pageIndex = this.index;
  }

  /** For next page */
  getNext(event: PageEvent) {
    if (this.childMessage >= 6) {
      this.messageEvent.emit(event);
    }
  }
}
