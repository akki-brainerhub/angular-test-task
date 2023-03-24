import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './layouts/admin/admin.component';
import { ComponetsModule } from "./componets/componets.module";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'userlist',
    pathMatch: 'full',
  },
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', loadChildren: () => import('./layouts/admin/admin.module').then(m => m.AdminModule) },
    ]
  }

];

@NgModule({
  declarations: [AdminComponent],
  exports: [RouterModule],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, { useHash: true }),
    ComponetsModule
  ]
})
export class AppRoutingModule { }
