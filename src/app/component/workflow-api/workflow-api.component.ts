import { ViewportScroller } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { cssNumber } from 'jquery';
import { ApiService } from 'src/app/services/api.service';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-workflow-api',
  templateUrl: './workflow-api.component.html',
  styleUrls: ['./workflow-api.component.scss', './mobile.scss']
})
export class WorkflowApiComponent implements OnInit {
  @Input() api: any; 
  @Input() execute: boolean = true;

  @Output() updateBalanceEvent: EventEmitter<any> = new EventEmitter<any>();

  textToCopy="";
  messages: string[] = [];
  constructor(private http: HttpClient, private apiService: ApiService, private messageService: MessagesService, private viewportScroller: ViewportScroller, private elementRef: ElementRef) { }

  ngOnInit(): void {
    console.log(this.api)
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
    console.log(param);
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
        // Update the response in the API object
        api.response = response;
        let currentObj = {};
        for (let index = 0; index < api.response_details.length; index++) {
          let keys = api.response_details[index].path.split(".")
          console.log(keys)
          // console.log(keys.length)
          let data = api.response
          for (let i = 0; i < keys.length; i++) {
            data = data[keys[i]];
            console.log(i, data)
            if (!currentObj) {
              console.error('Invalid path or missing keys');
              return;
            }
          }
          api.response_details[index].value = data;
          
        }

        console.log(api.response_details)
        

        this.updateBalanceEvent.emit();
      this.executionBtnText = "Execute API"


      },
      (error) => {
      this.executionBtnText = "Execute API"

        console.error('Error occurred while calling the POST API:', error);
        api.response = error.error
      }
    );

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


  
}
