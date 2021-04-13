import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroListComponent } from './screens/hero-list/hero-list.component';
import { HeroUnitComponent } from './components/hero-unit/hero-unit.component';
import { HeroFormComponent } from './components/hero-form/hero-form.component';
import { GenderPipePipe } from './pipes/gender-pipe.pipe';
import { HttpClientModule } from '@angular/common/http';
import { BookListComponent } from './screens/book-list/book-list.component';
import { BookDetailComponent } from './screens/book-detail/book-detail.component';
import { ClientLayoutComponent } from './layouts/client-layout/client-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './screens/admin/dashboard/dashboard.component';
import { CateListComponent } from './screens/admin/cate-list/cate-list.component';
import { CateNewComponent } from './screens/admin/cate-new/cate-new.component';
import { CateEditComponent } from './screens/admin/cate-edit/cate-edit.component';
import { ProdListComponent } from './screens/products/prod-list/prod-list.component';
import { AuthListComponent } from './screens/auth/auth-list/auth-list.component';
import { ProdNewComponent } from './screens/products/prod-new/prod-new.component';
import { ProdEditComponent } from './screens/products/prod-edit/prod-edit.component';
import { AuthNewComponent } from './screens/auth/auth-new/auth-new.component';
import { AuthEditComponent } from './screens/auth/auth-edit/auth-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroListComponent,
    HeroUnitComponent,
    HeroFormComponent,
    GenderPipePipe,
    BookListComponent,
    BookDetailComponent,
    ClientLayoutComponent,
    AdminLayoutComponent,
    DashboardComponent,
    CateListComponent,
    CateNewComponent,
    CateEditComponent,
    ProdListComponent,
    AuthListComponent,
    ProdNewComponent,
    ProdEditComponent,
    AuthNewComponent,
    AuthEditComponent,
    ProdListComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
