import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-loans',
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.css']
})
export class LoansComponent implements OnInit {
  currentUrl: any;
  viewMode = 'tab1';
  id: any;
  SanctionAmount: any;
  period: any;
  stafflist: any;
  roledid: any;
  term: any;
  stafflistCopy:any;
  p: any = 1;
  count1: any = 10;
  stafflist1:any;
  stafflistnewrequest:any;
  stafflistapproved:any;
  RoleType:any;
  count:any;
  Department:any;
  Departmentlist:any;
  RoleTypeList:any;
  myDate:any;
  loader:any;
  stafflistnewrequest1:any;
  stafflist2:any;
  stafflistapproved1:any;

 
  constructor(public DigiofficeService: DigipayrollserviceService, public router: Router) { }
 

  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.RoleType="";
    this.Department="";
    this.myDate = new Date();
    debugger
    this.roledid = sessionStorage.getItem('roledid');
   
    this.DigiofficeService.GetEmployeeLoans().subscribe(data => {
      debugger
      this.stafflist2 = data.filter(x => x.staffID == sessionStorage.getItem('staffid'));
      this.count = this.stafflist2.length;
      
      this.stafflistnewrequest1=this.stafflist2.filter((x:{status: string,staffID: string})=>x.status!='HR Approved' && x.staffID == sessionStorage.getItem('staffid'))
      this.count = this.stafflistnewrequest1.length;
      this.loader=false

 
    
    });
      debugger
      this.DigiofficeService.GetEmployeeLoans().subscribe(data => {
        debugger
        this.stafflist = data.filter(x => x.staffID == sessionStorage.getItem('staffid'));
        this.count = this.stafflist.length;

        this.stafflistnewrequest=this.stafflist.filter((x:{status: string,staffID: string})=>x.status=='HR Pending' && x.staffID == sessionStorage.getItem('staffid'))
        this.count = this.stafflistnewrequest.length;

       this.stafflistapproved=this.stafflist.filter((x:{status: string,staffID: string})=>x.status=='HR Approved' && x.staffID == sessionStorage.getItem('staffid'))
       this.count = this.stafflistapproved.length;

       this.loader=false
      
      });
    

    this.DigiofficeService.GetDepartment().subscribe(data => {
      debugger
      this.Departmentlist = data;
    });

    this.DigiofficeService.GetRoleType().subscribe(data => {
      debugger
      this.RoleTypeList = data;
    });

 
  }

  public getRoleType(event: any) {
    debugger
    this.RoleType = event.target.value;
  }

  public FilterRoleType() {
    debugger
    this.DigiofficeService.GetMyDetails()   
 .subscribe({
  next: data => {
    debugger
    this.stafflist = data.filter(x=>x.roleType==this.RoleType);
    this.count = this.stafflist.length;
  }, error: (err) => {
    Swal.fire('Issue in Getting MyDetails');
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

  public newrequest(){
    this.DigiofficeService.GetEmployeeLoans()


    
 .subscribe({
  next: data => {
    debugger
    this.stafflist2 = data.filter(x => x.staffID == sessionStorage.getItem('staffid'));
    this.count = this.stafflist2.length;
    
    this.stafflistnewrequest1=this.stafflist2.filter((x:{status: string,staffID: string})=>x.status!='HR Approved' && x.staffID == sessionStorage.getItem('staffid'))
    this.count = this.stafflistnewrequest1.length;

    this.loader=false

  }, error: (err) => {
    Swal.fire('Issue in Getting EmployeeLoans');
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

  public Approved(){
    this.DigiofficeService.GetEmployeeLoans()

    
 .subscribe({
  next: data => {
    debugger
    this.stafflist2 = data.filter(x => x.staffID == sessionStorage.getItem('staffid'));
    this.count = this.stafflist2.length;
    
    this.stafflistnewrequest1=this.stafflist2.filter((x:{status: string,staffID: string})=>x.status=='HR Approved' && x.staffID == sessionStorage.getItem('staffid'))
    this.count = this.stafflistnewrequest1.length;
       this.loader=false
  }, error: (err) => {
    Swal.fire('Issue in Getting EmployeeLoans');
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

  public filterByDepartment(){
    debugger
    this.DigiofficeService.GetEmployeeLoans()

    
 .subscribe({
  next: data => {
    debugger
    this.stafflist = data.filter(x=>x.department==this.Department);
    this.stafflistnewrequest=this.stafflist.filter((x:{status: string,department:string})=>x.status=='HR Pending' && x.department==this.Department)
    this.stafflistapproved=this.stafflist.filter((x:{status: string,department:string})=>x.status=='HR Approved' && x.department==this.Department )
    this.count = this.stafflist.length;
  }, error: (err) => {
    Swal.fire('Issue in Getting EmployeeLoans');
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



  public filterStaff() {
    debugger
    let searchCopy = this.term.toLowerCase();
    this.stafflistnewrequest = this.stafflistCopy.filter((x: {name: string}) =>
      x.name.toLowerCase().includes(searchCopy));

      this.stafflistapproved = this.stafflistCopy.filter((x: {name: string}) =>
      x.name.toLowerCase().includes(searchCopy));

  }


  date: any;
  public getdate(event: any) {
    debugger
    this.date = event.target.value;
    this.DigiofficeService.GetEmployeeLoans()
 
    
 .subscribe({
  next: data => {
    debugger
    this.stafflist = data.filter(x => x.filterdate == this.date);
  }, error: (err) => {
    Swal.fire('Issue in Getting EmployeeLoans');
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

  public CancelLeave(list: any) {

    debugger
    Swal.fire({
      title: 'Are you sure?',
      text: 'You Want to cancel it.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Cancel it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        this.DigiofficeService.DeleteEmployeeLoans(list.id)
.subscribe({
  next: data => {
    debugger
    Swal.fire('Cancelled Successfully')
    this.ngOnInit();
  }, error: (err) => {
    Swal.fire('Issue in Getting EmployeeLoans');
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
    })
  }


 
   



  public Approve(item: any) {
    debugger
    this.id = item.id;
  }

  public ApproveEmployeeloan() {
    var entity = {
      ID: this.id,
      SanctionAmount: this.SanctionAmount,
      ApprovedDate: this.myDate,
      

    }
    this.DigiofficeService.UpdateEmployeeLoansByHR(entity)


    .subscribe({
      next: data => {
        debugger
        Swal.fire("Updated Successfully");
        location.reload();
      }, error: (err) => {
        Swal.fire('Issue in Getting EmployeeLoansByHR');
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
