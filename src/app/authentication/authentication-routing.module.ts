import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { AuthenticationComponent } from './authentication.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AuthParentComponent } from './auth-parent/auth-parent.component';

const routes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: 'login'
  },
  {
    path: 'auth-parent',
    component: AuthParentComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'sign-up',
    component: SignUpComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { 
  
}
