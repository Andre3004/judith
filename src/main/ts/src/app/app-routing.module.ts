import { LancamentListComponent } from './lancamento/lancament-list/lancament-list.component';
import { AppComponent } from './app.component';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoriaFormComponent } from './categoria/categoria-form/categoria-form.component';
 
const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'categorias', component: CategoriaFormComponent },
  { path: 'lancamentos', component: LancamentListComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, { useHash: true });

/**
 *
 */
@NgModule({
  imports: [ routing ],
  exports: [ RouterModule ]
})
export class AppRoutingModule
{

}

export const appRoutingProviders: any[] = [];