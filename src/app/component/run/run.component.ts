import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { MessagesService } from '../../services/messages.service';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-run',
  templateUrl: './run.component.html',
  styleUrls: ['./run.component.scss']
})
export class RunComponent implements OnInit {

  @Input() api: any; 
  @Input() execute: boolean = true;
  
  @Output() updateBalanceEvent: EventEmitter<any> = new EventEmitter<any>();

  textToCopy="";
  messages: string[] = [];
  message = '';
  responseDetail: any;
  executed= false;
  fileToUpload: File | null = null;
  uploadFileName:any = {};
  constructor(private http: HttpClient, private apiService: ApiService, private messageService: MessagesService, private viewportScroller: ViewportScroller, private elementRef: ElementRef) { }

  ngOnInit(): void {
    // console.log(this.api)
    this.scrollToResponseContainer()

  }


  getPlaceHolder(param: any) {
    // Update the payload object when the value of a parameter changes
    // console.log(param);
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
    console.log(param)
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
    // console.log("else is calling")
    let newValue = this.typeCast(this.api.payload[param.name], param.value)
    if (newValue != null){
      this.api.payload[param.name] = newValue;
    }

console.log(this.api.payload)
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
      // Scroll to the responseContainer element
      this.viewportScroller.scrollToAnchor('responseContainer');
    }
  }
  

  // updateRespinse(response){

  // }

  callPostAPI(api: any): void {

    this.executionBtnText = "Executing API"

    api.response = {}

    // Extract URL, headers, and payload from the API object
    const url = api.URL;
    const headers = this.createHeaders(api.headers);
    console.log(headers)
    const payload = api.payload;
  
    // Make the POST request
    this.http.post(url, payload, { headers }).subscribe(
      (response) => {
        // this.executed = true
        // Update the response in the API object

        // console.log(api.response_details)
        this.updateResponse(response)

        this.updateBalanceEvent.emit();
      this.executionBtnText = "Execute API"


      },
      (error) => {
      this.executionBtnText = "Execute API"

        console.error('Error occurred while calling the POST API:', error);
        this.updateResponse(error.error)
        // api.response = error
      }
    );

  }


  updateResponse(response:any){
    this.executed = true
    console.log(response)
    this.api.response = response;
    let currentObj = {};
    this.responseDetail = [];
    for (let index = 0; index < this.api.response_details.length; index++) {
      let keys = this.api.response_details[index].path.split(".")
      console.log(keys)
      // console.log(keys.length)
      let data = this.api.response
      for (let i = 0; i < keys.length; i++) {
        if (data[keys[i]]){

          data = data[keys[i]];
          console.log(i, data)
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


  handleSwitchChange(api_id:number): void {
    // Handle the switch change event here
    console.log(`Switch at index ${api_id} changed to `);
    // ${event.event.target.checked}
    this.apiService.subscribeToAPI(api_id).subscribe(
      (response) => {
        console.log(response)
        this.api.is_subscribed = response.body.is_active
        // this.isChecked = this.api.is_subscribed
        
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


}
