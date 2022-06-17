import { Component, OnInit } from '@angular/core';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-pay-group',
  templateUrl: './pay-group.component.html',
  styleUrls: ['./pay-group.component.css']
})
export class PayGroupComponent implements OnInit {
  SelectedData: any;
  id: any;
  result: any;
  currentUrl: any;
  constructor(private ActivatedRoute: ActivatedRoute, private DigipayrollserviceService: DigipayrollserviceService) { }

  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.GetPayGroup();
    this.ActivatedRoute.params.subscribe(params => {
      debugger
      this.id = params["id"];
      if (this.id != null && this.id != undefined) {
        this.GetPayGroup();
      }
    })
  }
  public GetPayGroup() {
    debugger
    this.DigipayrollserviceService.GetPayGroup()
    
    .subscribe({
      next: data => {
        debugger
        this.result = data;
      }, error: (err) => {
        Swal.fire('Issue in GetPayGroup');
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

  // public Ondelete(id: any) {
  //   this.DigipayrollserviceService.DeletePayGroup(id).subscribe(
  //     data => {
  //       debugger
  //       this.GetPayGroup();
  //       Swal.fire('Deleted');
  //     }
  //   )
  // }

  

  Ondelete(id:any) {
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
      this.DigipayrollserviceService.DeletePayGroup(id)
      
      .subscribe({
        next: data => {
          debugger
          Swal.fire('Deleted Successfully...!')   
          this.GetPayGroup();
        }, error: (err) => {
          Swal.fire('Issue in DeletePayGroup');
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

  GetId(id: any) {
    this.id = id
  }

  update() {
    debugger
    if (this.id== null || this.id==undefined) {
      Swal.fire('Please Select the Record to Modify');
      // location.href = "/PayGroup"
    }

    else {
      location.href = "#/admin/PayGroupForm/" + this.id;
    }
  }
}

