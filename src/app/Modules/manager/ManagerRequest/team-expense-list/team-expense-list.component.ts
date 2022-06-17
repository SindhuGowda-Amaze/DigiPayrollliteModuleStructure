import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';

@Component({
  selector: 'app-team-expense-list',
  templateUrl: './team-expense-list.component.html',
  styleUrls: ['./team-expense-list.component.css']
})
export class TeamExpenseListComponent implements OnInit {
  term: any
  currentUrl: any;
  expencesName: any;
  Decription: any;
  Notes: any;
  projectlist: any;
  projectlist1: any;
  viewMode = 'tab1';
  staffID: any;
  roleid: any
  constructor(public DigiofficeService: DigipayrollserviceService) { }
  ngOnInit(): void {

    this.currentUrl = window.location.href;
    this.GetExpensesListweb();
    this.GetExpensesListweb1();
    this.staffID = sessionStorage.getItem('staffid');
    this.roleid = sessionStorage.getItem('roledid');
  }

  public GetExpensesListweb() {
    debugger
    this.DigiofficeService.GetExpensesListweb()


      .subscribe({
        next: data => {
          debugger
          this.projectlist1 = data.filter(x => x.supervisor == this.staffID && (x.approvalStatus == 'Manager Pending Finance Pending' || x.approvalStatus == null))

        }, error: (err) => {
          Swal.fire('Issue in Getting ExpensesListweb');
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

  public GetExpensesListweb1() {
    debugger
    this.DigiofficeService.GetExpensesListweb()

      .subscribe({
        next: data => {
          debugger
          this.projectlist = data.filter(x => x.supervisor == this.staffID && x.approvalStatus != 'Manager Pending Finance Pending' && x.approvalStatus != null)

        }, error: (err) => {
          Swal.fire('Issue in Getting ExpensesListweb');
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
  date: any;
  public Getdate(event: any) {
    debugger
    this.date = event?.target.value
    this.DigiofficeService.GetExpensesListweb()
      .subscribe({
        next: data => {
          debugger
          this.projectlist = data.filter(x => x.supervisor == this.staffID && x.filterdate == this.date)
        }, error: (err) => {
          Swal.fire('Issue in Getting ExpensesListweb');
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

  selecallbtn: any;
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
        'ApprovalStatus': 'Manager Approved Finance Pending',
        ApproveBit: 1

      }
      this.DigiofficeService.UpdateExpencesApproveBySupervisor(entity)

        .subscribe({
          next: data => {
            debugger
            Swal.fire("Approved Successfully");
            location.reload()
            // location.href = "#/Companydashbaord";
          }, error: (err) => {
            Swal.fire('Issue in Getting ApproveBySupervisor');
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
    this.ngOnInit();
  }




  public UpdateExpencesApproveBySupervisor(id: any) {
    debugger;
    var entity = {
      ID: id,
      'ApprovalStatus': 'Manager Approved Finance Pending',
      ApproveBit: 1

    }
    this.DigiofficeService.UpdateExpencesApproveBySupervisor(entity)


      .subscribe({
        next: data => {
          debugger
          Swal.fire("Approved Successfully");
          location.reload()
        }, error: (err) => {
          Swal.fire('Issue in Getting ExpencesApproveBySupervisor');
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
  id: any;
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
    this.DigiofficeService.UpdateExpencesReject(entity)


      .subscribe({
        next: data => {
          debugger
          Swal.fire("Rejected Successfully");
          location.reload()
          // location.href = "#/Companydashbaord";
        }, error: (err) => {
          Swal.fire('Issue in Getting ExpencesReject');
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
  temp: any;
  public IntID: any = [];
  public ID: any = [];

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
}

