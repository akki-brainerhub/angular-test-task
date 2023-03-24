import { Routes } from "@angular/router";


export const AdminLayoutRoutes: Routes = [
    { path: '', redirectTo: '/userlist', pathMatch: 'full' },
    { path: 'userlist', loadChildren: () => import('../contacts/contacts.module').then(m => m.ContactsModule) },
    { path: '**', redirectTo: '/userlist', pathMatch: 'full' },
];