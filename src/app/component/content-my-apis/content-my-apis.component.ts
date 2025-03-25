import { ViewportScroller } from '@angular/common';
import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { MessagesService } from 'src/app/services/messages.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-content-my-apis',
  templateUrl: './content-my-apis.component.html',
  styleUrls: ['./content-my-apis.component.scss', './mobile.scss']
})
export class ContentMyApisComponent implements OnInit {
  messages: string[] = [];
  apis: any = [];
  recommendation: any = [];
  sectors: string[] = [];
  sector= "";
  dummyCardCount = 0;
  recommendationDummyCardCount = 0
  section = ""

  constructor(private apiService: ApiService, private messageService: MessagesService, private userService: UserService, private viewportScroller: ViewportScroller, private elementRef: ElementRef, private route: ActivatedRoute) { }

  ngOnInit(): void {
    console.log("calling the ng on init")
    this.getAllAPIs();
    this.getSectors();
    this.getRecommendationAPIs()

    // Retrieve the parameter value from the route
    this.section = this.route.snapshot.queryParams['section'];
    console.log(this.section)
    // Check the value and perform actions as needed
    if (this.section === 'recommend-api') {

      setTimeout(() => {
        
        const mainContainer = this.elementRef.nativeElement.querySelector('#main-container');

        // Check if the main-container element exists
        if (mainContainer) {
          // Find the responseContainer within the main-container
          const responseContainer = mainContainer.querySelector('#responseContainer');
      
          // Check if the responseContainer exists
          if (responseContainer) {
            // Scroll to the responseContainer
            responseContainer.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
          }
        }
      }, 1000);
      }
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
    const params: any = {my:1};
    if (this.sector) {
      // Add the sector parameter to the params object
      params.sector = this.sector;
  }
  if (this.searchText){
    params.search = this.searchText;
  }
    this.apiService.getAPIs(params).subscribe(
      (response) => {
        if (response.body){

          this.apis =  response.body
          
          if (this.apis.length > 0 && (window.innerWidth > 800)){
            this.dummyCardCount = 4 - (this.apis.length % 4);
  
          }
        }
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


  getRecommendationAPIs() {
    // Call the service method to fetch all APIs
    const params: any = {recommendation:1};
    
    this.apiService.getAPIs(params).subscribe(
      (response) => {
        if (response.body){

          this.recommendation =  response.body
          
          if (this.recommendation.length > 0 && (window.innerWidth > 800)){
            
            this.recommendationDummyCardCount = 4 - (this.recommendation.length % 4);
          }
        }
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




  handleSwitchChange(api_id:number, event: { index: number, event: Event }): void {
    // Handle the switch change event here
    // console.log(`Switch at index ${api_id} changed to `);
    // ${event.event.target.checked}
    this.apiService.subscribeToAPI(api_id).subscribe(
      (response) => {
        console.log(response)
        if (response.body && response.message && Array.isArray(response.message)) {
          this.messages = response.message;
          this.messages.forEach(message => {
            this.messageService.addMessage(message);
          });
          setTimeout(() => {
            this.messages = [];
          }, 1000);
        }},
      (error) => {
        console.error('Error fetching APIs:', error);
        // Handle errors here
      }
    );
  }


  range(count: number): number[] {
    return Array(count).fill(0).map((_, index) => index + 1);
  }

  clearSelection(){
    this.sector = "";
    this.getAllAPIs()
  }




}
