import { Routes } from '@angular/router';
import { FormDelcarationPollution } from './pollution_managment/components/form-delcaration-pollution/form-delcaration-pollution'; 
import { ListPollutions } from './pollution_managment/components/list-pollutions/list-pollutions'; 

export const routes: Routes = [
    { path: 'declare-pollution/create', component: FormDelcarationPollution },
    { path: 'list-pollutions', component: ListPollutions },
    { path: 'declare-pollution/edit/:id', component: FormDelcarationPollution }
];
