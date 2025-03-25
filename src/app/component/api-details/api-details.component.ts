import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { MessagesService } from 'src/app/services/messages.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-api-details',
  templateUrl: './api-details.component.html',
  styleUrls: ['./api-details.component.scss', './../sidebar.scss', './mobile.scss']
})
export class ApiDetailsComponent implements OnInit {
  id!: string;
  messages: string[] = [];
  api: any = {}; // Define a property to store the API detail
  message = "";
  isChecked = true;
  run = true;
  constructor(private apiService: ApiService, private route: ActivatedRoute, private messageService: MessagesService, private userService: UserService) { }

  ngOnInit(): void {
    // Get the 'id' parameter from the URL
    this.route.params.subscribe(params => {
      this.id = params['id'];
      // Call the method to fetch API details using the 'id'
      this.getAPIDetails(this.id);
    });
  }

  // Method to fetch API details by ID
  getAPIDetails(id: string) {
    this.apiService.getAPIDetail(id).subscribe(
      (response) => {
        this.api = response.body;
        this.total_credits= this.api.total_credits
        this.isChecked = this.api.is_subscribed

        this.specifications = this.specifications.map(spec => ({
          title: spec.title,
          value: spec.value.replace("api-name", this.api.name),
        })); 

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



  specifications = [
    {
      title: "Plug & Play",
      value: `The api-name API is straightforward and integration is effortless, We provide a  simple and user-friendly interface.`
    },
    {
      title: "Prevent Fraud",
      value: "The process will save any institution that has been and can be a victim of fake cardholders. api-name API will easily detect such frauds"
    },
    {
      title: "Accurate and Reliable",
      value: "Our system checks the information from the api-name department. Therefore, the results are  always correct and legit."
    },
  ]

  total_credits = 100
  workflow = [
    {
      credits: 3,
      name: "Aadhar Number",
      method: "POST",
      URL: "http://localhost:8000/apis/upi-verification/",
      params: [{
        name: "customer_upi_id",
        type: "string",
        required: true,
        label: "Aadhaar Number"
      }],
      headers: [
        {
          name: "x-api-key",
          type: "string",
          value: "iamcaptain"
        },
        {
          name: "x-secret-key",
          type: "string",
          value: "thisismysheild"
        },
        {
          name: "content-type",
          type: "string",
          value: "application/json"
        }
      ],
      status: [
        {
          code: 200,
          message: "Success"
        },
        {
          code: 401,
          message: "Unauthorized"
        }
      ],
      payload: {
        mode: "sync",
        data: {
          customer_upi_id: "7276482594@ybl",
          consent: "Y",
          consent_text: "Here i declare above information is correct!."
        },
        "task_id": "ecc326d9-d676-4b10-a82b-50b4b9dd8a16"
      },
      response: { request_id: "88109ce3-73b2-4516-9d72-bb1288cd380e", task_id: "636e80f9-af59-419e-b2f5-035f8c143e23", group_id: "97bcc6a8-00c8-49a3-aaa7-61974c069c71", success: true, response_code: "100", response_message: "Valid Authentication", metadata: { billable: "Y" }, result: { beneficiary_name: "SXXANXX AXXUX" }, request_timestamp: "2023-12-22T09:30:51.013Z", response_timestamp: "2023-12-22T09:30:52.254Z" }
    }
  ]


  handleSwitchChange(api_id:number): void {
    // Handle the switch change event here
    console.log(`Switch at index ${api_id} changed to `);
    // ${event.event.target.checked}
    this.apiService.subscribeToAPI(api_id).subscribe(
      (response) => {
        console.log(response)
        this.api.is_subscribed = response.body.is_active
        this.isChecked = this.api.is_subscribed
        
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

  closeModal(){
    this.isChecked = this.api.is_subscribed
      }
    
    getMessage(){
    
      if (this.api.is_subscribed){
        this.message = "Do you want to unsubscribe this API ?"
      }else{
        this.message = "Do you want to subscribe this API ?"
      }
    }
    

    updateBalance(){
      console.log("balance update")
      this.userService.getBalance().subscribe(
        (response) => {
          console.log(response)
          this.total_credits = response.balance
    },
        (error) => {
          console.error('Error fetching APIs:', error);
          // Handle errors here
        }
      );
    }
    

    goBack(): void {
      window.history.back();
    }

    toggleRun(){
      this.run = !this.run;
    }

}
