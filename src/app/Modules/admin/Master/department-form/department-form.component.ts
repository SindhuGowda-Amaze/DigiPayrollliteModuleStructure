import { Component, OnInit } from '@angular/core';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-department-form',
  templateUrl: './department-form.component.html',
  styleUrls: ['./department-form.component.css']
})
export class DepartmentFormComponent implements OnInit {
  name:any;
  code:any;
  remarks:any;
  result:any;
  ID:any;
  currentUrl: any;
  constructor(private DigipayrollserviceService: DigipayrollserviceService,private ActivatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.ActivatedRoute.params.subscribe(params => {
      this.ID = params['id'];
      if (this.ID != undefined && this.ID != null) {
        this.GetDepartment();
      }
    })
  
   // this. GetDepartment() ;
  }
  OnSubmit(){
    debugger 
    if(this.name==undefined ||this.remarks==undefined || this.name=="" || this.remarks=="")
    {
      Swal.fire('Please Fill All The Mandatory Fields')
    }
    else{
      var json =
      {  
         "department_name": this.name,
        //  "code": this.code,
        //  "remarks":this.remarks   
        "department_Desc":this.remarks   
       };
       this.DigipayrollserviceService.InsertDepartment(json).subscribe(
         data => {
           debugger
           let ID = data;
       Swal.fire("Successfully saved!!")
         location.href="#/admin/Department"
         })
    }
  
  }

  GetDepartment() {
    this.DigipayrollserviceService.GetDepartment()
    
    .subscribe({
      next: data => {
        debugger
        this.result = data;
		this.result=this.result.filter((x: { id: any; })=>x.id==Number(this.ID));
		this.name=this.result[0].name;
		this.code=this.result[0].code;
    this.remarks=this.result[0].remarks;
      }, error: (err) => {
        Swal.fire('Issue in GetDepartment');
        // Insert error in Db Here//
        var obj = {
          'PageName': this.currentUrl,
          'ErrorMessage': err.error.message
        }
        this.DigipayrollserviceService.InsertExceptionLogs(obj).subscribe(
          data => {
            debugger
          },
        )}
    })
    
    
  
  }

  Update(){
    debugger
     var json = {
      'ID': this.ID,
      "name": this.name,
      "code": this.code,
      "remarks":this.remarks           
      };
    
      this.DigipayrollserviceService.UpdateDepartment(json)
      
      .subscribe({
        next: data => {
          debugger
          let result = data;
          Swal.fire("Update Sucessfully");
        location.href="/admin/Department";
        }, error: (err) => {
          Swal.fire('Issue in UpdateDepartment');
          // Insert error in Db Here//
          var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message
          }
          this.DigipayrollserviceService.InsertExceptionLogs(obj).subscribe(
            data => {
              debugger
            },
          )}
      })
      
    }
}
