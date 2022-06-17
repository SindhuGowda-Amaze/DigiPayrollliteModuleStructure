import { Component, OnInit } from '@angular/core';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-loan-master',
  templateUrl: './loan-master.component.html',
  styleUrls: ['./loan-master.component.css'],
})
export class LoanMasterComponent implements OnInit {

  ID: any;
  leavelist: any;
  Short: any;
  Description: any;
  LoanType: any;
  Entitlement_Per_Year: any;
  carry_forward: any;
  currentUrl: any;


  constructor(
    public DigipayrollserviceService: DigipayrollserviceService,
    private activatedroute: ActivatedRoute
  ) {}
 
  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.activatedroute.params.subscribe((params) => {
      debugger;
      this.ID = params['id'];
      if (this.ID == undefined) {
        (this.Short = ''), (this.Description = '');
      } else {
        this.DigipayrollserviceService.GetLoanMaster().subscribe((data) => {
          debugger;

          this.leavelist = data.filter((x) => x.id == this.ID);

          this.Short = this.leavelist[0].short;
          this.Description = this.leavelist[0].description;
        });
      }
    });
  }

 
  public InsertLoanMaster() {
    debugger;
    if (
      this.LoanType == '' ||
      this.Description == '' ||
      this.LoanType == undefined ||
      this.Description == undefined
    ) {
      Swal.fire('Please Fill All The Mandatory Fields');
    } else {
      var entity = {
        LoanType23: this.LoanType,
        Description: this.Description,
      };
      this.DigipayrollserviceService.InsertLoanMaster(entity)
      
      .subscribe({
        next: data => {
          debugger
          if (data != 0) {
            Swal.fire('Saved Successfully');
            location.href = '#/admin/LoanMasterDash';
          }
        }, error: (err) => {
          Swal.fire('Issue in InsertLoanMaster');
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
  }

  public UpdateLeaveType() {
    debugger;

    var entity = {
      ID: this.ID,
      Short: this.Short,
      Description: this.Description,
    };
    this.DigipayrollserviceService.UpdateLoanMaster(entity)
    
    .subscribe({
      next: data => {
        debugger
        Swal.fire('Updated Successfully');
        location.href = '#/admin/LoanMasterDash';
      }, error: (err) => {
        Swal.fire('Issue in UpdateLoanMaster');
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
}
