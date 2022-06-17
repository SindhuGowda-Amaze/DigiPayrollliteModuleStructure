import { Component, OnInit } from '@angular/core';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vaccine-form',
  templateUrl: './vaccine-form.component.html',
  styleUrls: ['./vaccine-form.component.css']
})
export class VaccineFormComponent implements OnInit {

  constructor(public DigipayrollServiceService: DigipayrollserviceService, public router: Router) { }
  EmployeeId: any;
  EmployeeName: any;
  FirstDoseDate: any;
  VaccinationName: any;
  SecondDoseDate: any;
  dropdownList: any = [];
  selectedItems: any = [];
  dropdownSettings: any = {};
  roledid: any;
  showpdf:any;
  ngOnInit(): void {
    debugger
    this.roledid = localStorage.getItem('roledid');
    
    this.DigipayrollServiceService.GetMyDetails().subscribe(data => {
      debugger
      this.dropdownList = data;
    })

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

  onItemSelect(item: any) {
    debugger
    console.log(item);
    this.EmployeeId = item.id;
    this.DigipayrollServiceService.GetMyDetails().subscribe(data => {
      debugger
      let temp: any = data.filter(x => x.id == this.EmployeeId);
      this.EmployeeName = temp[0].name;
    })
  }
  public attachments21: any = [];

  public attachments: any = [];
  onRemove21(event: any) {
    debugger
    console.log(event);
    this.attachments21.splice(this.attachments.indexOf(event), 1);
  }

  onSelect21(event: any) {
    debugger
    console.log(event);
    this.attachments21.push(...event.addedFiles);
    // this.attachments.push(abcd[0]);

  }

  public attachmentsurl: any = [];
  public Save() {
    debugger
    this.DigipayrollServiceService.ProjectAttachments(this.attachments21).subscribe(res => {
      debugger
      this.attachmentsurl.push(res);
      this.attachments.length = 0;

      this.InsertVaccineDetails();
      debugger
    })
  }
  BoosterName: any;
  BoosterDoseDate: any;
  public InsertVaccineDetails() {
    debugger
    if (this.FirstDoseDate == undefined || this.SecondDoseDate == undefined || this.EmployeeId == undefined) {
      Swal.fire('Please Fill All Fields');
    } else {
      var eb = {
        'EmployeeId': this.EmployeeId,
        'EmployeeName': this.EmployeeName,
        'VaccinationName': this.VaccinationName,
        'FirstDoseDate': this.FirstDoseDate,
        'SecondDoseDate': this.SecondDoseDate,
        'Certificate_url': this.attachmentsurl[0],
        'BoosterName': this.BoosterName,
        'BoosterDoseDate': this.BoosterDoseDate


      }
      this.DigipayrollServiceService.InsertEmployeeVaccinationDetails(eb).subscribe(

        data => {
          debugger
          Swal.fire('Saved Successfully.');
          if (this.roledid == 9) {
            location.href = "/Vaccinedashboard";
            this.router.navigate(['/Vaccinedashboard']);
        
          } else if (this.roledid == 2) {
            this.router.navigate(['/ManagerDashboard']);
            
          }
          else {
            this.router.navigate(['/Employeedashboard']);
            
          }

        },
      )
    }



  }

  public cancel() {
    debugger
    // if (this.roledid == 1) {
    //   this.router.navigate(['/hr/VaccineDashboard']);

    // } else if (this.roledid == 2) {
    //   this.router.navigate(['/manager/ManagerDashboard']);
    // }
    // else {
      this.router.navigate(['/hr/VaccineDashboard']);
  //   }

  }

}