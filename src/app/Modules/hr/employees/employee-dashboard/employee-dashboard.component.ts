import { Component, OnInit } from '@angular/core';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';
import html2canvas from 'html2canvas';
import { DatePipe } from '@angular/common';
import { ExportToCsv } from 'export-to-csv';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
declare var JSZipUtils: any;
@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})

export class EmployeeDashboardComponent implements OnInit {

  constructor(public DigipayrollServiceService: DigipayrollserviceService, public router: Router, public datepipe: DatePipe) { }
  loader: any;
  stafflist: any;
  term: any;
  p: any = 1;
  count1: any = 10;
  stafflistCopy: any;
  Departmentlist: any;
  RoleTypeList: any;
  RoleType: any;
  Department: any;
  count: any;
  currentUrl: any;
  date: any;
  fromlogin: any;
  exceldata: any;
  arrayBuffer: any;
  filetype: any;
  file: any;
  public urls: any = [];

  ngOnInit(): void {
    debugger
    this.currentUrl = window.location.href;
    this.Department = "";
    this.RoleType = "";
    this.loader = true;
    this.GetMyDetails();
    this.GetDepartment();
  }

  public GetMyDetails() {
    this.DigipayrollServiceService.GetMyDetails()
      .subscribe({
        next: data => {
          debugger
          this.stafflist = data;
          this.stafflistCopy = this.stafflist
          this.count = this.stafflist.length;
          this.loader = false;
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

  public GetDepartment() {
    this.DigipayrollServiceService.GetDepartment()
      .subscribe({
        next: data => {
          debugger
          this.Departmentlist = data;
          this.loader = false;
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

  public GetRoleType() {
    this.DigipayrollServiceService.GetRoleType()
      .subscribe({
        next: data => {
          debugger
          this.RoleTypeList = data;
          this.loader = false;
        }, error: (err) => {
          Swal.fire('Issue in Getting Role Type');
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

  public FilterRoleType() {
    debugger
    this.DigipayrollServiceService.GetMyDetails()
      .subscribe({
        next: data => {
          debugger
          this.stafflist = data.filter(x => x.roleType == this.RoleType);
          this.count = this.stafflist.length;
          this.loader = false;
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

  public filterByDepartment() {
    debugger
    this.DigipayrollServiceService.GetMyDetails()
    .subscribe({
        next: data => {
          debugger
          this.stafflist = data.filter(x => x.department == this.Department);
          this.count = this.stafflist.length;
          this.loader = false;
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

  public getdate(event: any) {
    debugger
    this.date = event.target.value;
    this.DigipayrollServiceService.GetMyDetails()
    .subscribe({
        next: data => {
          debugger
          this.stafflist = data.filter(x => x.filterdate == this.date);
          this.loader = false;
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

  public Filterstaff() {
    debugger
    let searchCopy = this.term.toLowerCase();
    this.stafflist = this.stafflistCopy.filter((x: { name: string }) =>
      x.name.toLowerCase().includes(searchCopy));
    this.count = this.stafflist.length;
  }
 
  incomingfile(event: any) {
    debugger;
    this.file = event.target.files[0];
    let a = this.file.name;
    var characters = a.substr(a.length - 5);
    debugger;
    if (characters == ".xlsx" || characters == ".XLSX") {
      let fileReader = new FileReader();
      fileReader.onload = e => {
        debugger
        this.arrayBuffer = fileReader.result;
        var data = new Uint8Array(this.arrayBuffer);
        var arr = new Array();
        for (var i = 0; i != data.length; ++i)
          arr[i] = String.fromCharCode(data[i]);
        var bstr = arr.join("");
        var workbook = XLSX.read(bstr, { type: "binary" });
        var first_sheet_name = workbook.SheetNames[0];
        var worksheet = workbook.Sheets[first_sheet_name];
        console.log(XLSX.utils.sheet_to_json(worksheet, { raw: true }));
        this.exceldata = XLSX.utils.sheet_to_json(worksheet, { raw: true });
      };
      fileReader.readAsArrayBuffer(this.file);
    } else {
      Swal.fire("Imported file format not supported.");
    }
  }

  delete(id: any) {
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
        this.DigipayrollServiceService.DeleteBuildingStaff(id)
          .subscribe({
            next: data => {
              debugger
              Swal.fire('Deleted Successfully...!')
              location.href = "#/EmployeeDashboard";
            }, error: (err) => {
              Swal.fire('Issue in Deleting Building Staff');
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
    });
  }

  public Upload_file() {
    debugger
    let apiarray = [];
    for (let i = 0; i < this.exceldata.length; i++) {
      var Enitity =
      {
        'BuildingID': 56,
        'Name': this.exceldata[i].Name,
        'PhoneNo': this.exceldata[i].Mobile,
        'EmailID': this.exceldata[i].Personal_Email,
        'TypeID': this.exceldata[i].RoleType == " " ? null : this.exceldata[i].RoleType,
        'Address': this.exceldata[i].Address,
        'Supervisor': this.exceldata[i].Supervisor == " " ? null : this.exceldata[i].Supervisor,
        'JoiningDate': this.exceldata[i].JoiningDate.slice(1, -1),
        'Gender': this.exceldata[i].Gender,
        'DOB': this.exceldata[i].DOB.slice(1, -1),
        'ResignationDate': this.exceldata[i].JoiningDate.slice(1, -1),
        'Date_Of_Marriage': this.exceldata[i].JoiningDate.slice(1, -1) == " " ? "1990-01-01 00:00:00.000" : this.exceldata[i].JoiningDate.slice(1, -1),
        'PagiBig_ID': this.exceldata[i].PagiBig_ID,
        'PagiBigAccountNo': this.exceldata[i].PagiBigAccountNo,
        'PagibigMembership': this.exceldata[i].PagibigMembership,
        'PagibigRemarks': this.exceldata[i].PagibigRemarks,
        'EMPLOYEE_TIN': this.exceldata[i].EMPLOYEE_TIN,
        'PHILHEALTH_NO': this.exceldata[i].PHILHEALTH_NO,
        'SSSNO': this.exceldata[i].SSSNO,
      };
      debugger
      this.DigipayrollServiceService.InsertMyDetails(Enitity)
        .subscribe({
          next: data => {
            debugger
            Swal.fire('Staffs added successfully');
            this.loader = false;
          }, error: (err) => {
            Swal.fire('Issue in Inserting My Details');
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

  public downloadzip(application: any) {
    debugger
    this.urls = [];
    this.DigipayrollServiceService.GetEmployeeDocuments()
      .subscribe({
        next: data => {
          debugger
          let filearray: any = data.filter(x => x.staffId == application.id);
        if (filearray[0].employee_Application_form != null) {
          this.urls.push(filearray[0].employee_Application_form);
        }
        if (filearray[0].offer_letter != null) {
          this.urls.push(filearray[0].offer_letter)
        }
        if (filearray[0].resume != null) {
          this.urls.push(filearray[0].resume)
        }
        if (filearray[0].certificates_From_Previous_Employer != null) {
          this.urls.push(filearray[0].certificates_From_Previous_Employer)
        }
        if (filearray[0].medical_Examination_Report != null) {
          this.urls.push(filearray[0].medical_Examination_Report)
        }
        if (filearray[0].birth_Certificates != null) {
          this.urls.push(filearray[0].birth_Certificates)
        }
        if (filearray[0].marriage_Certificates != null) {
          this.urls.push(filearray[0].marriage_Certificates)
        }
        if (filearray[0].sss_e1Form != null) {
          this.urls.push(filearray[0].sss_e1Form)
        }
        if (filearray[0].sss_loanvoucher != null) {
          this.urls.push(filearray[0].sss_loanvoucher)
        }
        if (filearray[0].hdmf_form != null) {
          this.urls.push(filearray[0].hdmf_form)
        }
        if (filearray[0].hdmf_loanvoucher != null) {
          this.urls.push(filearray[0].hdmf_loanvoucher)
        }
        if (filearray[0].phic_reg != null) {
          this.urls.push(filearray[0].phic_reg)
        }
        if (filearray[0].bir_form_1902 != null) {
          this.urls.push(filearray[0].bir_form_1902)
        }
        if (filearray[0].bir_form_2305 != null) {
          this.urls.push(filearray[0].bir_form_2305)
        }
        if (filearray[0].bir_form_2316 != null) {
          this.urls.push(filearray[0].bir_form_2316)
        }
        if (filearray[0].bir_form_1905 != null) {
          this.urls.push(filearray[0].bir_form_1905)
        }
        if (filearray[0].dependts_birth_certificates != null) {
          this.urls.push(filearray[0].dependts_birth_certificates)
        }
        if (filearray[0].attendance_sheet_dtr != null) {
          this.urls.push(filearray[0].attendance_sheet_dtr)
        }
        if (filearray[0].promotion_doc != null) {
          this.urls.push(filearray[0].promotion_doc)
        }
        if (filearray[0].incident_report != null) {
          this.urls.push(filearray[0].incident_report)
        }
        if (filearray[0].clearnce_form != null) {
          this.urls.push(filearray[0].clearnce_form)
        }
        if (filearray[0].resignation_form != null) {
          this.urls.push(filearray[0].resignation_form)
        }
        if (filearray[0].employee_201report != null) {
          this.urls.push(filearray[0].employee_201report)
        }
        this.createzip();
        }, error: (err) => {
          Swal.fire('Issue in Getting Employee Documents');
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
 
  public createzip() {
  }

  exportexcel() {
    debugger;
    var ExportData = [];
    for (let i = 0; i < this.stafflist.length; i++) {
      debugger;
      let singleData = {
        EMPLOYEEID: String,
        LASTNAME: String,
        FIRSTNAME: String,
        MIDDLENAME: String,
        DEPARTMENT: String,
        POSITION: String,
        REPORTINGTO: String,
        OLDHIRINGDATE: String,
        NEWHIRINGDATE: String,
        BIRTHDATE: Date,
        GENDER: String,
        STATUS: String,
        OFFICIALEMAILID: String,
        MONTHLYSALARY: String,
        SSSNUMBER: String,
        TINNUMBER: String,
        PHILHEALTHNUMBER: String,
        PAGIBIGNUMBER: String,
      }
      singleData.EMPLOYEEID = this.stafflist[i].employeeCode;
      singleData.LASTNAME = this.stafflist[i].last_Name;
      singleData.FIRSTNAME = this.stafflist[i].name;
      singleData.MIDDLENAME = this.stafflist[i].middle_Name;
      singleData.DEPARTMENT = this.stafflist[i].department_name;
      singleData.POSITION = this.stafflist[i].role;
      singleData.REPORTINGTO = this.stafflist[i].manager;
      singleData.OLDHIRINGDATE = this.stafflist[i].filterhirindate;
      singleData.NEWHIRINGDATE = this.stafflist[i].filterdate;
      singleData.BIRTHDATE = this.stafflist[i].dob;
      singleData.GENDER = this.stafflist[i].gender;
      singleData.STATUS = this.stafflist[i].status;
      singleData.OFFICIALEMAILID = this.stafflist[i].official_Email;
      singleData.MONTHLYSALARY = this.stafflist[i].baseSal;
      singleData.SSSNUMBER = this.stafflist[i].sssno;
      singleData.TINNUMBER = this.stafflist[i].employeE_TIN;
      singleData.PHILHEALTHNUMBER = this.stafflist[i].philhealtH_NO;
      singleData.PAGIBIGNUMBER = this.stafflist[i].pagiBigAccountNo;
      ExportData.push(singleData);
      debugger
    }
    const Export_to_excel_options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'PUREGO MASTER Data',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
      filename: 'PUREGO MASTER Data'
    };
    const csvExporter = new ExportToCsv(Export_to_excel_options);
    debugger
    csvExporter.generateCsv(ExportData);
  }

}