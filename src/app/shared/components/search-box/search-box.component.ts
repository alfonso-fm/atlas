import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [
  ]
})
export class SearchBoxComponent implements OnInit, OnDestroy {

  private debouncer: Subject<string> = new Subject<string>();
  private debouncerSubscription?: Subscription;

  @ViewChild('txtInput')
  public termInput!: ElementRef<HTMLInputElement>;

  @Input()
  public myplaceholder: string = '';

  @Input()
  public initialValue: string = '';

  @Output()
  public onValue: EventEmitter<string> = new EventEmitter();

  @Output()
  public onDebounce: EventEmitter<string> = new EventEmitter();

  ngOnInit(): void {
    this.debouncerSubscription = this.debouncer
    .pipe(debounceTime(2000))
    .subscribe( value => {
      this.onDebounce.emit( value );
    });
  }

  ngOnDestroy(): void {
    this.debouncerSubscription?.unsubscribe();
  }

  emitValue(term: string) {
    this.onValue.emit(term);
  }

  onKeyPress( searchTerm: string){
    this.debouncer.next( searchTerm );
  }
}
