import { Component, OnInit } from '@angular/core';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-weekly-shift',
  templateUrl: './weekly-shift.component.html',
  styleUrls: ['./weekly-shift.component.css']
})
export class WeeklyShiftComponent implements OnInit {

  weeklyShift:any;
  constructor(private DigiServiceService:DigipayrollserviceService,private ActivatedRoute:ActivatedRoute) { }
 
  roleid:any;
  ngOnInit(): void {
    this.GetAnnouncements();
    this.roleid = localStorage.getItem('roledid');
  }
  term:any;
  workplaceList:any;
  public GetAnnouncements() {
    debugger
    this.DigiServiceService.GetStaffShiftDetails().subscribe(data => {
      debugger
      this.workplaceList = data.filter(x=>x.id==10357).slice(0,5);
    })
  }
}
