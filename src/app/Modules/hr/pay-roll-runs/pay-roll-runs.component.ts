import { Component, OnInit } from '@angular/core';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-pay-roll-runs',
  templateUrl: './pay-roll-runs.component.html',
  styleUrls: ['./pay-roll-runs.component.css']
})
export class PayRollRunsComponent implements OnInit {

  constructor(private DigipayrollServiceService: DigipayrollserviceService) { }
  loader:any;
  result: any;
  Company_logo: any;
  employeelist: any;
  uniquelist: any;
  p: any = 1;
  count1: any = 10;
  netMonthSalary:any;
  ngOnInit(): void {
    this.loader=true
    this.GetPayGroup();
    this.DigipayrollServiceService.GetEmployeeSalary().subscribe(data => {
      debugger
      this.employeelist = data;
      const key = 'startdate';

      this.uniquelist = [...new Map(this.employeelist.map((item: { [x: string]: any; }) =>
        [item[key], item])).values()];
      //  this.uniquelist = [...new Set(data.map(item => item))];
      this.loader=false
    });

    
  


  }

  employeelist1: any;
  uniquelist1: any;
  public getemployeelist(startdate: any, enddate: any, payrolltype: any) {
    this.payslipid = false
    this.startdate = startdate
    this.enddate = enddate
    this.DigipayrollServiceService.GetEmployeeSalary().subscribe(data => {
      debugger
      this.employeelist1 = data.filter(x => x.startdate == startdate && x.enddate == enddate && x.payrolltype == payrolltype);

      const key = 'id';
      this.uniquelist1 = [...new Map(this.employeelist.map((item: { [x: string]: any; }) =>
        [item[key], item])).values()];


    }


    )
  }


  playslipid: any
  selecallbtn: any;
  selectALL(checked: boolean) { // pass true or false to check or uncheck all
    this.selecallbtn = true;
    this.playslipid = true;
    if (this.employeelist1.every((val: { checked: boolean; }) => val.checked == true)) {
      this.employeelist1.forEach((val: { checked: boolean; }) => { val.checked = false });

    }
    else {
      debugger
      this.employeelist1.forEach((val: { checked: boolean; }) => { val.checked = true });

    }



    this.DigipayrollServiceService.GetEmployeeSalary().subscribe(data => {
      debugger
      this.showleaseforprint = 2

      this.employeelist2 = data.filter(x => x.startdate == this.startdate && x.enddate == this.enddate);
    }
    )

  }


  fullname: any;
  payrolldate: any;
  datecovered: any;
  department: any;
  role: any;
  tin: any;
  PhilHealth: any;
  SSS: any;
  hdmf: any;
  deminimisamount: any;
  BaseSalary: any;
  lopamount: any;
  sssamount: any;
  philHealthContribution: any;
  pagBig: any;
  tax: any;

  deductions: any;
  startdate: any;
  enddate: any;
  id: any;
  GrossSalary: any;
  deniminimis_amount: any;
  semimonthly: any;
  basicday: any;
  basichour: any;
  employeelist2: any;
  companyloan: any;
  ssssalaryloan: any;
  ssscalamity: any;
  hdmfcalamityloan: any;
  hdmfsalaryloan: any;
  benefits: any;
  payslipid: any;
  otamount: any;
  adjustment: any;
  loanpayout: any;
  public getpayslip(id: any, startdate: any, enddate: any) {
    this.DigipayrollServiceService.GetEmployeeSalary().subscribe(data => {
      debugger
      this.id = id;
      this.employeelist2 = data.filter(x => x.id == id && x.startdate == startdate && x.enddate == enddate);
      this.showleaseforprint == 1
      this.fullname = this.employeelist2[0].staffname + this.employeelist2[0].lastName,
        this.payrolldate = this.employeelist2[0].enddate,
        this.startdate = this.employeelist2[0].startdate;
      this.enddate = this.employeelist2[0].enddate,
        this.department = this.employeelist2[0].department_name,
        this.role = this.employeelist2[0].role,
        this.tin = this.employeelist2[0].tiNNo,
        this.SSS = this.employeelist2[0].ssSRate,
        this.PhilHealth = this.employeelist2[0].philiHealth,
        this.hdmf = this.employeelist2[0].pagiBigAccountNo,
        this.BaseSalary = this.employeelist2[0].baseSalary,
        this.deniminimis_amount = this.employeelist2[0].deniminimis_amount
      this.deminimisamount = this.employeelist2[0].deMINIMIS,
        this.lopamount = this.employeelist2[0].lopamount,
        this.sssamount = this.employeelist2[0].contribution,
        this.philHealthContribution = this.employeelist2[0].philHealthContribution,
        this.pagBig = this.employeelist2[0].pagBig,
        this.tax = this.employeelist2[0].tax,
        this.netMonthSalary = this.employeelist2[0].netMonthSalary,

        this.GrossSalary = this.employeelist2[0].grossSalary,
        this.semimonthly = this.employeelist2[0].monthlysalaryperperiod
      this.deductions = (this.employeelist2[0].pagBig + this.employeelist2[0].philiHealth + this.employeelist2[0].contribution + this.employeelist2[0].tax),
        this.basicday = (this.GrossSalary / 31).toFixed(2);
      this.basichour = (this.basicday / 8).toFixed(2);
      this.ssssalaryloan = this.employeelist2[0].ssssalaryloan,
        this.ssscalamity = this.employeelist2[0].ssscalamity,
        this.hdmfcalamityloan = this.employeelist2[0].hdmfcalamityloan,
        this.hdmfsalaryloan = this.employeelist2[0].hdmfsalaryloan,
        this.companyloan = this.employeelist2[0].companyloan
      this.lopamount = this.employeelist2[0].lopamount,
        this.benefits = this.employeelist2[0].benefits,
        this.otamount = (this.employeelist2[0].otamount).toFixed(2)
      this.adjustment = this.employeelist2[0].semiadjustment
      this.loanpayout = this.employeelist2[0].loanpayout



    }
    )
    this.showleaseforprint = 1
  }




  public GetPayGroup() {
    debugger
    this.DigipayrollServiceService.GetPayGroup().subscribe(
      data => {
        debugger
        this.result = data;
      })
  }

  fileName = 'Payroll Summery Reports.xlsx';
  exportexcel(): void {
    /* table id is passed over here */
    let element = document.getElementById('downloadaplication');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);

  }

  public convetToPDF1() {
    debugger

    var data: any = document.getElementById('downloadaplication');
    html2canvas(data).then(canvas => {

      var margin = 5;
      var imgWidth = 208
      // var pageHeight = 295 - 10 * margin;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;
      var doc = new jsPDF('p', 'mm');
      var position = 0;
      while (heightLeft > 0) {

        const contentDataURL = canvas.toDataURL('image/png')
        position = heightLeft - imgHeight;

        doc.addPage();


        doc.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);

        heightLeft -= pageHeight;

      }
      doc.deletePage(1)
      doc.save('Payslip.pdf');

      var pdf1 = doc.output('blob');
      var file = new File([pdf1], "Application.pdf");
      let body = new FormData();
      debugger
      body.append('Dan', file);
      console.log('pdf', pdf1)



    }).then(() => {

    });;
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
    this.DigipayrollServiceService.AttachmentsUpload(this.files).subscribe(res => {
      debugger
      this.Company_logo = res;
      alert("ATTACHMENT UPLOADED");
    })
  }



  showleaseforprint: any;
  public showpdf() {
    this.showleaseforprint = 1;
  }


}