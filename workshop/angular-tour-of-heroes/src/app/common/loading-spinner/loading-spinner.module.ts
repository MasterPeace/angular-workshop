import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from './loading-spinner.component';
import { MatProgressBarModule } from '@angular/material';

@NgModule({
  imports: [CommonModule, MatProgressBarModule],
  declarations: [LoadingSpinnerComponent],
  exports: [LoadingSpinnerComponent]
})
export class LoadingSpinnerModule {}
