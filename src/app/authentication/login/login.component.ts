import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MessagesService } from 'src/app/services/messages.service';
import { UserService } from 'src/app/services/user.service';
// import { FooterComponent } from 'src/app/layout/footer/footer.component';
// import { HeaderComponent } from 'src/app/layout/header/header.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', './mobile.scss']
})
export class LoginComponent implements OnInit{
  messages = []
  hidePassword = true
  forgetEmail = "";
  ngOnInit(): void {
  }
  loginData = {
    username: '',
    password: ''
  };

  constructor(private authService: AuthService, private userService: UserService, private router: Router, private messageService: MessagesService) {

  }

  toggleHidePassword(){
    this.hidePassword = !this.hidePassword
  }

  login() {
    // const username = 'arpit@doqfy.in';
    // const password = 'contract@123';

    this.authService.login(this.loginData.username, this.loginData.password).subscribe(
      (response) => {
        this.authService.clearUserData()
        this.authService.storeUserData(response.body)
        // this.userService.(response.body);
        console.log('Login successful:', response);
        this.router.navigate(['/']);
      },
      (error) => {
        if (error.error.message && Array.isArray(error.error.message)) {
          this.messages = error.error.message;
          this.messages.forEach(message => {
            this.messageService.addMessage(message);
          });
          setTimeout(() => {
            this.messages = [];
          }, 1000);
        }
        console.error('Login failed:', error);
      }
    );
  }

forgotPassword(){
  let params = {email:this.forgetEmail}
  this.userService.forgetPassword(params).subscribe(
    (response) => {
      console.log(response)
      
      if (response.body && response.message && Array.isArray(response.message)) {
        this.messages = response.message;
        this.messages.forEach(message => {
          this.messageService.addMessage(message);
        });
        setTimeout(() => {
          this.messages = [];
        }, 2000);
      }},
    (error) => {
      console.error('Error fetching APIs:', error);
      // Handle errors here
    }
  );
}

}
