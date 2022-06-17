import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';
import { FullCalendarOptions, EventObject } from 'ngx-fullcalendar';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-leaves',
  templateUrl: './leaves.component.html',
  styleUrls: ['./leaves.component.css'],
  providers: [DatePipe]
})
export class LeavesComponent implements OnInit {
  password1: any;
  supervisoremail:any;
  employeename:any;
  Staffleaveenitilment: any
  approvestatus:any;
  message:any;
  leaveid:any;
  roledid: any;
  loader:any;
  holidaylist:any;
  results:any;
  leavetypelist:any;
  leaveconfig:any;
  cutofflist:any;
  CutOffDate:any;
  maxdate:any;
  month:any;
  day:any;
  payperiod:any;
  options: FullCalendarOptions | undefined;
  events: EventObject[] | undefined;
  roleid: any;
  
  startdate: any;
  enddate: any
  currentUrl: any;
  term: any;
  staffleaves: any;

  LeaveTypeList1: any;
  medicalLeaveEntitlementlist:any;
  medicalLeaveEntitlement:any;
  medicalLeaveEntitlementlistTakenlist:any;
  medicalLeaveEntitlementTaken:any;
  medicalLeaveEntitlementBalance:any;
  marriageLeaveEntitlementlist:any;
  marriageLeaveEntitlement:any;
  balancelist:any;
  marriageLeaveEntitlementlistTakenlist:any;
  marriageLeaveEntitlementTaken:any;
  marriageLeaveEntitlementBalance:any;
  leaveTypeID:any;
  uniquelist:any;
  
  constructor(public DigiofficeService: DigipayrollserviceService, public router: Router, public datePipe: DatePipe) { }
  public showorhidecontent: any;

  public selectedlanguage: any;
  public selectedlanguage1: any;
  public callenderyear: any;
  public callenderMonth: any;
  public callenderstartday: any;
  public callenderendday: any;
  public callenderdaysdount: any = [];
  public callenderBindData = new Date();
  public todaydate = new Date().getDate();
  public options1: any;
  public todayDay = this.datePipe.transform(new Date().getDay(), 'EEEE');

  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.loader=true
    this.maxdate =  new Date().toISOString().split("T")[0];
    this.roledid = sessionStorage.getItem('roledid');
    this.GetLeaveType1();
    this.getstaffleaves();
    let date = new Date()
    this.day = date.getDate();
    if((this.day <= 15 && this.day >= 1)){
      this.payperiod=1
    }
    else{
      this.payperiod=2
    }
    this.month = new Date().getMonth()+1; 
    this.DigiofficeService.GetPayrollCutOffDate().subscribe(
      data => {
        debugger
        
        this.cutofflist = data.filter(x=>x.month==this.month && x.payperiod==this.payperiod)
        this.CutOffDate = this.cutofflist[0].filterdate
       
      
       
      },
    );

    
    this.DigiofficeService.GetMyDetails().subscribe(data => {
      debugger
      this.Staffleaveenitilment = data.filter(x => x.id == sessionStorage.getItem('staffid'));
      this.loader=false
    });

    this.DigiofficeService.GetLeaveConfiguration().subscribe((data: any) => {
      debugger
      this.holidaylist = data
      this.DigiofficeService.GetMyDetails().subscribe(data => {
        debugger
        this.leavetypelist = data.filter(x => x.id == sessionStorage.getItem('staffid')).keys;
       

        this.results = this.holidaylist.map((val: { staffID: any; }) => {
          return Object.assign({}, val, this.leavetypelist.filter((v: { keys: any; }) => v.keys === val.staffID)[0]);
        });


      });

    })

  }


  public getenddate(event: any) {
    debugger
    if (this.roleid == 1) {
      this.DigiofficeService.GetStaffLeaves(10331, 1, "01-01-2020", "01-01-2025")
    

      .subscribe({
        next: data => {
          debugger
          this.staffleaves = data.filter(x => x.uuid == sessionStorage.getItem('staffid') && (x.filterdate >= this.startdate && x.filterdate <= this.enddate))
        }, error: (err) => {
          Swal.fire('Issue in Getting City Type');
          // Insert error in Db Here//
          var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message
          }
          this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
            data => {
              debugger
            },
          )
        }
      })


    }
    else {
      this.DigiofficeService.GetStaffLeaves(10331, 1, "01-01-2020", "01-01-2025")


      .subscribe({
        next: data => {
          debugger
          this.staffleaves = data.filter(x => x.uuid == sessionStorage.getItem('staffid') && (x.filterdate >= this.startdate && x.filterdate <= this.enddate))
        }, error: (err) => {
          Swal.fire('Issue in Getting City Type');
          // Insert error in Db Here//
          var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message
          }
          this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
            data => {
              debugger
            },
          )
        }
      })


    }

  }

  // date: any;
  // public getdate(event: any) {
  //   debugger
  //   this.date = event.target.value;
  //   this.DigiofficeService.GetStaffLeaves(10331, 1, "01-01-2020", "01-01-2025").subscribe(data => {
  //     debugger
  //     this.staffleaves = data.filter(x => x.uuid == sessionStorage.getItem('staffid') && x.filterdate == this.date);
  //   })
  // }

  public getstaffleaves() {
    debugger
    this.DigiofficeService.GetStaffLeaves(10331, 1, "01-01-2020", "01-01-2025")

    .subscribe({
      next: data => {
        debugger
        this.staffleaves = data.filter(x => x.uuid == sessionStorage.getItem('staffid'));
        this.buildcallender(this.staffleaves);
      }, error: (err) => {
        Swal.fire('Issue in Getting City Type');
        // Insert error in Db Here//
        var obj = {
          'PageName': this.currentUrl,
          'ErrorMessage': err.error.message
        }
        this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
          data => {
            debugger
          },
        )
      }
    })
    
  }
  public newlevae() {
    debugger
    this.router.navigate(['/employee/ApplyLeave']);
  }
  medicalurl: any;
  public getmedicalurl(id: any) {
    debugger
    this.DigiofficeService.GetStaffLeaves(10331, 1, "01-01-2020", "01-01-2025")    
 .subscribe({
  next: data => {
    debugger
    let temp: any = data.filter(x => x.id == id.id);
    this.medicalurl = temp[0].medicalUrl;
  }, error: (err) => {
    Swal.fire('Issue in Getting City Type');
    // Insert error in Db Here//
    var obj = {
      'PageName': this.currentUrl,
      'ErrorMessage': err.error.message
    }
    this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
      data => {
        debugger
      },
    )
  }
})
  }
  // public makeunderline(evt:any) {
  //   debugger
  //   var i, tablinks;

  //   tablinks = document.getElementsByClassName("activ1");
  //   for (i = 0; i < tablinks.length; i++) {
  //     tablinks[i].className = tablinks[i].className.replace(" active", "");
  //   }

  //   evt.currentTarget.className += " active";
  // }


  public CancelLeave(list: any) {
    debugger
    this.DigiofficeService.CancelLeave(list.id, list.noOfDays, list.uuid, list.leaveTypeID, 'Cancelled')


    .subscribe({
      next: data => {
        debugger
        Swal.fire('Cancelled Successfully');
        this.ngOnInit();
      }, error: (err) => {
        Swal.fire('Issue in Getting City Type');
        // Insert error in Db Here//
        var obj = {
          'PageName': this.currentUrl,
          'ErrorMessage': err.error.message
        }
        this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
          data => {
            debugger
          },
        )
      }
    })


  }


  public CancelLeave1(list: any) {
    debugger
   this.leaveid = list.id
  }


  public CancelApproved(){
    var entity = {
      'ID': this.leaveid,
      'Status': 'Cancellation Pending',
      'message': this.message
       }
    this.DigiofficeService.CancelApproved(entity)   
 .subscribe({
  next: data => {
    debugger
    Swal.fire("Submitted Successfully");
    this.getpassword();
    this.ngOnInit();
  }, error: (err) => {
    Swal.fire('Issue in Getting City Type');
    // Insert error in Db Here//
    var obj = {
      'PageName': this.currentUrl,
      'ErrorMessage': err.error.message
    }
    this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
      data => {
        debugger
      },
    )
  }
})
  }


  public GetLeaveType1() {
    debugger
    this.DigiofficeService.GetLeaveConfiguration()


    .subscribe({
      next: data => {
        debugger
        this.LeaveTypeList1 = data;
        this.medicalLeaveEntitlementlist=data.filter(x=>x.leavetype=='Medical Leave')
        this.medicalLeaveEntitlement=this.medicalLeaveEntitlementlist[0].yearlyLimit
        this.marriageLeaveEntitlementlist=data.filter(x=>x.leavetype=='Marriage Leave')
        this.marriageLeaveEntitlement=this.medicalLeaveEntitlementlist[0].yearlyLimit
      }, error: (err) => {
        Swal.fire('Issue in Getting City Type');
        // Insert error in Db Here//
        var obj = {
          'PageName': this.currentUrl,
          'ErrorMessage': err.error.message
        }
        this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
          data => {
            debugger
          },
        )
      }
    })



    this.DigiofficeService.GetLeaveBalanceDetails()


    .subscribe({
      next: data => {
        debugger
        this.balancelist = data;
        this.medicalLeaveEntitlementlistTakenlist=data.filter(x=>x.staffID==sessionStorage.getItem('staffid'))
        const key = 'leaveTypeID';
        // this.uniquelist = [...new Map(this.medicalLeaveEntitlementlistTakenlist.map((item: { [x: string]: any; }) =>
        // [(item[key]), item])).values()]
  
        this.medicalLeaveEntitlementTaken=0
  
        for(let i=0;i<=this.medicalLeaveEntitlementlistTakenlist.length;i++){
         this.leaveTypeID= this.medicalLeaveEntitlementlistTakenlist[i].leaveTypeID
         this.medicalLeaveEntitlementTaken += this.medicalLeaveEntitlementlistTakenlist[i].noOfDays;
        }
      }, error: (err) => {
        Swal.fire('Issue in Getting City Type');
        // Insert error in Db Here//
        var obj = {
          'PageName': this.currentUrl,
          'ErrorMessage': err.error.message
        }
        this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
          data => {
            debugger
          },
        )
      }
    })


    this.DigiofficeService.GetLeaveBalanceDetails()


  
 .subscribe({
  next: data => {
    debugger
    this.marriageLeaveEntitlementlistTakenlist=data.filter(x=>x.leaveTypeID==6 && x.staffID==sessionStorage.getItem('staffid'))
    this.marriageLeaveEntitlementTaken=this.marriageLeaveEntitlementlistTakenlist[0].balanceleave
    this.marriageLeaveEntitlementBalance=(this.marriageLeaveEntitlement-this.marriageLeaveEntitlementTaken)
  }, error: (err) => {
    Swal.fire('Issue in Getting City Type');
    // Insert error in Db Here//
    var obj = {
      'PageName': this.currentUrl,
      'ErrorMessage': err.error.message
    }
    this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
      data => {
        debugger
      },
    )
  }
})
    
  }


  public changepaygroup(){

  }
  
  changeStatus(evn: any) {

    // if (evn.currentTarget.checked) {
    //   this.showorhidecontent = false;
    // }
    // else {
    //   this.showorhidecontent = true;
    // }
    if (evn.target.value==1) {
      this.showorhidecontent = true;
    }
    else {
      this.showorhidecontent = false;
    }


  }


  public alldates: any = []
  public buildcallender(MaintainanceList: string | any[]) {
    debugger
    this.callenderdaysdount.length = 0;
    this.callenderyear = this.callenderBindData.getFullYear();
    this.callenderMonth = this.datePipe.transform(this.callenderBindData, 'MMMM');
    this.callenderstartday = new Date(this.callenderBindData.getFullYear(), this.callenderBindData.getMonth(), 1);
    this.callenderendday = new Date(this.callenderBindData.getFullYear(), this.callenderBindData.getMonth() + 1, 0);
    this.callenderdaysdount.length = this.callenderendday.getDate();
    let o = 0;
    for (let i = 0; i < this.callenderdaysdount.length; i++) {
      let sdate = this.callenderstartday;
      let _date;
      if (sdate.getDate() == 1 && o == 0) {
        _date = sdate.setDate(sdate.getDate() + 0);
        o++
      }
      else {
        _date = sdate.setDate(sdate.getDate() + 1);
      }
      _date = this.datePipe.transform(sdate, 'dd');
      let _day = this.datePipe.transform(sdate, 'EEE');
      let dateformat = this.datePipe.transform(sdate, 'yyyy-MM-dd');

      this.callenderdaysdount[i] = { date: _date, day: _day, dateformat: dateformat };
    }

    //Events Binding
    const getDatesBetweenDates = (startDate: string | number | Date, endDate: string | number | Date) => {
      let dates: any = []
      //to avoid modifying the original date
      const theDate = new Date(startDate)
      while (theDate < new Date(endDate)) {
        dates = [...dates, new Date(theDate)]
        theDate.setDate(theDate.getDate() + 1)
      }
      dates = [...dates, new Date(endDate)]
      this.alldates = dates;
      return dates

    }

    for (let j = 0; j < MaintainanceList.length; j++) {
      debugger;
      getDatesBetweenDates(MaintainanceList[j].filterdate, MaintainanceList[j].filterdate1)
      for (let k = 0; k < this.alldates.length; k++) {
        let currenteventlist = this.callenderdaysdount.filter((x: { dateformat: number; }) => (this.datePipe.transform(x.dateformat, 'yyyy-MM-dd') == this.datePipe.transform(this.alldates[k], 'yyyy-MM-dd')))

        if (currenteventlist.length > 0) {
          this.callenderdaysdount[currenteventlist[0].date - 1]['RequestFor'] = MaintainanceList[j].requestFor;
          this.callenderdaysdount[currenteventlist[0].date - 1]['StartTime'] = MaintainanceList[j].startTime;
          this.callenderdaysdount[currenteventlist[0].date - 1]['EndTime'] = MaintainanceList[j].endTime;
          this.callenderdaysdount[currenteventlist[0].date - 1]['mantainenceHtml'] =
            "<span class='event_PendingBookCommunity'> Reason : " + MaintainanceList[j].leaveReason +
            // "<br>  Reason : " + MaintainanceList[j].leaveReason +
            // "<br>  Unit :" + MaintainanceList[j].unitID + 
            "</span>";
        }
      }

    }
    // for (let j = 0; j < MaintainanceList.length; j++) {
    //   debugger;
    //   let currenteventlist = this.callenderdaysdount.filter((x: { dateformat: number; }) => (x.dateformat == MaintainanceList[j].filterdate1))

    //   if (currenteventlist.length > 0) {
    //     this.callenderdaysdount[currenteventlist[0].date - 1]['RequestFor'] = MaintainanceList[j].requestFor;
    //     this.callenderdaysdount[currenteventlist[0].date - 1]['StartTime'] = MaintainanceList[j].startTime;
    //     this.callenderdaysdount[currenteventlist[0].date - 1]['EndTime'] = MaintainanceList[j].endTime;
    //     this.callenderdaysdount[currenteventlist[0].date - 1]['mantainenceHtml'] =
    //       "<span class='event_PendingBookCommunity'> Reason : " + MaintainanceList[j].leaveReason +
    //       // "<br>  Reason : " + MaintainanceList[j].leaveReason +
    //       // "<br>  Unit :" + MaintainanceList[j].unitID + 
    //       "</span>";
    //   }

    // }



  }

  public previousmonth() {
    debugger;
    this.callenderBindData.setMonth(this.callenderBindData.getMonth() - 1);
    this.buildcallender(this.staffleaves);
  }
  public nextmonth() {
    debugger;
    this.callenderBindData.setMonth(this.callenderBindData.getMonth() + 1);
    this.buildcallender(this.staffleaves);
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
      'emailsubject': 'Leave Application',
      'emailbody': 'Hi , <br> ' + this.employeename + ' has cancelled the leave request Please  login into DigiOffice To Approve Or Reject It.<br> Thanks <br> Team Digi-Office',
      'attachmenturl': this.Attactments,
      'cclist': this.supervisoremail,
      'bcclist': this.supervisoremail,
    }
    this.DigiofficeService.sendemail1(entity1)

   
 .subscribe({
  next: data => {
    debugger
    this.Attactments = [];
  }, error: (err) => {
    Swal.fire('Issue in Getting City Type');
    // Insert error in Db Here//
    var obj = {
      'PageName': this.currentUrl,
      'ErrorMessage': err.error.message
    }
    this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
      data => {
        debugger
      },
    )
  }
}) 

  }

  

}
