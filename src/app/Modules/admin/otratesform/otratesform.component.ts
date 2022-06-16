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

  result: any;
  id: any;

  constructor(private DigipayrollServiceService: DigipayrollserviceService, private ActivatedRoute:ActivatedRoute) { }

  day:any;
  normal:any;
  oT:any;
  nD:any;
  nDOT:any;

  ngOnInit(): void {
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
  this.DigipayrollServiceService.GetOTRates().subscribe(
    data => {
      debugger
      this.result = data;
      this.result=this.result.filter((x: {id: any;})=>x.id==Number(this.id));
      this.day=this.result[0].day;
      this.normal=this.result[0].normal;
      this.oT=this.result[0].ot;
      this.nD=this.result[0].nd;
      this.nDOT=this.result[0].ndot;
 
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
 
  this.DigipayrollServiceService.InsertOTRates(json).subscribe(
     data => {
     debugger
     let result = data;
    
     location.href="/admin/OtRates/";
     Swal.fire("Saved Sucessfully.....!");
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
   
    this.DigipayrollServiceService.UpdateOTRates(json).subscribe(
      data => {
      debugger
      let result = data;
      location.href="/admin/OtRates/";
      Swal.fire("Updated Sucessfully.....!");
    })
  }

}
