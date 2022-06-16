import { Component, OnInit } from '@angular/core';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-announcement-form',
  templateUrl: './announcement-form.component.html',
  styleUrls: ['./announcement-form.component.css']
})
export class AnnouncementFormComponent implements OnInit {
  ID: any;
  leavelist: any;
  Citylist: any;
  CityID: any;
  maxdate: any;
  Name: any;
  Description: any;
  DateTime: any;
  Time: any;
  Venue: any;
  public attachments21: any = [];
  public attachmentsurl: any = [];
  public attachments: any = [];
  currentUrl: any;

  constructor(public DigipayrollserviceService: DigipayrollserviceService, public router: Router, public activatedroute: ActivatedRoute, public datepipe: DatePipe) { }

  ngOnInit(): void {
    this.currentUrl = window.location.href;

    this.maxdate = new Date().toISOString().split("T")[0];
    this.GetCityType();

    this.CityID = 0;
    
    this.activatedroute.params.subscribe(params => {
      debugger;
      this.ID = params['id'];
      if (this.ID == undefined) {

      }
      else {

        this.DigipayrollserviceService.GetAnnouncementsByBuildingID(56).subscribe(data => {
          debugger
          this.leavelist = data.filter(x => x.id == this.ID);
          this.Name = this.leavelist[0].name;
          this.Description = this.leavelist[0].description;
          this.Time = this.leavelist[0].filtertime;
          this.Venue = this.leavelist[0].venue;
          this.DateTime = this.datepipe.transform(this.leavelist[0].dateTime, 'yyyy-MM-dd');

        },
        );
      }
    }
    )
  }
  
  
public GetCityType(){
  this.DigipayrollserviceService.GetCityType().subscribe(data => {
    debugger
    this.Citylist = data
  })
}

  
  onRemove21(event: any) {
    debugger
    console.log(event);
    this.attachments21.splice(this.attachments.indexOf(event), 1);
  }

  onSelect21(event: any) {
    debugger
    console.log(event);
    this.attachments21.push(...event.addedFiles);
    // this.attachments.push(abcd[0]);

  }




  public save() {
    debugger
  
      this.DigipayrollserviceService.ProjectAttachments(this.attachments21).subscribe(res => {
        debugger
        this.attachmentsurl.push(res);
        this.attachments.length = 0;

        this.InsertAnnouncement();
        debugger
      })
    
  }

  public InsertAnnouncement() {
    debugger
    if (this.Name == undefined || this.Description == undefined || this.DateTime == undefined || this.Time == undefined ) {
      Swal.fire('Please Fill All fields');
    }
    else {
      var eb = {
        'Name': this.Name,
        'FloorID': 1071322,
        'Description': this.Description,
        'Reason': this.Description,
        'DateTime': this.DateTime,
        'Time': this.Time,
        'Venue': this.Venue,
        'ModifiedBy': 'Admin',
        'BuildingID': 56,
        'Attachment': this.attachmentsurl[0],

      }
      this.DigipayrollserviceService.InsertAnnouncements(eb).subscribe(

        data => {
          debugger
          Swal.fire('Saved Successfully.');
          this.router.navigate(['/admin/AnnouncementDashboard']);

        },
      )
    }

  }

  public Update() {
    var eb = {
      'ID': this.ID,
      'Name': this.Name,
      'Description': this.Description,
      'Reason': this.Description,
      'DateTime': this.DateTime,
      'Venue': this.Venue,
      'Time': this.Time,
      'BuildingID': 56,
      'FloorID': 1071322,
    }
    this.DigipayrollserviceService.UpdateAnnouncements(eb).subscribe(
      data => {
        debugger
        Swal.fire('Updated successfully.');
        this.router.navigate(['/admin/AnnouncementDashboard']);

      },
    )
  }

  public Cancel() {
    debugger
    this.router.navigate(['/admin/AnnouncementDashboard']);
  }


}

