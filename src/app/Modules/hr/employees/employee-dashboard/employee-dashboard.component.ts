import { Component, OnInit } from '@angular/core';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {

  constructor(public DigipayrollServiceService: DigipayrollserviceService, public router: Router) { }
  loader:any;
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
  ngOnInit(): void {
    debugger
    this.Department = "";
    this.RoleType = "";
    this.loader=true;
    this.DigipayrollServiceService.GetMyDetails().subscribe(data => {
      debugger
      this.stafflist = data;
      this.stafflistCopy = this.stafflist
      this.count = this.stafflist.length;
      this.loader=false;
    });

    this.DigipayrollServiceService.GetDepartment().subscribe(data => {
      debugger
      this.Departmentlist = data;
    });

    this.DigipayrollServiceService.GetRoleType().subscribe(data => {
      debugger
      this.RoleTypeList = data;
    });
  }

  public getRoleType(event: any) {
    debugger
    this.RoleType = event.target.value;
  }

  public FilterRoleType() {
    debugger
    this.DigipayrollServiceService.GetMyDetails().subscribe(data => {
      debugger
      this.stafflist = data.filter(x => x.roleType == this.RoleType);
      this.count = this.stafflist.length;
    });

  }

  public filterByDepartment() {
    debugger
    this.DigipayrollServiceService.GetMyDetails().subscribe(data => {
      debugger
      this.stafflist = data.filter(x => x.department == this.Department);
      this.count = this.stafflist.length;
    });

  }


  date: any;
  public getdate(event: any) {
    debugger
    this.date = event.target.value;
    this.DigipayrollServiceService.GetMyDetails().subscribe(data => {
      debugger
      this.stafflist = data.filter(x => x.filterdate == this.date);

    });
  }

  public Filterstaff() {
    debugger
    let searchCopy = this.term.toLowerCase();
    this.stafflist = this.stafflistCopy.filter((x: { name: string }) =>
      x.name.toLowerCase().includes(searchCopy));
    this.count = this.stafflist.length;
  }




  fromlogin: any;
  exceldata: any;
  arrayBuffer: any;
  filetype: any;
  file: any;

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
        this.DigipayrollServiceService.DeleteBuildingStaff(id).subscribe(data => {
          debugger
          Swal.fire('Deleted Successfully...!')
          location.href = "#/EmployeeDashboard";
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
        'DOB': this.exceldata[i].JoiningDate.slice(1, -1),
        'ResignationDate': this.exceldata[i].JoiningDate.slice(1, -1),
        "Date_Of_Marriage": this.exceldata[i].JoiningDate.slice(1, -1),

      };
      //apiarray.push(Enitity)
      debugger
      this.DigipayrollServiceService.InsertMyDetails(Enitity).subscribe(
        data => {
          debugger
          Swal.fire('Staffs added successfully');

        }, error => {
        }
      )
    }

  }

  public downloadzip(application: any) {
    debugger

    this.urls = [];
    this.DigipayrollServiceService.GetEmployeeDocuments().subscribe(data => {
      debugger
      let filearray: any = data.filter(x => x.staffId == application.id);
      //this.urls.push(filearray[0].lease_control_sheet);
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
    })

  }
  public urls: any = [];
  public createzip() {
  }



}