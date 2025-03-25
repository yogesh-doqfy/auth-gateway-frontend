import { ViewportScroller } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { MessagesService } from 'src/app/services/messages.service';
import { WebflowService } from 'src/app/services/webflow.service';

@Component({
  selector: 'app-wf-run',
  templateUrl: './wf-run.component.html',
  styleUrls: ['./wf-run.component.scss']
})
export class WfRunComponent implements OnInit {

  @Input() api: any; 
  @Input() execute: boolean = true;
  @Output() updateBalanceEvent: EventEmitter<any> = new EventEmitter<any>();

  textToCopy="";
  messages: string[] = [];
successStatus = [100, 200, 201]
  responseDetail: any;
  executed= false;
  pages = [0];
  page = 0
  wf_id = 0
  executedPages: boolean[] = []
  error = false;
  errorDetails: any = [];
  isCalling = false;
  message = "";
  fileToUpload: File | null = null;
  uploadFileName: any = {};
  
  @ViewChild('errorModal') modal!: ElementRef;



  constructor(private http: HttpClient, private apiService: ApiService, private messageService: MessagesService, private viewportScroller: ViewportScroller, private elementRef: ElementRef, private router: Router, private wfService: WebflowService) { }

  ngOnInit(): void {
    console.log(this.api)
    this.scrollToResponseContainer()
    this.getPageNumbers(this.api.params)

  }


  getPlaceHolder(param: any) {
    if (param.path){
      const keys = param.path.split('.');
      let currentObj = this.api.payload;      
      for (let i = 0; i < keys.length - 1; i++) {
        currentObj = currentObj[keys[i]];
        if (!currentObj) {
          console.error('Invalid path or missing keys');
          return;
        }
      }


    const lastKey = keys[keys.length - 1];

    return currentObj[lastKey];
      

  }else{

    return this.api.payload[param.name]
}

  }

  updatePayload(param: any) {
    // Update the payload object when the value of a parameter changes
    if (param.path){
      const keys = param.path.split('.');
      let currentObj = this.api.payload;      
      for (let i = 0; i < keys.length - 1; i++) {
        currentObj = currentObj[keys[i]];
        if (!currentObj) {
          console.error('Invalid path or missing keys');
          return;
        }
      }


    const lastKey = keys[keys.length - 1];

    // Get the value corresponding to the last key in currentObj
    const value = currentObj[lastKey];
      
    let newValue = this.typeCast(value, param.value)
    if (newValue != null){
      currentObj[lastKey] = newValue;
    }

  }else{

    let newValue = this.typeCast(this.api.payload[param.name], param.value)
    if (newValue != null){
      this.api.payload[param.name] = newValue;
    }

// console.log(this.api.payload)
    }

}


typeCast(value: any, newValue:any) {
  const type = typeof value;
  let data = value;
  // Typecast the new value based on the type of the original value
  switch (type) {
    case 'string':
      data = String(newValue);
      break
    case 'number':
      data = Number(newValue);
      break
    case 'boolean':
      newValue = JSON.parse(newValue)
      data = Boolean(newValue);
      break
    // Add more cases as needed for other types
    default:
      // Handle other types or no typecasting needed
      return null;
  }

  if (type == typeof(data)){
    return data
  }

  return null


}


  createHeaders(headers: any[]): HttpHeaders {
    let httpHeaders = new HttpHeaders();
    headers.forEach(header => {
      httpHeaders = httpHeaders.append(header.name, header.value);
    });
    return httpHeaders;
  }

  scrollToResponseContainer(): void {
    // Get the reference to the responseContainer element
    const responseContainer = this.elementRef.nativeElement.querySelector('#responseContainer');
    
    // Check if the responseContainer element exists
    if (responseContainer) {
      this.viewportScroller.scrollToAnchor('responseContainer');
    }
  }
  

  callPostAPI(api: any): void {
//? calling sequentially
this.error = false;
    this.executionBtnText = "Executing API"
    this.isCalling = true;

    api.response = {}

    // Extract URL, headers, and payload from the API object
    const url = `${api.URL}${this.page}/${this.wf_id}/`;
    const headers = this.createHeaders(api.headers);
    // console.log(headers)
    const payload = api.payload;
  
    // Make the POST request
    this.http.post(url, payload, { headers }).subscribe(
      (response:any) => {
        // console.log("status", response.status)
      console.log("response", response)    
        this.wf_id = response.wfId
        this.updateResponse(response.wfResponse)
        this.updateBalanceEvent.emit();
        this.executionBtnText = "Execute API"
        this.isCalling = false
        if (this.successStatus.includes(response.status)){
          this.error = false
          
          if (this.hasNextPage()){
            
            this.nextPage()
          }
        }else{
          this.error = true
          this.updatePageError(response.wfResponse)
      }

      },
      (error) => {
      this.executionBtnText = "Execute API"
      this.isCalling = false
        this.error = true;
        console.error('Error occurred while calling the POST API:', error);
        this.updateResponse(error.error.wfResponse)
        this.updatePageError(error.error.wfResponse)

        // api.response = error
      }
    );

  }


  updateResponse(response:any){
    this.executed = this.isExecuted()
    // console.log(response)
    this.api.response = response;
    let currentObj = {};
    this.responseDetail = [];
    for (let index = 0; index < this.api.response_details.length; index++) {
      let keys = this.api.response_details[index].path.split(".")
      // console.log(keys)
      // console.log(keys.length)
      let data = this.api.response
      for (let i = 0; i < keys.length; i++) {
        if (data[keys[i]]){

          data = data[keys[i]];
          // console.log(i, data)
          if (!currentObj) {
            console.error('Invalid path or missing keys');
            return;
          }
        }else{
          data = undefined
          break
        }
      }

      // this.api.response_details[index].value = data
      if (data){

        let dict = this.api.response_details[index]
        dict.value = data
        this.responseDetail.push(dict);
      }
      
    }

  }


  isSuccessStatusCode(code: number): boolean {
    return code === 200 || code === 201 || code === 100;
}
  isButtonClicked = false;
  executionBtnText = "Execute API"
  

  simulateButtonClick(): void {
    // Toggle the value of isButtonClicked
    this.isButtonClicked = !this.isButtonClicked;
  }

  toggleExecuted(){
    this.executed = !this.executed
  }




  getPageNumbers(params: any[]){
    
      // Extract unique page numbers from the params array
      const uniquePageNumbers: number[] = [...new Set(params.map((param:any) => param.page))];
      // Sort the unique page numbers in ascending order
      this.pages =  uniquePageNumbers.sort((a, b) => a - b);
      
      this.page = this.pages[0]
      
      for (let index = 0; index < this.pages.length; index++) {
        this.executedPages.push(false);
      }
      // console.log(this.pages)
      // console.log(this.executedPages)

  }


  getCurrentPageParams(page: number): any[] {
    return this.api.params.filter((param: any) => (param.page || 0) === page);
  }
  

  getCurrentPageApiName(page:number){
    return this.api.params.filter((param: any) => (param.page || 0) === page)[0].api_name;
  }

  getCurrentPageAlias(page:number){
    return this.api.params.filter((param: any) => (param.page || 0) === page)[0].alias;
  }


  hasNextPage(): boolean {
    let last_element = this.pages[this.pages.length-1]
    return last_element > this.page;
  }

  // Function to check if there is a previous page
  hasPreviousPage(): boolean {
    let first_element = this.pages[0]
    return first_element < this.page;
  }

  // Function to navigate to the next page
  nextPage(): void {
   let index = this.pages.indexOf(this.page)
   this.page = this.pages[index+1]
  }

  // Function to navigate to the previous page
  previousPage(): void {
    let index = this.pages.indexOf(this.page)
    this.page = this.pages[index-1]
  }

  isExecuted(){
    if (this.pages[this.pages.length -1] == this.page && !this.error){
      return true
    }
          return false
    
  }

  isLastPage(){
    if (this.pages[this.pages.length -1] == this.page){
      return true
    }
    return false
  }


  updatePageError(response:any){
    this.executed = this.isExecuted()
    // this.api.response = response;
    let alias = this.getCurrentPageAlias(this.page).toLowerCase();
    let currentObj = {};
    this.errorDetails = [];

    for (let index = 0; index < this.api.response_details.length; index++) {
      let keys = this.api.response_details[index].path.split(".")
      // console.log(keys)
      // console.log(keys.length)
      let data:any= {}; 
      data[alias] = response[alias]
      // console.log(data)
      for (let i = 0; i < keys.length; i++) {
        if (data[keys[i]]){

          data = data[keys[i]];
          // console.log(i, data)
          if (!currentObj) {
            console.error('Invalid path or missing keys');
            return;
          }
        }else{
          data = undefined
          break
        }
      }

      // this.api.response_details[index].value = data
      if (data){

        let dict = this.api.response_details[index]
        dict.value = data
        this.errorDetails.push(dict);
      }

      if (this.errorDetails.length > 0){
        this.openErrorModal()
      }
      
    }
  }





  openErrorModal() {

const button: HTMLButtonElement = this.modal.nativeElement;
button.click();

  
  }
  
  
  closeErrorModal() {
    if (this.modal) {
      const modalElement = this.modal.nativeElement;
      modalElement.style.display = 'none';
      modalElement.classList.remove('show');
      document.body.classList.remove('modal-open');
      modalElement.setAttribute('aria-hidden', 'true');
  
      // Remove the manually added modal backdrop
      const backdropElement = document.querySelector('.modal-backdrop');
      if (backdropElement) {
        backdropElement.remove();
      }
    }
  }


  getMessage(){
  
    if (this.api.is_subscribed){
      this.message = "Do you want to unsubscribe this API ?"
    }else{
      this.message = "Do you want to subscribe this API ?"
    }
  }


  handleFileInput(event: any, param: any) {
    const files = event.target.files;
    if (files && files.length > 0) {
      this.fileToUpload = files[0];

      if (param.type == "base64"){

        if (!this.fileToUpload) {
          console.error('No file selected');
          return;
        }
          const reader = new FileReader();
          reader.readAsDataURL(this.fileToUpload);
      
          reader.onload = () => {
            const base64String = reader.result as string;
            console.log('Base64:', base64String);
            param.value = base64String.split("base64,")[1]
            // param.name = this.fileToUpload?.name
            this.uploadFileName[param.name] = this.fileToUpload?.name
            this.updatePayload(param)
            // Here you can do whatever you want with the base64 string
          };  
        }
    }
  }

  reInitiate(){
    this.getAPIDetails(String(this.api.id));
    this.wf_id = 0;
    this.page = 0;
    this.executed = false;
  }


  getAPIDetails(id: string) {
    this.wfService.getWFDetail(id).subscribe(
      (response) => {
        this.api = response.body;
  
  
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
