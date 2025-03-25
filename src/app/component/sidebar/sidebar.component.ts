import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss', './../sidebar.scss']
})
export class SidebarComponent implements OnInit {
  sidebar = false;
  navTitle = "";
  isAdmin = false
  openWorkFlow = false;
  openHistory = false;
  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService) { }

  checkScreenWidth(): void {
    this.sidebar = !(window.innerWidth <= 500);
    // this.isSmallScreen = true
  }
  

  toggleSidebar(){
    this.sidebar = !this.sidebar;
  }

  activeOption: string = "dashboard";
  ngOnInit(): void {
    this.isAdmin = this.authService.isUserAdmin()

    this.checkScreenWidth()
    this.activeOption = this.router.url.split('/')[1]
    this.setActive(this.activeOption)

  }

  


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
      this.openWorkFlow = true
    }


    if (this.activeOption == "admin-user"){
      this.navTitle = "Customer List"
      this.router.navigate([this.activeOption]);
    }
    if (this.activeOption == "workflow-repository"){
      this.navTitle = "Workflow Repository"
      this.router.navigate([this.activeOption]);
      this.openWorkFlow = true
    }

    if (this.activeOption == "history-workflow"){
      this.navTitle = "Workflow History"
      this.router.navigate([this.activeOption]);
      this.openHistory = true
    }

    if (this.activeOption == "history-api"){
      this.navTitle = "API History"
      this.router.navigate([this.activeOption]);
      this.openHistory = true
    }
    


  }

  isActive(option: string): boolean {
    return this.activeOption === option;
  }


  toggleOpenworkFlow(){
    this.openWorkFlow = !this.openWorkFlow;
  }

  toggleOpenHistory(){
    this.openHistory = !this.openHistory;
  }


  
}
