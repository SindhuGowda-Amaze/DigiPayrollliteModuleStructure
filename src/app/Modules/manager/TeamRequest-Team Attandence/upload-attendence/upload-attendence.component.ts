import { Component, OnInit } from '@angular/core';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-upload-attendence',
  templateUrl: './upload-attendence.component.html',
  styleUrls: ['./upload-attendence.component.css']
})
export class UploadAttendenceComponent implements OnInit {
  currentUrl: any;
  dropdownList2: any;
  RoleID: any;
  uniquelist: any;
  LeaveTypeList: any;
  Holiday: any
  HolidayDescription: any;
  HolidayDate: any;
  Attachment: any;
  loader: any;
  starttime: any;
  endtime: any;
  holidaylist: any;
  ipaddress: any;
  ID: any;
  leavelist: any;
  Short: any;
  Description: any;
  RoleTypeList: any;
  EmployeeId: any;
  EmployeeName: any;
  FirstDoseDate: any;
  VaccinationName: any;
  SecondDoseDate: any;
  dropdownList: any = [];
  selectedItems: any = [];
  dropdownSettings: any = {};
  Department: any;
  Departmentlist: any;
  dropdownList1: any = [];

  selectedItems1: any = [];
  dropdownSettings1: any = {};
  result: any;
  AutoApproval: any;
  ManualApply: any;
  startdate: any;
  enddate: any;
  SigninDate: any;
  SignoutDate: any;
  UserID: any;
  alldates: any;

  constructor(private DigipayrollServiceService: DigipayrollserviceService, private ActivatedRoute: ActivatedRoute, private datepipe: DatePipe) { }

  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.RoleID = "";
    this.Department = "";
    this.GetLeaveType();
    // this.DigipayrollServiceService.GetRoleType().subscribe(data => {
    //   debugger
    //   this.RoleTypeList = data;
    // });
    this.DigipayrollServiceService.GetDepartment()
      .subscribe({
        next: data => {
          debugger
          this.Departmentlist = data;
        }, error: (err) => {
          Swal.fire('Issue in GettingDepartment');
          // Insert error in Db Here//
          var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message
          }
          this.DigipayrollServiceService.InsertExceptionLogs(obj).subscribe(
            data => {
              debugger
            },
          )
        }
      })



    this.DigipayrollServiceService.GetOtConfiguration()
      .subscribe({
        next: data => {
          debugger
          this.result = data;
          this.AutoApproval = this.result[0].approvalStatus;
          this.ManualApply = this.result[0].manualApply;

        }, error: (err) => {
          Swal.fire('Issue in GettingOtConfiguration');
          // Insert error in Db Here//
          var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message
          }
          this.DigipayrollServiceService.InsertExceptionLogs(obj).subscribe(
            data => {
              debugger
            },
          )
        }
      })




    this.dropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 10,
      allowSearchFilter: true,

    };
    this.dropdownList1 = [
      { id: 1, name: 'Monday' },
      { id: 2, name: 'Tuesday' },
      { id: 3, name: 'Wednesday' },
      { id: 4, name: 'Thursday' },
      { id: 5, name: 'Friday' },
      { id: 6, name: 'Saturday' },
      { id: 7, name: 'Sunday' }
    ];
    this.dropdownSettings1 = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 10,
      allowSearchFilter: true,

    };
    this.ActivatedRoute.params.subscribe(params => {
      debugger;
      this.ID = params['id'];
      if (this.ID == undefined) {
        this.Holiday = '',
          this.HolidayDescription = ''
      }
      else {

        this.DigipayrollServiceService.GetHolidays()
          .subscribe({
            next: data => {
              debugger
              this.leavelist = data.filter(x => x.id == this.ID);
              this.Holiday = this.leavelist[0].holiday
              this.HolidayDescription = this.leavelist[0].holidayDescription
              this.HolidayDate = this.datepipe.transform(this.leavelist[0].holidayDate, 'yyyy-MM-dd');

            }, error: (err) => {
              Swal.fire('Issue in Getting City Type');
              // Insert error in Db Here//
              var obj = {
                'PageName': this.currentUrl,
                'ErrorMessage': err.error.message
              }
              this.DigipayrollServiceService.InsertExceptionLogs(obj).subscribe(
                data => {
                  debugger
                },
              )
            }
          })



      }
    }
    )
  }

  public GetDepartment() {
    debugger
  }


  onItemSelect(item: any) {
    debugger
    console.log(item);
    this.EmployeeId = item.id;
    this.UserID = item.id

    this.DigipayrollServiceService.GetMyDetails()
      .subscribe({
        next: data => {
          debugger
          let temp: any = data.filter(x => x.id == this.EmployeeId);
          this.EmployeeName = temp[0].name;
          this.DigipayrollServiceService.GetDeMinimisMapping().subscribe(data => {
            debugger
            let temp1: any = data.filter(x => x.roleID == temp[0].roleType);

          })
        }, error: (err) => {
          Swal.fire('Issue in Getting MyDetails');
          // Insert error in Db Here//
          var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message
          }
          this.DigipayrollServiceService.InsertExceptionLogs(obj).subscribe(
            data => {
              debugger
            },
          )
        }
      })



  }
  onItemSelect1(item: any) {
    debugger
    console.log(item);
    this.EmployeeId = item.id;

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

  public getDatesBetweenDates = (startDate: string | number | Date, endDate: string | number | Date) => {
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

  public attachmentsurl: any = [];

  public addDays(originalDate: string | number, days: number) {
    const cloneDate = new Date(originalDate.valueOf());
    cloneDate.setDate(cloneDate.getDate() + days);
    return cloneDate;
  }
  public formatDate(date: any) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [year, month, day].join('-');
  }

  public Save() {
    debugger
    if (this.Department == undefined || this.RoleID == undefined || this.selectedItems == undefined || this.startdate == undefined
      || this.enddate == undefined || this.selectedItems1 == undefined || this.starttime == undefined || this.endtime == undefined) {
      Swal.fire("Please fill the Mandatory Fields")
    }
    else {
      if (this.startdate > this.enddate) {
        Swal.fire("Start date must be less than end date")
      } else {
        this.loader = true;
        debugger
        // let temap: any = data
        this.ipaddress = '255.255.255.255';
        this.getDatesBetweenDates(this.startdate, this.enddate);
        console.log(this.alldates);
        for (let i = 0; i <= this.alldates.length; i++) {
          var options = { hour12: false };

          if (this.AutoApproval == 'Auto Approval') {
            var entity = {
              'UserID': this.UserID,
              'SigninDate': this.formatDate(this.alldates[i]) + "," + this.starttime,
              'SignoutDate': this.formatDate(this.alldates[i]) + "," + this.endtime,
              'punchinip': this.ipaddress,
              'punchoutip': this.ipaddress,
              'ApprovalStatus': 'Manager Approved HR Approved'
            }
            this.DigipayrollServiceService.UploadbulkAttendanceWeb(entity).subscribe(data => {

            })
          }
          else if (this.AutoApproval == 'Manager Approval') {
            var entity = {
              'UserID': this.UserID,
              'SigninDate': this.formatDate(this.alldates[i]) + "," + this.starttime,
              'SignoutDate': this.formatDate(this.alldates[i]) + "," + this.endtime,
              'punchinip': this.ipaddress,
              'punchoutip': this.ipaddress,
              'ApprovalStatus': 'Manager Pending'
            }
            this.DigipayrollServiceService.UploadbulkAttendanceWeb(entity).subscribe(data => {

            })
          }

        }
        Swal.fire('Attendance Added Successfully');
        this.selectedItems = [];
        this.selectedItems1 = [];
        this.startdate = '';
        this.enddate = '';
        this.RoleID = 0
        this.ngOnInit();
        this.loader = false;

        // this.DigipayrollServiceService.getIPAddress().subscribe(data => {

        // })

      }

    }




  }




  public InsertHolidays() {
    debugger;


    var entity = {


      Holiday: this.Holiday,
      HolidayDescription: this.HolidayDescription,
      HolidayDate: this.HolidayDate,
      Attachment: this.attachmentsurl[0],
    }
    this.DigipayrollServiceService.InsertHolidays(entity).subscribe(data => {
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
      Attachment: this.attachmentsurl[0],
    }
    this.DigipayrollServiceService.UpdateHolidays(entity).subscribe(data => {
      Swal.fire("Updated Successfully");
      location.href = "#/HolidayDashboard";

    })

  }

  public GetLeaveType() {
    debugger
    this.DigipayrollServiceService.GetLeaveType().subscribe(data => {
      debugger
      this.LeaveTypeList = data;
    })
  }

  public GetRoleID(event: any) {
    debugger
    // this.RoleID = event.target.value;
    this.DigipayrollServiceService.GetMyDetails()
      .subscribe({
        next: data => {
          debugger
          this.RoleTypeList = data.filter(x => x.department == this.Department);

          const key = 'role';


          this.uniquelist = [...new Map(this.RoleTypeList.map((item: { [x: string]: any; }) =>
            [(item[key]), item])).values()]

        }, error: (err) => {
          Swal.fire('Issue in Getting MyDetails');
          // Insert error in Db Here//
          var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message
          }
          this.DigipayrollServiceService.InsertExceptionLogs(obj).subscribe(
            data => {
              debugger
            },
          )
        }
      })




  }



  public Getemployee(event: any) {
    debugger
    this.RoleID = event.target.value;
    this.DigipayrollServiceService.GetMyDetails()



      .subscribe(data => {
        debugger
        this.dropdownList2 = data.filter(x => x.roleType == this.RoleID && x.department == this.Department);
      })
  }
  public LeaveType: any

  public cancel() {
    location.reload();
    // location.href = "#/manager/UploadAttendence";
  }

}