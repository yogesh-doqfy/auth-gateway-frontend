import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AuthParentComponent } from './auth-parent/auth-parent.component';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { HeaderComponent } from '../layout/header/header.component';
import { LayoutModule } from '../layout/layout.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageInterceptor } from '../interceptor/message.interceptor';



@NgModule({
  declarations: [
    LoginComponent,
    SignUpComponent,
    AuthParentComponent
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    LayoutModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule

  ],
  providers:[{ provide: HTTP_INTERCEPTORS, useClass: MessageInterceptor, multi: true }]
})
export class AuthenticationModule { }
