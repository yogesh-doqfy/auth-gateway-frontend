import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard-nav',
  templateUrl: './dashboard-nav.component.html',
  styleUrls: ['./dashboard-nav.component.scss', "./mobile.scss"]
})
export class DashboardNavComponent implements OnInit {

  @Input() navTitle: string = '';
  @Input() userDetails: any;
  dropdownOpen: boolean = false;
  firstname = "";

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.userDetails = this.authService.getUserData();
    this.firstname = this.userDetails?.user.split(" ")[0]
  }

  getProfileColor(): string {
    // Generate and return a background color based on the user's name or any other criteria
    // For example, you can use a hash function to generate a color based on the user's name
    // Here, I'm returning a hardcoded color for demonstration purposes
    return '#007bff'; // Blue color
  }

  getInitial(): string {
    // Extract the initial letter of the user's name
    if (this.userDetails && this.userDetails.user) {
      return this.userDetails.user.charAt(0).toUpperCase();
    }
    return '';
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  logout() {
    // Perform logout logic, e.g., clearing user data from AuthService
    this.authService.clearUserData();
    this.router.navigate(['/auth/login']);
    // Redirect to the login page or perform any other action
  }



}
