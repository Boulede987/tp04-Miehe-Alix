import { Routes } from '@angular/router';
import { ListPollutions } from './components/list-pollutions/list-pollutions';
import { FormDelcarationPollution } from './components/form-delcaration-pollution/form-delcaration-pollution';

export const POLLUTION_ROUTES: Routes = [
    { path: 'create', component: FormDelcarationPollution },
    { path: 'list', component: ListPollutions },
    { path: 'edit/:id', component: FormDelcarationPollution }
];