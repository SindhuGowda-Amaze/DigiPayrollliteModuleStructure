import { Component, OnInit } from '@angular/core';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-announcement-dashboard',
  templateUrl: './announcement-dashboard.component.html',
  styleUrls: ['./announcement-dashboard.component.css'],
})
export class AnnouncementDashboardComponent implements OnInit {
  viewMode: any;
  term: any;
  date: any;
  annnounecemnetlist: any;
  annnounecemnetlist1: any;
  todaydate: any;
  isConfirmed: any;
  currentUrl: any;

  constructor(
    public DigipayrollserviceService: DigipayrollserviceService,
    public router: Router
  ) {}

  ngOnInit(): void {

    this.currentUrl = window.location.href;
    this.viewMode = 'tab1';

    const format = 'yyyy-MM-dd';

    const myDate = new Date();

    const locale = 'en-US';

    this.todaydate = formatDate(myDate, format, locale);
    this.GetAnnouncements();
  }

  public GetAnnouncements() {
    debugger;
    this.DigipayrollserviceService.GetAnnouncementsByBuildingID(56)
    
    .subscribe({
      next: data => {
        this.annnounecemnetlist = data.filter(
          (x) => x.filterdate >= this.todaydate
        );
        this.annnounecemnetlist1 = data.filter(
          (x) => x.filterdate < this.todaydate
        );
      }, error: (err) => {
        Swal.fire('Issue in GetAnnouncements');
        // Insert error in Db Here//
        var obj = {
          'PageName': this.currentUrl,
          'ErrorMessage': err.error.message
        }
        this.DigipayrollserviceService.InsertExceptionLogs(obj).subscribe(
          data => {
            debugger
          },
        )}
    })
    
  
  }

  delete(id: any) {
    Swal.fire({
      title: 'Are You Sure ',
      text: 'Do you want to delete the Selected Record',
      icon: 'warning',
      // icon: 'success',
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'OK',
    }).then((result) => {
      if (result.value == true) {
        this.DigipayrollserviceService.DeleteAnnouncement(id)
        
        .subscribe({
          next: data => {
            debugger
            Swal.fire('Deleted Successfully...!');
            this.ngOnInit();
          }, error: (err) => {
            Swal.fire('Issue in DeleteAnnouncement');
            // Insert error in Db Here//
            var obj = {
              'PageName': this.currentUrl,
              'ErrorMessage': err.error.message
            }
            this.DigipayrollserviceService.InsertExceptionLogs(obj).subscribe(
              data => {
                debugger
              },
            )}
        })
        
      }
    });
  }
}
