import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HeaderComponent} from './shared/components/header/header.component';
import {MatIconModule} from "@angular/material/icon";
import {MatStepperModule} from '@angular/material/stepper';
import {AccueilComponent} from './accueil/accueil.component';
import {SearchFestComponent} from './search-fest/search-fest.component';
import {SearchCovoitComponent} from "./search-covoit/search-covoit.component";
import {ConfirmDialogComponent} from "./shared/components/confirm-dialog/confirm-dialog.component";
import {AngularFireModule} from "@angular/fire/compat";
import {CommonModule, DatePipe, NgOptimizedImage, registerLocaleData} from "@angular/common";
import {MatMenuModule} from "@angular/material/menu";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {environment} from "../environments/environment";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatDialogModule} from "@angular/material/dialog";
import {MatSortModule} from "@angular/material/sort";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import { SiteWebFestivalComponent } from './site-web-festival/site-web-festival.component';
import {CartComponent} from "./cart/cart.component";
import {MatButtonModule} from "@angular/material/button";
import {AuthentificationComponent} from "./authentification/authentification.component";
import localeFr from '@angular/common/locales/fr';


registerLocaleData(localeFr);

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        AccueilComponent,
        SearchFestComponent,
        SearchCovoitComponent,
        ConfirmDialogComponent,
        AuthentificationComponent,
        CartComponent,,
        SiteWebFestivalComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatIconModule,
        MatStepperModule,
        FormsModule,
        ReactiveFormsModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        CommonModule,
        MatMenuModule,
        NgOptimizedImage,
        MatExpansionModule,
        MatDialogModule,
        MatPaginatorModule,
        MatTableModule,
        MatSortModule,
        MatButtonModule,

        /**
         * StoreModule.forRoot is imported once in the root module, accepting a reducer
         * function or object map of reducer functions. If passed an object of
         * reducers, combineReducers will be run creating your application
         * meta-reducer. This returns all providers for an @ngrx/store
         * based application.

         StoreModule.forRoot(reducers, { metaReducers }),

         /**
         * @ngrx/router-store keeps router state up-to-date in the store.

         StoreRouterConnectingModule,

         /**
         * Store devtools instrument the store retaining past versions of state
         * and recalculating new states. This enables powerful time-travel
         * debugging.
         *
         * To use the debugger, install the Redux Devtools extension for either
         * Chrome or Firefox
         *
         * See: https://github.com/zalmoxisus/redux-devtools-extension

         !environment.production ? StoreDevtoolsModule.instrument() : [],

         /**
         * EffectsModule.forRoot() is imported once in the root module and
         * sets up the effects class to be initialized immediately when the
         * application starts.
         *
         * See: https://github.com/ngrx/platform/blob/master/docs/effects/api.md#forroot
         */
    ],
    providers: [DatePipe],
    bootstrap: [AppComponent]
})
export class AppModule {
}
