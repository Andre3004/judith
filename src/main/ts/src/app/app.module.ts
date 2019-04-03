import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localeBr from '@angular/common/locales/pt';

import { FlexLayoutModule } from '@angular/flex-layout';
import
{
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatSelectModule,
  MatSidenavModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MAT_DATE_LOCALE,
  MAT_DATE_FORMATS, MatGridListModule, MatTreeModule, MatNativeDateModule
} from '@angular/material';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { FormsModule } from '@angular/forms';
//===============================COVALENT MODULES================================
import
{
  CovalentChipsModule,
  CovalentCommonModule,
  CovalentDataTableModule,
  CovalentDialogsModule,
  CovalentExpansionPanelModule,
  CovalentFileModule,
  CovalentLayoutModule,
  CovalentLoadingModule,
  CovalentMediaModule,
  CovalentMessageModule,
  CovalentPagingModule,
  CovalentStepsModule,
  TdDialogService,
  TdLayoutComponent
} from '@covalent/core';

import { CovalentSearchModule } from '@covalent/core/search';
//==============================OTHER COMPONENTS===================================

//==============================APP COMPONENTS===================================
import { GeneratedModule } from '../generated/generated.module';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AppRoutingModule, appRoutingProviders } from './app-routing.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BROKER_CONFIGURATION } from 'src/generated/services-wrapper';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutModule } from '@angular/cdk/layout';
import { OpenSnackBarService } from './open-snackbar/open-snackbar.service';
import { HeaderComponent } from './header/header.component';
import { ContaFormComponent } from './conta/conta-form/conta-form.component';
import { CategoriaFormComponent } from './categoria/categoria-form/categoria-form.component';
import { LancamentFormComponent } from './lancamento/lancament-form/lancament-form.component';
import { LancamentListComponent } from './lancamento/lancament-list/lancament-list.component';

// import ngx-translate and the http loader
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';


registerLocaleData(localeBr, 'pt')

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    ContaFormComponent,
    CategoriaFormComponent,
    LancamentFormComponent,
    LancamentListComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    GeneratedModule,
    HttpClientModule,

    CommonModule,
    CovalentLayoutModule,
    CovalentStepsModule,
    CovalentChipsModule,
    CovalentFileModule,
    CovalentExpansionPanelModule,
    CovalentPagingModule,
    CovalentLoadingModule,
    CovalentMediaModule,
    CovalentMessageModule,
    CovalentCommonModule,
    CovalentDataTableModule,
    CovalentDialogsModule,
    MatAutocompleteModule,
    MatIconModule,
    MatSelectModule,
    MatDatepickerModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatInputModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatDialogModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatListModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatButtonToggleModule,
    MatTabsModule,
    FormsModule,
    FlexLayoutModule,
    MatExpansionModule,
    MatAutocompleteModule,
    RouterModule,
    AppRoutingModule,
    MatGridListModule,
    LayoutModule,
    MatTreeModule,
    CovalentSearchModule,
    MatNativeDateModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  })
  ],
  entryComponents: [ContaFormComponent, LancamentFormComponent],
  providers: [
    OpenSnackBarService,
    appRoutingProviders,
    TdLayoutComponent,
    TdDialogService,
    {
      provide: BROKER_CONFIGURATION,
      useValue: {
        path: '/broker',
        useMoment: true
      }
    },
    { provide: LOCALE_ID, useValue: 'pt' },
  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule { }

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}