import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss', './../sidebar.scss', './mobile.scss']
})
export class DashboardComponent implements OnInit {
  sidebar = true;
  activeOption: string = "dashboard";
  navTitle: string = 'Dashboard'; // This property is initialized with 'Dashboard'
  isAdmin = false;

  userDetails = {}

  setActive(option: string): void {
    this.activeOption = option;

    if (this.activeOption == "dashboard"){
      this.navTitle = "Dashboard"
      this.router.navigate([this.activeOption]);
    }
    if (this.activeOption == "api-lib"){
      this.navTitle = "API Library"
      this.router.navigate([this.activeOption]);
    }
    if (this.activeOption == "usage"){
      this.navTitle = "Usage details"
      this.router.navigate([this.activeOption]);    
    }
    if (this.activeOption == "my-apis"){
      this.navTitle = "My APIs"
      this.router.navigate([this.activeOption]);
    }
    if (this.activeOption == "pricing"){
      this.navTitle = "Pricing and Credits"
      this.router.navigate([this.activeOption]);
    }
    if (this.activeOption == "keys"){
      this.navTitle = "API Keys"
      this.router.navigate([this.activeOption]);
    }

    if (this.activeOption == "help"){
      this.navTitle = "Help & Support"
      this.router.navigate([this.activeOption]);
    }

    if (this.activeOption == "workflow"){
      this.navTitle = "My Workflow"
      this.router.navigate([this.activeOption]);
    }

    if (this.activeOption == "admin-user"){
      this.navTitle = "Customer List"
      this.router.navigate([this.activeOption]);
    }
    if (this.activeOption == "workflow-repository"){
      this.navTitle = "Workflow Repository"
      this.router.navigate([this.activeOption]);
    }

    if (this.activeOption == "history-workflow"){
      this.navTitle = "Workflow History"
      this.router.navigate([this.activeOption]);
    }

    if (this.activeOption == "history-api"){
      this.navTitle = "API History"
      this.router.navigate([this.activeOption]);
    }

    if (this.activeOption == "transaction-history"){
      this.navTitle = "Transaction History"
      this.router.navigate([this.activeOption]);
    }

  }

  isActive(option: string): boolean {
    return this.activeOption === option;
  }


  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router, private authService: AuthService) {
    // this.userService.setUserDetails({
    //   "name": "Arpit Billore",
      
    // });
    // this.userDetails = this.userService.getUserDetails()
    
  }


  ngOnInit(): void {
    this.isAdmin = this.authService.isUserAdmin()
    this.setActive(this.route.snapshot.data['activeOption']);
  }

}
