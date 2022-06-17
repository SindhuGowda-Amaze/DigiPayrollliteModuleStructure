import { Component, OnInit } from '@angular/core';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-biralpha-list7',
  templateUrl: './biralpha-list7.component.html',
  styleUrls: ['./biralpha-list7.component.css']
})
export class BIRAlphaList7Component implements OnInit {

  constructor(public DigiofficeService: DigipayrollserviceService) { }
  showleaseforprint: any;
  stafflist: any;
  count1: any;
  uniquelist1: any;
  p: any;
  ngOnInit(): void {
    this.showleaseforprint = 0;
    this.showtable1 = 0;
    this.showtable2 = 0;
    this.DigiofficeService.GetMyDetails().subscribe(data => {
      debugger


      this.stafflist = data.filter(x => x.deniminimis != null);

      const key = "id"

      this.uniquelist1 = [...new Map(this.stafflist.map((item: { [x: string]: any; }) =>
        [(item[key]), item])).values()]
    });

  }
  showallbtn: any;
  selectALL(checked: boolean) { // pass true or false to check or uncheck all
    this.showallbtn = true;
    if (this.uniquelist1.every((val: { checked: boolean; }) => val.checked == true)) {
      this.uniquelist1.forEach((val: { checked: boolean; }) => { val.checked = false });

    }
    else {
      debugger
      this.uniquelist1.forEach((val: { checked: boolean; }) => { val.checked = true });

    }
    this.getallempdetails();
  }



  fileName = 'Alphalist7.0.xlsx';
  exportexcel(): void {
    /* table id is passed over here */
    let element = document.getElementById('download');
    debugger
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    debugger

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }

  uniquelist: any;
  employeelist: any;
  year: any;
  companylist: any;
  companyname: any;
  Address: any;
  grosssalary: any;
  yearlydeminims: any;
  yearsalary: any;
  yearlybasesalary: any;
  yeartax: any;
  totalsss: any;
  dob: any;
  dob1: any;
  dob2: any;
  dob3: any;
  dob4: any;
  dob5: any;
  dob6: any;
  dob7: any;
  dob8: any;
  year1: any;
  yearotamount: any;
  year01: any;
  year02: any;
  year03: any;
  year04: any;

  companyid: any;

  ss_er: any;
  numWords: any;
  amountInWords: any;
  Phone: any;
  email: any;
  zipcode: any;
  tin: any;
  empAddress: any;
  staffname: any;
  employeeaddress: any;
  SubDistrictPostcode: any;
  employeetin: any;
  tin1: any;
  tin2: any;
  tin3: any;
  tin4: any;
  tin5: any;
  tin6: any;
  tin7: any;
  tin8: any;
  tin9: any;
  tin10: any;
  tin11: any;
  tin12: any;
  previoussalary: any;
  previoustax: any;
  totalnontax: any;
  employeeshares: any;
  totalsalary: any;
  id: any;
  joiningdate: any;
  yearec: any;
  yearlybenefits: any;
  otherbenefits: any;
  totalnontaxable: any;
  previousphilhealth: any;
  previousthirteenth: any;
  previouscompensation: any;
  previousemployertin: any;
  previousaddress: any;
  previoussss: any;
  previouspagibig: any;
  previousemployeeshare: any;
  previousdeminims: any;
  totalpreviousnontax: any;
  totaltaxablesalary: any;
  previousstartdate: any;
  previousenddate: any;
  showonebtn: any;
  public getempdetails(id: any) {
    this.showonebtn = true
    this.totalnontax = 0;
    this.id = id
    this.DigiofficeService.GetEmployeeSalaryMonthly().subscribe(data => {
      debugger
      this.employeelist = data.filter(x => x.monthstaffid == id && String(x.emplyeeYear) == this.year);



      const key = 'monthstaffid'

      this.uniquelist = [...new Map(this.employeelist.map((item: { [x: string]: any; }) =>
        [(item[key]), item])).values()]
      this.SubDistrictPostcode = this.uniquelist[0].subDistrictPostcode,
        this.empAddress = this.uniquelist[0].addressLine1,
        this.grosssalary = this.uniquelist[0].yearGrossSal
      this.staffname = this.uniquelist[0].staffname
      this.yearsalary = this.uniquelist[0].yearsalary
      this.yearlybasesalary = this.uniquelist[0].yearlybasesalary
      this.yeartax = this.uniquelist[0].yeartax
      this.yearec = this.uniquelist[0].yearss_ec
      this.totalsss = this.uniquelist[0].yearSSSRate + this.uniquelist[0].yearPagibigRate + this.uniquelist[0].yearPhilihealth
      this.yearlydeminims = this.uniquelist[0].yearlydeminims
      this.employeeaddress = this.uniquelist[0].address
      this.employeetin = this.uniquelist[0].employeE_TIN
      this.joiningdate = this.uniquelist[0].joiningDate
      this.tin1 = this.employeetin.charAt(0)
      this.tin2 = this.employeetin.charAt(1)
      this.tin3 = this.employeetin.charAt(2)
      this.tin4 = this.employeetin.charAt(3)
      this.tin5 = this.employeetin.charAt(4)
      this.tin6 = this.employeetin.charAt(5)
      this.tin7 = this.employeetin.charAt(6)
      this.tin8 = this.employeetin.charAt(7)
      this.tin9 = this.employeetin.charAt(8)
      this.tin10 = this.employeetin.charAt(9)
      this.tin11 = this.employeetin.charAt(10)
      this.tin12 = this.employeetin.charAt(11)

      this.dob = this.uniquelist[0].birthday
      this.dob1 = this.dob.charAt(0)
      this.dob2 = this.dob.charAt(1)
      this.dob3 = this.dob.charAt(2)
      this.dob4 = this.dob.charAt(3)
      this.dob5 = this.dob.charAt(5)
      this.dob6 = this.dob.charAt(6)
      this.dob7 = this.dob.charAt(8)
      this.dob8 = this.dob.charAt(9)
      this.year1 = String(this.year)
      this.year01 = this.year1.charAt(0)
      this.year02 = this.year1.charAt(1)
      this.year03 = this.year1.charAt(2)
      this.year04 = this.year1.charAt(3)
      this.previoussalary = this.uniquelist[0].prevoussalary
      this.previoustax = this.uniquelist[0].previoustax,
        this.previousphilhealth = this.uniquelist[0].previousphilhealth,
        this.previousthirteenth = this.uniquelist[0].previousthirteenth,
        this.previouscompensation = this.uniquelist[0].previouscompensation,
        this.previousemployertin = this.uniquelist[0].previousemployertin,
        this.previousaddress = this.uniquelist[0].previousaddress,
        this.previoussss = this.uniquelist[0].previoussss,
        this.previousdeminims = this.uniquelist[0].previousdeminims,
        this.previouspagibig = this.uniquelist[0].previouspagibig,

        this.previousemployeeshare = parseFloat(this.previoussss) + parseFloat(this.previousphilhealth) + parseFloat(this.previouspagibig),
        this.totalpreviousnontax = parseFloat(this.previousemployeeshare) + parseFloat(this.uniquelist[0].previousthirteenth) + parseFloat(this.uniquelist[0].previousdeminims) + parseFloat(this.uniquelist[0].previouscompensation)
      this.totalnontax = this.yearlydeminims + this.totalsss
      this.yearotamount = this.uniquelist[0].yearotamount.toFixed(2)
      this.yearlybenefits = this.uniquelist[0].yearbenefits.toFixed(2);
      this.otherbenefits = parseFloat(this.yearotamount) + parseFloat(this.yearlybenefits);
      this.totalsalary = parseFloat(this.uniquelist[0].yearotamount) + parseFloat(this.uniquelist[0].yearbenefits);
      this.employeeshares = parseFloat(this.yearec) + (parseFloat(this.uniquelist[0].yearPagibigRate) / 2) + (parseFloat(this.uniquelist[0].yearPhilihealth) / 2)
      this.totalnontaxable = this.otherbenefits + this.employeeshares + this.yearlydeminims,
        this.totaltaxablesalary = this.previoussalary + this.yearsalary,
        this.previousstartdate = this.uniquelist[0].previousstartdate,
        this.previousenddate = this.uniquelist[0].previousenddate

    })

    this.DigiofficeService.GetCompanyAddressDetails().subscribe(data => {
      debugger
      this.companylist = data
      this.companyid = this.companylist[0].id,
        this.companyname = this.companylist[0].company_Name,
        this.Address = this.companylist[0].address1
      this.Phone = this.companylist[0].phone
      this.email = this.companylist[0].email
      this.zipcode = this.companylist[0].zipcode
      this.tin = this.companylist[0].tin



    })




  }
  showtable1: any;
  showtable2: any
  Showdata1() {
    debugger
    this.showtable1 = 1;
    this.showtable2 = 0;
  }

  Showdata2() {
    debugger
    this.showtable1 = 0;
    this.showtable2 = 1;
  }
  newarray: any = [];

  public getallempdetails() {
    this.totalnontax = 0;

    this.DigiofficeService.GetEmployeeSalaryMonthly().subscribe(data => {
      debugger
      this.employeelist = data.filter(x => String(x.emplyeeYear) == this.year);



      const key = 'monthstaffid'

      this.uniquelist = [...new Map(this.employeelist.map((item: { [x: string]: any; }) =>
        [(item[key]), item])).values()]

      for (let i = 0; i <= this.uniquelist.length; i++) {




        var obj = {

          'id': this.uniquelist[i].id,
          'SubDistrictPostcode': this.uniquelist[i].subDistrictPostcode,
          'empAddress': this.uniquelist[i].addressLine1,
          'grosssalary': this.uniquelist[i].yearGrossSal,
          'staffname': this.uniquelist[i].staffname,
          'yearsalary': this.uniquelist[i].yearsalary,
          'yearlybasesalary': this.uniquelist[i].yearlybasesalary,
          'yeartax': this.uniquelist[i].yeartax,
          'yearec': this.uniquelist[i].yearss_ec,
          'totalsss': this.uniquelist[i].yearSSSRate + this.uniquelist[i].yearPagibigRate + this.uniquelist[i].yearPhilihealth,
          'yearlydeminims': this.uniquelist[i].yearlydeminims,
          'employeeaddress': this.uniquelist[i].address,
          'employeetin': this.uniquelist[i].employeE_TIN,
          'joiningdate': this.uniquelist[i].joiningDate,
          'dob': this.uniquelist[i].birthday,
          'year1': String(this.year),

          'previoussalary': this.uniquelist[i].prevoussalary,
          'previoustax': this.uniquelist[i].previoustax,
          'previousphilhealth': this.uniquelist[i].previousphilhealth,
          'previousthirteenth': this.uniquelist[i].previousthirteenth,
          'previouscompensation': this.uniquelist[i].previouscompensation,
          'previousemployertin': this.uniquelist[i].previousemployertin,
          'previousaddress': this.uniquelist[i].previousaddress,
          'previoussss': this.uniquelist[i].previoussss,
          'previousdeminims': this.uniquelist[i].previousdeminims,
          'previouspagibig': this.uniquelist[i].previouspagibig,

          'previousemployeeshare': parseFloat(this.uniquelist[i].previoussss) + parseFloat(this.uniquelist[i].previousphilhealth) + parseFloat(this.uniquelist[i].previouspagibig),
          'totalpreviousnontax': parseFloat(this.previousemployeeshare) + parseFloat(this.uniquelist[i].previousthirteenth) + parseFloat(this.uniquelist[i].previousdeminims) + parseFloat(this.uniquelist[i].previouscompensation),
          'totalnontax': this.uniquelist[i].yearlydeminims + this.uniquelist[i].yearSSSRate + this.uniquelist[i].yearPagibigRate + this.uniquelist[i].yearPhilihealth,
          'yearotamount': this.uniquelist[i].yearotamount.toFixed(2),
          'yearlybenefits': this.uniquelist[i].yearbenefits.toFixed(2),
          'otherbenefits': parseFloat(this.uniquelist[i].yearotamount) + parseFloat(this.uniquelist[i].yearbenefits),
          'totalsalary': parseFloat(this.uniquelist[i].yearotamount) + parseFloat(this.uniquelist[i].yearbenefits),
          'employeeshares': parseFloat(this.uniquelist[i].yearss_ec) + (parseFloat(this.uniquelist[i].yearPagibigRate) / 2) + (parseFloat(this.uniquelist[i].yearPhilihealth) / 2),
          'totalnontaxable': parseFloat(this.uniquelist[i].yearotamount) + parseFloat(this.uniquelist[i].yearbenefits) + parseFloat(this.uniquelist[i].yearss_ec) + (parseFloat(this.uniquelist[i].yearPagibigRate) / 2) + (parseFloat(this.uniquelist[i].yearPhilihealth) / 2) + this.uniquelist[i].yearlydeminims ,
          'totaltaxablesalary':  this.uniquelist[i].prevoussalary + this.uniquelist[i].yearsalary,
          'previousstartdate': this.uniquelist[i].previousstartdate,
          'previousenddate': this.uniquelist[i].previousenddate
        }

        this.newarray.push(obj);

      }

    })

    this.DigiofficeService.GetCompanyAddressDetails().subscribe(data => {
      debugger
      this.companylist = data
      this.companyid = this.companylist[0].id,
        this.companyname = this.companylist[0].company_Name,
        this.Address = this.companylist[0].address1
      this.Phone = this.companylist[0].phone
      this.email = this.companylist[0].email
      this.zipcode = this.companylist[0].zipcode
      this.tin = this.companylist[0].tin



    })




  }
}