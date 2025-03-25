import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-workflow-card',
  templateUrl: './workflow-card.component.html',
  styleUrls: ['./workflow-card.component.scss']
})
export class WorkflowCardComponent implements OnInit {

  message = ""
  isChecked = true
  constructor(private router: Router ) { }

  ngOnInit(): void {
    console.log(this.workflow)
    this.isChecked = this.workflow.is_subscribed
  }

  @Input() workflow: any; 
  @Input() index: any; 
  @Output() switchChange = new EventEmitter<{ index: number, event: Event }>();

  onSwitchChange(api_id:number, index: number, event: Event): void {
    // You can access the state of the switch using event.target.checked
    const isChecked = (event.target as HTMLInputElement).checked;
    console.log(`Switch at index ${api_id} changed to ${isChecked}`);
    this.workflow.is_subscribed = !this.workflow.is_subscribed
    this.isChecked = this.workflow.is_subscribed
    // Emit the switch change event to the parent component
    this.switchChange.emit({ index, event });
  }


  closeModal(){
this.isChecked = this.workflow.is_subscribed
  }

getMessage(){
  if (this.workflow.is_subscribed){
    
    this.message = "Do you want to unsubscribe this Workflow ?"
  }else{
    this.message = "Do you want to subscribe this Workflow ?"
  }
  console.log(this.message)
}


goToWorkflowDetail(apiId:any){
  console.log("calling routing")
  this.router.navigate(['/workflow-detail', apiId]);
}

}
