import { Component, OnInit } from '@angular/core';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.css']
})
export class AddExpenseComponent implements OnInit {
  ExpenseId: any;
  staffID: any;
  dropdownList: any = [];
  dropdownList1: any = [];
  selectedItems: any = [];
  selectedItems1: any = [];
  dropdownSettings: any = {};
  dropdownSettings1: any = {};
  maxdate: any;
  supervisorlist: any
  currencylist: any
  showbenefits: any;

  projectlist: any
  sitelist: any
  ExpenceType: any
  Project: any
  Date: any
  ExpenceLocation: any
  Currency: any
  ExpenceAmount: any
  Supervisor: any
  Comments: any
  currentUrl: any;



  constructor(public DigiofficeService: DigipayrollserviceService) { }

  ngOnInit(): void {
    this.ExpenseId = ""
    this.Project = ""
    this.Currency = ""
    this.Supervisor = ""
    this.showbenefits = 0;
    this.ExpenceType=""
    this.maxdate = new Date().toISOString().split("T")[0];
    this.ExpenceAmount = 0;
    this.GetExpensesMaster()
    this.GetProjectMasterList()
    this.GetCurrencyMaster()
    this.GetSupervisor()
    this.staffID = sessionStorage.getItem('staffid');
    this.currentUrl = window.location.href;

    this.DigiofficeService.GetProjectMasterList().subscribe(data => {
      debugger
      this.dropdownList = data;
    })


    this.dropdownSettings = {
      singleSelection: true,
      idField: 'projectName',
      textField: 'projectName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

    this.dropdownSettings1 = {
      singleSelection: false,
      idField: 'beniftamount',
      textField: 'beniftname',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

  }

  onItemSelect(item: any) {
    debugger
    console.log(item);
    this.Project = item.projectName
  }
  onSelectAll(items: any) {
    console.log(items);
    this.Project = ''
  }
  Benefits: any
  onItemSelect1(item: any) {
    debugger
    console.log(item);
    this.Benefits = item.beniftname;

    this.ExpenceAmount = this.ExpenceAmount + item.beniftamount;
  }
  onSelectAll1(items: any) {
    console.log(items);
    this.Benefits = ''
  }
  expenselist: any
  public GetExpensesMaster() {
    debugger
    this.DigiofficeService.GetExpensesMaster()

    .subscribe({
      next: data => {
        debugger
        this.expenselist = data
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


  public getExpenseType() {
    debugger
    if (this.ExpenceType == 18) {
      this.showbenefits = 1;
      this.DigiofficeService.GetEmployeeBenfits()

      .subscribe({
        next: data => {
       
          debugger
          this.dropdownList1 = data;
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


  public GetProjectMasterList() {
    debugger
    this.DigiofficeService.GetProjectMasterList()
  

    .subscribe({
      next: data => {
        debugger
        this.projectlist = data
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



  public GetCurrencyMaster() {
    debugger
    this.DigiofficeService.GetCurrencyMaster()

    .subscribe({
      next: data => {
        debugger
        this.currencylist = data
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



  public GetSupervisor() {
    debugger
    this.DigiofficeService.GetSupervisor()

    .subscribe({
      next: data => {
        debugger
        this.supervisorlist = data
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
    if(this.selectedItems==undefined||this.ExpenceType==undefined||this.selectedItems1==undefined||this.Date==undefined
      ||this.Currency==undefined||this.ExpenceAmount==undefined||this.Comments==undefined
      ||this.attachments21.length==0 || this.ExpenceType==""){
        Swal.fire('Please Fill All the Fields')

    }
    else{
      this.DigiofficeService.ProjectAttachments(this.attachments21)
      .subscribe(res => {
        debugger
        this.attachmentsurl.push(res);
        this.attachments.length = 0;
  
        this.InsertExpensesWEB();
        debugger
      })
    }

  }



  public InsertExpensesWEB() {
    debugger;
    this.sitelist = '';

    var entity = {
      'UserID': this.staffID,
      'Project': this.Project,
      'ExpenceType': this.ExpenceType,
      'Date': this.Date,
      'ExpenceLocation': this.ExpenceLocation,
      'Currency': this.Currency,
      'InvoiceURL': this.attachmentsurl[0],
      'ExpenceAmount': this.ExpenceAmount,

      'Comments': this.Comments


    }
    this.DigiofficeService.InsertExpensesWEB(entity)

    .subscribe({
      next: data => {
        debugger
        if (data != 0) {
          Swal.fire("Saved Successfully");
          this.InsertNotification();
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



  }

  public InsertNotification() {
    debugger

    var entity = {
      'Date': new Date(),
      'Event': 'Expense Raise',
      'FromUser': 'Admin',
      'ToUser': 'Admin',
      'Message': 'Your Expense Request Raised Successfully',
      'Photo': 'Null',
      'Building': 'Dynamics 1',
      'UserID': localStorage.getItem('staffid'),
      'NotificationTypeID': 7,
      'VendorID': 0


    }
    this.DigiofficeService.InsertNotification(entity)

    .subscribe({
      next: data => {
        if (data != 0) {
          Swal.fire("Saved Successfully");
          location.href = "/employee/expense";
  
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


  }

  public Cancel() {
    debugger
    location.href = "/employee/expense";
  }


  public checkexpenseamoount(event: any) {
    debugger

    this.DigiofficeService.GetExpensesMaster()
    .subscribe(data => {
      debugger
      let temp: any = data.filter(x => x.id == this.ExpenceType);
      let maxamount: any = temp[0].maxClaimable;
      if (event > maxamount) {
        Swal.fire('Amount is Greater than Claimable Amount');
        this.ExpenceAmount = '';
      }
    })




    
  }


}
