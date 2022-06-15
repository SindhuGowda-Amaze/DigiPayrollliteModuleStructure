import { Component, OnInit } from '@angular/core';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-company-dashboard',
  templateUrl: './company-dashboard.component.html',
  styleUrls: ['./company-dashboard.component.css']
})
export class CompanyDashboardComponent implements OnInit {

  constructor(private ActivatedRoute: ActivatedRoute, private DigipayrollserviceService: DigipayrollserviceService) { }

  ngOnInit(): void {
    this.GetCompanyAddressDetails();
  }
  result: any;
  public GetCompanyAddressDetails() {
    debugger
    this.DigipayrollserviceService.GetCompanyAddressDetails().subscribe(
      data => {
        debugger
        this.result = data;
      })
  }


  public update(id: any) {
    debugger
    location.href = "#/admin/NewCompanyProfile/" + id;
  }

  delete(id:any) {
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
        this.DigipayrollserviceService.DeleteCompany_AddressDetails(id).subscribe(
          data => {
          
           location.reload() 
        })
        Swal.fire('Deleted Successfully...!')   
        location.href = "#/admin/CompanyDashboard";
      }
    });
  }
  }