import { Component, OnInit } from '@angular/core';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';
import Swal from 'sweetalert2';
import { DatePipe, formatDate } from '@angular/common';
@Component({
  selector: 'app-government',
  templateUrl: './government.component.html',
  styleUrls: ['./government.component.css']
})

export class GovernmentComponent implements OnInit {

  constructor(private DigipayrollServiceService: DigipayrollserviceService, private datePipe: DatePipe) { }
  govtlist: any;
  dropdownSettings: any = {};
  month: any
  type: any;
  p: any = 1;
  count1: any = 10;
  RoleType: any;
  count: any;
  Department: any;
  Departmentlist: any;
  RoleTypeList: any;
  loader: any;
  myDate: any;
  cutofflist: any;
  latestdate: any;
  govtattachment: any;
  Search: any;
  currentUrl: any;

  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.loader = true
    this.Type = "";
    this.RoleType = "";
    this.SBRORNumber = "";
    this.Amount = "";
    this.DatePaid = "";
    this.month = "";
    this.payrolltype = "";
    this.RoleType = "";
    this.Department = "";
    this.Department1 = "";
    this.Month = "";
    this.Year = "";
    this.staffId = sessionStorage.getItem('staffid')
    this.myDate = new Date();
    this.latestdate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
    debugger
    this.GetNewGovernmentRecords();
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'fullname',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    this.GetDepartment();
    this.GetPosition();
    this.GetRemittanceCutOffDate();
  }

  public GetPosition() {
    this.DigipayrollServiceService.GetPosition()
    .subscribe({
      next: data => {
        debugger
        this.RoleTypeList = data;
        this.loader=false;
      }, error: (err) => {
        Swal.fire('Issue in Getting Position');
        // Insert error in Db Here//
        var obj = {
          'PageName': this.currentUrl,
          'ErrorMessage': err.error.message
        }
        this.DigipayrollServiceService.InsertExceptionLogs(obj).subscribe(
          data => {
            debugger
          },
        )
      }
    })
  }

  public GetDepartment() {
    this.DigipayrollServiceService.GetDepartment()
    .subscribe({
      next: data => {
        debugger
        this.Departmentlist = data;
      }, error: (err) => {
        Swal.fire('Issue in Getting Department');
        // Insert error in Db Here//
        var obj = {
          'PageName': this.currentUrl,
          'ErrorMessage': err.error.message
        }
        this.DigipayrollServiceService.InsertExceptionLogs(obj).subscribe(
          data => {
            debugger
          },
        )
      }
    })
  }

  public GetRemittanceCutOffDate() {
    this.DigipayrollServiceService.GetRemittanceCutOffDate()
    .subscribe({
      next: data => {
        debugger
        this.cutofflist = data.filter(x => x.filterdate == this.latestdate);
      }, error: (err) => {
        Swal.fire('Issue in Getting Remittance Cutoff Date');
        // Insert error in Db Here//
        var obj = {
          'PageName': this.currentUrl,
          'ErrorMessage': err.error.message
        }
        this.DigipayrollServiceService.InsertExceptionLogs(obj).subscribe(
          data => {
            debugger
          },
        )
      }
    })
  }

  employeelist: any;
  staffID: any;
  merged: any;
  results: any;
  copygovtlist: any;
  name: any;

  public GetNewGovernmentRecords() {
    debugger
    this.DigipayrollServiceService.GetNewGovernmentRecords()
    .subscribe({
      next: data => {
        debugger
        this.govtlist = data;
      this.count = this.govtlist.length;
      this.DigipayrollServiceService.GetMyDetails()
      .subscribe({
        next: data => {
          debugger
          this.employeelist = data
        this.results = this.govtlist.map((val: { staffID: any; }) => {
          return Object.assign({}, val, this.employeelist.filter((v: { id: any; }) => v.id === val.staffID)[0]);
        });
          this.loader=false;
        }, error: (err) => {
          Swal.fire('Issue in Getting My Details');
          // Insert error in Db Here//
          var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message
          }
          this.DigipayrollServiceService.InsertExceptionLogs(obj).subscribe(
            data => {
              debugger
            },
          )
        }
      })
        this.loader=false;
      }, error: (err) => {
        Swal.fire('Issue in Getting New Government Records');
        // Insert error in Db Here//
        var obj = {
          'PageName': this.currentUrl,
          'ErrorMessage': err.error.message
        }
        this.DigipayrollServiceService.InsertExceptionLogs(obj).subscribe(
          data => {
            debugger
          },
        )
      }
    })
  }

  employeelist34: any;
  Department1: any;

  public changeDepartment() {
    this.DigipayrollServiceService.GetMyDetails()
    .subscribe({
      next: data => {
        debugger
        this.employeelist34 = data.filter(x => x.department == this.Department1)
        this.loader=false;
      }, error: (err) => {
        Swal.fire('Issue in Getting My Details');
        // Insert error in Db Here//
        var obj = {
          'PageName': this.currentUrl,
          'ErrorMessage': err.error.message
        }
        this.DigipayrollServiceService.InsertExceptionLogs(obj).subscribe(
          data => {
            debugger
          },
        )
      }
    })
  }

  public getRoleType(event: any) {
    debugger
    this.RoleType = event.target.value;
  }

  public FilterRoleType(event: any) {
    debugger
    this.RoleType = event.target.value;
    this.DigipayrollServiceService.GetNewGovernmentRecords()
    .subscribe({
      next: data => {
        debugger
        this.govtlist = data;
      this.count = this.govtlist.length;
      this.DigipayrollServiceService.GetMyDetails()
      .subscribe({
        next: data => {
          debugger
          this.employeelist34 = data
          this.results1 = this.govtlist.map((val: { staffID: any; }) => {
            return Object.assign({}, val, this.employeelist34.filter((v: { id: any; }) => v.id === val.staffID)[0]);
          });
          this.results = this.results1.filter((x: { type: any; }) => x.type == this.RoleType)
        }, error: (err) => {
          Swal.fire('Issue in Getting My Details');
          // Insert error in Db Here//
          var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message
          }
          this.DigipayrollServiceService.InsertExceptionLogs(obj).subscribe(
            data => {
              debugger
            },
          )
        }
      })
      }, error: (err) => {
        Swal.fire('Issue in Getting New Government Records');
        // Insert error in Db Here//
        var obj = {
          'PageName': this.currentUrl,
          'ErrorMessage': err.error.message
        }
        this.DigipayrollServiceService.InsertExceptionLogs(obj).subscribe(
          data => {
            debugger
          },
        )
      }
    })
  }

  department: any;
  results1: any;

  public filterByDepartment(event: any) {
    debugger
    this.department = event.target.value;
    this.DigipayrollServiceService.GetNewGovernmentRecords()
    .subscribe({
      next: data => {
        debugger
        this.govtlist = data;
        this.count = this.govtlist.length;
        this.DigipayrollServiceService.GetMyDetails()
        .subscribe({
          next: data => {
            debugger
            this.employeelist = data
          this.results1 = this.govtlist.map((val: { staffID: any; }) => {
            return Object.assign({}, val, this.employeelist.filter((v: { id: any; }) => v.id === val.staffID)[0]);
          });
          if (this.RoleType == "") {
            this.results = this.results1.filter((x: { department: any; }) => x.department == this.department)
          }
          else {
            this.results = this.results1.filter((x: { department: any; type: any; }) => x.department == this.department && x.type == this.RoleType)
          }
          }, error: (err) => {
            Swal.fire('Issue in Getting My Details');
            // Insert error in Db Here//
            var obj = {
              'PageName': this.currentUrl,
              'ErrorMessage': err.error.message
            }
            this.DigipayrollServiceService.InsertExceptionLogs(obj).subscribe(
              data => {
                debugger
              },
            )
          }
        })
      }, error: (err) => {
        Swal.fire('Issue in Getting New Government Records');
        // Insert error in Db Here//
        var obj = {
          'PageName': this.currentUrl,
          'ErrorMessage': err.error.message
        }
        this.DigipayrollServiceService.InsertExceptionLogs(obj).subscribe(
          data => {
            debugger
          },
        )
      }
    })
  }

  Employee: any

  onItemSelect(item: any) {
    debugger
    console.log(item);
    this.staffID1 = item.id
  }

  public GetOfferLetter(offer: any) {
    window.open(offer, "_blank")
  }

  staffID1: any;
  ssS_Number: any;
  ssS_DatePaid: any;
  sssLoan_Number: any;
  sssLoan_DatePaid: any;
  sssCalamityLoan_Number: any;
  sssCalamityLoan_DatePaid: any;
  philHealth_Number: any;
  philHealth_DatePaid: any;
  hdmF_Number: any;
  hdmF_DatePaid: any;
  hdmfLoan_Number: any;
  hdmfLoan_DatePaid: any;
  hdmpCalamityLoan_Number: any;
  hdmpCalamityLoan_DatePaid: any;
  payrolltype: any;
  Type: any
  SBRORNumber: any
  Amount: any;
  DatePaid: any;
  staffId: any;
  staffName: any;
  staffId1: any;

  save() {
    var json = {
      "type": this.Type,
      "sbrorNumber": this.SBRORNumber,
      "amount": this.Amount,
      "datePaid": this.DatePaid,
      "attachment": this.govtattachment,
      "staffId": this.staffID1,
      "month": this.month,
      "payrolltype": this.payrolltype
    };
    this.DigipayrollServiceService.InsertNewGovernmentRecords(json)
      .subscribe({
        next: data => {
          debugger
          let result = data;
          Swal.fire("Saved Sucessfully....!");
          this.Type = "";
          this.SBRORNumber = "";
          this.Amount = "";
          this.DatePaid = "";
          this.month = "";
          this.onRemove(this.files)
          this.GetNewGovernmentRecords();
        }, error: (err) => {
          Swal.fire('Issue in Inserting New Government Records');
          // Insert error in Db Here//
          var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message
          }
          this.DigipayrollServiceService.InsertExceptionLogs(obj).subscribe(
            data => {
              debugger
            },
          )
        }
      })
  }

  delete(id: any) {
    debugger;
    this.DigipayrollServiceService.DeleteNewGovernmentRecords(id)
      .subscribe({
        next: data => {
          debugger
          Swal.fire('Deleted Successfully...!')
        this.GetNewGovernmentRecords();
        }, error: (err) => {
          Swal.fire('Issue in Deleting New Government Records');
          // Insert error in Db Here//
          var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message
          }
          this.DigipayrollServiceService.InsertExceptionLogs(obj).subscribe(
            data => {
              debugger
            },
          )
        }
      })
  }

  files: File[] = [];

  onSelect(event: { addedFiles: any; }) {
    debugger
    console.log(event);
    this.files.push(event.addedFiles[0]);
    this.uploadattachments();
    console.log("content", this.files);
  }

  onRemove(event: any) {
    debugger
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  public uploadattachments() {
    debugger
    this.DigipayrollServiceService.AttachmentsUpload(this.files)
    .subscribe({
      next: data => {
        debugger
        this.govtattachment = data;
        alert("ATTACHMENT UPLOADED");
        this.loader=false;
      }, error: (err) => {
        Swal.fire('Issue in Attachments Upload');
        // Insert error in Db Here//
        var obj = {
          'PageName': this.currentUrl,
          'ErrorMessage': err.error.message
        }
        this.DigipayrollServiceService.InsertExceptionLogs(obj).subscribe(
          data => {
            debugger
          },
        )
      }
    })
  }

  Year: any;
  Month: any;

  public getyear() {
    debugger
    this.DigipayrollServiceService.GetNewGovernmentRecords()
    .subscribe({
      next: data => {
        debugger
        this.govtlist = data.filter((x: { year: any; }) => x.year == this.Year)
        this.count = this.govtlist.length;
        this.DigipayrollServiceService.GetMyDetails()
        .subscribe({
          next: data => {
            debugger
            this.employeelist = data
            this.results1 = this.govtlist.map((val: { staffID: any; }) => {
              return Object.assign({}, val, this.employeelist.filter((v: { id: any; }) => v.id === val.staffID)[0]);
            });
          }, error: (err) => {
            Swal.fire('Issue in Getting My Details');
            // Insert error in Db Here//
            var obj = {
              'PageName': this.currentUrl,
              'ErrorMessage': err.error.message
            }
            this.DigipayrollServiceService.InsertExceptionLogs(obj).subscribe(
              data => {
                debugger
              },
            )
          }
        })
      }, error: (err) => {
        Swal.fire('Issue in Getting New Government Records');
        // Insert error in Db Here//
        var obj = {
          'PageName': this.currentUrl,
          'ErrorMessage': err.error.message
        }
        this.DigipayrollServiceService.InsertExceptionLogs(obj).subscribe(
          data => {
            debugger
          },
        )
      }
    })
  }

  public getmonth() {
    debugger
    this.DigipayrollServiceService.GetNewGovernmentRecords()
    .subscribe({
      next: data => {
        debugger
        this.govtlist = data.filter(x => x.month == this.Month);
        this.count = this.govtlist.length;
        this.DigipayrollServiceService.GetMyDetails()
        .subscribe({
          next: data => {
            debugger
            this.employeelist = data
          this.results = this.govtlist.map((val: { staffID: any; }) => {
            return Object.assign({}, val, this.employeelist.filter((v: { id: any; }) => v.id === val.staffID)[0]);
          });
          }, error: (err) => {
            Swal.fire('Issue in Getting My Details');
            // Insert error in Db Here//
            var obj = {
              'PageName': this.currentUrl,
              'ErrorMessage': err.error.message
            }
            this.DigipayrollServiceService.InsertExceptionLogs(obj).subscribe(
              data => {
                debugger
              },
            )
          }
        })
      }, error: (err) => {
        Swal.fire('Issue in Getting New Government Records');
        // Insert error in Db Here//
        var obj = {
          'PageName': this.currentUrl,
          'ErrorMessage': err.error.message
        }
        this.DigipayrollServiceService.InsertExceptionLogs(obj).subscribe(
          data => {
            debugger
          },
        )
      }
    })
  }
}