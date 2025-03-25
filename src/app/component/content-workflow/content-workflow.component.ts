// content-workflow.component.ts

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgFlowchartCanvasDirective, NgFlowchartStepRegistry } from '@joelwenzel/ng-flowchart';
import { ApiService } from 'src/app/services/api.service';
import { MessagesService } from 'src/app/services/messages.service';
import { UserService } from 'src/app/services/user.service';
import { WebflowService } from 'src/app/services/webflow.service';

@Component({
  selector: 'app-content-workflow',
  templateUrl: './content-workflow.component.html',
  styleUrls: ['./content-workflow.component.scss', './mobile.scss']
})
export class ContentWorkflowComponent implements OnInit {

  messages: string[] = [];
  apis: any;
  sectors: string[] = [];
  sector= "";
  dummyCardCount = 0;
  RdummyCardCount = 0;

  searchText = "";
  createWorkFlow = false;
  apiIds = []

  @ViewChild('workflowContainer') containerRef!: ElementRef; 
  @ViewChild('RworkflowContainer') RcontainerRef!: ElementRef; 
  // @ViewChild('workflowContainer') containerRef!: ElementRef; 

  @ViewChild(NgFlowchartCanvasDirective)
  canvasElement!: NgFlowchartCanvasDirective;

  @ViewChild('exampleModal') exampleModal: any;


  constructor(private webflowService: WebflowService, private messageService: MessagesService, private userService: UserService, private router: Router, private elementRef: ElementRef) { }

  ngOnInit(): void {
    this.getWorkFlows()
    this.getRecomWorkFlows()
  }


  items: any[] = [];

  captureChartData() {
    const flowchartDataString = this.canvasElement.getFlow().toJSON(2);
    console.log(flowchartDataString);
  
    try {
      // Parse the string into a JSON object
      const flowchartData = JSON.parse(flowchartDataString);
  
      // Initialize an array to store the names
      // const names: string[] = [];
      this.apiIds = []
  
      // Traverse the object to extract names
      this.extractNames(flowchartData.root, this.apiIds);
  
      console.log(this.apiIds);
      this.createWorkflow()
    } catch (error) {
      console.error('Error parsing flowchart data:', error);
    }
  }
  
  // Recursive function to extract names from the nested structure
  extractNames(node: any, names: string[]) {
    // Check if the node has a 'data' property and if it has a 'label' property
    if (node && node.data && node.data.id) {
      // Push the label to the 'names' array
      names.push(node.data.id);
    }
  
    // Recursively call the function for each child node
    if (node.children && node.children.length > 0) {
      node.children.forEach((child: any) => {
        this.extractNames(child, names);
      });
    }
  }

  


  workflows: any = []
  Rworkflows: any = []



  onSwitchChange(index: number, event: Event): void {
    // You can access the state of the switch using event.target.checked
    const isChecked = (event.target as HTMLInputElement).checked;
    console.log(`Switch at index ${index} changed to ${isChecked}`);

    // Emit the switch change event to the parent component
    // this.switchChange.emit({ index, event });
  }


  createWorkflow(){
    if (this.formData.name !== ""){
      let payload = {
        name: this.formData.name,
        description: this.formData.description,
        api_ids: this.apiIds
      }


      this.webflowService.createWorkflow(payload).subscribe(
        (response) => {
          console.log(response.body)
          this.getWorkFlows()
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
  }


  getAllAPIs() {
    // Call the service method to fetch all APIs
    const params: any = {}
    
  if (this.formData.name){
    params.webflow_name = this.formData.name;
  }
    this.webflowService.getAPIs(params).subscribe(
      (response) => {
        this.apis =  response.body
        this.items = []
        this.apis.forEach((api:any) => {
          this.items.push({ type: 'api', name: api.name, data: {  label: api.name, description: api.description, id:api.id } },);
        });
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



  formData = {
    name: '',
    description: ''
  };

  onSubmit(): void {
    // Here you can handle form submission
    console.log('Form submitted:', this.formData);
    if (this.formData.name == ""){
      this.messages = ["Workflow name can't be empty"]
      this.messages.forEach(message => {
        this.messageService.addMessage(message);
      });


      setTimeout(() => {
        this.messages = [];
      }, 2000);

    }else{

      // You can perform additional actions like sending data to a backend API
      this.getAllAPIs()
      this.createWorkFlow = true;
        // window.scrollTo(0, 0);
      

    }
  }


  getWorkFlows() {
    // Call the service method to fetch all workflows
    const params: any = {my:1};
  
    this.webflowService.getWorkflow(params).subscribe(
      (response) => {
        if (response && response.body) {
          this.workflows = response.body; // Assuming response.body is an array of objects
          if (this.workflows.length > 0){

            if (this.containerRef.nativeElement.offsetWidth > 1100){
              this.dummyCardCount = 5 - (this.workflows.length % 5);
              if (this.dummyCardCount == 5){
                this.dummyCardCount = 0
              }
            }else{
              
              this.dummyCardCount = 4-(this.workflows.length % 4);
              if (this.dummyCardCount == 4){
                this.dummyCardCount = 0
              }
            }
            
          }
        
  
        if (response.message && Array.isArray(response.message)) {
          this.messages = response.message;
          // Add messages to the message service
          this.messages.forEach(message => {
            this.messageService.addMessage(message);
          });
  
          setTimeout(() => {
            this.messages = [];
          }, 2000);
        }
      }},
      (error) => {
        console.error('Error fetching Workflows:', error);
        // Handle specific error cases or provide more informative error messages
      }
    );
  }

  goToWorkflowDetail(apiId:any){
    console.log("calling routing")
    this.router.navigate(['/workflow-detail', apiId]);
  }
    

  range(count: number): number[] {
    return Array(count).fill(0).map((_, index) => index + 1);
  }


  handleSwitchChange(api_id:number, event: { index: number, event: Event }): void {
    // Handle the switch change event here
    // console.log(`Switch at index ${api_id} changed to `);
    // ${event.event.target.checked}
    this.webflowService.subscribeToWF(api_id).subscribe(
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


  getRecomWorkFlows() {
    // Call the service method to fetch all workflows
    const params: any = {};
  
    this.webflowService.getWorkflow(params).subscribe(
      (response) => {
        if (response && response.body) {
          this.Rworkflows = response.body; // Assuming response.body is an array of objects
          // console.log(this.workflows.length)
          if (this.Rworkflows.length > 0){
            console.log(this.RcontainerRef.nativeElement.offsetWidth)
            if (this.RcontainerRef.nativeElement.offsetWidth > 1100){
              this.RdummyCardCount = 5 - (this.Rworkflows.length % 5);
              if (this.RdummyCardCount == 5){
                this.RdummyCardCount = 0
              }
            }else{
              
              this.RdummyCardCount = 4-(this.Rworkflows.length % 4);
              if (this.RdummyCardCount == 4){
                this.RdummyCardCount = 0
              }
            }
            
          }
        
  
        if (response.message && Array.isArray(response.message)) {
          this.messages = response.message;
          // Add messages to the message service
          this.messages.forEach(message => {
            this.messageService.addMessage(message);
          });
  
          setTimeout(() => {
            this.messages = [];
          }, 2000);
        }}
      },
      (error) => {
        console.error('Error fetching Workflows:', error);
        // Handle specific error cases or provide more informative error messages
      }
    );
  }


}
