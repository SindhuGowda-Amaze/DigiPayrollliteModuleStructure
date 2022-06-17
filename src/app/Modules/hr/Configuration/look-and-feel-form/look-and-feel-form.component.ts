import { Component, OnInit } from '@angular/core';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-look-and-feel-form',
  templateUrl: './look-and-feel-form.component.html',
  styleUrls: ['./look-and-feel-form.component.css']
})
export class LookAndFeelFormComponent implements OnInit {

  constructor(public DigipayrollServiceService: DigipayrollserviceService, private activatedroute: ActivatedRoute, private datepipe: DatePipe) { }
  ID: any;
  leavelist: any;
  Short: any;
  Description: any;
  ngOnInit(): void {
    this.activatedroute.params.subscribe(params => {
      debugger;
      this.ID = params['id'];
      if (this.ID == undefined) {
        this.Holiday = '',
          this.HolidayDescription = ''
      }
      else {

        this.DigipayrollServiceService.GetCompanyConfiguration().subscribe(
          data => {
            debugger
            this.leavelist = data.filter(x => x.id == this.ID);
            this.ButtonColor = this.leavelist[0].buttonColor
            this.HeaderColor = this.leavelist[0].headerColor;
            this.FontName = this.leavelist[0].fontName
            // this.HolidayDate = this.datepipe.transform(this.leavelist[0].holidayDate, 'yyyy-MM-dd');

          },
        );
      }
    }
    )
  }



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
    this.DigipayrollServiceService.ProjectAttachments(this.attachments21).subscribe(res => {
      debugger
      this.attachmentsurl.push(res);
      this.attachments.length = 0;
      this.InsertHolidays();
      debugger
    })
  }
  public Save2() {
    debugger
    this.DigipayrollServiceService.ProjectAttachments(this.attachments21).subscribe(res => {
      debugger
      this.attachmentsurl.push(res);
      this.attachments.length = 0;
      this.UpdateHolidays();
      debugger
    })
  }

  Holiday: any
  HolidayDescription: any;
  HolidayDate: any;
  Attachment: any;
  ButtonColor: any;
  HeaderColor: any;
  FontName: any
  public InsertHolidays() {
    debugger;


    var entity = {

      CompanyLogo: this.attachmentsurl[0],
      HeaderColor: this.HeaderColor,
      ButtonColor: this.ButtonColor,
      FontName: this.FontName,

    }
    this.DigipayrollServiceService.InsertCompanyConfiguration(entity).subscribe(data => {
      if (data != 0) {
        Swal.fire("Saved Successfully");
        location.href = "#/Lookandfeeldash";


      }

    })

  }

  public UpdateHolidays() {
    debugger;
    var entity = {

      ID: this.ID,
      CompanyLogo: this.attachmentsurl[0],
      HeaderColor: this.HeaderColor,
      ButtonColor: this.ButtonColor,
      FontName: this.FontName,
    }
    this.DigipayrollServiceService.UpdateCompanyConfiguration(entity).subscribe(data => {
      Swal.fire("Updated Successfully");
      location.href = "#/Lookandfeeldash";

    })

  }

}