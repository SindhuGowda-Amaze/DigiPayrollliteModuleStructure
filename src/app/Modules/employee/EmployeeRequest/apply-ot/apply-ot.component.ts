import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-apply-ot',
  templateUrl: './apply-ot.component.html',
  styleUrls: ['./apply-ot.component.css']
})
export class ApplyOTComponent implements OnInit {

  TransportationType: any;
  Date: any;
  dropdownList: any = [];
  selectedItems: any = [];
  dropdownSettings: any = {};
  StaffID: any;
  OTlist: any;
  result: any;
  AutoApproval: any;
  ManualApply: any;
  starttime: any;
  endtime: any;
  maxdate: any;
  shiftID: any;
  Shift: any;
  showbtn: any;
  Supervisor: any;
  Name: any;
  Project: any;
  Destination: any;
  Purpose: any;
  ContactPerson: any;
  ContactPhNo: any;
  TimeOfDeparture: any;
  TimeOfReturn: any;

  noofhours: any;
  Comments: any;
  type: any;
  day: any

  duration1: any;
  minutes: any;
  hours: any;
  endtime1: any;
  starttime1: any;
  a: any;
  b: any;
  d: any;
  ot: any;
  nightot: any;
  nightothous: any;
  ExccessNormalOt: any;
  NormalOT: any;
  NightOt: any;
  ExccessNightOt: any;
  NSD_REGULAR: any;
  RestNightOt: any;
  RestNormalOT: any;
  ExccessRestNormalOt: any;
  RestExccessNightOt: any;
  LegalNightOt: any;
  LegalNormalOT: any;
  LegalExccessNormalOt: any;
  LegalExccessNightOt: any;
  SpecialHoliday: any;
  SpecialNightOt: any;
  SpecialNormalOT: any;
  SpecialExccessNormalOt: any;
  SpecialExccessNightOt: any;
  SpecialRestNightOt: any;
  SpecialRestNormalOT: any;
  SpecialRestExccessNormalOt: any;
  SpecialRestExccessNightOt: any;
  LegalRestNightOt: any;
  LegalRestNormalOT: any;
  LegalExccessRestNormalOt: any;
  LegalExccessRestNightOt: any;
  date1: any;
  staffleaves: any;
  password1: any;
  supervisoremail: any;
  employeename: any;
  


  constructor(public DigiofficeService: DigipayrollserviceService, public router: Router) { }

  ngOnInit(): void {
    this.day = "";
    this.showbtn = true;
    this.Shift = sessionStorage.getItem('shiftID');
    this.maxdate = new Date().toISOString().split("T")[0];
    this.type = "";

    this.StaffID = sessionStorage.getItem('staffid');
    this.DigiofficeService.GetOTRates().subscribe(data => {
      debugger
      this.OTlist = data
    })


    this.DigiofficeService.GetOTRates().subscribe(data => {
      debugger
      this.OTlist = data
    })

    this.DigiofficeService.GetOtConfiguration().subscribe(
      data => {
        debugger
        this.result = data;
        this.AutoApproval = this.result[0].approvalStatus;
        this.ManualApply = this.result[0].manualApply;


      },
    );


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
    // this.attachments.push(abcd[0]);

  }

  public attachmentsurl: any = [];
  public Save() {
    debugger

    this.DigiofficeService.ProjectAttachments(this.attachments21).subscribe(res => {
      debugger
      this.attachmentsurl.push(res);
      this.attachments.length = 0;

      this.InsertStaffOverTimeDetails();
      debugger
    })


  }


  public duration() {
    debugger;
    this.showbtn = true;
    this.DigiofficeService.GetHolidaybit(this.Date, this.StaffID).subscribe(data1 => {
      let temp1: any = data1

      this.DigiofficeService.GetAttendance().subscribe(data => {
        debugger
        let temp: any = data.filter(x => (x.filterdate == this.Date || x.filterdate == temp1[0].newdate) && x.userID == sessionStorage.getItem('staffid'));

        this.DigiofficeService.GetStaffLeaves(10331, 1, "01-01-2020", "01-01-2025").subscribe(data => {
          debugger
          this.staffleaves = data.filter(x => x.uuid == sessionStorage.getItem('staffid') && (x.filterdate <= this.Date && this.Date <= x.filterdate1) && (x.status == 'Manager Approved' || x.status == 'Cancellation Pending'));


          if (temp1[0].restday == 0 && temp1[0].legalHoliday == 0 && temp1[0].specialHoliday == 0) {

            if (this.staffleaves.length != 0) {
              Swal.fire('You Are In Leave This day. So Cant Apply Ot');
              this.showbtn = false;
            }

            if (temp.length == 0) {
              Swal.fire('You have not worked on this day. So Cant Apply Ot');
              this.showbtn = false;
            }




            if (temp[0].webSignoutDate == null || temp[0].webSignoutDate == undefined) {
              Swal.fire('You can not Apply Overtime as you are not Punched Out on this day');
              this.showbtn = false;
            }
            if (this.endtime > temp[1].etime && this.endtime > temp[0].etime ) {
              Swal.fire('Endtime time must be less than sign out time');
              this.showbtn = false;
            }
            
            if (temp.length == 1) {
              if (temp[0].undertime == "Yes") {
                Swal.fire('You can not Apply Overtime as you are undertime on this Day');
                this.showbtn = false;
              }
            }



          }
          else {
            if (this.staffleaves.length != 0) {
              Swal.fire('You Are In Leave This day. So Cant Apply Ot');
              this.showbtn = false;
            }

            if (temp.length == 0) {
              Swal.fire('You have not worked on this day. So Cant Apply Ot');
              this.showbtn = false;
            }

            // if(this.endtime<temp[0].expectedOut){
            //   Swal.fire('Ot Cannot be applied in between shift timings');
            //   this.showbtn = false;
            // }


            if (this.endtime > temp[0].etime) {
              Swal.fire('Endtime time must be less than sign out time');
              this.showbtn = false;
            }
            if (temp[0].webSignoutDate == null || temp[0].webSignoutDate == undefined) {
              Swal.fire('You can not Apply Overtime as you are not Punched Out on this day');
              this.showbtn = false;
            }


          }


          console.log(temp);
        })
      })
    })
    this.ot = 0;
    this.nightot = 0;
    this.DigiofficeService.GetOtNightOt(this.starttime, this.endtime, 1, this.StaffID, this.Date).subscribe(data => {
      debugger
      let temp: any = data;

      this.ot = parseFloat(temp[0].normalOT) + parseFloat(temp[0].restNormalOT) + parseFloat(temp[0].legalNormalOT) + parseFloat(temp[0].specialNormalOT) + parseFloat(temp[0].specialRestNormalOT) + parseFloat(temp[0].legalRestNormalOT) + ' Hours',
        this.nightot = parseFloat(temp[0].nightOt) + parseFloat(temp[0].restNightOt) + parseFloat(temp[0].legalNightOt) + parseFloat(temp[0].specialNightOt) + parseFloat(temp[0].specialRestNightOt) + parseFloat(temp[0].legalRestNightOt) + ' Hours',
        this.noofhours = temp[0].normalOT == null ? 0 : temp[0].normalOT,
        this.nightothous = temp[0].nightOt == null ? 0 : temp[0].nightOt,
        this.ExccessNormalOt = temp[0].exccess8NormalOt == null ? 0 : temp[0].exccess8NormalOt,
        this.ExccessNightOt = temp[0].exccess8NightOt == null ? 0 : temp[0].exccess8NightOt,
        this.NSD_REGULAR = temp[0].nsD_REGULAR == null ? 0 : temp[0].nsD_REGULAR,
        this.RestNightOt = temp[0].restNightOt == null ? 0 : temp[0].restNightOt,
        this.RestNormalOT = temp[0].restNormalOT == null ? 0 : temp[0].restNormalOT,
        this.ExccessRestNormalOt = temp[0].exccessRestNormalOt == null ? 0 : temp[0].exccessRestNormalOt,
        this.RestExccessNightOt = temp[0].restExccessNightOt == null ? 0 : temp[0].restExccessNightOt,
        this.LegalNightOt = temp[0].legalNightOt == null ? 0 : temp[0].legalNightOt,
        this.LegalNormalOT = temp[0].legalNormalOT == null ? 0 : temp[0].legalNormalOT,
        this.LegalExccessNormalOt = temp[0].legalExccessNormalOt == null ? 0 : temp[0].legalExccessNormalOt,
        this.LegalExccessNightOt = temp[0].legalExccessNightOt == null ? 0 : temp[0].legalExccessNightOt,
        this.SpecialHoliday = temp[0].specialHoliday == null ? 0 : temp[0].specialHoliday,
        this.SpecialNightOt = temp[0].specialNightOt == null ? 0 : temp[0].specialNightOt,
        this.SpecialNormalOT = temp[0].specialNormalOT == null ? 0 : temp[0].specialNormalOT,
        this.SpecialExccessNormalOt = temp[0].specialExccessNormalOt == null ? 0 : temp[0].specialExccessNormalOt,
        this.SpecialExccessNightOt = temp[0].specialExccessNightOt == null ? 0 : temp[0].specialExccessNightOt,
        this.SpecialRestNightOt = temp[0].specialRestNightOt == null ? 0 : temp[0].specialRestNightOt,
        this.SpecialRestNormalOT = temp[0].specialRestNormalOT == null ? 0 : temp[0].specialRestNormalOT,
        this.SpecialRestExccessNormalOt = temp[0].specialRestExccessNormalOt == null ? 0 : temp[0].specialRestExccessNormalOt,
        this.SpecialRestExccessNightOt = temp[0].specialRestExccessNightOt == null ? 0 : temp[0].specialRestExccessNightOt,
        this.LegalRestNightOt = temp[0].legalRestNightOt == null ? 0 : temp[0].legalRestNightOt,
        this.LegalRestNormalOT = temp[0].legalRestNormalOT == null ? 0 : temp[0].legalRestNormalOT,
        this.LegalExccessRestNormalOt = temp[0].legalExccessRestNormalOt == null ? 0 : temp[0].legalExccessRestNormalOt,
        this.LegalExccessRestNightOt = temp[0].legalExccessRestNightOt == null ? 0 : temp[0].legalExccessRestNightOt
    })

  }


  public InsertStaffOverTimeDetails() {
    debugger


    if (this.Date == " " || this.starttime == "" || this.endtime == "" || this.Date == undefined || this.starttime == undefined || this.endtime == undefined) {
      Swal.fire('Please Fill All The Mandatory Fields')
    }
    else {
      var eb = {
        'StaffID': sessionStorage.getItem('staffid'),
        'Date': this.Date,
        'noofhours': this.noofhours,
        'NightOT': this.nightothous,
        'Comments': this.Comments,
        'StartTime': this.starttime,
        'EndTime': this.endtime,
        'Status': 'Manager Pending',
        'Attachment': this.attachmentsurl[0],
        'ExccessNormalOt': this.ExccessNormalOt,
        'ExccessNightOt': this.ExccessNightOt,
        'NSD_REGULAR': this.NSD_REGULAR,
        'RestNightOt': this.RestNightOt,
        'RestNormalOT': this.RestNormalOT,
        'ExccessRestNormalOt': this.ExccessRestNormalOt,
        'RestExccessNightOt': this.RestExccessNightOt,
        'LegalNightOt': this.LegalNightOt,
        'LegalNormalOT': this.LegalNormalOT,
        'LegalExccessNormalOt': this.LegalExccessNormalOt,
        'LegalExccessNightOt': this.LegalExccessNightOt,
        'SpecialHoliday': this.SpecialHoliday,
        'SpecialNightOt': this.SpecialNightOt,
        'SpecialNormalOT': this.SpecialNormalOT,
        'SpecialExccessNormalOt': this.SpecialExccessNormalOt,
        'SpecialExccessNightOt': this.SpecialExccessNightOt,
        'SpecialRestNightOt': this.SpecialRestNightOt,
        'SpecialRestNormalOT': this.SpecialRestNormalOT,
        'SpecialRestExccessNormalOt': this.SpecialRestExccessNormalOt,
        'SpecialRestExccessNightOt': this.SpecialRestExccessNightOt,
        'LegalRestNightOt': this.LegalRestNightOt,
        'LegalRestNormalOT': this.LegalRestNormalOT,
        'LegalExccessRestNormalOt': this.LegalExccessRestNormalOt,
        'LegalExccessRestNightOt': this.LegalExccessRestNightOt



      }

      this.DigiofficeService.InsertStaffOverTimeDetails(eb).subscribe(

        data => {
          debugger
          Swal.fire('Saved Successfully.');
          this.getpassword();
          this.router.navigate(['/employee/otrequest']);

        },
      )
    }





  }

  public cancel() {
    this.router.navigate(['/employee/otrequest']);
  }


  getpassword() {
    this.DigiofficeService.GetMyDetails().subscribe(data => {
      let temp: any = data.filter(x => x.id == sessionStorage.getItem('staffid'));
      if (temp.length != 0) {
        this.supervisoremail = temp[0].supervisoremail;
        this.employeename = temp[0].name;
        this.sendemail();
      }

    })
  }

  public Attactments = [];
  public sendemail() {
    var entity1 = {
      'emailto': this.supervisoremail,
      'emailsubject': 'OverTime Application',
      'emailbody': 'Hi , <br> ' + this.employeename + ' has submitted the OverTime request Please  login into DigiOffice To Approve Or Reject It.<br> Thanks <br> Team Digi-Office',
      'attachmenturl': this.Attactments,
      'cclist': this.supervisoremail,
      'bcclist': this.supervisoremail,
    }
    this.DigiofficeService.sendemail1(entity1).subscribe(res => {
      debugger;
      this.Attactments = [];


    })

  }


}


