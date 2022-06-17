import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';
import Swal from 'sweetalert2';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-contributioncertificate',
  templateUrl: './contributioncertificate.component.html',
  styleUrls: ['./contributioncertificate.component.css']
})
export class ContributioncertificateComponent implements OnInit {

  currentUrl: any;
  showsss: any;
  showPhilhealth: any;
  showPagibig: any;
  search: any;
  stafflist: any;
  term: any;
  value: any;
  staffid: any;
  employeelist: any;
  stafflist12: any;
  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();
  minDate = new Date();
  roleid: any;

  p: any = 1;
  count1: any = 10;
  uniquelist: any;


  year: any;
  month: any;
  sssrate: any;
  ss_ec: any;
  ss_er: any;
  startmonth: any;
  endmonth: any;
  startyear: any;
  endyear: any;
  myDate: any;
  companylist: any;
  companyname: any;
  Address: any;
  fullname: any;
  paginigec: any;
  dob: any;
  PhilHealthEC: any;
  joiningdate: any;
  PhilHealth: any;
  employeemonth: any;
  emplyeeYear: any;
  sssno: any;
  philhealthno: any;
  pagibigid: any;
  govtlist: any;
  results: any;
  receiptnumber: any;
  datepaid123: any;

  companyid: any;

  numWords: any;
  amountInWords: any;
  Phone: any;
  email: any;
  zipcode: any;
  tin: any;
  govtlist1: any;
  employeelist1: any;
  results1: any;
  pagidatepaid123: any;
  pagireceiptnumber: any;
  logo: any;
  SSN_No: any;
  HDMFNumber: any;
  govtlist2: any;
  employeelist2: any;
  results2: any;
  philreceiptnumber: any;
  phildatepaid123: any;
  compphil: any;
  showss: any;
  sign: any;
  department: any;
  signname: any;
  stafflist1: any;
  Signature: any;
  // sign:any;
  // department:any;
  // signname:any;
  // stafflist1:any;
  // Signature:any;
  title: any;
  title1: any;

  constructor(public DigiofficeService: DigipayrollserviceService, private datePipe: DatePipe) {
    this.minDate.setDate(this.minDate.getDate() - 1);
    this.myDate = new Date();
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsRangeValue = [this.bsValue, this.maxDate];
  }

  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.month = "";
    this.year = "";
    this.sign = "";
    this.showsss = 0;
    this.showPhilhealth = 0;
    this.showPagibig = 0;
    this.staffid = sessionStorage.getItem('staffid')
    this.roleid = sessionStorage.getItem('roledid');
    debugger

    this.DigiofficeService.GetCompanyAddressDetails().subscribe(data => {
      debugger
      this.companylist = data
      this.companyid = this.companylist[0].id,
        this.companyname = this.companylist[0].company_Name,
        this.Address = this.companylist[0].address1 + this.companylist[0].address2
      this.Phone = this.companylist[0].phone
      this.email = this.companylist[0].email
      this.zipcode = this.companylist[0].zipcode
      this.tin = this.companylist[0].tin
      this.logo = this.companylist[0].company_logo
      this.SSN_No = this.companylist[0].ssN_No
      this.HDMFNumber = this.companylist[0].hdmfNumber
      this.compphil = this.companylist[0].philHealthNumber



    })

    if (this.roleid == '6') {

      this.DigiofficeService.GetMyDetails().subscribe(data => {
        debugger
        this.stafflist = data.filter(x => x.deniminimis != null && x.id == this.staffid);

        const key = "id"

        this.uniquelist = [...new Map(this.stafflist.map((item: { [x: string]: any; }) =>
          [(item[key]), item])).values()]
      });



    }
    else {

      this.DigiofficeService.GetMyDetails().subscribe(data => {
        debugger
        this.stafflist = data.filter(x => x.deniminimis != null);

        const key = "id"

        this.uniquelist = [...new Map(this.stafflist.map((item: { [x: string]: any; }) =>
          [(item[key]), item])).values()]
      });




    }








  }
  enddate: any;
  public getdate(event: any) {
    debugger
    this.enddate = event.target.value;

  }
  orgovtlist: any;
  oremployeelist: any;
  orresults: any;
  uniqueorlist: any;
  public getorrecords() {

    if (this.roleid == '6') {
      this.DigiofficeService.GetNewGovernmentRecords()
        .subscribe(data => {
          debugger
          this.orgovtlist = data.filter(x => String(x.year) == this.year && String(x.month) == this.month && String(x.staffID) == this.staffid);


          this.DigiofficeService.GetEmployeeSalaryMonthly().subscribe(data => {
            debugger
            this.oremployeelist = data.filter(x => x.employeeMonth == this.month && x.emplyeeYear == this.year && x.monthstaffid == this.staffid);



            this.orresults = this.orgovtlist.map((val: { staffID: any; }) => {
              return Object.assign({}, val, this.oremployeelist.filter((v: { monthstaffid: any; }) => v.monthstaffid === val.staffID)[0]);




            });
            const key = "staffID"

            this.uniqueorlist = [...new Map(this.orresults.map((item: { [x: string]: any; }) =>
              [(item[key]), item])).values()]

            // this.uniqueorlist = this.orresults.filter((x: { lastName: null; })=>x.lastName!=null)
            this.datepaid123 = this.results[0].datePaid,
              this.receiptnumber = this.results[0].sbrorNumber,
              this.fullname = this.results[0].staffname + this.results[0].lastName
            this.sssrate = this.results[0].monthlySSSRate,
              this.ss_ec = this.results[0].monthlyss_ec,
              this.ss_er = this.results[0].monthlyss_er,
              this.employeemonth = this.results[0].employeeMonth,
              this.emplyeeYear = this.results[0].emplyeeYear,
              this.sssno = this.results[0].sssno




          });





        });


    }
    else {
      this.DigiofficeService.GetNewGovernmentRecords().subscribe(data => {
        debugger
        this.orgovtlist = data.filter(x => String(x.year) == this.year && String(x.month) == this.month);


        this.DigiofficeService.GetEmployeeSalaryMonthly().subscribe(data => {
          debugger
          this.oremployeelist = data.filter(x => x.employeeMonth == this.month && x.emplyeeYear == this.year);



          this.orresults = this.orgovtlist.map((val: { staffID: any; }) => {
            return Object.assign({}, val, this.oremployeelist.filter((v: { monthstaffid: any; }) => v.monthstaffid === val.staffID)[0]);




          });
          const key = "staffID"

          this.uniqueorlist = [...new Map(this.orresults.map((item: { [x: string]: any; }) =>
            [(item[key]), item])).values()]

          // this.uniqueorlist = this.orresults.filter((x: { lastName: null; })=>x.lastName!=null)
          this.datepaid123 = this.results[0].datePaid,
            this.receiptnumber = this.results[0].sbrorNumber,
            this.fullname = this.results[0].staffname + this.results[0].lastName
          this.sssrate = this.results[0].monthlySSSRate,
            this.ss_ec = this.results[0].monthlyss_ec,
            this.ss_er = this.results[0].monthlyss_er,
            this.employeemonth = this.results[0].employeeMonth,
            this.emplyeeYear = this.results[0].emplyeeYear,
            this.sssno = this.results[0].sssno




        });

      });
    }


  }

  id: any
  public getCheckbocdetails(evn: any) {
    this.id = evn.id


  }
  showphil: any;
  showpagibig1: any;
  public showpagibig() {

    this.getpagibig1();

  }


  public showssss() {
    this.getempdetails1();


  }


  public showphilhealth() {
    this.getphil1();

  }




  public getempdetails() {

    this.DigiofficeService.GetNewGovernmentRecords()
    .subscribe({
      next: data => {
        debugger
        this.govtlist = data.filter(x => String(x.year) == this.year && String(x.month) == this.month && x.staffID == this.id && x.ltype == 'SSS');


        this.DigiofficeService.GetEmployeeSalaryMonthly()
        .subscribe({
          next: data => {
            debugger
            this.employeelist = data.filter(x => x.monthstaffid == this.id && x.employeeMonth == this.month && x.emplyeeYear == this.year);



            this.results = this.govtlist.map((val: { staffID: any; }) => {
              return Object.assign({}, val, this.employeelist.filter((v: { monthstaffid: any; }) => v.monthstaffid === val.staffID)[0]);




            });
            if (this.results.length == 0) {
              Swal.fire('No Records Found')
            }
            else {
              const element1 = document.getElementById('myBtn');

              if (element1 !== null) {

                element1.click();

              }
            }
            this.datepaid123 = this.results[0].datePaid,
              this.receiptnumber = this.results[0].sbrorNumber,
              this.fullname = this.results[0].staffname + this.results[0].lastName
            this.sssrate = this.results[0].monthlySSSRate,
              this.ss_ec = this.results[0].monthlyss_ec,
              this.ss_er = this.results[0].monthlyss_er,
              this.employeemonth = this.results[0].employeeMonth,
              this.emplyeeYear = this.results[0].emplyeeYear,
              this.sssno = this.results[0].sssno

   
            }, error: (err) => {
              Swal.fire('Issue in Getting NewGovernmentRecords');
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
          Swal.fire('Issue in Getting EmployeeSalaryMonthly');
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


  public getempdetails1() {
    // this.getpagibig();
    // this.getphil();
    this.DigiofficeService.GetNewGovernmentRecords()
      .subscribe({
        next: data => {
          debugger
          this.govtlist = data.filter(x => String(x.year) == this.year && String(x.month) == this.month && x.staffID == this.staffid && x.ltype == 'SSS');


          this.DigiofficeService.GetEmployeeSalaryMonthly()

            .subscribe({
              next: data => {
                debugger
                this.employeelist = data.filter(x => x.monthstaffid == this.staffid && x.employeeMonth == this.month && x.emplyeeYear == this.year);



                this.results = this.govtlist.map((val: { staffID: any; }) => {
                  return Object.assign({}, val, this.employeelist.filter((v: { monthstaffid: any; }) => v.monthstaffid === val.staffID)[0]);




                });
                if (this.results.length == 0) {
                  Swal.fire('No Records Found')
                }
                else {
                  const element1 = document.getElementById('myBtn');

                  if (element1 !== null) {

                    element1.click();

                  }
                }
                this.datepaid123 = this.results[0].datePaid,
                  this.receiptnumber = this.results[0].sbrorNumber,
                  this.fullname = this.results[0].staffname + this.results[0].lastName
                this.sssrate = this.results[0].monthlySSSRate,
                  this.ss_ec = this.results[0].monthlyss_ec,
                  this.ss_er = this.results[0].monthlyss_er,
                  this.employeemonth = this.results[0].employeeMonth,
                  this.emplyeeYear = this.results[0].emplyeeYear,
                  this.sssno = this.results[0].sssno

              }, error: (err) => {
                Swal.fire('Issue in Getting EmployeeSalaryMonthly');
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
          Swal.fire('Issue in Getting NewGovernmentRecords');
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

  public getphil1() {
    this.DigiofficeService.GetNewGovernmentRecords()
      .subscribe({
        next: data => {
          debugger
          this.govtlist1 = data.filter(x => String(x.year) == this.year && String(x.month) == this.month && x.staffID == this.staffid && x.ltype == 'PhilHealth');


          this.DigiofficeService.GetEmployeeSalaryMonthly()
            .subscribe({
              next: data => {
                debugger
                this.employeelist1 = data.filter(x => x.monthstaffid == this.staffid && x.employeeMonth == this.month && x.emplyeeYear == this.year);



                this.results1 = this.govtlist1.map((val: { staffID: any; }) => {
                  return Object.assign({}, val, this.employeelist1.filter((v: { monthstaffid: any; }) => v.monthstaffid === val.staffID)[0]);




                });
                if (this.results1.length == 0) {
                  Swal.fire('No Records Found')
                }
                else {
                  const element1 = document.getElementById('myBtn2');

                  if (element1 !== null) {

                    element1.click();

                  }
                }
                this.phildatepaid123 = this.results1[0].datePaid,
                  this.philreceiptnumber = this.results1[0].sbrorNumber,
                  this.fullname = this.results1[0].staffname + this.results1[0].lastName

                this.employeemonth = this.results1[0].employeeMonth,
                  this.emplyeeYear = this.results1[0].emplyeeYear,
                  this.philhealthno = this.results1[0].philhealtH_NO,
                  this.PhilHealth = this.results1[0].monthlyPhilihealth,
                  this.PhilHealthEC = this.results1[0].monthlyPhilihealth / 2,
                  this.myDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
                this.dob = this.results1[0].dob,
                  this.joiningdate = this.results1[0].joiningDate

                // this.pagidatepaid123 = this.results1[0].datePaid,
                // this.pagireceiptnumber=this.results1[0].sbrorNumber,
                // this.fullname = this.results1[0].staffname + this.results[0].lastName

                // this.employeemonth = this.results1[0].employeeMonth,
                // this.emplyeeYear = this.results1[0].emplyeeYear,
                // this.philhealthno = this.results1[0].pHILHEALTH_NO,
                // this.pagibigid = this.results1[0].pagiBig_ID,

                //  this.paginigec = this.results1[0].monthlyPagibigRate/2,
                //   this.myDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
                //   this.dob = this.results1[0].dob,
                //   this.joiningdate = this.results1[0].joiningDate


              }, error: (err) => {
                Swal.fire('Issue in Getting EmployeeSalaryMonthly');
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
          Swal.fire('Issue in Getting NewGovernmentRecords');
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





  public getpagibig1() {
    this.DigiofficeService.GetNewGovernmentRecords()
      .subscribe(data => {
        debugger
        this.govtlist2 = data.filter(x => String(x.year) == this.year && String(x.month) == this.month && x.staffID == this.staffid && x.ltype == 'HDMF');


        this.DigiofficeService.GetEmployeeSalaryMonthly().subscribe(data => {
          debugger
          this.employeelist2 = data.filter(x => x.monthstaffid == this.staffid && x.employeeMonth == this.month && x.emplyeeYear == this.year);



          this.results2 = this.govtlist2.map((val: { staffID: any; }) => {
            return Object.assign({}, val, this.employeelist2.filter((v: { monthstaffid: any; }) => v.monthstaffid === val.staffID)[0]);




          });
          if (this.results2.length == 0) {
            Swal.fire('No Records Found')
          }
          else {
            const element1 = document.getElementById('myBtn1');

            if (element1 !== null) {

              element1.click();

            }
          }
          this.pagidatepaid123 = this.results2[0].datePaid,
            this.pagireceiptnumber = this.results2[0].sbrorNumber,
            this.fullname = this.results2[0].staffname + this.results[0].lastName

          this.employeemonth = this.results2[0].employeeMonth,
            this.emplyeeYear = this.results2[0].emplyeeYear,
            this.philhealthno = this.results2[0].pHILHEALTH_NO,
            this.pagibigid = this.results2[0].pagiBig_ID,

            this.paginigec = this.results2[0].monthlyPagibigRate / 2,
            this.myDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
          this.dob = this.results2[0].dob,
            this.joiningdate = this.results2[0].joiningDate








        });

      });

  }


  public getphil() {
    this.DigiofficeService.GetNewGovernmentRecords()
      .subscribe({
        next: data => {
          debugger
          this.govtlist1 = data.filter(x => String(x.year) == this.year && String(x.month) == this.month && x.staffID == this.id && x.ltype == 'PhilHealth');


          this.DigiofficeService.GetEmployeeSalaryMonthly()
            .subscribe({
              next: data => {
                debugger
                this.employeelist1 = data.filter(x => x.monthstaffid == this.id && x.employeeMonth == this.month && x.emplyeeYear == this.year);



                this.results1 = this.govtlist1.map((val: { staffID: any; }) => {
                  return Object.assign({}, val, this.employeelist1.filter((v: { monthstaffid: any; }) => v.monthstaffid === val.staffID)[0]);




                });

                if (this.results1.length == 0) {
                  Swal.fire('No Records Found')
                }
                else {
                  const element1 = document.getElementById('myBtn2');

                  if (element1 !== null) {

                    element1.click();

                  }
                }
                this.phildatepaid123 = this.results1[0].datePaid,
                  this.philreceiptnumber = this.results1[0].sbrorNumber,
                  this.fullname = this.results1[0].staffname + this.results[0].lastName

                this.employeemonth = this.results1[0].employeeMonth,
                  this.emplyeeYear = this.results1[0].emplyeeYear,
                  this.philhealthno = this.results1[0].philhealtH_NO,
                  this.PhilHealth = this.results1[0].monthlyPhilihealth,
                  this.PhilHealthEC = this.results1[0].monthlyPhilihealth / 2,
                  this.myDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
                this.dob = this.results1[0].dob,
                  this.joiningdate = this.results1[0].joiningDate


              }, error: (err) => {
                Swal.fire('Issue in Getting EmployeeSalaryMonthly');
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
          Swal.fire('Issue in Getting NewGovernmentRecords');
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






  public getpagibig() {
    this.DigiofficeService.GetNewGovernmentRecords()
      .subscribe({
        next: data => {
          debugger
          this.govtlist2 = data.filter(x => String(x.year) == this.year && String(x.month) == this.month && x.staffID == this.id && x.ltype == 'HDMF');


          this.DigiofficeService.GetEmployeeSalaryMonthly()
            .subscribe({
              next: data => {
                debugger
                this.employeelist2 = data.filter(x => x.monthstaffid == this.id && x.employeeMonth == this.month && x.emplyeeYear == this.year);



                this.results2 = this.govtlist2.map((val: { staffID: any; }) => {
                  return Object.assign({}, val, this.employeelist2.filter((v: { monthstaffid: any; }) => v.monthstaffid === val.staffID)[0]);




                });
                if (this.results2.length == 0) {
                  Swal.fire('No Records Found')
                }
                else {
                  const element1 = document.getElementById('myBtn1');

                  if (element1 !== null) {

                    element1.click();

                  }
                }
                this.pagidatepaid123 = this.results2[0].datePaid,
                  this.pagireceiptnumber = this.results2[0].sbrorNumber,
                  this.fullname = this.results2[0].staffname + this.results2[0].lastName

                this.employeemonth = this.results2[0].employeeMonth,
                  this.emplyeeYear = this.results2[0].emplyeeYear,
                  this.philhealthno = this.results2[0].pHILHEALTH_NO,
                  this.pagibigid = this.results2[0].pagiBig_ID,

                  this.paginigec = this.results2[0].monthlyPagibigRate / 2,
                  this.myDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
                this.dob = this.results2[0].dob,
                  this.joiningdate = this.results2[0].joiningDate


              }, error: (err) => {
                Swal.fire('Issue in Getting EmployeeSalaryMonthly');
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
          Swal.fire('Issue in Getting NewGovernmentRecord');
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


  public getsign() {
    this.DigiofficeService.GetCompanyAddressDetails()

      .subscribe({
        next: data => {
          debugger
          this.stafflist1 = data;
          this.signname = this.stafflist1[0].hR_AuthorisedPerson;
          this.Signature = this.stafflist1[0].hR_AuthorisedPerson_Signature;
          this.title1 = this.stafflist1[0].hR_PositionTitle;
        }, error: (err) => {
          Swal.fire('Issue in Getting City Type');
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

  // public getsign(){
  //   this.DigiofficeService.GetMyDetails().subscribe(data => {
  //     debugger
  //     this.stafflist1 = data.filter(x => x.department_name == this.sign);
  //     this.signname = this.stafflist1[0].fullname
  //     this.Signature = this.stafflist1[0].signature
  //   });
  // }



  public showssspdf() {


    this.showsss = 1;
    this.showPhilhealth = 0;
    this.showPagibig = 0;
  }

  public showphilhealthpdf() {
    this.showPhilhealth = 1;
    this.showsss = 0;
    this.showPagibig = 0;
  }
  public showpagibigpdf() {
    this.showPagibig = 1;
    this.showPhilhealth = 0;
    this.showsss = 0;
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
      doc.save('CertificateOfContribution.pdf');

      var pdf1 = doc.output('blob');
      var file = new File([pdf1], "Application.pdf");
      let body = new FormData();
      debugger
      body.append('Dan', file);
      console.log('pdf', pdf1)



    }).then(() => {

    });;
  }


}
