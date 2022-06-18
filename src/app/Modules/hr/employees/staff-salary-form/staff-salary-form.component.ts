import { Component, OnInit } from '@angular/core';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-staff-salary-form',
  templateUrl: './staff-salary-form.component.html',
  styleUrls: ['./staff-salary-form.component.css']
})

export class StaffSalaryFormComponent implements OnInit {

  constructor(public DigiofficeService: DigipayrollserviceService, public router: Router, private activatedroute: ActivatedRoute) { }
  EmployeeId: any;
  EmployeeName: any;
  FirstDoseDate: any;
  VaccinationName: any;
  SecondDoseDate: any;
  dropdownList: any = [];
  selectedItems: any = [];
  dropdownSettings: any = {};
  dropdownList1: any = [];
  selectedItems1: any = [];
  dropdownSettings1: any = {};
  RoleTypeList: any
  leavelist: any;
  dropdownList123: any;
  deniminimislist123: any;
  NewSalary: any;
  deniminimisamt: any;
  effectivedate: any;
  currentUrl: any;
  deniminimislist: any;
  Amount: any;
  BaseSal: any;
  deniminimis: any;
  deniminimis_amount: any;
  ID: any;
  RoleID: any
  public attachments211: any = [];
  public attachments1: any = [];
  public attachments21: any = [];
  public attachments: any = [];

  ngOnInit(): void {
    debugger
    this.currentUrl = window.location.href;
    this.RoleID = 0;
    this.deniminimis_amount = 0;
    this.deniminimis = '';
    this.ActivatedRouteCall();
    this.GetMyDetails();
    this.GetRoleType();
    this.GetDe_minimis_Master();
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 10,
      allowSearchFilter: true,
    };
    this.dropdownSettings1 = {
      singleSelection: false,
      idField: 'amount',
      textField: 'item',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 20,
      allowSearchFilter: true,
    };
  }

  public ActivatedRouteCall() {
    this.activatedroute.params.subscribe(params => {
      debugger;
      this.ID = params['id'];
      if (this.ID == undefined) {
        this.BaseSal = ""
      }
      else {
        this.DigiofficeService.GetMyDetails()
        .subscribe({
          next: data => {
            debugger
            this.leavelist = data.filter(x => x.id == this.ID);
            this.BaseSal = this.leavelist[0].baseSal,
              this.EmployeeId = this.ID;
            this.RoleID = this.leavelist[0].type
            this.deniminimis = this.leavelist[0].deniminimis.split(",");
            this.deniminimis_amount = this.leavelist[0].christmasBonus
            this.DigiofficeService.GetMyDetails()
            .subscribe({
              next: data => {
                debugger
                this.dropdownList123 = data.filter(x => x.id == this.ID);
              this.selectedItems = this.dropdownList123
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
            this.DigiofficeService.GetDe_minimis_Master()
            .subscribe({
              next: data => {
                debugger
                let temp1: any = data.filter(x => x.item != this.deniminimis[0]);
                this.deniminimislist123 = temp1;
                this.dropdownList1 = this.deniminimislist123
              }, error: (err) => {
                Swal.fire('Issue in Getting DeMinimis Master');
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
    }
    )
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

  public GetRoleType() {
    this.DigiofficeService.GetRoleType()
    .subscribe({
      next: data => {
        debugger
        this.RoleTypeList = data;
      }, error: (err) => {
        Swal.fire('Issue in Getting Role Type');
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

  public GetDe_minimis_Master() {
    this.DigiofficeService.GetDe_minimis_Master()
    .subscribe({
      next: data => {
        debugger
        this.dropdownList1 = data;
      }, error: (err) => {
        Swal.fire('Issue in Getting DeMinimis Master');
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
    this.EmployeeId = item.id;
    this.DigiofficeService.GetMyDetails()
    .subscribe({
      next: data => {
        debugger
        let temp: any = data.filter(x => x.id == this.EmployeeId);
        this.EmployeeName = temp[0].name;
        this.DigiofficeService.GetDeMinimisMapping()
        .subscribe({
          next: data => {
            debugger
            let temp1: any = data.filter(x => x.roleID == temp[0].roleType);
            this.deniminimislist = temp1[0].deMinimis;
            this.Amount = temp1[0].amount;
          }, error: (err) => {
            Swal.fire('Issue in Getting DeMinimis Mapping');
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
 
  onRemove21(event: any) {
    debugger
    console.log(event);
    this.attachments21.splice(this.attachments.indexOf(event), 1);
  }

  onSelect21(event: any) {
    debugger
    console.log(event);
    this.attachments21.push(...event.addedFiles);
  }
 
  onItemSelect1(item: any) {
    debugger
    console.log(item);
    this.deniminimis = '';
    this.attachments1.push(item);
    for (let i = 0; i < this.selectedItems1.length; i++) {
      this.deniminimisamt = parseFloat(this.deniminimis_amount) + parseFloat(this.selectedItems1[i].amount);
      this.deniminimis = this.deniminimis + this.selectedItems1[i].item + ','
    }
  }
  
  onRemove211(event: any) {
    debugger
    console.log(event);
    this.attachments211.splice(this.attachments1.indexOf(event), 1);
    this.deniminimis_amount = this.deniminimis_amount - event.amount;
  }

  onSelect211(event: any) {
    debugger
    console.log(event);
    this.attachments211.push(...event.addedFiles);
  }
  
  public Save() {
    debugger
    if (this.BaseSal == undefined) {
      Swal.fire('Please Enter Basic Salary')
    }
    else {
      var eb = {
        'ID': this.EmployeeId,
        'BaseSal': this.BaseSal,
        'deniminimis': 'test',
        'deniminimis_amount': this.deniminimis_amount
      }
      this.DigiofficeService.UpdateDe_minimis_Detailsforstaff(eb)
      .subscribe({
        next: data => {
          debugger
          Swal.fire('Saved Successfully.');
          this.router.navigate(['/Salarydetailsdash']);
        }, error: (err) => {
          Swal.fire('Issue in Updating DeMinimis Details For Staff');
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
  }

  public Update() {
    debugger
    var eb = {
      'ID': this.EmployeeId,
      'BaseSal': this.BaseSal,
      'deniminimis': 'Test',
      'deniminimis_amount': this.deniminimis_amount,
      'NewSalary': this.NewSalary,
      'effectivedate': this.effectivedate,
    }
    this.DigiofficeService.UpdateDe_minimis_Detailsforstaff(eb)
    .subscribe({
      next: data => {
        debugger
        Swal.fire('Updated Successfully.');
        this.router.navigate(['/Salarydetailsdash']);
      }, error: (err) => {
        Swal.fire('Issue in Updating DeMinimis Details For Staff');
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

  public cancel() {
    debugger
    this.router.navigate(['/hr/SalaryDetailsDash']);
  }
 
  public GetRoleID(event: any) {
    debugger
    this.RoleID = event.target.value;
    this.deniminimislist = '';
    this.Amount = '';
    this.selectedItems1 = [];
    this.DigiofficeService.GetMyDetails()
    .subscribe({
        next: data => {
          debugger
          this.dropdownList = data.filter(x => x.roleType == this.RoleID);
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

}