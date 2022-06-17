import { Component, OnInit } from '@angular/core';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-weekly-shift',
  templateUrl: './weekly-shift.component.html',
  styleUrls: ['./weekly-shift.component.css']
})
export class WeeklyShiftComponent implements OnInit {
  currentUrl: any;

  weeklyShift: any;
  roleid: any;
  term: any;
  workplaceList: any;
  constructor(private DigiServiceService: DigipayrollserviceService, private ActivatedRoute: ActivatedRoute) { }


  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.GetAnnouncements();
    this.roleid = localStorage.getItem('roledid');
  }

  public GetAnnouncements() {
    debugger
    this.DigiServiceService.GetStaffShiftDetails()
      .subscribe({
        next: data => {
          debugger
          this.workplaceList = data.filter(x => x.id == 10357).slice(0, 5);
        }, error: (err) => {
          Swal.fire('Issue in Getting City Type');
          // Insert error in Db Here//
          var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message
          }
          this.DigiServiceService.InsertExceptionLogs(obj).subscribe(
            data => {
              debugger
            },
          )
        }
      })

  }
}
