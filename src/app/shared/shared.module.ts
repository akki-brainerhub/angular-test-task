import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationComponent } from './pagination/pagination.component';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [PaginationComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatPaginatorModule
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    PaginationComponent,
    MatPaginatorModule,
  ]
})
export class SharedModule { }
