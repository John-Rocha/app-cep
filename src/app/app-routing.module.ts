import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CepSearchComponent } from './components/cep-search/cep-search.component';
import { CepDetailsComponent } from './components/cep-details/cep-details.component';

const routes: Routes = [
  { path: '', component: CepSearchComponent },
  { path: 'cep/:cep', component: CepDetailsComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
