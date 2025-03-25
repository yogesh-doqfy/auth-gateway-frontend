import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MessagesService } from 'src/app/services/messages.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-key-container',
  templateUrl: './key-container.component.html',
  styleUrls: ['./key-container.component.scss', './mobile.scss']
})
export class KeyContainerComponent implements OnInit {
// userDetails:any;
// PROD = {};
// STAG = {};
messages: string[] = [];

copyText = "Copy"
copyText2 = "Copy"
isSmallScreen: boolean = false;

// your other properties and methods

checkScreenWidth(): void {
  this.isSmallScreen = window.innerWidth <= 500;
  // this.isSmallScreen = true
}


  constructor(private messageService: MessagesService, private authService: AuthService, private userService: UserService) {

   }

  ngOnInit(): void {
this.checkScreenWidth();        
  }

  @Input() details: any = {title:"", api_key:"", secret_key:"", prod:false};

  copyToClipboard(text: string, num: number): void {
    navigator.clipboard.writeText(text)
      .then(() => {
        console.log('Text copied to clipboard successfully.');
      })
      .catch((error) => {
        console.error('Unable to copy text to clipboard.', error);
      });

      if (num==1){
        this.copyText = "Copied"
        setTimeout(() => {
          this.copyText = "Copy"; // Hide the message after a delay
        }, 1000);
      }

      if (num==2){
        this.copyText2 = "Copied"
        setTimeout(() => {
          this.copyText2 = "Copy"; // Hide the message after a delay
        }, 1000);
      }
    }
  

    requestProdCredentials(){
      let userDetails = this.authService.getUserData();
      this.goLive()

      this.messages = []
      let message = `Your production credentials has been send to ${userDetails.email}.`
      this.messages.push(message)
      this.messageService.addMessage(message)
    console.log(this.messages)
      setTimeout(() => {
        this.messages = []
      }, 3000);
    }


    goLive() {
      this.userService.goLive().subscribe(
        (response) => {  
          if (response.body && response.message && Array.isArray(response.message)) {
            this.messages = response.message;
            // Add messages to the message service
            this.messages.forEach(message => {
              this.messageService.addMessage(message);
            });
  
            setTimeout(() => {
              this.messages = [];
            }, 1000);
          }
          // Assign the API detail to the property
          // this.apiDetail = response.body;
        },
        (error) => {
          console.error('Error fetching API:', error);
        }
      );
    }
  

}
