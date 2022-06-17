import { Component, OnInit } from '@angular/core';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-loan-master-dash',
  templateUrl: './loan-master-dash.component.html',
  styleUrls: ['./loan-master-dash.component.css']
})
export class LoanMasterDashComponent implements OnInit {
  term: any;
  leavelist: any;
  ID:any;
  currentUrl: any;

  
  constructor(public DigipayrollserviceService: DigipayrollserviceService) { }
  ngOnInit(): void {
    this.GetLoanMaster();
  }
  
  public GetLoanMaster() {
    debugger
    this.DigipayrollserviceService.GetLoanMaster()
    
    .subscribe({
      next: data => {
        debugger
        this.leavelist = data
      }, error: (err) => {
        Swal.fire('Issue in GetLoanMaster');
        // Insert error in Db Here//
        var obj = {
          'PageName': this.currentUrl,
          'ErrorMessage': err.error.message
        }
        this.DigipayrollserviceService.InsertExceptionLogs(obj).subscribe(
          data => {
            debugger
          },
        )}
    })
    
   
  }


  GetId(id: any) {
    this.ID = id
  }

  update() {
    debugger
    if (this.ID== null || this.ID==undefined) {
      Swal.fire('Please Select the Record to Modify');
      // location.href = "/PayGroup"
    }

    else {
      location.href="#/LeaveTypeForn/"+ this.ID;
    }
  }

  // public delete(id: any) {
  //   debugger
  //   this.DigipayrollserviceService.DeleteLeaveTypeMaster(id).subscribe(data => {
  //     debugger
  //     Swal.fire('Deleted Successfully');
  //     this.ngOnInit();
  //   })
  // }


  

delete(id:any) {
  Swal.fire({
    title: 'Are You Sure ',
    text: "Do you want to delete the Selected Record",
    icon: 'warning',
    // icon: 'success',
    showCloseButton: true,
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'OK'
  }).then((result) => {

    if (result.isConfirmed) {
      debugger
      this.DigipayrollserviceService.DeleteLoanMaster(id)
      
      .subscribe({
        next: data => {
          debugger
          Swal.fire('Deleted Successfully...!')   
      this.ngOnInit();
        }, error: (err) => {
          Swal.fire('Issue in DeleteLoanMaster');
          // Insert error in Db Here//
          var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message
          }
          this.DigipayrollserviceService.InsertExceptionLogs(obj).subscribe(
            data => {
              debugger
            },
          )}
      })
      
      
      
     
    }
  });
}

public Disable_Loans(id: any) {
  var eb = {
    'ID': id,
    'Enable_Disable': 1
  }
  this.DigipayrollserviceService.Enable_Disable_Loans(eb)
  
  .subscribe({
    next: data => {
      debugger
      Swal.fire('Deleted Successfully')
      this.ngOnInit();
    }, error: (err) => {
      Swal.fire('Issue in Enable_Disable_Loans');
      // Insert error in Db Here//
      var obj = {
        'PageName': this.currentUrl,
        'ErrorMessage': err.error.message
      }
      this.DigipayrollserviceService.InsertExceptionLogs(obj).subscribe(
        data => {
          debugger
        },
      )}
  })
  


}


public Enable_Loans(id: any) {
  var eb = {
    'ID': id,
    'Enable_Disable': 0
  }
  this.DigipayrollserviceService.Enable_Disable_Loans(eb)
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  .subscribe(

    data => {
      debugger
      Swal.fire('Enabled Successfully.');
      this.DigipayrollserviceService.GetLoanMaster().subscribe(data => {
        debugger
        this.leavelist = data
      })
    },
  )

}

}
