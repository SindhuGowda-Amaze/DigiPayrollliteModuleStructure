import { Component, OnInit } from '@angular/core';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-exit-formality-form',
  templateUrl: './exit-formality-form.component.html',
  styleUrls: ['./exit-formality-form.component.css']
})

export class ExitFormalityFormComponent implements OnInit {

  constructor(public DigiofficeService: DigipayrollserviceService, public router: Router) { }
  stafflist: any;
  dropdownList: any = [];
  Type: any
  selectedItems: any = [];
  dropdownSettings: any = {};
  currentUrl: any;
  separationTypelist: any;
  StaffID: any;
  Notes: any;
  lastworkingdate: any;

  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.Type = "0";
    this.GetSeparationType();
    this.GetMyDetails();
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 10,
      allowSearchFilter: true,
    };
  }

  public GetMyDetails() {
    this.DigiofficeService.GetMyDetails()
      .subscribe({
        next: data => {
          debugger
          this.dropdownList = data;
        }, error: (err) => {
          Swal.fire('Issue in Getting My Details');
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

  onItemSelect(item: any) {
    debugger
    console.log(item);
    this.StaffID = item.id;
  }

  public GetSeparationType() {
    this.DigiofficeService.GetSeparationType()
      .subscribe({
        next: data => {
          debugger
          this.separationTypelist = data;
        }, error: (err) => {
          Swal.fire('Issue in Getting Separation Type');
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

  public save() {
    debugger
    var eb = {
      'StaffID': this.StaffID,
      'Notes': this.Notes,
      'lastworkingdate': this.lastworkingdate,
      'type1': this.Type
    }
    this.DigiofficeService.InsertStaffExitFormality(eb)
      .subscribe({
        next: data => {
          debugger
          Swal.fire('Saved successfully.');
          this.router.navigate(['/Exitformalityformdash']);
        }, error: (err) => {
          Swal.fire('Issue in Inserting Staff Exit Formality');
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

  public Cancel() {
    this.router.navigate(['/hr/ExitformalityDash']);
  }

}