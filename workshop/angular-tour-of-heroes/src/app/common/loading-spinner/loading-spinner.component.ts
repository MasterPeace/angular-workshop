import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'th-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styles: []
})
export class LoadingSpinnerComponent implements OnInit {

  @Input()
  displaySpinner: boolean;

  constructor() { }

  ngOnInit() {
  }

}
