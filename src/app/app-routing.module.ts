import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AccueilComponent} from './accueil/accueil.component';
import {SearchFestComponent} from './search-fest/search-fest.component';
import {AuthentificationComponent} from "./authentification/authentification.component";
import {SearchCovoitComponent} from './search-covoit/search-covoit.component';
import {CartComponent} from "./cart/cart.component";


const routes: Routes = [
    {path: '', title: 'Accueil', component: AccueilComponent},
    {path: 'search-fest', component: SearchFestComponent},
    {path: 'search-covoit', component: SearchCovoitComponent},
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'login', component: AuthentificationComponent},
    {path: 'cart', component: CartComponent},

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {
}
