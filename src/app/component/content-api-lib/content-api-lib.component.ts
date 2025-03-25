import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { MessagesService } from 'src/app/services/messages.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-content-api-lib',
  templateUrl: './content-api-lib.component.html',
  styleUrls: ['./content-api-lib.component.scss', './mobile.scss']
})
export class ContentApiLibComponent implements OnInit {
  messages: string[] = [];
  apis: any;
  sectors: string[] = [];
  sector= "";
  dummyCardCount = 0;
  constructor(private apiService: ApiService, private messageService: MessagesService, private userService: UserService,) { }

  ngOnInit(): void {
    console.log("calling the ng on init")
    this.getAllAPIs();
    this.getSectors();
  }

  searchText: string = "";
  
  // options1 = ['Option 1', 'Option 2', 'Option 3'];
  // options2 = ['Option A', 'Option B', 'Option C'];


getSectors(){

  this.userService.getSector().subscribe(
    (response) => {
      this.sectors =  response.body
      if (response.body && response.message && Array.isArray(response.message)) {
        this.messages = response.message;
        // Add messages to the message service
        this.messages.forEach(message => {
          this.messageService.addMessage(message);
        });

        setTimeout(() => {
          this.messages = [];
        }, 1000);
      }},
    (error) => {
      console.error('Error fetching APIs:', error);
    }
  );
}

  getAllAPIs() {
    // Call the service method to fetch all APIs
    const params: any = {};
    if (this.sector) {
      // Add the sector parameter to the params object
      params.sector = this.sector;
  }

  if (this.searchText){
    params.search = this.searchText;
  }
    this.apiService.getAPIs(params).subscribe(
      (response) => {
        this.apis =  response.body
        console.log(this.apis[5])
        this.dummyCardCount = 4 - (this.apis.length % 4);
        if (response.body && response.message && Array.isArray(response.message)) {
          this.messages = response.message;
          // Add messages to the message service
          this.messages.forEach(message => {
            this.messageService.addMessage(message);
          });

          setTimeout(() => {
            this.messages = [];
          }, 1000);
        }},
      (error) => {
        console.error('Error fetching APIs:', error);
      }
    );
  }


  clearSelection(){
    this.sector = "";
    this.getAllAPIs()
  }


  range(count: number): number[] {
    return Array(count).fill(0).map((_, index) => index + 1);
  }



}
