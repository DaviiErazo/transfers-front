import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { CreateComponent } from './Recipient/create/create.component';

import { ServiceService } from '../app/Service/service.service';
import { SearchComponent } from './Recipient/search/search.component';
import { HistoryComponent } from './Transfer/history/history.component';

const routes: Routes = [
  { path: 'create', component: CreateComponent },
  { path: 'search', component: SearchComponent },
  { path: 'history', component: HistoryComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    CreateComponent,
    SearchComponent,
    HistoryComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot(),
  ],
  providers: [ServiceService],
  bootstrap: [AppComponent],
  exports: [RouterModule],
})
export class AppModule {}
