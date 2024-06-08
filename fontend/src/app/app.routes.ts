import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { ProductListComponent } from './pages/admin/products/list/list.component';
import { ClientLayoutComponent } from './layouts/client-layout/client-layout.component';
import { ProductDetailComponent } from './pages/products/detail/detail.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { ProductCreateComponent } from './pages/admin/products/create/create.component';
import { ProductEditComponent } from './pages/admin/products/edit/edit.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { GuadService } from './services/guad.service';
import { ListUserComponent } from './pages/admin/list-user/list-user.component';

export const routes: Routes = [
  {
    path: 'admin',
    canActivate: [GuadService],
    component: AdminLayoutComponent,
    children: [
      {
        path: 'list',
        component: ProductListComponent,
      },
      {
        path: 'add',
        component: ProductCreateComponent,
      },
      {
        path: 'edit/:id',
        component: ProductEditComponent,
      },
      {
        path: 'user',
        component: ListUserComponent,
      },
      {
        path: 'search',
        component: ProductListComponent,
      },
    ],
  },
  {
    path: '',
    component: ClientLayoutComponent,
    children: [
      {
        path: '',
        component: HomepageComponent,
      },
      {
        path: 'search',
        component: HomepageComponent,
      },
      {
        path: 'detail/:id',
        component: ProductDetailComponent,
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
];
