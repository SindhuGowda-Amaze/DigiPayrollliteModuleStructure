import { Component, OnInit } from '@angular/core';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-emp-job-history-form',
  templateUrl: './emp-job-history-form.component.html',
  styleUrls: ['./emp-job-history-form.component.css']
})

export class EmpJobHistoryFormComponent implements OnInit {

  constructor(public DigiofficeService: DigipayrollserviceService, private activatedroute: ActivatedRoute, private datepipe: DatePipe) { }
  ComapanyName: any;
  startdate: any;
  enddate: any;
  checked: any;
  Salary: any;
  deminimis: any;
  tax: any;
  sss: any;
  loan: any;
  RoleID: any;
  RoleTypeList: any;
  dropdownList: any = [];
  selectedItems: any = [];
  dropdownSettings: any = {};
  dropdownList1: any = [];
  selectedItems1: any = [];
  dropdownSettings1: any = {};
  currentyear: any;
  currentUrl: any;
  year: any;
  StaffID: any;
  employertin: any;
  Short: any;
  Description: any;
  tablecount: any;
  pagibig: any;
  philhealth: any;
  thirteenthbonus: any;
  Compensation: any;
  Address: any;
  public keyresultArray: any = [];

  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.RoleID = "";
    this.currentyear = new Date().getFullYear();
    debugger
    this.GetRoleType();
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
  }

  getyear(event: any) {
    debugger;
    this.year = event.target.value.substring(0, 4);
    if (this.year == this.currentyear) {
      this.checked = true;
    }
  }

  public GetRoleType() {
    this.DigiofficeService.GetRoleType()
      .subscribe({
        next: data => {
          debugger
          this.RoleTypeList = data;
        }, error: (err) => {
          Swal.fire('Issue in Getting Role Type');
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

  public GetRoleID(event: any) {
    debugger
    this.RoleID = event.target.value;
    this.DigiofficeService.GetMyDetails()
      .subscribe({
        next: data => {
          debugger
          this.dropdownList = data.filter(x => x.roleType == this.RoleID);
        }, error: (err) => {
          Swal.fire('Issue in Getting My Details');
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

  onItemSelect(item: any) {
    debugger
    this.StaffID = item.id;
  }

  public Save() {
    debugger
    for (let i = 0; i < this.keyresultArray.length; i++) {

      if (this.keyresultArray.length == 0) {
        Swal.fire('Please Add Check List')
      }
      else {
        var eb = {
          'ComapanyName': this.keyresultArray[i].ComapanyName,
          'StartDate': this.keyresultArray[i].StartDate,
          'EndDate': this.keyresultArray[i].EndDate,
          'Salary': this.keyresultArray[i].Salary,
          'StaffID': this.keyresultArray[i].StaffId,
          'deminimis': this.keyresultArray[i].deminimis,
          'tax': this.keyresultArray[i].tax,
          'sss': this.keyresultArray[i].sss,
          'loan': this.keyresultArray[i].loan,
          'Pagibig': this.keyresultArray[i].pagibig,
          'Philhealth': this.keyresultArray[i].philhealth,
          'thirteenthbonus': this.keyresultArray[i].thirteenthbonus,
          'Compensation': this.keyresultArray[i].Compensation,
          'employertin': this.keyresultArray[i].employertin,
          'Address': this.keyresultArray[i].Address
        }
        this.DigiofficeService.InsertEmploymentDetails(eb)
          .subscribe({
            next: data => {
              debugger
              Swal.fire('Saved Successfully');
              location.href = "#/EmploymentJobHistory";
            }, error: (err) => {
              Swal.fire('Issue in Inserting Employment Details');
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
  }

  public SaveDetails() {
    debugger
    if (this.ComapanyName == "" || this.startdate == "" || this.enddate == undefined || this.StaffID == undefined) {
      Swal.fire('Please Add All The  Fields')
    }
    else {
      this.tablecount = 1;
      var json = {
        'ComapanyName': this.ComapanyName,
        'StartDate': this.startdate,
        'EndDate': this.enddate,
        'Salary': this.Salary,
        'StaffId': this.StaffID,
        'deminimis': this.deminimis,
        'tax': this.tax,
        'sss': this.sss,
        'Pagibig': this.pagibig,
        'Philhealth': this.philhealth,
        'thirteenthbonus': this.thirteenthbonus,
        'loan': this.loan,
        'Compensation': this.Compensation,
        'employertin': this.employertin,
        'Address': this.Address
      };
      debugger
      this.keyresultArray.push(json)
      this.ComapanyName = '';
      this.startdate = '';
      this.enddate = '';
      this.Salary = '';
      this.StaffID = '';
      this.deminimis = '';
      this.tax = '';
      this.sss = '';
      this.loan = '';
    }
  }

}