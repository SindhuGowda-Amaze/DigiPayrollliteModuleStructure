import { Component, OnInit } from '@angular/core';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-bank-form',
  templateUrl: './bank-form.component.html',
  styleUrls: ['./bank-form.component.css'],
})
export class BankFormComponent implements OnInit {
  name: any;
  code: any;
  remarks: any;
  result: any;
  id: any;
  currentUrl: any;
  constructor(
    private ActivatedRoute: ActivatedRoute,
    private DigipayrollserviceService: DigipayrollserviceService
  ) {}

  ngOnInit(): void {

    this.currentUrl = window.location.href;
    this.ActivatedRoute.params.subscribe((params) => {
      this.id = params['id'];
      if (this.id != undefined && this.id != null) {
        this.GetBankDetails();
      }
    });
    //  this. GetBankDetails() ;
  }
  OnSubmit() {
    debugger;
    if (
      this.name == undefined ||
      this.code == undefined ||
      this.remarks == undefined
    ) {
      Swal.fire('Please Fill All The Mandatory Fields');
    } else {
      var json = {
        name: this.name,
        code: this.code,
        Remarks: this.remarks,
      };
      this.DigipayrollserviceService.InsertBanks(json)
      
      .subscribe({
        next: data => {
          debugger;
          let id = data;
  
          Swal.fire('Successfully Saved!!');
  
          location.href = '#/admin/Bank';
        }, error: (err) => {
          Swal.fire('Issue in InsertBanks');
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

  GetBankDetails() {
    this.DigipayrollserviceService.GetBanks()
    .subscribe({
      next: data => {
        debugger;
      this.result = data;
      this.result = this.result.filter(
        (x: { id: any }) => x.id == Number(this.id)
      );
      this.name = this.result[0].name;
      this.code = this.result[0].code;
      this.remarks = this.result[0].remarks;
      }, error: (err) => {
        Swal.fire('Issue in GetBanks');
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

  Update() {
    debugger;
    var json = {
      ID: this.id,
      name: this.name,
      code: this.code,
      remarks: this.remarks,
    };

    this.DigipayrollserviceService.UpdateBanks(json)
    
    .subscribe({
      next: data => {
        debugger
        debugger;
      let result = data;
      Swal.fire('Update Sucessfully');
      location.href = '#/admin/Bank';
      }, error: (err) => {
        Swal.fire('Issue in UpdateBanks');
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
