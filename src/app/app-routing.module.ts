import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { ClientLayoutComponent } from './layouts/client-layout/client-layout.component';
import { CateEditComponent } from './screens/admin/cate-edit/cate-edit.component';
import { CateListComponent } from './screens/admin/cate-list/cate-list.component';
import { CateNewComponent } from './screens/admin/cate-new/cate-new.component';
import { DashboardComponent } from './screens/admin/dashboard/dashboard.component';
import { DemoUploadComponent } from './screens/admin/demo-upload/demo-upload.component';
import { BookDetailComponent } from './screens/book-detail/book-detail.component';
import { BookListComponent } from './screens/book-list/book-list.component';
import { HeroListComponent } from './screens/hero-list/hero-list.component';
import { AuthListComponent } from './screens/auth/auth-list/auth-list.component';
import { AuthNewComponent } from './screens/auth/auth-new/auth-new.component';
import { AuthEditComponent } from './screens/auth/auth-edit/auth-edit.component';
import { ProdFormComponent } from './screens/admin/products/prod-form/prod-form.component';
import { ProdListComponent } from './screens/admin/products/prod-list/prod-list.component';
import { ProdEditComponent } from './screens/admin/products/prod-edit/prod-edit.component';

const routes: Routes = [
  {
    path: '',
    component: ClientLayoutComponent,
    children: [
      {
        path: "",
        component: BookListComponent
      },
      {
        path: "chi-tiet/:bookId",
        component: BookDetailComponent
      }
    ]
  },
  {
    path: "admin",
    component: AdminLayoutComponent,
    children: [
      {
        path: "",
        component: DashboardComponent
      },
      {
        path: "danh-muc",
        component: CateListComponent,
      },
      {
        path: "danh-muc/new",
        component: CateNewComponent
      },
      {
        path: "danh-muc/edit/:id",
        component: CateEditComponent
      },
      {
        path: "upload-firestore",
        component: DemoUploadComponent
      },
      {
        path: "san-pham",
        component: ProdListComponent
      },
      {
        path: "san-pham/new",
        component: ProdFormComponent
      },
      {
        path: "san-pham/edit/:id",
        component: ProdEditComponent
      },
      {
        path: "quoc-gia",
        component: AuthListComponent
      },
      {
        path: "quoc-gia/new",
        component: AuthNewComponent
      },
      {
        path: "quoc-gia/edit",
        component: AuthEditComponent
      },
    ]
  },
  {
    path: '**',
    redirectTo: "",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
