import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DigipayrollserviceService {
  InsertExceptionLogs(obj: { PageName: any; ErrorMessage: any; }) {
    throw new Error('Method not implemented.');
  }

  public support = "https://support.amazeone.co/SupportAPI/";

  //public baseURL = "https://digipayroll.amazeone.co/digipayroll/";
  // public baseURL = "http://103.133.214.197/DigiPayroll/";;
  public baseURL = "https://DigiPayrolllite.amazeone.co/DigiPayrollliteapi";

  public host = "https://DigiPayrolllite.amazeone.co/DigiPayrollliteapi";
 //public host = "http://localhost:1807/";
 //public baseURL = "http://localhost:1807/";

  //public host = sessionStorage.getItem('digiofficeapiurl');
  //public host1 = "http://localhost:1807/";
  public host1 = "https://DigiPayrolllite.amazeone.co/DigiPayrollliteapi";
  url: any;
  constructor(private http: HttpClient) {



  }



  public AttachmentsUploadsss(files: any) {
    debugger
    let formdata: FormData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formdata.append('file_upload', files[i], files[i].name);
    }
    debugger
    let APIURL = this.support + "Announcement/ProjectAttachments/";
    return this.http.post(APIURL, formdata);
  }



  public ApproveAttendanceRegularisation(data: any) {
    debugger;
    this.url = this.host + '/Master/ApproveAttendanceRegularisation';
    return this.http.post(this.url, data);
  }

  public GetSupportTickets() {
    debugger
    let APIURL = this.support + "/Master/GetSupportTickets";
    return this.http.get<any[]>(APIURL);
  }

  public InsertSupportTickets(data: any) {

    debugger;

    this.url = this.support + '/Master/InsertSupportTickets';

    return this.http.post(this.url, data);

  }





  public Authenicate(data: any) {

    debugger;

    this.url = this.baseURL + '/Announcement/Authenicate';

    return this.http.post(this.url, data);

  }

  public GetPhilHealth() {
    debugger
    let APIURL = this.baseURL + "Master/GetPhilHealth";
    return this.http.get<any[]>(APIURL);
  }
  public GetCompanyID(CompanyID: any) {
    debugger
    let APIURL = this.host1 + "/MobileUser/GetCompanyID?CompanyID=" + CompanyID;
    return this.http.get<any[]>(APIURL);
  }

  public DeleteHolidays(ID: any) {
    return this.http.get<any[]>(
      this.host + "/Master/DeleteHolidays?ID=" + ID);
  }
  public GetNotification(UserID: any) {
    return this.http.get<any[]>(
      this.host + "/User/GetNotification?UserID=" + UserID
    );
  }

  public ClearNotificationByID(ID: any) {
    return this.http.get<any[]>(
      this.host + "/Announcement/ClearNotificationByID?ID=" + ID);
  }


  public GetStaffExitFormality() {
    return this.http.get<any[]>(
      this.host + "/Announcement/GetStaffExitFormality"
    );
  }


  public getIPAddress() {
    return this.http.get("https://api.ipify.org/?format=json");
  }


  public GetAnnouncementsByBuildingID(BuildingID: any) {
    return this.http.get<any[]>(
      this.host + "/MobileUser/GetAnnouncementsByBuildingID?BuildingID=" + BuildingID
    );
  }


  public GetEmployeeLoans() {
    return this.http.get<any[]>(
      this.host + "/Announcement/GetEmployeeLoans"
    );
  }

  public GetEmployeeVaccinationDetails() {
    return this.http.get<any[]>(
      this.host + "/Announcement/GetEmployeeVaccinationDetails"
    );
  }

  public DeleteEmployeeLoans(ID: any) {
    return this.http.get<any[]>(
      this.host + "/Announcement/DeleteEmployeeLoans?ID=" + ID);
  }

  public GetHolidays() {
    return this.http.get<any[]>(
      this.host + "/Building/GetHolidays"
    );
  }


  public InsertEmployeeLoans(data: any) {
    debugger;
    this.url = this.host + '/Announcement/InsertEmployeeLoans';
    return this.http.post(this.url, data);
  }
  public UpdateEmployeeLoans(data: any) {
    debugger;
    this.url = this.host + '/Announcement/UpdateEmployeeLoans';
    return this.http.post(this.url, data);
  }



  public GetAdjustment() {
    debugger
    let APIURL = this.baseURL + "Master/GetAdjustment";
    return this.http.get<any[]>(APIURL);
  }

  public GetTaxtableAnnual() {
    debugger
    let APIURL = this.baseURL + "Master/GetTaxtableAnnual";
    return this.http.get<any[]>(APIURL);
  }

  public InsertAdjustment(json: any) {
    let APIURL = this.baseURL + "Master/InsertAdjustment";
    return this.http.post<any[]>(APIURL, json);
  }

  public UpdateAdjustment(json: any) {
    debugger
    let APIURL = this.baseURL + "Master/UpdateAdjustment";
    return this.http.post<any[]>(APIURL, json);
  }



  public GetDe_minimis_Master() {
    return this.http.get<any[]>(
      this.host + "/Announcement/GetDe_minimis_Master"
    );
  }

  public DeleteDe_minimis_Master(ID: any) {
    return this.http.get<any[]>(
      this.host + "/Announcement/DeleteDe_minimis_Master?ID=" + ID);
  }

  public GetStaffOverTimeDetails() {
    return this.http.get<any[]>(
      this.host + "/Announcement/GetStaffOverTimeDetails"
    );
  }

  public InsertDe_minimis_Master(data: any) {
    debugger;
    this.url = this.host + '/Announcement/InsertDe_minimis_Master';
    return this.http.post(this.url, data);
  }
  public UpdateDe_minimis_Master(data: any) {
    debugger;
    this.url = this.host + '/Announcement/UpdateDe_minimis_Master';
    return this.http.post(this.url, data);
  }

  public InsertStaffOverTimeDetails(data: any) {
    debugger;
    this.url = this.host + '/Announcement/InsertStaffOverTimeDetails';
    return this.http.post(this.url, data);
  }


  public UpdateDe_minimis_Detailsforstaff(data: any) {
    debugger;
    this.url = this.host + '/Announcement/UpdateDe_minimis_Detailsforstaff';
    return this.http.post(this.url, data);
  }


  public InsertPhilHealth(json: any) {
    let APIURL = this.baseURL + "Master/InsertPhilHealth";
    return this.http.post<any[]>(APIURL, json);
  }

  // public UpdatePhilHealth(json : any) {   
  //   debugger
  //   let APIURL = this.baseURL + "Master/UpdatePhilHealth";
  //   return this.http.post<any[]>(APIURL,json);
  // }



  public GetAttendance() {
    return this.http.get<any[]>(
      this.host + "/MobileUser/GetAttendance?UserID=1&SDate=01-01-2020&EDate=01-01-2020"
    );
  }

  public GetLeaveType() {
    return this.http.get<any[]>(
      this.host + "/MasterDemo/GetLeaveType"

    );
  }

  public GetLeaveTypeforconfig() {
    return this.http.get<any[]>(
      this.host + "/Master/GetLeaveTypeforconfig"

    );
  }

  public GetOtConfiguration() {
    return this.http.get<any[]>(
      this.host + "/Master/GetOtConfiguration"

    );
  }




  public DeleteLeaveTypeMaster(ID: any) {
    return this.http.get<any[]>(
      this.host + "/ProjectRequest/DeleteLeaveTypeMaster?ID=" + ID);
  }



  public UpdateAttendanceWeb(data: any) {
    debugger;
    this.url = this.host + '/MobileUser/UpdateAttendanceWeb';
    return this.http.post(this.url, data);
  }

  public UpdateOtConfiguration(data: any) {
    debugger;
    this.url = this.host + '/Master/UpdateOtConfiguration';
    return this.http.post(this.url, data);
  }





  public InsertAttendanceWeb(data: any) {
    debugger;
    this.url = this.host + '/MobileUser/InsertAttendanceWeb';
    return this.http.post(this.url, data);
  }


  public UpdatePhilHealth(json: any) {
    debugger
    let APIURL = this.baseURL + "Master/UpdatePhilHealth";
    return this.http.post<any[]>(APIURL, json);
  }

  public DeletePhilHealth(ID: any) {
    debugger

    return this.http.get<any[]>(this.baseURL + "Master/DeletePhilHealth?ID=" + ID);
  }



  public GetExpensesListweb() {
    return this.http.get<any[]>(
      this.host + "/MobileUser/GetExpensesListweb?UserID=227&TypeID=2&SDate=01-01-2020&EDate=01-01-2025"
    );
  }


  public GetSSS() {
    debugger
    let APIURL = this.baseURL + "Master/GetSSS";
    return this.http.get<any[]>(APIURL);
  }

  public InsertSSS(json: any) {
    debugger
    let APIURL = this.baseURL + "Master/InsertSSS";
    return this.http.post<any[]>(APIURL, json);
  }

  public UpdateSSS(json: any) {
    debugger
    let APIURL = this.baseURL + "Master/UpdateBanks";
    return this.http.post<any[]>(APIURL, json);
  }

  public DeleteSSS(ID: any) {
    debugger

    return this.http.get<any[]>(this.baseURL + "Master/DeleteSSS?ID=" + ID);
  }


  public GetCompanyAdjustment() {
    debugger
    let APIURL = this.baseURL + "Master/GetCompanyAdjustment ";
    return this.http.get<any[]>(APIURL);
  }


  public GetRegularization() {
    debugger
    let APIURL = this.baseURL + "Master/GetRegularization";
    return this.http.get<any[]>(APIURL);
  }

  public GetMyWeeklyShift() {
    debugger
    let APIURL = this.baseURL + "Master/GetMyWeeklyShift";
    return this.http.get<any[]>(APIURL);
  }


  public GetMyDetails() {
    return this.http.get<any[]>(
      this.host + "/Announcement/GetMyDetails"
    );
  }

  
    public InsertSalaryAdjustmentType(data: any) {
      debugger;
      this.url = this.host + '/Master/InsertSalaryAdjustmentType';
      return this.http.post(this.url, data);
    }

  public InsertEmployeeVaccinationDetails(data: any) {
    debugger;
    this.url = this.host + '/Announcement/InsertEmployeeVaccinationDetails';
    return this.http.post(this.url, data);
  }




  public GetPositionDetails() {
    return this.http.get<any[]>(
      this.host + "/Master/GetPositionDetails"
    );
  }


  public GetSalaryAdjustmentType() {
    return this.http.get<any[]>(
      this.host + "/Master/GetSalaryAdjustmentType"
    );
  }


  public GetMyAddressDetails() {
    return this.http.get<any[]>(
      this.host + "/Master/GetMyAddressDetails"
    );
  }

  public GetDependentDetails() {
    return this.http.get<any[]>(
      this.host + "/Master/GetDependentDetails"
    );
  }

  public InsertLeaveTypeMaster(data: any) {
    debugger;
    this.url = this.host + '/ProjectRequest/InsertLeaveTypeMaster';
    return this.http.post(this.url, data);
  }

  public GetNomination() {
    return this.http.get<any[]>(
      this.host + "/Master/GetNomination"
    );
  }

  public UpdateLeaveType(data: any) {
    debugger;
    this.url = this.host + '/MobileUser/UpdateLeaveType';
    return this.http.post(this.url, data);
  }



  public GetEmploymentDetails() {
    return this.http.get<any[]>(
      this.host + "/Master/GetEmploymentDetails"
    );
  }

  public GetEducationDetails() {
    return this.http.get<any[]>(
      this.host + "/Master/GetEducationDetails"
    );
  }


  public GetBankDetails() {
    return this.http.get<any[]>(
      this.host + "/Master/GetBankDetails"
    );
  }


  public GetID_Details() {
    return this.http.get<any[]>(
      this.host + "/Master/GetID_Details"
    );
  }


  public GetVisaDetails() {
    return this.http.get<any[]>(
      this.host + "/Master/GetVisaDetails"
    );
  }

  public GetSalaryDetails() {
    return this.http.get<any[]>(
      this.host + "/Master/GetSalaryDetails"
    );
  }


  public GetUserDetails() {
    debugger
    let APIURL = this.baseURL + "Master/GetUserDetails";
    return this.http.get<any[]>(APIURL);
  }

  public InsertUserDetails(json: any) {
    let APIURL = this.baseURL + "Master/InsertUserDetails";
    return this.http.post<any[]>(APIURL, json);
  }

  public InsertCompanyAdjustment(json: any) {
    let APIURL = this.baseURL + "Master/InsertCompanyAdjustment";
    return this.http.post<any[]>(APIURL, json);
  }

  public UpdateCompanyAdjustment(json: any) {
    debugger
    let APIURL = this.baseURL + "Master/UpdateCompanyAdjustment";
    return this.http.post<any[]>(APIURL, json);
  }

  public DeleteCompanyAdjustment(ID: any) {
    debugger
    let APIURL = this.baseURL + "Master/DeleteCompanyAdjustment";
    return this.http.get<any[]>(this.baseURL + "Master/DeleteCompanyAdjustment?ID=" + ID);
  }

  public GetOTRates() {
    debugger
    let APIURL = this.baseURL + "/Master/GetOTRates ";
    return this.http.get<any[]>(APIURL);
  }

  public InsertOTRates(json: any) {
    let APIURL = this.baseURL + "Master/InsertOTRates";
    return this.http.post<any[]>(APIURL, json);
  }

  public UpdateOTRates(json: any) {
    debugger
    let APIURL = this.baseURL + "Master/UpdateOTRates";
    return this.http.post<any[]>(APIURL, json);
  }

  public DeleteOTRates(ID: any) {
    debugger
    return this.http.get<any[]>(this.baseURL + "Master/DeleteOTRates?ID=" + ID);
  }


  public GetTaxtable() {
    debugger
    let APIURL = this.baseURL + "Master/GetTaxtable ";
    return this.http.get<any[]>(APIURL);
  }

  public UpdateTaxtable(json: any) {
    debugger
    let APIURL = this.baseURL + "Master/UpdateTaxtable";
    return this.http.post<any[]>(APIURL, json);
  }




  public GetCompanyProfile() {
    debugger
    let APIURL = this.baseURL + "Master/GetCompanyProfile";
    return this.http.get<any[]>(APIURL);
  }



  public InsertCompanyProfile(json: any) {
    debugger
    let APIURL = this.baseURL + "Master/InsertCompany_Profile";
    return this.http.post<any[]>(APIURL, json);
  }


  public UpdateCompanyProfile(json: any) {
    debugger
    let APIURL = this.baseURL + "Master/UpdateCompany_Profile";
    return this.http.post<any[]>(APIURL, json);
  }




  public GetMyAttendenceDetails() {
    debugger
    let APIURL = this.baseURL + "Master/GetMyAttendenceDetails";
    return this.http.get<any[]>(APIURL);
  }


  public GetMyOverTimeDetails() {
    debugger
    let APIURL = this.baseURL + "Master/GetMyOverTimeDetails";
    return this.http.get<any[]>(APIURL);
  }

  // public DeleteFoodSenseProject(json : any) {              MasterEntity 
  //   debugger
  //   let APIURL = this.baseURL + "Master/DeleteFoodSenseProject";
  //   return this.http.post<any[]>(APIURL,json);
  // }


  //   public DeleteCompanyProfile_id(id : any) {
  //   debugger
  //   let APIURL = this.baseURL + "Master/DeleteCompanyProfile?ID="+id;
  //   return this.http.get<any[]>(APIURL);
  // }
  public DeleteCompany_AddressDetails(id: any) {
    debugger
    let APIURL = this.baseURL + "Master/DeleteCompany_AddressDetails?ID=" + id;
    return this.http.get<any[]>(APIURL);
  }





  public GetCostCenter() {
    debugger
    let APIURL = this.baseURL + "Master/GetCostcenter";
    return this.http.get<any[]>(APIURL);
  }

  public InsertCostCenter(json: any) {
    debugger
    let APIURL = this.baseURL + "Master/InsertCostcenter";
    return this.http.post<any[]>(APIURL, json);
  }

  public UpdateCostCenter(json: any) {    //not yet done
    debugger
    let APIURL = this.baseURL + "Master/UpdateCostCenter";
    return this.http.post<any[]>(APIURL, json);
  }

  public DeleteCostCenter(id: any) {
    debugger
    let APIURL = this.baseURL + "Master/DeleteCostCenter?ID=" + id;
    return this.http.get<any[]>(APIURL);
  }

  public GetPayroll() {
    debugger
    let APIURL = this.baseURL + "Master/GetPayroll ";
    return this.http.get<any[]>(APIURL);
  }

  public InsertPayroll(json: any) {
    debugger
    let APIURL = this.baseURL + "Master/InsertPayroll";
    return this.http.post<any[]>(APIURL, json);
  }

  public UpdatePayroll(json: any) {
    debugger
    let APIURL = this.baseURL + "Master/UpdatePayroll";
    return this.http.post<any[]>(APIURL, json);
  }


  public UpdateExpencesApproveBySupervisor(data: any) {
    debugger;
    this.url = this.host + '/MobileUser/UpdateExpencesApproveBySupervisor';
    return this.http.post(this.url, data);
  }


  public UpdateExpencesReject(data: any) {
    debugger;
    this.url = this.host + '/MobileUser/UpdateExpencesReject';
    return this.http.post(this.url, data);
  }

  public GetProjectMasterList() {
    return this.http.get<any[]>(
      this.host + "/MobileUser/GetProjectMasterList"
    );
  }

  public GetExpensesMaster() {
    return this.http.get<any[]>(
      this.host + "/MobileUser/GetExpensesMaster"
    );
  }

  public GetCurrencyMaster() {
    return this.http.get<any[]>(
      this.host + "/MobileUser/GetCurrencyMaster"
    );
  }


  public GetSupervisor() {
    return this.http.get<any[]>(
      this.host + "/MobileUser/GetSupervisor?ID=0"
    );
  }

  public InsertExpensesWEB(data: any) {
    debugger;
    this.url = this.host + '/MobileUser/InsertExpensesWEB';
    return this.http.post(this.url, data);
  }







  public CancelExpenseRequest(ID: any) {
    return this.http.get<any[]>(
      this.host + "/MobileUser/CancelExpenseRequest?ID=" + ID);
  }




  public GetDepartment() {
    debugger
    let APIURL = this.host + "/Announcement/GetDepartmentMaster";
    return this.http.get<any[]>(APIURL);
  }

  public InsertDepartment(json: any) {
    debugger
    let APIURL = this.host + "/Announcement/InsertDepartmentMaster";
    return this.http.post<any[]>(APIURL, json);
  }

  public UpdateDepartment(json: any) {
    debugger
    let APIURL = this.baseURL + "Master/UpdateDepartment";
    return this.http.post<any[]>(APIURL, json);
  }




  public DeleteDepartment(id: any) {
    debugger
    let APIURL = this.host + "/Announcement/DeleteDepartmentMaster?ID=" + id;
    return this.http.get<any[]>(APIURL);
  }

  public GetBanks() {
    debugger
    let APIURL = this.baseURL + "/Master/GetBanks";
    return this.http.get<any[]>(APIURL);
  }
  public DeleteUserDetails(id: any) {
    debugger
    let APIURL = this.baseURL + "Master/DeleteUserDetails?ID=" + id;
    return this.http.get<any[]>(APIURL);
  }

  public DeletePayroll(id: any) {
    debugger
    let APIURL = this.baseURL + "Master/DeletePayroll";
    return this.http.get<any[]>(this.baseURL + "Master/DeletePayroll?ID=" + id);
  }

  public InsertBanks(json: any) {
    debugger
    let APIURL = this.baseURL + "Master/InsertBanks";
    return this.http.post<any[]>(APIURL, json);
  }

  public UpdateBanks(json: any) {    //not yet done
    debugger
    let APIURL = this.baseURL + "Master/UpdateBanks";
    return this.http.post<any[]>(APIURL, json);
  }

  public DeleteBanks(id: any) {
    debugger
    let APIURL = this.baseURL + "Master/DeleteBanks?ID=" + id;
    return this.http.get<any[]>(APIURL);
  }

  public GetPayGroup() {
    debugger
    let APIURL = this.baseURL + "/Master/GetPayGroup";
    return this.http.get<any[]>(APIURL);
  }


  public InsertPayGroup(json: any) {
    debugger
    let APIURL = this.baseURL + "Master/InsertPayGroup";
    return this.http.post<any[]>(APIURL, json);
  }
  public UpdatePayGroup(json: any) {    //not yet done
    debugger
    let APIURL = this.baseURL + "Master/UpdatePayGroup";
    return this.http.post<any[]>(APIURL, json);
  }

  public InsertNotification(data: any) {
    debugger;
    this.url = this.host + '/User/InsertNotification';
    return this.http.post(this.url, data);
  }


  public DeletePayGroup(id: any) {
    debugger
    let APIURL = this.baseURL + "Master/DeletePayGroup?ID=" + id;
    return this.http.get<any[]>(APIURL);
  }


  public ApproveStaffLeavesNew(data: any) {
    debugger;
    this.url = this.host + '/Building/ApproveStaffLeavesNew';
    return this.http.post(this.url, data);
  }

  public ApproveStaffLeavesNewForHR(data: any) {
    debugger;
    this.url = this.host + '/Building/ApproveStaffLeavesNewForHR';
    return this.http.post(this.url, data);
  }


  public UpdateStaffLeaves(data: any) {
    debugger;
    this.url = this.host + '/Building/UpdateStaffLeaves';
    return this.http.post(this.url, data);
  }


  public GetMyLeaveReport() {
    debugger
    let APIURL = this.baseURL + "Master/GetMyLeaveReport";
    return this.http.get<any[]>(APIURL);
  }

  public GetLeaveBalance() {
    debugger
    let APIURL = this.baseURL + "Master/GetLeaveBalance";
    return this.http.get<any[]>(APIURL);
  }


  public AttachmentsUpload(files: any) {
    debugger
    let formdata: FormData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formdata.append('file_upload', files[i], files[i].name);
    }
    debugger
    let APIURL = this.baseURL + "/Announcement/ProjectAttachments/";
    return this.http.post(APIURL, formdata);

  }

  public InsertNomination(data: any) {
    debugger;
    this.url = this.host + '/Master/InsertNomination';
    return this.http.post(this.url, data);
  }

  public InsertMyAddressDetails(data: any) {
    debugger;
    this.url = this.host + '/Master/InsertMyAddressDetails';
    return this.http.post(this.url, data);
  }

  public InsertEmploymentDetails(data: any) {
    debugger;
    this.url = this.host + '/Master/InsertEmploymentDetails';
    return this.http.post(this.url, data);
  }

  public InsertEducationDetails(data: any) {
    debugger;
    this.url = this.host + '/Master/InsertEducationDetails';
    return this.http.post(this.url, data);
  }

  public InsertID_Details(data: any) {
    debugger;
    this.url = this.host + '/Master/InsertID_Details';
    return this.http.post(this.url, data);
  }

  public InsertBankDetails(data: any) {
    debugger;
    this.url = this.host + '/Master/InsertBankDetails';
    return this.http.post(this.url, data);
  }


  public InsertVisaDetails(data: any) {
    debugger;
    this.url = this.host + '/Master/InsertVisaDetails';
    return this.http.post(this.url, data);
  }



  public InsertStaffLeaves(data: any) {
    debugger;
    this.url = this.host + '/Building/InsertStaffLeaves';
    return this.http.post(this.url, data);
  }

  public ProjectAttachments(files: any) {
    let formdata: FormData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formdata.append('file_upload', files[i], files[i].name);
    }
    this.url = this.host + '/Announcement/ProjectAttachments';
    return this.http.post<any[]>(this.url, formdata);
  }

  public InsertSalaryDetails(data: any) {
    debugger;
    this.url = this.host + '/Master/InsertSalaryDetails';
    return this.http.post(this.url, data);
  }


  public InsertPositionDetails(data: any) {
    debugger;
    this.url = this.host + '/Master/InsertPositionDetails';
    return this.http.post(this.url, data);
  }


  public InsertDependentDetails(data: any) {
    debugger;
    this.url = this.host + '/Master/InsertDependentDetails';
    return this.http.post(this.url, data);
  }


  public UpdatePositionDetails(data: any) {
    debugger;
    this.url = this.host + '/Master/UpdatePositionDetails';
    return this.http.post(this.url, data);
  }

  public UpdateEmploymentDetails(data: any) {
    debugger;
    this.url = this.host + '/Master/UpdateEmploymentDetails';
    return this.http.post(this.url, data);
  }


  public UpdateEducationDetails(data: any) {
    debugger;
    this.url = this.host + '/Master/UpdateEducationDetails';
    return this.http.post(this.url, data);
  }


  public UpdateMyDetails(data: any) {
    debugger;
    this.url = this.host + '/Master/UpdateMyDetails';
    return this.http.post(this.url, data);
  }


  public UpdateSalaryDetails(data: any) {
    debugger;
    this.url = this.host + '/Master/UpdateSalaryDetails';
    return this.http.post(this.url, data);
  }


  public UpdateBankDetails(data: any) {
    debugger;
    this.url = this.host + '/Master/UpdateBankDetails';
    return this.http.post(this.url, data);
  }


  public UpdateVisaDetails(data: any) {
    debugger;
    this.url = this.host + '/Master/UpdateVisaDetails';
    return this.http.post(this.url, data);
  }


  public UpdateID_Details(data: any) {
    debugger;
    this.url = this.host + '/Master/UpdateID_Details';
    return this.http.post(this.url, data);
  }


  public UpdateNomination(data: any) {
    debugger;
    this.url = this.host + '/Master/UpdateNomination';
    return this.http.post(this.url, data);
  }

  public UpdateDependentDetails(data: any) {
    debugger;
    this.url = this.host + '/Master/UpdateDependentDetails';
    return this.http.post(this.url, data);
  }

  public UpdateMyAddressDetails(data: any) {
    debugger;
    this.url = this.host + '/Master/UpdateMyAddressDetails';
    return this.http.post(this.url, data);
  }
  public UpdateStaff(data: any) {
    debugger;
    this.url = this.host + '/Building/UpdateBuildingStaff';
    return this.http.post(this.url, data);
  }

  public InsertMyDetails(data: any) {
    debugger;
    this.url = this.host + '/Building/InsertBuildingStaff';
    return this.http.post(this.url, data);
  }

  public GetRoleType() {
    return this.http.get<any[]>(
      this.host + "/MasterDemo/GetRoleType?UserTypeID=" + 1
    );
  }

  public GetStaffShiftDetails() {
    return this.http.get<any[]>(
      this.host + "/Master/GetStaffShiftDetails"

    );
  }

  public GetStaffLeaves(ID: any, TypeID: any, Sdate: any, Edate: any) {
    return this.http.get<any[]>(
      this.host + "/Building/GetStaffLeaves?ID=" + ID + "&TypeID=" + TypeID + "&Sdate=" + Sdate + "&Edate=" + Edate
    );
  }

  public GetCancelledStaffLeaves(ID: any, TypeID: any, Sdate: any, Edate: any) {
    return this.http.get<any[]>(
      this.host + "/Master/GetCancelledStaffLeaves?ID=" + ID + "&TypeID=" + TypeID + "&Sdate=" + Sdate + "&Edate=" + Edate
    );
  }



  public CancelLeave(ID: any, NoOfDays: any, UserID: any, LeaveTypeID: any, Status: any) {
    debugger;
    return this.http.get<any[]>(
      this.host + "/MobileUser/CancelLeave?ID=" + ID + "&NoOfDays=" + NoOfDays + "&UserID=" + UserID + "&LeaveTypeID=" + LeaveTypeID + "&Status=" + Status
    );
  }

  public GetCountryType() {
    return this.http.get<any[]>(
      this.host + "/Building/GetCountryType"
    );
  }



  public DeleteStateType(ID: any) {
    return this.http.get<any[]>(
      this.host + "/Master/DeleteStateType?ID=" + ID);
  }



  public GetStateType() {
    return this.http.get<any[]>(
      this.host + "/Building/GetStateType?CountryID=" + 1
    );
  }


  public GetCityType() {
    return this.http.get<any[]>(
      this.host + "/Building/GetCityType?StateID=4"
    );
  }

  public UpdateCityType(data: any) {
    debugger;
    this.url = this.host + '/MobileUser/UpdateCityType';
    return this.http.post(this.url, data);
  }


  public UpdateCountryType(data: any) {
    debugger;
    this.url = this.host + '/MobileUser/UpdateCountryType';
    return this.http.post(this.url, data);
  }


  public UpdateStateType(data: any) {
    debugger;
    this.url = this.host + '/MobileUser/UpdateStateType';
    return this.http.post(this.url, data);
  }


  public InsertStateType(data: any) {
    debugger;
    this.url = this.host + '/MobileUser/InsertStateType';
    return this.http.post(this.url, data);
  }

  public InsertEmployeeBenfits(data: any) {
    debugger;
    this.url = this.host + '/Announcement/InsertEmployeeBenfits';
    return this.http.post(this.url, data);
  }


  public UpdateEmployeeBenfits(data: any) {
    debugger;
    this.url = this.host + '/Announcement/UpdateEmployeeBenfits';
    return this.http.post(this.url, data);
  }



  public InsertCityType(data: any) {
    debugger;
    this.url = this.host + '/MobileUser/InsertCityType';
    return this.http.post(this.url, data);
  }


  public InsertCountryType(data: any) {
    debugger;
    this.url = this.host + '/MobileUser/InsertCountryType';
    return this.http.post(this.url, data);
  }


  public DeleteCountryType(ID: any) {
    return this.http.get<any[]>(
      this.host + "/Master/DeleteCountryType?ID=" + ID);
  }


  public DeleteCityType(ID: any) {
    return this.http.get<any[]>(
      this.host + "/Master/DeleteCityType?ID=" + ID);
  }


  public GetCompanyDetails() {
    return this.http.get<any[]>(
      this.host + "/Building/GetCompanyDetails"
    );
  }


  public GetLoginTypeMaster() {
    debugger
    let APIURL = this.baseURL + "Master/GetLoginTypeMaster";
    return this.http.get<any[]>(APIURL);
  }

  public DeleteEmployeeSalary(ID: any) {
    return this.http.get<any[]>(
      this.host + "/Announcement/DeleteEmployeeSalary?ID=" + ID);
  }

  public GetStaffLeavesForPayrollByDate(startdate: any, enddate: any, StaffID: any) {
    debugger
    return this.http.get<any[]>(this.host + "/Announcement/GetStaffLeavesForPayrollByDate?startdate=" + startdate + "&enddate=" + enddate + "&StaffID=" + StaffID);
  }

  public Get_Employees_For_Payroll(startdate: any, enddate: any) {
    debugger
    return this.http.get<any[]>(this.host + "/Building/Get_Employees_For_Payroll?startdate=" + startdate + "&enddate=" + enddate);
  }



  public Get_Salary_Splitsfor15days(EmployeeID: any, LopdaysCount: any, startdate: any, enddate: any) {
    debugger
    return this.http.get<any[]>(this.host + "/Announcement/Get_Salary_Splitsfor15days?EmployeeID=" + EmployeeID + "&LopdaysCount=" + LopdaysCount + "&startdate=" + startdate + "&enddate=" + enddate);
  }

  public Get_Salary_Splits(EmployeeID: any, LopdaysCount: any, startdate: any, enddate: any) {
    debugger
    return this.http.get<any[]>(this.host + "/Announcement/Get_Salary_Splits?EmployeeID=" + EmployeeID + "&LopdaysCount=" + LopdaysCount + "&startdate=" + startdate + "&enddate=" + enddate);
  }

  public GetEmployeeSalary() {
    debugger
    return this.http.get<any[]>(
      this.host + "/Announcement/GetEmployeeSalary"
    );
  }


  public InsertStaffShiftDetails(data: any) {
    debugger;
    this.url = this.host + '/Master/InsertStaffShiftDetails';
    return this.http.post(this.url, data);
  }




  public GetEmployeeSalaryMonthly() {
    debugger
    return this.http.get<any[]>(
      this.host + "/Announcement/GetEmployeeSalaryMonthly"
    );
  }



  // public InsertGovernmentRecords(data: any) {
  //   debugger;
  //   this.url = this.baseURL + '/Master/InsertGovernmentRecords';
  //   return this.http.post(this.url, data);
  // }
  // public GetGovernmentRecords() {
  //   debugger
  //   let APIURL = this.baseURL + "/Master/GetGovernmentRecords";
  //   return this.http.get<any[]>(APIURL);
  // }

  // public DeleteGovernmentRecords(ID: any) {
  //   return this.http.get<any[]>(
  //     this.baseURL + "/Master/DeleteGovernmentRecords?ID=" + ID);
  // }

  public GetEmployeeBenfits() {
    return this.http.get<any[]>(
      this.host + "/Announcement/GetEmployeeBenfits"
    );
  }


  public DeleteEmployeeBenfitsDetails(ID: any) {
    return this.http.get<any[]>(
      this.host + "/Announcement/DeleteEmployeeBenfitsDetails?ID=" + ID);
  }


  public GetEmployeeBenfitsDetails() {
    return this.http.get<any[]>(
      this.host + "/Announcement/GetEmployeeBenfitsDetails"
    );
  }

  public InsertEmployeeBenfitsDetails(data: any) {
    debugger;
    this.url = this.host + '/Announcement/InsertEmployeeBenfitsDetails';
    return this.http.post(this.url, data);
  }


  public InsertNewGovernmentRecords(data: any) {
    debugger;
    this.url = this.baseURL + '/Master/InsertNewGovernmentRecords';
    return this.http.post(this.url, data);
  }
  public GetNewGovernmentRecords() {
    debugger
    let APIURL = this.baseURL + "/Master/GetNewGovernmentRecords";
    return this.http.get<any[]>(APIURL);
  }

  public DeleteNewGovernmentRecords(ID: any) {
    return this.http.get<any[]>(
      this.baseURL + "/Master/DeleteNewGovernmentRecords?ID=" + ID);
  }

  public UpdateEmployeeLoansByManager(data: any) {
    debugger;
    this.url = this.host + '/Announcement/UpdateEmployeeLoansByManager';
    return this.http.post(this.url, data);
  }

  public UpdateEmployeeLoansByHR(data: any) {
    debugger;
    this.url = this.host + '/Announcement/UpdateEmployeeLoansByHR';
    return this.http.post(this.url, data);
  }

  public UpdateEmployeeLoansByFinance(data: any) {
    debugger;
    this.url = this.host + '/Announcement/UpdateEmployeeLoansByFinance';
    return this.http.post(this.url, data);
  }

  public UpdateEmployeeLoansByPayroll(data: any) {
    debugger;
    this.url = this.host + '/Announcement/UpdateEmployeeLoansByPayroll';
    return this.http.post(this.url, data);
  }



  public GetShiftMaster() {
    return this.http.get<any[]>(
      this.host + "/Master/GetShiftMaster"

    );
  }

  public InsertShiftMaster(data: any) {
    debugger;
    this.url = this.host + '/Master/InsertShiftMaster';
    return this.http.post(this.url, data);
  }


  public UpdateShiftMaster(data: any) {
    debugger;
    this.url = this.host + '/MobileUser/UpdateShiftMaster';
    return this.http.post(this.url, data);
  }

  public UpdateStaffShift(data: any) {
    debugger;
    this.url = this.host + '/Announcement/UpdateStaffShift';
    return this.http.post(this.url, data);
  }

  public DeleteShiftMaster(data: any) {
    debugger;
    this.url = this.host + '/Master/DeleteShiftMaster';
    return this.http.post(this.url, data);
  }


  public GetOtNightOt(Sdate: any, Edate: any, Shift: any, StaffID: any, Date: any) {
    return this.http.get<any[]>(
      this.host + "/Announcement/GetOtNightOt?StartTime=" + Sdate + "&EndTime=" + Edate + "&Shift=" + Shift + "&StaffID=" + StaffID + "&Date=" + Date
    );
  }


  public GetHolidaybit(Date: any,StaffID: any) {
    return this.http.get<any[]>(
      this.host + "/Announcement/GetHolidaybit?Date=" + Date + "&StaffID=" + StaffID 
    );
  }


  public InsertLeaveEnCashment(data: any) {
    debugger;
    this.url = this.host + '/MobileUser/InsertLeaveEnCashment';
    return this.http.post(this.url, data);
  }

  public GetLeaveEnCashment() {
    debugger
    return this.http.get<any[]>(
      this.host + "/Master/GetLeaveEnCashment"
    );
  }

  public DeleteLeaveEncashment(ID: any) {
    return this.http.get<any[]>(
      this.host + "/Announcement/DeleteLeaveEncashment?ID=" + ID);
  }



  public DeleteStaffOverTimeDetails(ID: any) {
    return this.http.get<any[]>(
      this.host + "/Announcement/DeleteStaffOverTimeDetails?ID=" + ID);
  }


  public UpdateStaffOverTimeDetails(data: any) {
    debugger;
    this.url = this.host + '/Announcement/UpdateStaffOverTimeDetails';
    return this.http.post(this.url, data);
  }

  public GetEmployeeDocuments() {
    return this.http.get<any[]>(
      this.host + "/Announcement/GetEmployeeDocuments"
    );
  }


  public sendemail(body: any, Email: any, subject: any) {
    debugger
    return this.http.get<any[]>(this.host + "/MobileUser/SendMail?Body=" + body + "&Email=" + Email + "&subject=" + subject);
  }

  // public sendemail(data:any) {
  //   debugger;
  //   this.url = this.host + "/MobileUser/sendemail";
  //   return this.http.post(this.url, data);
  // }


  public DeleteEmployeeBenfits(ID: any) {
    return this.http.get<any[]>(
      this.host + "/Announcement/DeleteEmployeeBenfits?ID=" + ID);
  }


  public UpdateOtFromManager(data: any) {
    debugger;
    this.url = this.host + '/Announcement/UpdateOtFromManager';
    return this.http.post(this.url, data);
  }

  public InsertPayslip(data: any) {
    debugger;
    this.url = this.host + '/Master/InsertPayslip';
    return this.http.post(this.url, data);
  }


  public Get_PreliminaryReport(EmployeeID: any, LopdaysCount: any, startdate: any, enddate: any) {
    debugger
    return this.http.get<any[]>(this.host + "/Announcement/Get_PreliminaryReport?EmployeeID=" + EmployeeID + "&LopdaysCount=" + LopdaysCount + "&startdate=" + startdate + "&enddate=" + enddate);
  }


  public GetPreliminarySalary() {
    debugger
    return this.http.get<any[]>(
      this.host + "/Announcement/GetPreliminarySalary"
    );
  }


  public DeleteBuildingStaff(ID: any) {
    return this.http.get<any[]>(
      this.host + "/Building/DeleteBuildingStaff?ID=" + ID);
  }




  public InsertCompany_AddressDetails(json: any) {
    debugger
    let APIURL = this.baseURL + "Master/InsertCompany_AddressDetails";
    return this.http.post<any[]>(APIURL, json);
  }

  public UpdateCompanyAddressDetails(data: any) {
    debugger;
    this.url = this.baseURL + 'Master/UpdateCompanyAddressDetails';
    return this.http.post(this.url, data);
  }

  public InsertCompany_WorkPolicy(json: any) {
    debugger
    let APIURL = this.baseURL + "Master/InsertCompany_WorkPolicy";
    return this.http.post<any[]>(APIURL, json);
  }

  public UpdateCompanyWorkPolicy(data: any) {
    debugger;
    this.url = this.baseURL + 'Master/UpdateCompanyWorkPolicy';
    return this.http.post(this.url, data);
  }



  public InsertCompany_PayrollComputation(json: any) {
    debugger
    let APIURL = this.baseURL + "Master/InsertCompany_PayrollComputation";
    return this.http.post<any[]>(APIURL, json);
  }

  public UpdateCompanyPayrollComputation(data: any) {
    debugger;
    this.url = this.baseURL + 'Master/UpdateCompanyPayrollComputation';
    return this.http.post(this.url, data);
  }


  public InsertCompanyGovernmentComputation(json: any) {
    debugger
    let APIURL = this.baseURL + "Master/InsertCompanyGovernmentComputation";
    return this.http.post<any[]>(APIURL, json);
  }

  public UpdateCompanyGovtComputation(data: any) {
    debugger;
    this.url = this.baseURL + 'Master/UpdateCompanyGovtComputation';
    return this.http.post(this.url, data);
  }


  public InsertCompany_TaxComputation(json: any) {
    debugger
    let APIURL = this.baseURL + "Master/InsertCompany_TaxComputation";
    return this.http.post<any[]>(APIURL, json);
  }

  public UpdateCompany_TaxComputation(data: any) {
    debugger;
    this.url = this.baseURL + 'Master/UpdateCompany_TaxComputation';
    return this.http.post(this.url, data);
  }


  public GetCompanyAddressDetails() {
    debugger
    return this.http.get<any[]>(
      this.baseURL + "/Master/GetCompanyAddressDetails"
    );
  }

  public GetCompanyWorkPolicy() {
    debugger
    return this.http.get<any[]>(
      this.baseURL + "/Master/GetCompanyWorkPolicy"
    );
  }

  public GetCompanyTaxComputation() {
    debugger
    return this.http.get<any[]>(
      this.baseURL + "/Master/GetCompanyTaxComputation"
    );
  }

  public GetCompany_GovernmentComputation() {
    debugger
    return this.http.get<any[]>(
      this.baseURL + "/Master/GetCompany_GovernmentComputation"
    );
  }


  public GetCompany_PayrollComputation() {
    debugger
    return this.http.get<any[]>(
      this.baseURL + "/Master/GetCompany_PayrollComputation"
    );
  }

  public GetAttendanceConfiguration() {
    debugger
    let APIURL = this.host + "/Master/GetAttendanceConfiguration";
    return this.http.get<any[]>(APIURL);
  }

  public GetModifiedAttendance() {
    debugger
    let APIURL = this.host + "/Master/GetModifiedAttendance";
    return this.http.get<any[]>(APIURL);
  }


  public InsertAttendanceConfiguration(json: any) {
    debugger
    let APIURL = this.host + "/Master/InsertAttendanceConfiguration";
    return this.http.post<any[]>(APIURL, json);
  }


  // public InsertAttendanceConfiguration(data: any) {
  //   debugger;
  //   this.url = this.host + '/Master/InsertAttendanceConfiguration';
  //   return this.http.post(this.url, data);
  // }
  public UpdateAttendanceConfiguration(data: any) {
    debugger;
    this.url = this.host + '/Master/UpdateAttendanceConfiguration';
    return this.http.post(this.url, data);
  }



  public DeleteAttendanceConfiguration(ID: any) {
    return this.http.get<any[]>(
      this.host + "/Master/DeleteAttendanceConfiguration?ID=" + ID);
  }

  public UpdateHolidays(data: any) {
    debugger;
    this.url = this.host + '/MobileUser/UpdateHolidays';
    return this.http.post(this.url, data);
  }

  public InsertHolidays(data: any) {
    debugger;
    this.url = this.host + '/Building/InsertHolidays';
    return this.http.post(this.url, data);
  }
  public EnableDisableLeaveType(data: any) {
    debugger;
    this.url = this.host + '/Master/EnableDisableLeaveType';
    return this.http.post(this.url, data);
  }
  public UploadbulkAttendanceWeb(data: any) {
    debugger;
    this.url = this.host + '/Master/UploadbulkAttendanceWeb';
    return this.http.post(this.url, data);
  }

  public UploadbulkModifiedAttendanceWeb(data: any) {
    debugger;
    this.url = this.host + '/Master/UploadbulkModifiedAttendanceWeb';
    return this.http.post(this.url, data);
  }
  public StaffDeferredVLUpdate(data: any) {
    debugger;
    this.url = this.host + '/Master/StaffDeferredVLUpdate';
    return this.http.post(this.url, data);
  }

  public GetDeMinimisMapping() {
    debugger
    return this.http.get<any[]>(
      this.host + "/Announcement/GetDeMinimisMapping"
    );
  }

  public GetCompanyConfiguration() {
    return this.http.get<any[]>(
      this.host + "/Master/GetCompanyConfiguration"
    );
  }

  public DeleteCompanyConfiguration(ID: any) {
    return this.http.get<any[]>(
      this.host + "/Master/DeleteCompanyConfiguration?ID=" + ID);
  }
  public InsertCompanyConfiguration(data: any) {
    debugger;
    this.url = this.host + '/Master/InsertCompanyConfiguration';
    return this.http.post(this.url, data);
  }
  public UpdateCompanyConfiguration(data: any) {
    debugger;
    this.url = this.host + '/Master/UpdateCompanyConfiguration';
    return this.http.post(this.url, data);
  }
  public GetLeaveConfiguration() {
    return this.http.get<any[]>(
      this.host + "/Master/GetLeaveConfiguration"
    );
  }



  public DeleteLeaveConfiguration(ID: any) {
    return this.http.get<any[]>(
      this.host + "/Master/DeleteLeaveConfiguration?ID=" + ID);
  }


  public InsertLeaveConfiguration(data: any) {
    debugger;
    this.url = this.host + '/Master/InsertLeaveConfiguration';
    return this.http.post(this.url, data);
  }
  public UpdateLeaveConfiguration(data: any) {
    debugger;
    this.url = this.host + '/Announcement/UpdateLeaveConfiguration';
    return this.http.post(this.url, data);
  }


  public DeleteBarangayMaster(ID: any) {
    return this.http.get<any[]>(
      this.host + "/Master/DeleteLeaveConfiguration?ID=" + ID);
  }


  public InsertBarangayMaster(data: any) {
    debugger;
    this.url = this.host + '/Master/InsertBarangayMaster';
    return this.http.post(this.url, data);
  }
  public UpdateBarangayMaster(data: any) {
    debugger;
    this.url = this.host + '/Master/UpdateBarangayMaster';
    return this.http.post(this.url, data);
  }
  public GetBarangayMaster() {
    return this.http.get<any[]>(
      this.host + "/Master/GetBarangayMaster"
    );
  }



  public ApproveOtRequest(data: any) {
    debugger;
    this.url = this.host + '/Master/ApproveOtRequest';
    return this.http.post(this.url, data);
  }


  public GetLeaveBalanceDetails() {
    return this.http.get<any[]>(
      this.host + "/Master/GetLeaveBalanceDetails"
    );
  }

  public InsertLeaveBalanceDetails(data: any) {
    debugger;
    this.url = this.host + '/Master/InsertLeaveBalanceDetails';
    return this.http.post(this.url, data);
  }

  public Get_Salary_ThirteenMonth(EmployeeID: any, Year: any) {
    debugger
    return this.http.get<any[]>(this.host + "/Announcement/Get_Salary_ThirteenMonth?EmployeeID=" + EmployeeID + "&Year=" + Year);
  }


  public GetThirteenthMonthSalary() {
    debugger
    return this.http.get<any[]>(
      this.host + "/Announcement/GetThirteenthMonthSalary"
    );
  }

  public Get_FinalPayrollMonthly(EmployeeID: any,startdate: any, enddate: any) {
    debugger
    return this.http.get<any[]>(this.host + "/Announcement/Get_FinalPayrollMonthly?EmployeeID=" + EmployeeID + "&startdate=" + startdate + "&enddate=" + enddate);
  }

  public Get_Salary_For_Loans(EmployeeID: any) {
    debugger
    return this.http.get<any[]>(this.host + "/Announcement/Get_Salary_For_Loans?EmployeeID=" + EmployeeID);
  }


  public GetEmployeeFinalSalary() {
    debugger
    return this.http.get<any[]>(
      this.host + "/Announcement/GetEmployeeFinalSalary"
    );
  }

  public GetLoanConfiguration() {
    return this.http.get<any[]>(
      this.host + "/Master/GetLoanConfiguration"

    );
  }

  public GetLoanMaster() {
    return this.http.get<any[]>(
      this.host + "/Master/GetLoanMaster"

    );
  }

  public InsertLoanMaster(data: any) {
    debugger;
    this.url = this.host + '/Master/InsertLoanMaster';
    return this.http.post(this.url, data);
  }

  public UpdateLoanMaster(data: any) {
    debugger;
    this.url = this.host + '/Master/UpdateLoanMaster';
    return this.http.post(this.url, data);
  }


  public DeleteLoanMaster(ID: any) {
    return this.http.get<any[]>(
      this.host + "/Master/DeleteLoanMaster?ID=" + ID);
  }


  public InsertLoanConfiguration(data: any) {
    debugger;
    this.url = this.host + '/Master/InsertLoanConfiguration';
    return this.http.post(this.url, data);
  }
  public UpdateLoanConfiguration(data: any) {
    debugger;
    this.url = this.host + '/Master/UpdateLoanConfiguration';
    return this.http.post(this.url, data);
  }

  public Enable_Disable_Loans(data: any) {
    debugger;
    this.url = this.host + '/Master/Enable_Disable_Loans';
    return this.http.post(this.url, data);
  }



  public ProjectAttachmentsbyuserid(files: any, userid: any) {
    debugger
    let formdata: FormData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formdata.append('file_upload', files[i], files[i].name);
    }
    this.url = this.host + '/Master/ProjectAttachmentsbyuserid?userid=' + userid;
    return this.http.post<any[]>(this.url, formdata);
  }

  public GetOnBoardingChecklist() {
    return this.http.get<any[]>(
      this.host + "/Master/GetOnBoardingChecklist"

    );
  }

  public InsertOnBoardingChecklist(data: any) {
    debugger;
    this.url = this.host + '/Master/InsertOnBoardingChecklist';
    return this.http.post(this.url, data);
  }




  public DeleteOnBoardingChecklist(ID: any) {
    return this.http.get<any[]>(
      this.host + "/Master/DeleteOnBoardingChecklist?ID=" + ID);
  } public InsertEmployeeDocuments(data: any) {
    debugger;
    this.url = this.host + '/Announcement/InsertEmployeeDocuments';
    return this.http.post(this.url, data);
  }
  public GetProjectFolders() {
    return this.http.get<any[]>(
      this.host + "/Master/GetProjectFolders"

    );
  }
  public Delete_ProjectFolders(ID: any) {
    return this.http.get<any[]>(
      this.host + "/Announcement/Delete_ProjectFolders?ID=" + ID);
  }
  public InsertProjectFolders(data: any) {
    debugger;
    this.url = this.host + '/Master/InsertProjectFolders';
    return this.http.post(this.url, data);
  }
  public GetPolicies() {
    return this.http.get<any[]>(
      this.host + "/Building/GetPolicies"
    );
  }

  public DeletePolicies(ID: any) {
    return this.http.get<any[]>(
      this.host + "/Announcement/DeletePolicies?ID=" + ID);
  }

  public InsertPolicies(data: any) {
    debugger;
    this.url = this.host + '/Building/InsertPolicies';
    return this.http.post(this.url, data);
  }
  public InsertCompanyAssets(data: any) {
    debugger;
    this.url = this.host + '/Master/InsertCompanyAssets';
    return this.http.post(this.url, data);
  }

  public GetCompanyAssets() {
    return this.http.get<any[]>(
      this.host + "/Master/GetCompanyAssets"
    );
  }


  public DeleteCompanyAssets(ID: any) {
    return this.http.get<any[]>(
      this.host + "/Master/DeleteCompanyAssets?ID=" + ID);
  }

  public InsertOrientationPlanDetails(data: any) {
    debugger;
    this.url = this.host + '/Master/InsertOrientationPlanDetails';
    return this.http.post(this.url, data);
  }

  public UpdateEmployeeAssets(data: any) {
    debugger;
    this.url = this.host + '/Master/UpdateEmployeeAssets';
    return this.http.post(this.url, data);
  }




  public GetOrientationPlanDetails() {
    return this.http.get<any[]>(
      this.host + "/Announcement/GetOrientationPlanDetails"

    );
  }


  public DeleteOrientationPlanDetails(ID: any) {
    return this.http.get<any[]>(
      this.host + "/Master/DeleteOrientationPlanDetails?ID=" + ID);
  }



  public GetAllStaffCounts() {
    debugger
    return this.http.get<any[]>(
      this.host + "/Announcement/GetAllStaffCounts"
    );
  }

  public GetServiceAward() {
    debugger
    return this.http.get<any[]>(
      this.host + "/Announcement/GetServiceAward"
    );
  }

  public InsertServiceAward(data: any) {
    debugger;
    this.url = this.host + '/Master/InsertServiceAward';
    return this.http.post(this.url, data);
  }



  public GetGrivenceRequests() {
    return this.http.get<any[]>(
      this.host + "/Announcement/GetGrivenceRequests"
    );
  }

  public DeleteGrivenceRequests(ID: any) {
    return this.http.get<any[]>(
      this.host + "/Announcement/DeleteGrivenceRequests?ID=" + ID);
  }

  public InsertGrivenceRequests(data: any) {
    debugger;
    this.url = this.host + '/Announcement/InsertGrivenceRequests';
    return this.http.post(this.url, data);
  }
  public UpdateGrivenceRequests(data: any) {
    debugger;
    this.url = this.host + '/Announcement/UpdateGrivenceRequests';
    return this.http.post(this.url, data);
  }

  public GetHelpdeskrequest() {
    return this.http.get<any[]>(
      this.host + "/Announcement/GetHelpdeskrequest"
    );
  }

  public DeleteHelpdeskrequest(ID: any) {
    return this.http.get<any[]>(
      this.host + "/Announcement/DeleteHelpdeskrequest?ID=" + ID);
  }

  public InsertHelpdeskrequest(data: any) {
    debugger;
    this.url = this.host + '/Announcement/InsertHelpdeskrequest';
    return this.http.post(this.url, data);
  }
  public UpdateHelpdeskrequest(data: any) {
    debugger;
    this.url = this.host + '/Announcement/UpdateHelpdeskrequest';
    return this.http.post(this.url, data);
  }
  public GrievanceReply(data: any) {
    debugger;
    this.url = this.host + '/Announcement/GrievanceReply';
    return this.http.post(this.url, data);
  }
  public HelpDeskReply(data: any) {
    debugger;
    this.url = this.host + '/Announcement/HelpDeskReply';
    return this.http.post(this.url, data);
  }

  public ClearProbation(data: any) {
    debugger;
    this.url = this.host + '/Announcement/ClearProbation';
    return this.http.post(this.url, data);
  }

  public InsertOrientationSession(data: any) {
    debugger;
    this.url = this.host + '/Master/InsertOrientationSession';
    return this.http.post(this.url, data);
  }

  public GetOrientationSession() {
    debugger
    return this.http.get<any[]>(
      this.host + "/Announcement/GetOrientationSession"
    );
  }

  public GetEmployeeTransition() {
    return this.http.get<any[]>(
      this.host + "/Announcement/GetEmployeeTransition"
    );
  }

  public DeleteEmployeeTransition(ID: any) {
    return this.http.get<any[]>(
      this.host + "/Announcement/DeleteEmployeeTransition?ID=" + ID);
  }

  public InsertEmployeeTransition(data: any) {
    debugger;
    this.url = this.host + '/Announcement/InsertEmployeeTransition';
    return this.http.post(this.url, data);
  }
  public UpdateEmployeeTransition(data: any) {
    debugger;
    this.url = this.host + '/Announcement/UpdateEmployeeTransition';
    return this.http.post(this.url, data);
  }


  public GetDepartmentMaster() {
    return this.http.get<any[]>(
      this.host + "/Announcement/GetDepartmentMaster"
    );
  }

  public ClearStaffExitFormality(data: any) {
    debugger;
    this.url = this.host + '/Announcement/ClearStaffExitFormality';
    return this.http.post(this.url, data);
  }

  public DeleteStaffExitFormality(ID: any) {
    return this.http.get<any[]>(
      this.host + "/Master/DeleteStaffExitFormality?ID=" + ID);
  }
  public InsertStaffExitFormality(data: any) {
    debugger;
    this.url = this.host + '/Announcement/InsertStaffExitFormality';
    return this.http.post(this.url, data);
  }

  public DeleteLoanConfiguration(ID: any) {
    return this.http.get<any[]>(
      this.host + "/Master/DeleteLoanConfiguration?ID=" + ID);
  }


  public GetLoanMasterForConfig() {
    return this.http.get<any[]>(
      this.host + "/Master/GetLoanMasterForConfig"
    );
  }

  public InsertPayrollCutOffDate(data: any) {
    debugger;
    this.url = this.host + '/Announcement/InsertPayrollCutOffDate';
    return this.http.post(this.url, data);
  }


  public DeletePayrollCutOffDate(ID: any) {
    return this.http.get<any[]>(
      this.host + "/Master/DeletePayrollCutOffDate?ID=" + ID);
  }


  public GetPayrollCutOffDate() {
    return this.http.get<any[]>(
      this.host + "/Announcement/GetPayrollCutOffDate"
    );
  }

  public UpdatePayrollCutOffDate(data: any) {
    debugger;
    this.url = this.host + '/Master/UpdatePayrollCutOffDate';
    return this.http.post(this.url, data);
  }


  public InsertRemittanceCutOffDate(data: any) {
    debugger;
    this.url = this.host + '/Announcement/InsertRemittanceCutOffDate';
    return this.http.post(this.url, data);
  }

  public DeleteRemittanceCutOffDate(ID: any) {
    return this.http.get<any[]>(
      this.host + "/Master/DeleteRemittanceCutOffDate?ID=" + ID);
  }


  public GetRemittanceCutOffDate() {
    return this.http.get<any[]>(
      this.host + "/Announcement/GetRemittanceCutOffDate"
    );
  }

  public UpdateRemittanceCutOffDate(data: any) {
    debugger;
    this.url = this.host + '/Master/UpdateRemittanceCutOffDate';
    return this.http.post(this.url, data);
  }
  public ManagerAdjustmentApprove(data: any) {
    debugger;
    this.url = this.host + '/Announcement/UpdateAdjustmentFromManager';
    return this.http.post(this.url, data);
  }

  

  public AcceptEmployeeResignation(ID: any, TypeID: any) {
    return this.http.get<any[]>(
      this.host + "/Master/AcceptEmployeeResignation?ID=" + ID + "&TypeID=" + TypeID);
  }

  public UploadAttachment(data: any) {
    debugger;
    this.url = this.host + '/Master/UploadAttachment';
    return this.http.post(this.url, data);
  }


  public sendemail1(data: any) {
    debugger;
    this.url = this.host + '/Master/sendemail';
    return this.http.post(this.url, data);
  }


  public RetainEmployeee(data: any) {
    debugger;
    this.url = this.host + '/Announcement/RetainEmployeee';
    return this.http.post(this.url, data);
  }

    public GetPosition() {
    return this.http.get<any[]>(
      this.host + "/Master/GetPosition"
    );
  }

  public CancelApproved(data: any) {
    debugger;
    this.url = this.host + '/Master/CancelApproved';
    return this.http.post(this.url, data);
  }

  public ApproveCancelledLeave(data: any) {
    debugger;
    this.url = this.host + '/Master/ApproveCancelledLeave';
    return this.http.post(this.url, data);
  }


  public GetSeparationType() {
    return this.http.get<any[]>(
      this.host + "/Master/GetSeparationType"
    );
  }

  
  public DeleteSeparationType(ID: any) {
    return this.http.get<any[]>(
      this.host + "/Master/DeleteSeparationType?ID=" + ID);
  }

  public UpdateSeparationType(data: any) {
    debugger;
    this.url = this.host + '/Master/UpdateSeparationType';
    return this.http.post(this.url, data);
  }

  public InsertSeparationType(data: any) {
    debugger;
    this.url = this.host + '/Master/InsertSeparationType';
    return this.http.post(this.url, data);
  }

  public DeleteAnnouncement(ID: any) {
    return this.http.get<any[]>(
      this.host + "/Announcement/DeleteAnnouncement?ID=" + ID);
  }


   public UpdateRoleType(data: any) {
    debugger;
    this.url = this.host + '/MasterDemo/UpdateUserRoleType';
    return this.http.post(this.url, data);
  }

  public InsertRoleType(data: any) {
    debugger;
    this.url = this.host + '/MasterDemo/InsertUserRoleType';
    return this.http.post(this.url, data);
  }

  public DeleteRoleType(ID: any) {
    return this.http.get<any[]>(
      this.host + "/MasterDemo/DeleteRoleType?ID=" + ID);
  }

  public InsertAnnouncements(data: any) {
    debugger;
    this.url = this.host + '/Announcement/InsertAnnouncement';
    return this.http.post(this.url, data);
  }
  public UpdateAnnouncements(data: any) {
    debugger;
    this.url = this.host + '/Announcement/UpdateAnnouncement';
    return this.http.post(this.url, data);
  }

  public UpdatePassword(data: any) {
    debugger;
    this.url = this.host + '/Master/UpdatePassword';
    return this.http.post(this.url, data);
  }
  public InsertExceptionLogs(data: any) {
    debugger;
    this.url = this.host + '/Master/InsertExceptionLogs';
    return this.http.post(this.url, data);
  }
  public GetExceptionLogs() {
    return this.http.get<any[]>(
      this.host + "/Master/GetExceptionLogs"

    );
  }

}


