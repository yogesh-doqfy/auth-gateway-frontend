import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss', './mobile.scss']
})
export class SignUpComponent implements OnInit {
  messages: string[] = [];
  signupForm!: FormGroup;

  constructor(private authService: AuthService, private messageService: MessagesService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      contact: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  signUp(): void {
    if (this.signupForm.valid) {
      const { email, name, contact, password } = this.signupForm.value;
      this.authService.signUp(email, name, password, contact).subscribe(
        (response) => {
          console.log(response);
          if (response.body && response.message && Array.isArray(response.message)) {
            this.messages = response.message;
            this.messages.forEach(message => {
              this.messageService.addMessage(message);
            });
            setTimeout(() => {
              this.messages = [];
              this.router.navigate(['/auth/login']);
            }, 2000);
          }
        },
        (error) => {
          if (error.error.message && Array.isArray(error.error.message)) {
            this.messages = error.error.message;
            this.messages.forEach(message => {
              this.messageService.addMessage(message);
            });
            setTimeout(() => {
              this.messages = [];
            }, 2000);
          }
          console.error('Error fetching API:', error);
        }
      );
    } else {
      console.error('Form is invalid');
      console.log(this.signupForm)
    }
  }

  validateContact(contact: string): boolean {
    return /^\d{10}$/.test(contact);
  }
  
}
