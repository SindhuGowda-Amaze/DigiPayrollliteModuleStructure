import { Component, OnInit } from '@angular/core';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';

@Component({
  selector: 'app-support-ticket-dashboard',
  templateUrl: './support-ticket-dashboard.component.html',
  styleUrls: ['./support-ticket-dashboard.component.css']
})
export class SupportTicketDashboardComponent implements OnInit {

  constructor(private DigipayrollServiceService:DigipayrollserviceService) { }


  awardlist:any;
  roleID:any;
  username:any;
  ngOnInit(): void {
    this.GetSupportTickets();
    this.username = sessionStorage.getItem('UserName')
  }

  file:any;
  public getmedicalUrl(file: any) {
    debugger
    this.file = file;
  }


  public GetSupportTickets(){
    this.DigipayrollServiceService.GetSupportTickets().subscribe(
      data=>{
        this.awardlist=data.filter(x=>x.companyname=='Pure Go' && x.applicationName=='Payroll' && x.ticketRaisedBy==this.username );
        
      }
    )
  }


}
