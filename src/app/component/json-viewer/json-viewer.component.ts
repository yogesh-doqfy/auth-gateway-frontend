import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-json-viewer',
  templateUrl: './json-viewer.component.html',
  styleUrls: ['./json-viewer.component.scss', './mobile.scss']
})
export class JsonViewerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  @Input() json: any;
  jsonPairs: { key: string, value: any }[] = [];

  getFormattedJson(): string {
    const jsonString = JSON.stringify(this.json, null, 2); // Indent with 2 spaces
    const formattedJson = jsonString.replace(/\"([^"]+)\":\s+\"([^"]+)\"/g, '"$1": "$2"');
    return formattedJson;
  }



  getJsonPairs(): { key: string; value: any; }[] {
    // this.getFormattedJson()
    return Object.entries(this.json).map(([key, value]) => ({ key, value }));
  }

  isObject(value: any): boolean {
    return typeof value === 'object' && value !== null;
  }

  lastItem(pair: any, array: any[]): boolean {
    return pair === array[array.length - 1];
  }

  copied: boolean = false;

  copyToClipboard() {
    
    navigator.clipboard.writeText(JSON.stringify(this.json, null, 2))
      .then(() => {
        console.log('Text copied to clipboard');
        this.copied = true; // Set copied to true to show the message
        setTimeout(() => {
          this.copied = false; // Hide the message after a delay
        }, 3000); // Hide after 3 seconds
      })
      .catch((error) => {
        console.error('Could not copy text: ', error);
      });
  }

    getKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  getStyle(key: string, value: any): { [key: string]: string } {
    const isKey = typeof value === 'object' || Array.isArray(value);
    return {
      color: isKey ? 'purple' : 'green'
    };
  }
}
