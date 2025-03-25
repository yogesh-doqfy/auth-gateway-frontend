import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-content-help',
  templateUrl: './content-help.component.html',
  styleUrls: ['./content-help.component.scss', './mobile.scss']
})
export class ContentHelpComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  titles = [
    "API Service",
    "Issue Date",
    "Resolution date",
    "Remark",
    "Status"
  ]

  datas = [
    ["Adhaar Verifcation", "568 Credits", "123 Calls", "Rs. 1300", true],
    ["Adhaar Verifcation", "567 Credits", "40 Calls", "Rs. 12300", false],
    ["Adhaar Verifcation", "512 Credits", "340 Calls", "Rs. 112000", true],
    ["Adhaar Verifcation", "6458 Credits", "45 Calls", "Rs. 10", false],
    ["Adhaar Verifcation", "7878 Credits", "2323 Calls", "Rs. 100", true],

  ]

  

  config: any = {
    clickable: true,
    maxFiles: 1,
    maxFilesize: 50, // in MB
    acceptedFiles: 'image/*',
  };

  onUploadSuccess(event: any): void {
    console.log('File uploaded successfully', event);
  }


}
