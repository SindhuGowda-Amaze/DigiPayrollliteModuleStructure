import { Component, OnInit } from '@angular/core';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css'],
})
export class DepartmentComponent implements OnInit {
  SelectedData: any;
  ID: any;
  result: any;
  currentUrl: any;

  constructor(
    private ActivatedRoute: ActivatedRoute,
    private DigipayrollserviceService: DigipayrollserviceService
  ) {}

  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.GetDepartment();
  }
  public GetDepartment() {
    debugger;
    this.DigipayrollserviceService.GetDepartment()
    .subscribe({
      next: data => {
        debugger
        this.result = data;
      }, error: (err) => {
        Swal.fire('Issue in GetDepartment');
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
    this.ID = id;
  }

  // public Ondelete(id:any) {
  //   this.DigipayrollserviceService.DeleteDepartment(id).subscribe(
  //     data => {
  //       debugger
  //       this.GetDepartment();
  //       Swal.fire('Deleted');
  //     }
  //   )
  // }

  Ondelete(id: any) {
    Swal.fire({
      title: 'Are You Sure ',
      text: 'Do you want to delete the Selected Record',
      icon: 'warning',
      // icon: 'success',
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'OK',
    }).then((result) => {
      if (result.isConfirmed) {
        debugger;
        this.DigipayrollserviceService.DeleteDepartment(id)
        
        .subscribe({
          next: data => {
            debugger
            Swal.fire('Deleted Successfully...!');
            this.GetDepartment();
          }, error: (err) => {
            Swal.fire('Issue in DeleteDepartment');
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

  update() {
    debugger;
    if (this.ID == null || this.ID == undefined) {
      Swal.fire('Please Select the Record to Modify');
      // location.href = "/PayGroup"
    } else {
      location.href = '#/admin/DepartmentForm/' + this.ID;
    }
  }
}
