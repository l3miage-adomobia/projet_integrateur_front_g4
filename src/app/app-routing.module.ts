import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HeaderComponent} from "./shared/components/header/header.component";
import { AccueilComponent } from './accueil/accueil.component';
import { SearchFestComponent } from './search-fest/search-fest.component';
import { SearchCovoitComponent } from './search-covoit/search-covoit.component';


const routes: Routes = [
    { path: '', title: 'Accueil', component: AccueilComponent },
    { path: 'search-fest', component: SearchFestComponent },
    { path: 'search-covoit', component: SearchCovoitComponent},
    {path: 'login', component: HeaderComponent},
    {path: 'cart', component: HeaderComponent},
    
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {
}
