import { Component, OnInit } from '@angular/core';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';
import Swal from 'sweetalert2';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-expense-report',
  templateUrl: './expense-report.component.html',
  styleUrls: ['./expense-report.component.css']
})
export class ExpenseReportComponent implements OnInit {

  loader: any;
  viewMode = 'tab1';
  staffID: any;
  roleid: any;
  enddate: any;
  term: any
  startdate: any;
  projectlist: any;
  projectlist1: any;
  date: any;
  selecallbtn: any;
  expencesName: any;
  Decription: any;
  Notes: any;
  id: any;
  currentUrl: any;
  temp: any;
  public IntID: any = [];
  public ID: any = [];
  constructor(public DigipayrollserviceService: DigipayrollserviceService) { }
  ngOnInit(): void {

    this.currentUrl = window.location.href;
    this.GetExpensesListweb();
    this.GetExpensesListweb1();
    this.staffID = sessionStorage.getItem('staffid');
    this.roleid = sessionStorage.getItem('roledid');
  }



  public GetExpensesListweb() {
    debugger
    this.DigipayrollserviceService.GetExpensesListweb()

      .subscribe({
        next: data => {
          debugger
          this.projectlist1 = data.filter(x => (x.status == 'Manager Pending'))
        }, error: (err) => {
          Swal.fire('Issue in Getting ExpensesListweb');
          // Insert error in Db Here//
          var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message
          }
          this.DigipayrollserviceService.InsertExceptionLogs(obj).subscribe(
            data => {
              debugger
            },
          )
        }
      })
  }

  public GetExpensesListweb1() {
    debugger
    this.DigipayrollserviceService.GetExpensesListweb()

      .subscribe({
        next: data => {
          debugger
          this.projectlist = data.filter(x => x.status == 'Manager Approved' && x.approvalStatus != null)
        }, error: (err) => {
          Swal.fire('Issue in Getting ExpensesListweb');
          // Insert error in Db Here//
          var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message
          }
          this.DigipayrollserviceService.InsertExceptionLogs(obj).subscribe(
            data => {
              debugger
            },
          )
        }
      })
  }

  public Getdate(event: any) {
    debugger
    this.date = event?.target.value
    this.DigipayrollserviceService.GetExpensesListweb()

      .subscribe({
        next: data => {
          debugger
          this.projectlist = data.filter(x => (x.filterdate >= this.startdate && x.filterdate <= this.enddate) && x.status == 'Manager Approved')
        }, error: (err) => {
          Swal.fire('Issue in Getting ExpensesListweb');
          // Insert error in Db Here//
          var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message
          }
          this.DigipayrollserviceService.InsertExceptionLogs(obj).subscribe(
            data => {
              debugger
            },
          )
        }
      })
  }

  selectALL(checked: boolean) { // pass true or false to check or uncheck all
    this.selecallbtn = true;
    var inputs = document.getElementsByTagName("input");
    for (var i = 0; i < inputs.length; i++) {
      if (inputs[i].type == "checkbox") {
        inputs[i].checked = checked;

        // This way it won't flip flop them and will set them all to the same value which is passed into the function
      }
    }
  }

  public Approveall() {
    debugger
    this.selecallbtn = false;
    for (var i = 0; i < this.ID.length; i++) {

      var entity = {
        ID: this.ID[i],
        'ApprovalStatus': 'Manager Approved',
        ApproveBit: 1

      }
      this.DigipayrollserviceService.UpdateExpencesApproveBySupervisor(entity)


        .subscribe({
          next: data => {
            debugger
            Swal.fire("Approved Successfully");
            location.reload()
            // location.href = "#/Companydashbaord";
          }, error: (err) => {
            Swal.fire('Issue in Getting UpdateExpencesApproveBySupervisor');
            // Insert error in Db Here//
            var obj = {
              'PageName': this.currentUrl,
              'ErrorMessage': err.error.message
            }
            this.DigipayrollserviceService.InsertExceptionLogs(obj).subscribe(
              data => {
                debugger
              },
            )
          }
        })
    }
    this.ngOnInit();
  }




  public UpdateExpencesApproveBySupervisor(id: any) {
    debugger;
    var entity = {
      ID: id,
      'ApprovalStatus': 'Manager Approved',
      ApproveBit: 1

    }
    this.DigipayrollserviceService.UpdateExpencesApproveBySupervisor(entity)

      .subscribe({
        next: data => {
          debugger
          Swal.fire("Approved Successfully");
          location.reload()
          // location.href = "#/Companydashbaord";
        }, error: (err) => {
          Swal.fire('Issue in Getting UpdateExpencesApproveBySupervisor');
          // Insert error in Db Here//
          var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message
          }
          this.DigipayrollserviceService.InsertExceptionLogs(obj).subscribe(
            data => {
              debugger
            },
          )
        }
      })

  }

  public getid(id: any) {
    this.id = id

  }

  public UpdateExpencesReject() {
    debugger;
    var entity = {

      ID: this.id,
      Notes: this.Notes,
      Status: 'Manager Rejected',

    }
    this.DigipayrollserviceService.UpdateExpencesReject(entity)

      .subscribe({
        next: data => {
          debugger
          Swal.fire("Rejected Successfully");
          location.reload()
          // location.href = "#/Companydashbaord";
        }, error: (err) => {
          Swal.fire('Issue in Getting UpdateExpencesReject');
          // Insert error in Db Here//
          var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message
          }
          this.DigipayrollserviceService.InsertExceptionLogs(obj).subscribe(
            data => {
              debugger
            },
          )
        }
      })

  }
 

  public getCheckbocdetails(evn: any) {
    let temp: any = evn;
    this.temp = Object.entries(temp);
    debugger
    if (this.temp.every((val: { checked: boolean; }) => val.checked == true)) {
      this.IntID = false;
      this.ID = [];
      this.temp.forEach((val: { checked: boolean; }) => { val.checked = false });
      this.IntID = false;
    }
    else {
      debugger;
      this.selecallbtn = true;
      //  this.ID = [];
      debugger
      this.temp.forEach((val: { checked: boolean; }) => { val.checked = true });
      this.IntID = true;
      this.ID.push(evn.id);
    }
  }


  fileName = 'Expense Report.xlsx';
  exportexcel(): void {
    this.loader = true;
    /* table id is passed over here */
    let element = document.getElementById('downloadaplication');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
    this.loader = false;

  }

}