import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactsComponent } from './contacts.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddContactsComponent } from './add-contacts/add-contacts.component';
import { ImageUploadComponent } from './image-upload/image-upload.component';

const routes: Routes = [
  { path: '', component: ContactsComponent },
  //{ path: 'view/:id', component: ViewContactsComponent }
  //{ path: 'view/:id', loadChildren: () => import('./view-contacts/view-contacts.module').then(m => m.ViewContactsModule)},
];

@NgModule({
  declarations: [
    ContactsComponent,
    AddContactsComponent,
    ImageUploadComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class ContactsModule { }
