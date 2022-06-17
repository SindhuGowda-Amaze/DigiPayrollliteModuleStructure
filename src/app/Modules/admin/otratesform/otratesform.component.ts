import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-otratesform',
  templateUrl: './otratesform.component.html',
  styleUrls: ['./otratesform.component.css']
})
export class OtratesformComponent implements OnInit {

  day:any;
  normal:any;
  oT:any;
  nD:any;
  nDOT:any;
  result: any;
  id: any;
  currentUrl: any;
  DigiofficeService: any;

  constructor(private DigipayrollServiceService: DigipayrollserviceService, private ActivatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.ActivatedRoute.params.subscribe(params=>{
      debugger
     this.id=params["id"];
     if(this.id!=null&&this.id!=undefined){
       this.GetOTRates();
     }
    })
  }
 
  GetOTRates()
  {
  this.DigipayrollServiceService.GetOTRates()
     .subscribe({
      next: data => {
        debugger
        this.result = data;
      this.result=this.result.filter((x: {id: any;})=>x.id==Number(this.id));
      this.day=this.result[0].day;
      this.normal=this.result[0].normal;
      this.oT=this.result[0].ot;
      this.nD=this.result[0].nd;
      this.nDOT=this.result[0].ndot;
      }, error: (err) => {
        Swal.fire('Issue in GetOTRates Type');
        // Insert error in Db Here//
        var obj = {
          'PageName': this.currentUrl,
          'ErrorMessage': err.error.message
        }
        this.DigiofficeService.InsertExceptionLogs(obj)
        .subscribe({
          next: (data: any) => {
            debugger
            this.result = data;
      this.result=this.result.filter((x: {id: any;})=>x.id==Number(this.id));
      this.day=this.result[0].day;
      this.normal=this.result[0].normal;
      this.oT=this.result[0].ot;
      this.nD=this.result[0].nd;
      this.nDOT=this.result[0].ndot;
          }, error: (err: { error: { message: any; }; }) => {
            Swal.fire('Issue in InsertExceptionLogs Type');
            // Insert error in Db Here//
            var obj = {
              'PageName': this.currentUrl,
              'ErrorMessage': err.error.message
            }
            this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
              () => {
                debugger
              },
            )
          }
        })
        
      }
    })

  }
     
  save(){
      var json = {
     
     "Day": this.day,
     "Normal": this.normal,
     "OT": this.oT,
     "ND": this.nD,
     "NDOT": this.nDOT,
 
  };
 
  this.DigipayrollServiceService.InsertOTRates(json)
  .subscribe({
    next: data => {
      debugger
      let result = data;
    
      location.href="/admin/OtRates/";
      Swal.fire("Saved Sucessfully.....!");
    }, error: (err) => {
      Swal.fire('Issue in InsertOTRates Type');
      // Insert error in Db Here//
      var obj = {
        'PageName': this.currentUrl,
        'ErrorMessage': err.error.message
      }
      this.DigiofficeService.InsertExceptionLogs(obj)
      .subscribe({
        next: (data: any) => {
          debugger
          this.result = data;
      this.result=this.result.filter((x: {id: any;})=>x.id==Number(this.id));
      this.day=this.result[0].day;
      this.normal=this.result[0].normal;
      this.oT=this.result[0].ot;
      this.nD=this.result[0].nd;
      this.nDOT=this.result[0].ndot;
        }, error: (err: { error: { message: any; }; }) => {
          Swal.fire('Issue in InsertExceptionLogs Type');
          // Insert error in Db Here//
          var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message
          }
          this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
            () => {
              debugger
            },
          )
        }
      })
  
    }
  }) 
 }
  Update(){
    debugger
    var json = {
      "ID":this.id,
      "Day": this.day,
      "Normal": this.normal,
      "ot": this.oT,
      "nd": this.nD,
      "ndot": this.nDOT,
    };
   
    this.DigipayrollServiceService.UpdateOTRates(json)
    .subscribe({
      next: data => {
        debugger
        this.result = data;
        this.result=this.result.filter((x: {id: any;})=>x.id==Number(this.id));
        this.day=this.result[0].day;
        this.normal=this.result[0].normal;
        this.oT=this.result[0].ot;
        this.nD=this.result[0].nd;
        this.nDOT=this.result[0].ndot;
      }, error: (err) => {
        Swal.fire('Issue in UpdateOTRates Type');
        // Insert error in Db Here//
        var obj = {
          'PageName': this.currentUrl,
          'ErrorMessage': err.error.message
        }
        this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
          () => {
            debugger
          },
        )
      }
    })
  }
}





