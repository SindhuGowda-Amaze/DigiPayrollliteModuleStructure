import { Component, OnInit } from '@angular/core';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-position-dash',
  templateUrl: './position-dash.component.html',
  styleUrls: ['./position-dash.component.css'],
})
export class PositionDashComponent implements OnInit {
  roletypeList: any;
  search: any;
  shiftmasterlist: any;
  currentUrl: any;

  constructor(public DigipayrollserviceService: DigipayrollserviceService) {}
  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.GetRoleType();
  }

  public GetRoleType() {
    debugger;
    this.DigipayrollserviceService.GetRoleType()
    
    .subscribe({
      next: data => {
        debugger
        this.roletypeList = data;
      }, error: (err) => {
        Swal.fire('Issue in GetRoleType');
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

  public delete(ID: any) {
    debugger;
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
      if (result.value == true) {
        this.DigipayrollserviceService.DeleteRoleType(ID)
        
        .subscribe({
          next: data => {
            debugger
            Swal.fire('Deleted Successfully');
            location.reload();
          }, error: (err) => {
            Swal.fire('Issue in DeleteRoleType');
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
}
