import { Component, OnInit } from '@angular/core';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-holiday-form',
  templateUrl: './holiday-form.component.html',
  styleUrls: ['./holiday-form.component.css']
})
export class HolidayFormComponent implements OnInit {

  constructor(public DigipayrollserviceService: DigipayrollserviceService, private activatedroute: ActivatedRoute, private datepipe: DatePipe) { }
  ID: any;
  leavelist: any;
  Short: any;
  Description: any;
  attachment: any;
  Citylist: any;
  CityID: any;
  attachment1: any;
  ngOnInit(): void {

    this.HolidayCategory = 0;
    this.Region = 0;
    this.DigipayrollserviceService.GetCityType().subscribe(data => {
      debugger
      this.Citylist = data
    })
    this.activatedroute.params.subscribe(params => {
      debugger;
      this.ID = params['id'];
      if (this.ID == undefined) {
        this.Holiday = '',
          this.HolidayDescription = ''
      }
      else {

        this.DigipayrollserviceService.GetHolidays().subscribe(
          data => {
            debugger
            this.leavelist = data.filter(x => x.id == this.ID);
            this.Holiday = this.leavelist[0].holiday
            this.HolidayDescription = this.leavelist[0].holidayDescription
            this.HolidayDate = this.datepipe.transform(this.leavelist[0].holidayDate, 'yyyy-MM-dd');
            this.attachment = this.leavelist[0].attachment;
            this.attachment1 = this.leavelist[0].attachment1;
            this.HolidayCategory = this.leavelist[0].holidayCategory;
          

          },
        );
      }
    }
    )
  }


  Type: any;
  public attachments21: any = [];

  public attachments: any = [];
  onRemove21(event: any) {
    debugger
    console.log(event);
    this.attachments21.splice(this.attachments.indexOf(event), 1);
  }

  onSelect21(event: any) {
    debugger
    console.log(event);
    this.attachments21.push(...event.addedFiles);
    Swal.fire('Attachment Added Successfully');
    // this.attachments.push(abcd[0]);

  }

  public attachmentsurl: any = [];
  public Save() {
    debugger
    this.DigipayrollserviceService.ProjectAttachments(this.attachments21).subscribe(res => {
      debugger
      this.attachmentsurl.push(res);
      this.attachments21.length = 0;
      this.InsertHolidays();
      debugger
    })
  }
  public update() {
    debugger
    this.DigipayrollserviceService.ProjectAttachments(this.attachments21).subscribe(res => {
      debugger
      this.attachmentsurl.push(res);
      this.attachments21.length = 0;
      this.UpdateHolidays();
      debugger
    })
  }

  Holiday: any
  HolidayDescription: any;
  HolidayDate: any;
  Attachment: any;
  HolidayCategory: any;
  Region: any;
  public InsertHolidays() {
    debugger;
    var entity = {
      Holiday: this.Holiday,
      HolidayDescription: this.HolidayDescription,
      HolidayDate: this.HolidayDate,
      Attachment: this.attachmentsurl[0],
      HolidayCategory: this.HolidayCategory
    }
    this.DigipayrollserviceService.InsertHolidays(entity).subscribe(data => {
      if (data != 0) {
        Swal.fire("Saved Successfully");
        location.href = "#/HolidayDashboard";


      }

    })

  }

  public UpdateHolidays() {
    debugger;
    var entity = {
      ID: this.ID,
      Holiday: this.Holiday,
      HolidayDescription: this.HolidayDescription,
      HolidayDate: this.HolidayDate,
      Attachment: this.attachmentsurl[0] == "" ? this.attachment1 : this.attachmentsurl[0],
      HolidayCategory: this.HolidayCategory,
      Region: this.Region
    }
    this.DigipayrollserviceService.UpdateHolidays(entity).subscribe(data => {
      console.log(data);
      Swal.fire("Updated Successfully");
      location.href = "#/HolidayDashboard";

    })

  }

}
