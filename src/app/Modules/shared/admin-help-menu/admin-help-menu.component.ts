import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-help-menu',
  templateUrl: './admin-help-menu.component.html',
  styleUrls: ['./admin-help-menu.component.css']
})
export class AdminHelpMenuComponent implements OnInit {

  roleid:any;
  constructor() { }

  ngOnInit(): void {
    this.roleid = sessionStorage.getItem('roledid');
  }

}
