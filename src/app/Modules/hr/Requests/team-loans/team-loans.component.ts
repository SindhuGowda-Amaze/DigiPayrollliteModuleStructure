import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-team-loans',
  templateUrl: './team-loans.component.html',
  styleUrls: ['./team-loans.component.css']
})
export class TeamLoansComponent implements OnInit {

  constructor(public DigiofficeService: DigipayrollserviceService, public router: Router) { }
  viewMode = 'tab1';
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
  month:any;
  loader:any;
  approved:any;
  ngOnInit(): void {
    this.loader = true;
    this.RoleType="";
    this.approved=0;
    this.month=new Date().getMonth();
    this.Department="";
    this.myDate = new Date();
    debugger
    this.roledid = sessionStorage.getItem('roledid');
    if (this.roledid == 2 ) {
      debugger
      this.DigiofficeService.GetEmployeeLoans().subscribe(data => {
        debugger
        this.stafflist = data;

        this.stafflistnewrequest=this.stafflist.filter((x:{status: string,supervisor: string})=>x.status=='Manager Pending,HR Pending,Payroll Pending,Finance Pending' && x.supervisor==sessionStorage.getItem('staffid')  )
        
        this.stafflistapproved=this.stafflist.filter((x:{status: string,supervisor: string})=>x.status!='Manager Pending,HR Pending,Payroll Pending,Finance Pending' && x.supervisor==sessionStorage.getItem('staffid')  )
        this.count = this.stafflistapproved.length;

        this.count = this.stafflistapproved.length;
        this.stafflistCopy = this.stafflist

       
        this.loader = false
      });
    }
    else if (this.roledid == 9 ) {
      debugger
      this.DigiofficeService.GetEmployeeLoans().subscribe(data => {
        debugger
        this.stafflist = data;

        this.stafflistnewrequest=this.stafflist.filter((x:{status: string})=>x.status=='Manager Pending,HR Pending,Payroll Pending,Finance Pending'   )
         this.count = this.stafflistnewrequest.length;

        this.stafflistapproved= this.stafflist.filter((x:{status: string})=>x.status!='Manager Approved,HR Pending,Payroll Pending,Finance Pending'   )
        this.count = this.stafflistapproved.length;
        this.stafflistCopy = this.stafflist
         this.loader = false

       
      
      });
    }
    else if (this.roledid == 8 ) {
      debugger
      this.DigiofficeService.GetEmployeeLoans().subscribe(data => {
        debugger
        this.stafflist = data;

        this.stafflistnewrequest=this.stafflist.filter((x:{status: string})=>x.status=='Manager Approved,HR Approved,Payroll Approved,Finance Pending' )
         this.count = this.stafflistnewrequest.length;

        this.stafflistapproved=this.stafflist.filter((x:{status: string})=>x.status!='Manager Approved,HR Approved,Payroll Approved,Finance Pending'   )
        this.count = this.stafflistapproved.length;
        this.stafflistCopy = this.stafflist;
        this.loader = false

       
      
      });
    }
    else if (this.roledid == 17 ) {
      debugger
      this.DigiofficeService.GetEmployeeLoans().subscribe(data => {
        debugger
        this.stafflist = data;

        this.stafflistnewrequest=this.stafflist.filter((x:{status: string})=>x.status=='Manager Approved,HR Approved,Payroll Pending,Finance Pending' || x.status==null  )
         this.count = this.stafflistnewrequest.length;

        this.stafflistapproved=this.stafflist.filter((x:{status: string})=>x.status!='Manager Approved,HR Approved,Payroll Pending,Finance Pending' && x.status!=null    )
        this.count = this.stafflistapproved.length;
        this.stafflistCopy = this.stafflist;
        this.loader = false

       
      
      });
    }


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
    if (this.roledid == 2 ) {
      debugger
      this.DigiofficeService.GetEmployeeLoans().subscribe(data => {
        debugger
        this.stafflist = data;

        this.stafflistnewrequest=this.stafflist.filter((x:{status: string,supervisor: string,month:string,role:string})=>x.status=='Manager Pending,HR Pending,Payroll Pending,Finance Pending' && x.supervisor==sessionStorage.getItem('staffid') && x.role== this.RoleType)
        
        this.stafflistapproved=this.stafflist.filter((x:{status: string,supervisor: string,month:string,role:string})=>x.status!='Manager Pending,HR Pending,Payroll Pending,Finance Pending' && x.supervisor==sessionStorage.getItem('staffid') && x.role== this.RoleType)
        this.count = this.stafflistapproved.length;

        this.count = this.stafflistapproved.length;
        this.stafflistCopy = this.stafflist

       
      
      });
   }
    else if (this.roledid == 9 ) {
      debugger
      this.DigiofficeService.GetEmployeeLoans().subscribe(data => {
        debugger
        this.stafflist = data;

        this.stafflistnewrequest=this.stafflist.filter((x:{status: string,month:string,role:string})=>x.status=='Manager Approved,HR Pending,Payroll Pending,Finance Pending' && x.role== this.RoleType )
         this.count = this.stafflistnewrequest.length;

        this.stafflistapproved= this.stafflistnewrequest=this.stafflist.filter((x:{status: string,month:string,role:string})=>x.status=='Manager Approved,HR Pending,Payroll Pending,Finance Pending'  && x.role== this.RoleType)
        this.count = this.stafflistapproved.length;
        this.stafflistCopy = this.stafflist

       
      
      });
    }
    else if (this.roledid == 8 ) {
      debugger
      this.DigiofficeService.GetEmployeeLoans().subscribe(data => {
        debugger
        this.stafflist = data;

        this.stafflistnewrequest=this.stafflist.filter((x:{status: string,month:string,role:string})=>x.status=='Manager Approved,HR Pending,Payroll Approved,Finance Pending' && x.role== this.RoleType )
         this.count = this.stafflistnewrequest.length;

        this.stafflistapproved=this.stafflist.filter((x:{status: string,month:string,role:string})=>x.status!='Manager Approved,HR Pending,Payroll Approved,Finance Pending' && x.role== this.RoleType )
        this.count = this.stafflistapproved.length;
        this.stafflistCopy = this.stafflist

       
      
      });
    }
    else if (this.roledid == 17 ) {
      debugger
      this.DigiofficeService.GetEmployeeLoans().subscribe(data => {
        debugger
        this.stafflist = data;

        this.stafflistnewrequest=this.stafflist.filter((x:{status: string,month:string,role:string})=>x.status=='Manager Approved,HR Pending,Payroll Pending,Finance Pending'  && x.role== this.RoleType)
         this.count = this.stafflistnewrequest.length;

        
        this.stafflistapproved=this.stafflist.filter((x:{status: string,month:string,role:string})=>x.status!='Manager Approved,HR Pending,Payroll Pending,Finance Pending'  && x.role== this.RoleType)
        this.count = this.stafflistapproved.length;
        this.stafflistCopy = this.stafflist

       
      
      });
    } 
 
  }

  public filterByDepartment(){
    debugger
    this.DigiofficeService.GetMyDetails().subscribe(data => {
      debugger
      this.stafflist = data.filter(x=>x.department==this.Department);
      this.count = this.stafflist.length;
    });
 
  }

  public filterByMonth(){
    debugger
    if (this.roledid == 2 ) {
      debugger
      this.DigiofficeService.GetEmployeeLoans().subscribe(data => {
        debugger
        this.stafflist = data;

        this.stafflistnewrequest=this.stafflist.filter((x:{status: string,supervisor: string,month:string})=>x.status=='Manager Pending,HR Pending,Payroll Pending,Finance Pending' && x.supervisor==sessionStorage.getItem('staffid') && x.month==this.month+1)
        
        this.stafflistapproved=this.stafflist.filter((x:{status: string,supervisor: string,month:string})=>x.status!='Manager Pending,HR Pending,Payroll Pending,Finance Pending' && x.supervisor==sessionStorage.getItem('staffid') && x.month==this.month+1)
        this.count = this.stafflistapproved.length;

        this.count = this.stafflistapproved.length;
        this.stafflistCopy = this.stafflist

       
      
      });
   }
    else if (this.roledid == 9 ) {
      debugger
      this.DigiofficeService.GetEmployeeLoans().subscribe(data => {
        debugger
        this.stafflist = data;

        this.stafflistnewrequest=this.stafflist.filter((x:{status: string,month:string})=>x.status=='Manager Approved,HR Pending,Payroll Pending,Finance Pending' && x.month==this.month+1 )
         this.count = this.stafflistnewrequest.length;

        this.stafflistapproved= this.stafflistnewrequest=this.stafflist.filter((x:{status: string,month:string})=>x.status=='Manager Approved,HR Pending,Payroll Pending,Finance Pending'  && x.month==this.month+1)
        this.count = this.stafflistapproved.length;
        this.stafflistCopy = this.stafflist

       
      
      });
    }
    else if (this.roledid == 8 ) {
      debugger
      this.DigiofficeService.GetEmployeeLoans().subscribe(data => {
        debugger
        this.stafflist = data;

        this.stafflistnewrequest=this.stafflist.filter((x:{status: string,month:string})=>x.status=='Manager Approved,HR Pending,Payroll Approved,Finance Pending' && x.month==this.month+1 )
         this.count = this.stafflistnewrequest.length;

        this.stafflistapproved=this.stafflist.filter((x:{status: string,month:string})=>x.status!='Manager Approved,HR Pending,Payroll Approved,Finance Pending' && x.month==this.month+1 )
        this.count = this.stafflistapproved.length;
        this.stafflistCopy = this.stafflist

       
      
      });
    }
    else if (this.roledid == 17 ) {
      debugger
      this.DigiofficeService.GetEmployeeLoans().subscribe(data => {
        debugger
        this.stafflist = data;

        this.stafflistnewrequest=this.stafflist.filter((x:{status: string,month:string})=>x.status=='Manager Approved,HR Pending,Payroll Pending,Finance Pending'  && x.month==this.month+1)
         this.count = this.stafflistnewrequest.length;

        this.stafflistapproved=this.stafflist.filter((x:{status: string,month:string})=>x.status!='Manager Approved,HR Pending,Payroll Pending,Finance Pending'  && x.month==this.month+1)
        this.count = this.stafflistapproved.length;
        this.stafflistCopy = this.stafflist

       
      
      });
    } 

  
  }


  public Approved(){
    this.approved=1
  }

  public Pending(){
    this.approved=0
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
  Comments:any;
  public getdate(event: any) {
    debugger
    this.date = event.target.value;
    this.DigiofficeService.GetEmployeeLoans().subscribe(data => {
      debugger
      this.stafflist = data.filter(x => x.filterdate == this.date);
    });
  }

  public CancelLeave(list: any) {
    debugger
    this.DigiofficeService.DeleteEmployeeLoans(list.id).subscribe(data => {
      debugger
      Swal.fire('Cancelled Successfully');
      this.ngOnInit();
    })

  }
  id: any;
  SanctionAmount: any;
  period: any;
  ApprovedDate:any;
  public Approve(item: any) {
    debugger
    this.id = item.id;
    this.LoanType = item.loanType
  }

  LoanType:any;
  public Reject(item: any) {
    debugger
    this.id = item.id;
    this.LoanType = item.loanType
  }
  holidaylist:any;
  approval:any;
  public ApproveEmployeeloan() {
    this.DigiofficeService.GetLoanConfiguration().subscribe((data: any) => {
      debugger
      this.holidaylist = data.filter((x: { type: any; })=>x.type==this.LoanType)
      this.approval =  this.holidaylist[0].approval
   
    if (this.roledid == 9 ) {
     if(this.approval=='HR Approval'){
     var hb = {
      ID: this.id,
      Status : 'HR Approved',
      HRComments : this.Comments

    }
    this.DigiofficeService.UpdateEmployeeLoansByHR(hb).subscribe(data => {
      Swal.fire("Updated Successfully");
      location.reload();

    })
  }
  else{
    var hb = {
      ID: this.id,
      Status : 'Manager Approved,HR Approved,Payroll Pending,Finance Pending',
      HRComments : this.Comments

    }
    this.DigiofficeService.UpdateEmployeeLoansByHR(hb).subscribe(data => {
      Swal.fire("Updated Successfully");
      location.reload();

    })
  }
  }
  else if (this.roledid == 2 ) {
    if(this.approval=='Manager Approval'){
    var mb = {
      ID: this.id,
      Status : 'Manager Approved',
      ManagerComments : this.Comments
    }
    this.DigiofficeService.UpdateEmployeeLoansByManager(mb).subscribe(data => {
      Swal.fire("Updated Successfully");
      location.reload();

    })
  }
 else{
    var mb = {
      ID: this.id,
      Status : 'Manager Approved,HR Pending,Payroll Pending,Finance Pending',
      ManagerComments : this.Comments
    }
    this.DigiofficeService.UpdateEmployeeLoansByManager(mb).subscribe(data => {
      Swal.fire("Updated Successfully");
      location.reload();

    })
  }
  }
  else if (this.roledid == 8 ) {
    if(this.approval=='Finance Approval'){
    var fb = {
      ID: this.id,
      Status : 'Finance Approved',
      FinanceComments : this.Comments
    }
    this.DigiofficeService.UpdateEmployeeLoansByFinance(fb).subscribe(data => {
      Swal.fire("Updated Successfully");
      location.reload();

    })
  }
  else{
    var fb = {
      ID: this.id,
      Status : 'Manager Approved,HR Approved,Payroll Approved,Finance Approved',
      FinanceComments : this.Comments
    }
    this.DigiofficeService.UpdateEmployeeLoansByFinance(fb).subscribe(data => {
      Swal.fire("Updated Successfully");
      location.reload();

    })
  }
  }
  else if (this.roledid == 17 ) {
    if(this.approval=='Payroll Approval'){
    var eb = {
      ID: this.id,
      Status : 'Payroll Approved',
      PayrollComments : this.Comments,
      ApprovedDate : this.myDate
    }
    this.DigiofficeService.UpdateEmployeeLoansByPayroll(eb).subscribe(data => {
      Swal.fire("Updated Successfully");
      location.reload();

    })
  }
  else {
    var eb = {
      ID: this.id,
      Status : 'Manager Approved,HR Approved,Payroll Approved,Finance Pending',
      PayrollComments : this.Comments,
      ApprovedDate : this.myDate
    }
    this.DigiofficeService.UpdateEmployeeLoansByPayroll(eb).subscribe(data => {
      Swal.fire("Updated Successfully");
      location.reload();

    })
  }
  }

})
  }

  public RejectEmployeeloan() {

    if (this.roledid == 9 ) {
    var hb = {
      ID: this.id,
      Status : 'Manager Approved,HR Rejected,Payroll Pending,Finance Pending',
      HRComments : this.Comments

    }
    this.DigiofficeService.UpdateEmployeeLoansByHR(hb).subscribe(data => {
      Swal.fire("Updated Successfully");
      location.reload();

    })
  }
  else if (this.roledid == 2 ) {
    var mb = {
      ID: this.id,
      Status : 'Manager Rejected,HR Pending,Payroll Pending,Finance Pending',
      ManagerComments : this.Comments
    }
    this.DigiofficeService.UpdateEmployeeLoansByManager(mb).subscribe(data => {
      Swal.fire("Updated Successfully");
      location.reload();

    })
  }
  else if (this.roledid == 8 ) {
    var fb = {
      ID: this.id,
      Status : 'Manager Approved,HR Approved,Payroll Approved,Finance Rejected',
      FinanceComments : this.Comments
    }
    this.DigiofficeService.UpdateEmployeeLoansByFinance(fb).subscribe(data => {
      Swal.fire("Updated Successfully");
      location.reload();

    })
  }
  else if (this.roledid == 17 ) {
    var eb = {
      ID: this.id,
      Status : 'Manager Approved,HR Approved,Payroll Rejected,Finance Pending',
      PayrollComments : this.Comments,
      ApprovedDate : this.myDate
    }
    this.DigiofficeService.UpdateEmployeeLoansByPayroll(eb).subscribe(data => {
      Swal.fire("Updated Successfully");
      location.reload();

    })
  }
    
  }


  attachments2url : any;
  tomail:any;
  subject:any;
  message:any;
  public sendmail() {
    if (this.attachments2url.length == 0) {
      this.attachments2url[0] = 'abcd';
    }
    var sm = {
      'emailto': this.tomail,
      'emailsubject': this.subject,
      'emailbody': this.message,
      'attachmenturl': this.attachments2url
    }
    this.DigiofficeService.sendemail(this.tomail,this.subject,this.message).subscribe(res => {
      debugger
      
      Swal.fire('Mail Sent Successfully')
    })

 
  }

}