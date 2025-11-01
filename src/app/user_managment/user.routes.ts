import { Routes } from '@angular/router';
import { FormCreateUser } from './components/form-create-user/form-create-user';
import { ListUsers } from './components/list-users/list-users';

export const USER_ROUTES: Routes = [
    { path: 'create', component: FormCreateUser },
    { path: 'list', component: ListUsers }
];

