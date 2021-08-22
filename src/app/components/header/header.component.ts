import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  name: string;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.name = JSON.parse(localStorage.getItem("user")).name;
  }

  logout() {
    this.auth.logout();
  }

}
