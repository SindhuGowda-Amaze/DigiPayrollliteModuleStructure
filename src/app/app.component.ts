import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DigiPayrollLiteModuleStructure';

  company_name: any;
  temp:any
  ngOnInit() {
          // this.DigiofficeService.GetCompanyConfiguration().subscribe((data: any) => {

      //   this.CompanyConfiguration = data;
      //   let header = document.getElementById('dynamiccss') as HTMLElement;
      //   header.style.backgroundColor = this.CompanyConfiguration[0].headerColor;
      //   this.officelogo = this.CompanyConfiguration[0].companyLogo;
      //   let button = document.getElementsByTagName('button') as unknown as HTMLElement;
      //   button.style.backgroundColor = this.CompanyConfiguration[0].buttonColor;

      // })
    this.temp=localStorage.getItem('temp')
    this.company_name = localStorage.getItem("company_name");
  }
}
  
