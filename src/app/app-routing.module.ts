import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrackPasswordDetailsComponent } from './crack-password-details/crack-password-details.component';
import { DatabaseDetailsComponent } from './database-details/database-details.component';
import { EncryptionDetailsComponent } from './encryption-details/encryption-details.component';
import { HomeComponent } from './home/home.component';
import { InfoComponent } from './info/info.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'password-cracking', component: CrackPasswordDetailsComponent},
  { path: 'encryption', component: EncryptionDetailsComponent},
  { path: 'database', component: DatabaseDetailsComponent},
  { path: 'about', component: InfoComponent },
  { path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
