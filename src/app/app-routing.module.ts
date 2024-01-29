import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AccueilComponent} from './accueil/accueil.component';
import {SearchFestComponent} from './search-fest/search-fest.component';
import {AuthentificationComponent} from "./authentification/authentification.component";


const routes: Routes = [
    {path: '', title: 'Accueil', component: AccueilComponent},
    {path: 'search-fest', component: SearchFestComponent},
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'login', component: AuthentificationComponent},
    {path: 'cart', component: AuthentificationComponent},

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {
}
