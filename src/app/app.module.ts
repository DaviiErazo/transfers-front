import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Components
import { AppComponent } from './app.component';
import { CreateComponent } from './Recipient/create/create.component';
import { ServiceService } from '../app/Service/service.service';
import { SearchComponent } from './Recipient/search/search.component';
import { HistoryComponent } from './Transfer/history/history.component';
import { CreateComponent as CreateTransferComponent } from './Transfer/create/create.component';

const routes: Routes = [
  { path: 'create', component: CreateComponent },
  { path: 'search', component: SearchComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'create_transfer/:id', component: CreateTransferComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    CreateComponent,
    SearchComponent,
    HistoryComponent,
    CreateTransferComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [ServiceService],
  bootstrap: [AppComponent],
  exports: [RouterModule],
})
export class AppModule {}
