import {Component, Input, EventEmitter, Output, OnChanges, SimpleChanges} from '@angular/core';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.sass']
})
export class PaginationComponent implements OnChanges {
  @Input() paginationData: { page: number; limit: number };
  @Output() goPrev = new EventEmitter<boolean>();
  @Output() goNext = new EventEmitter<boolean>();
  @Output() goPage = new EventEmitter<number>();

  faChevronRight = faChevronRight;
  faChevronLeft = faChevronLeft;
  pages: number[] = [];

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['paginationData'] && this.paginationData !== undefined) {
      this.pages = this.toArray(this.paginationData.limit);
    }
  }

  /**
   * Emit to go to previous page
   */
  goPrevPage() {
    this.goPrev.emit();
  }
  /**
   * Emit to go to next page
   */
  goNextPage(): void {
    this.goNext.emit();
  }

  /**
   * Emit to go to desired page
   * @param event the page number
   */
  goToPage(event: number) {
    this.goPage.emit(event);
  }

  /**
   * Convert total number of pages to array
   * @param n number of pages
   */
  toArray(n: number): number[] {
    if (n === null) {n = 1; }
    return [...Array.from(Array(n).keys())];
  }
}
