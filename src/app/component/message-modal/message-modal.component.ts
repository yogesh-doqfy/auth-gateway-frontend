import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { cssNumber } from 'jquery';

@Component({
  selector: 'app-message-modal',
  templateUrl: './message-modal.component.html',
  styleUrls: ['./message-modal.component.scss']
})
export class MessageModalComponent implements OnChanges {

  @Input() messages: string[] = [];

  @ViewChild('myModal') modal!: ElementRef;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.messages)
    // this.messages = []
    // Check if the 'messages' input property has changed
    if (changes['messages'] && changes['messages'].currentValue && changes['messages'].currentValue.length > 0) {
      this.openModal();
    }else{
      this.closeModal()
    }
  }

  // openModal() {
  //   console.log('calling modal');
  //   const modalElement = this.modal.nativeElement;
  //   modalElement.classList.add('show');
  //   document.body.classList.add('modal-open');
  //   modalElement.setAttribute('aria-hidden', 'false');
  //   modalElement.style.display = 'block';

  // }

  openModal() {
    console.log('calling modal');
    if (this.modal){

      const modalElement = this.modal.nativeElement;
      
      // Show the modal
      modalElement.style.display = 'block';
      
    // Add classes to show the modal
    modalElement.classList.add('show');
    document.body.classList.add('modal-open');

    // Add modal backdrop manually
    const backdropElement = document.createElement('div');
    backdropElement.classList.add('modal-backdrop', 'fade', 'show');
    document.body.appendChild(backdropElement);
  }
  }
  
  
  closeModal() {
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
  

}
