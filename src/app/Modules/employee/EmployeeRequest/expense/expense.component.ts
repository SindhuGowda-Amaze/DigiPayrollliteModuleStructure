import { Component, OnInit } from '@angular/core';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})
export class ExpenseComponent implements OnInit {

  viewMode = 'tab1';
  constructor(public DigiofficeService: DigipayrollserviceService) { }
  roleid: any;
  staffID: any;
  ngOnInit(): void {
    this.roleid = sessionStorage.getItem('roledid');
    this.GetExpensesListweb();
    this.staffID = sessionStorage.getItem('staffid');
  }
  p: any = 1;
  count1: any = 10;
  projectlist: any;
  search: any
  projectlist1:any;
  public GetExpensesListweb() {

    debugger
    this.DigiofficeService.GetExpensesListweb().subscribe(data => {
      debugger
      this.projectlist = data.filter(x => x.userID ==this.staffID && ( x.approvalStatus=='Manager Approved' || x.approvalStatus=='Manager Approved')  )
     
      this.projectlist1 = data.filter(x => x.userID ==this.staffID && x.approvalStatus=='Manager Pending' )
     
    })
  }
  date: any;
  public getdate(event: any) {
    debugger
    this.date = event.target.value;

    this.DigiofficeService.GetExpensesListweb().subscribe(data => {
      debugger
      this.projectlist1 = data.filter(x => x.userID == this.staffID && x.filterdate == this.date && x.approvalStatus=='Manager Pending')
    })

  }
  medicalUrl: any
  public getmedicalUrl(medicalUrl: any) {
    debugger
    this.medicalUrl = medicalUrl
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
        this.DigiofficeService.CancelExpenseRequest(list.id).subscribe((data: any) => {
          debugger
          Swal.fire('Cancelled Successfully')
          this.ngOnInit();
        })
      }
    })

    

    

  

  }

  

  count:any;
  projectlist23:any;
  public Approve(){
    this.DigiofficeService.GetExpensesListweb().subscribe(data => {
      debugger
      this.projectlist23 = data.filter(x => x.userID == this.staffID && x.approvalStatus!='Manager Pending' )
     this.count=this.projectlist23.length
    })


  }
  projectlist14:any;
  public Pending(){
    this.DigiofficeService.GetExpensesListweb().subscribe(data => {
      debugger
      this.projectlist14 = data.filter(x => x.userID == this.staffID && x.approvalStatus=='Manager Pending' )
      this.count=this.projectlist14.length
    })

  }
}
