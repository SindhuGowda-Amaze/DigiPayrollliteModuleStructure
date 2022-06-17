import { Component, OnInit } from '@angular/core';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pay-group-form',
  templateUrl: './pay-group-form.component.html',
  styleUrls: ['./pay-group-form.component.css'],
})
export class PayGroupFormComponent implements OnInit {
  id: any;
  description: any;
  result: any;
  currentUrl: any;
  constructor(
    private DigipayrollserviceService: DigipayrollserviceService,
    private ActivatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.ActivatedRoute.params.subscribe((params) => {
      this.id = params['id'];
      if (this.id != undefined && this.id != null) {
        this.GetPayGroup();
      }
    });
  }

  OnSubmit() {
    debugger;
    if (this.description == undefined) {
      Swal.fire('Please Fill All The Mandatory Fields');
    } else {
      var json = {
        Description: this.description,
      };
      this.DigipayrollserviceService.InsertPayGroup(json)
      .subscribe({
        next: (data) => {
          debugger;
          let id = data;
          Swal.fire('Successfully saved!!');
          location.href = '#/admin/PayGroup';
        },
        error: (err) => {
          Swal.fire('Issue in InsertPayGroup');
          // Insert error in Db Here//
          var obj = {
            PageName: this.currentUrl,
            ErrorMessage: err.error.message,
          };
          this.DigipayrollserviceService.InsertExceptionLogs(obj).subscribe(
            (data) => {
              debugger;
            }
          );
        },
      });
    }
  }

  GetPayGroup() {
    this.DigipayrollserviceService.GetPayGroup()
    .subscribe({
      next: (data) => {
        debugger;
        this.result = data;
        this.result = this.result.filter(
          (x: { id: any }) => x.id == Number(this.id)
        );
        this.description = this.result[0].description;
      },
      error: (err) => {
        Swal.fire('Issue in GetPayGroup');
        // Insert error in Db Here//
        var obj = {
          PageName: this.currentUrl,
          ErrorMessage: err.error.message,
        };
        this.DigipayrollserviceService.InsertExceptionLogs(obj).subscribe(
          (data) => {
            debugger;
          }
        );
      },
    });
  }

  Update() {
    debugger;
    var json = {
      ID: this.id,
      description: this.description,
    };

    this.DigipayrollserviceService.UpdatePayGroup(json).subscribe({
      next: (data) => {
        debugger;
        let result = data;
        Swal.fire('Update Sucessfully');
        location.href = '#/admin/PayGroup';
      },
      error: (err) => {
        Swal.fire('Issue in UpdatePayGroup');
        // Insert error in Db Here//
        var obj = {
          PageName: this.currentUrl,
          ErrorMessage: err.error.message,
        };
        this.DigipayrollserviceService.InsertExceptionLogs(obj).subscribe(
          (data) => {
            debugger;
          }
        );
      },
    });
  }
}
