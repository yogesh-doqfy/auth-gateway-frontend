import { Component, OnInit } from '@angular/core';
import { KeyContainerComponent } from '../key-container/key-container.component';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-content-api-keys',
  templateUrl: './content-api-keys.component.html',
  styleUrls: ['./content-api-keys.component.scss'],
})
export class ContentApiKeysComponent implements OnInit {
  userDetails:any;
PROD :any;
STAG: any;
  constructor(private userService:UserService) { }

  ngOnInit(): void {
    // Call getUserDetails() from the UserService to fetch user details
    this.userService.getUserDetails().subscribe(
      userDetails => {
        this.userDetails = userDetails.body;
        console.log(this.userDetails)
        // You can now use this.userDetails in your component
        this.PROD = userDetails.body.keys.PROD;
        this.STAG = userDetails.body.keys.STAG;
        this.STAG.title = "UAT Credentials"
        this.PROD.title = "Production Credentials"
        this.PROD.prod = true
        this.STAG.prod = false



      },
      error => {
        console.error('Error fetching user details:', error);
        // Handle error
      }
    );
  }

  // uat = {
  //   title:"UAT Credentials",
  //   api_key:"ksjlcblkaj7823283",
  //   secret_key:"ncsncsndcksdncih9849hh9h93h3"
  // }

  // prod = {
  //   title:"Production Credentials",
  //   api_key:"aascpwh92898hcpiwohec2d29ph29phd239d",
  //   secret_key:"pqhnc93hc93hwdcnioebcihb92382h9"
  // }

}
