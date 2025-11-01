import { Routes } from '@angular/router';
import { FormDelcarationPollution } from './components/form-delcaration-pollution/form-delcaration-pollution';
import { ListPollutions } from './components/list-pollutions/list-pollutions';

export const routes: Routes = [
    { path: 'declare-pollution/create', component: FormDelcarationPollution },
    { path: 'list-pollutions', component: ListPollutions },
    { path: 'declare-pollution/edit/:id', component: FormDelcarationPollution }
];
