import { Component, OnInit } from '@angular/core';
import { NgWizardConfig, NgWizardService, StepChangedArgs, StepValidationArgs, STEP_STATE, THEME, TOOLBAR_POSITION, TOOLBAR_BUTTON_POSITION } from 'ng-wizard';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-profile-completion-form',
  templateUrl: './profile-completion-form.component.html',
  styleUrls: ['./profile-completion-form.component.css']
})

export class ProfileCompletionFormComponent implements OnInit {

  constructor(public DigiofficeService: DigipayrollserviceService, private ngWizardService: NgWizardService, public router: Router, private activatedroute: ActivatedRoute, public datepipe: DatePipe) { }
  stepStates = {
    normal: STEP_STATE.normal,
    disabled: STEP_STATE.disabled,
    error: STEP_STATE.error,
    hidden: STEP_STATE.hidden
  };
  config: NgWizardConfig = {
    selected: 0,
    theme: THEME.circles,
    toolbarSettings: {
    }
  };
  dropdownList: any = [];
  selectedItems: any = [];
  dropdownSettings: any = {};
  Title: any
  PlaceO_f_Birth: any
  Status: any
  Name: any
  employmentlist: any;
  Country_Of_Birth: any
  Date_Of_Marriage: any
  Middle_Name: any
  Age: any
  Personal_Email: any
  Last_Name: any
  Gender: any
  Mobile: any;
  RoleType: any;
  Supervisor: any;
  RoleTypeList: any;
  supervisorlist: any;
  Religion: any;
  Ethnicity: any;
  Citizen_Ship: any;
  Nationality: any;
  Is_Disabled: any;
  MajorIllness: any;
  Is_Color_Blind: any;
  IS_Night_Blind: any;
  Weight: any;
  Height: any;
  Blood_Group: any;
  DependentName: any;
  Relationship: any;
  DateOfBirth: any;
  Address: any;
  Is_Dependent: any;
  Id_Number: any;
  Is_Child_Adopted: any;
  Race: any;
  CitizenShip: any;
  Gender1: any;
  Working_Status: any;
  Request_Type: any;
  Dependent: any;
  Percentage: any;
  NomineeType: any;
  GuardianName: any;
  GuardianRelationship: any;
  ParentCompany: any;
  AssignedCompany: any;
  ComapanyName: any;
  StartDate: any;
  EndDate: any;
  Salary: any;
  CurrentEmployer: any;
  EducationType: any;
  Qualification: any;
  NameOfQualification: any;
  Branch: any;
  InstitutionName: any;
  Country: any;
  ScoreType: any;
  Grade: any;
  StartDateMonth: any;
  StartDateYear: any;
  EndDateMonth: any;
  EndDateYear: any;
  NameOfBank: any;
  AccountHolderName: any;
  BankAccountNumber: any;
  IDType: any;
  Number: any;
  NameOnDocument: any;
  IssueDate: any;
  ExpiryDate: any;
  IssuingAuthority: any;
  PlaceOfIssue: any;
  VisaType: any;
  VisaNumber: any;
  VisaIssueDate: any;
  VisaExpiryDate: any;
  EmployeeName: any;
  Grade1: any;
  Designation: any;
  PayRateType: any;
  PayStructure: any;
  EffectiveFromDate: any;
  Reason: any;
  EmployeeCode: any;
  OfficialEmail: any;
  Band: any;
  Grade2: any;
  JobRole: any;
  Manager: any;
  EmployeeType: any;
  EmployeeStatus: any;
  NoticePeriod: any;
  ProbationPeriod: any;
  ConfirmationDueDate: any;
  ConfirmationStatus: any;
  AddressType: any;
  Relationship1: any;
  FindPlace: any;
  AddressLine1: any;
  AddressLine2: any;
  AddressLine3: any;
  AddressLine4: any;
  District: any;
  Province: any;
  Country1: any;
  SubDistrictPostcode: any;
  Mobile1: any;
  LandLineFax: any;
  IsCorrespondance: any;
  RequestType: any;
  EmergencyContactName: any;
  EmergencyContactRelationship: any;
  EmergencyContactMobileNumber: any;
  EmergencyContactOfficeNumber: any;
  EmergencyContactLandLineNumber: any;
  EmergencyContact_EmailID: any;
  EmergencyContact_Address: any;
  StaffID: any;
  ID: any;
  BuildingID: any;
  PhoneNo: any;
  EmailID: any;
  TypeID: any;
  Attachment: any;
  JoiningDate: any;
  LeavesPerMonth: any;
  WorkTimings: any;
  ContactNumber: any;
  EmployeeID: any;
  ChaildTotal: any;
  MedicalLeaveEntitlement: any;
  MaternitityLeaveEntitlement: any;
  PaternitityLeaveEntitlement: any;
  CompassionateLeaveEntitlement: any;
  Leavesfrompreviousyear: any;
  ExtendedChildcareLeaveEntitlement: any;
  MarriageLeaveEntitlement: any;
  Countrylist: any;
  Department: any;
  loader: any;
  EducationGrade: any;
  level: any;
  Is_Solo_Parent: any
  leavelist: any;
  myDate: any;
  Departmentlist: any;
  Bankslist: any;
  result: any;
  Religion1: any;
  supervisorlist12: any;
  payrolllist: any;
  dropdownSettingsresdays: any;
  restdaylist: any;
  Restdays: any;
  Restdays1: any;
  currentUrl: any;

  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.GetPayGroup();
    this.dropdownSettingsresdays = {
      singleSelection: false,
      idField: 'name',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    this.restdaylist = [
      {
        'name': 'Monday'
      },
      {
        'name': 'Tuesday'
      },
      {
        'name': 'Wednesday'
      },
      {
        'name': 'Thursday'
      },
      {
        'name': 'Friday'
      },
      {
        'name': 'Saturday'
      },
      {
        'name': 'Sunday'
      }
    ]
    this.Department = "";
    this.RoleType = "";
    this.level = "";
    this.ParentCompany = '';
    this.AssignedCompany = '';
    this.CountryID = 0;
    this.StateID = 0;
    this.CityID = 0;
    this.Barangay = 0;
    this.Status = 0;
    this.showtable = 0;
    this.Relationship1 = 'Select One'
    this.Gender1 = '';
    this.Gender = 0;
    this.Department = '';
    this.Race = 'Race'
    this.Citizen_Ship = ''
    this.CitizenShip = "0"
    this.cb = ''
    this.Religion = "";
    this.Religion1 = "";
    this.Ethnicity = "";
    this.Working_Status = 'Select One'
    this.Title = 0;
    this.AddressType = 0;
    this.GuardianRelationship = 'Select One'
    this.EducationType = 'Select'
    this.ScoreType = "Select"
    this.NameOfBank = "Select One"
    this.IDType = "Select"
    this.VisaType = "Select"
    this.Nationality = ""
    this.Blood_Group = ""
    this.Band = ""
    this.EmployeeStatus = "";
    this.Supervisor = "";
    this.Country_Of_Birth = "";
    this.RoleType = "";
    this.Department = " ";
    this.Paygroup = "";
    this.NoticePeriod = "";
    this.loader = true;
    this.GetBanks();
    this.GetCountryType();
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    this.GetBankDetails();
    this.Is_Disabled = false
    this.showtable = 0;
    this.myDate = new Date().toISOString().split("T")[0];
    this.GetRoleType();
    this.GetMyDetails();
    this.GetDepartment();
    this.ActivatedRouteCall();
  }

  public GetPayGroup() {
    this.DigiofficeService.GetPayGroup().subscribe(
      data => {
        debugger
        this.payrolllist = data;
      })
  }

  public GetBanks() {
    this.DigiofficeService.GetBanks().subscribe(
      data => {
        debugger
        this.result = data;
      })
  }

  public GetCountryType() {
    this.DigiofficeService.GetCountryType().subscribe(data => {
      debugger
      this.Countrylist = data;
    })
  }

  public GetBankDetails() {
    this.DigiofficeService.GetBankDetails().subscribe(data => {
      debugger
      this.Bankslist = data
      this.loader = false;
    })
  }

  public GetRoleType() {
    this.DigiofficeService.GetRoleType().subscribe(data => {
      debugger
      this.RoleTypeList = data;
    });
  }

  public GetMyDetails() {
    this.DigiofficeService.GetMyDetails().subscribe(data => {
      debugger
      this.supervisorlist = data.filter(x => x.loginTypeID == 2);
      this.loader = false;
    });
  }

  public GetDepartment() {
    this.DigiofficeService.GetDepartment().subscribe(data => {
      debugger
      this.Departmentlist = data;
    });
  }

  public ActivatedRouteCall() {
    this.activatedroute.params.subscribe(params => {
      debugger;
      this.ID = params['id'];
      this.StaffID = params['id'];
      if (this.ID == undefined) {
        this.Title = 0,
          // this.Name = "",
          // this.Middle_Name = ' ',
          // this.Last_Name = ' ',
          // this.PlaceO_f_Birth = ' ',
          this.Country_Of_Birth = ' ',
          this.Age = ' ',
          // this.Gender = ' ',
          // this.Status = ' ',
          this.Date_Of_Marriage = ' ',
          // this.Personal_Email = ' ',
          // this.Mobile = ' ',
          // this.Religion = ' ',
          this.Citizen_Ship = ' ',
          this.Ethnicity = ' ',
          this.Nationality = ' ',
          this.Is_Disabled = ' ',
          this.Blood_Group = ' ',
          this.Height = ' ',
          this.Weight = ' ',
          // this.MajorIllness = ' ',
          this.IS_Night_Blind = ' ',
          this.Is_Color_Blind = '',
          this.EmployeeCode = " ",
          this.OfficialEmail = " ",
          this.Band = " ",
          this.Grade = " ",
          this.JobRole = " ",
          this.Manager = " ",
          this.EmployeeType = " ",
          this.EmployeeStatus = " ",
          this.NoticePeriod = " ",
          this.ProbationPeriod = " ",
          this.ConfirmationDueDate = " ",
          this.ConfirmationStatus = " ",
          this.EmployeeName = " ",
          this.AddressType = " ",
          this.Relationship = " ",
          this.FindPlace = " ",
          this.AddressLine1 = " ",
          this.AddressLine2 = " ",
          this.AddressLine3 = " ",
          this.AddressLine4 = " ",
          this.District = " ",
          this.Province = " ",
          this.Country = " ",
          this.SubDistrictPostcode = " ",
          this.LandLineFax = " ",
          this.IsCorrespondance = " ",
          this.RequestType = " ",
          this.EmergencyContactName = " ",
          this.EmergencyContactRelationship = " ",
          this.EmergencyContactMobileNumber = " ",
          this.EmergencyContactOfficeNumber = " ",
          this.EmergencyContactLandLineNumber = " ",
          this.EmergencyContact_EmailID = " ",
          this.EmergencyContact_Address = " ",
          this.DependentName = " ",
          this.Relationship = " ",
          this.Gender = 0,
          this.level = " ",
          this.DateOfBirth = " ",
          this.Address = " ",
          this.Mobile = "",
          this.Is_Dependent = " ",
          this.Id_Number = " ",
          this.Race = " ",
          // this.CitizenShip = " ",
          this.Country_Of_Birth = " ",
          // this.Religion = " ",
          this.Working_Status = " ",
          this.Request_Type = " ",
          this.Dependent = " ",
          this.Percentage = " ",
          this.NomineeType = " ",
          this.GuardianName = " ",
          this.GuardianRelationship = " ",
          this.ComapanyName = " ",
          this.StartDate = " ",
          this.EndDate = " ",
          this.Salary = " ",
          this.CurrentEmployer = " ",
          this.EducationType = " ",
          this.Qualification = " ",
          this.NameOfQualification = " ",
          this.Branch = " ",
          this.InstitutionName = " ",
          this.Country = " ",
          this.ScoreType = " ",
          this.StartDateMonth = " ",
          this.StartDateYear = " ",
          this.EndDateMonth = " ",
          this.EndDateYear = " ",
          this.NameOfBank = " ",
          this.AccountHolderName = " ",
          this.BankAccountNumber = " ",
          this.IDType = " ",
          this.Number = " ",
          this.NameOnDocument = " ",
          this.IssueDate = " ",
          this.ExpiryDate = " ",
          this.IssuingAuthority = " ",
          this.PlaceOfIssue = " ",
          this.VisaType = " ",
          this.VisaNumber = " ",
          this.VisaIssueDate = " ",
          this.VisaExpiryDate = " ",
          this.EmployeeName = " ",
          this.Designation = " ",
          this.PayRateType = " ",
          this.PayStructure = " ",
          this.EffectiveFromDate = " ",
          this.Reason = " "
      }
      else {
        this.DigiofficeService.GetMyDetails().subscribe(
          data => {
            debugger
            this.leavelist = data.filter(x => x.id == this.ID);
            this.HiringDate = this.datepipe.transform(this.leavelist[0].hiringDate, 'yyyy-MM-dd'),
              this.Title = this.leavelist[0].title,
              this.Name = this.leavelist[0].name,
              this.Middle_Name = this.leavelist[0].middle_Name,
              this.Last_Name = this.leavelist[0].last_Name,
              this.PlaceO_f_Birth = this.leavelist[0].placeO_f_Birth,
              this.Country_Of_Birth = this.leavelist[0].country_Of_Birth,
              this.Age = this.leavelist[0].age,
              this.Gender = this.leavelist[0].gender,
              this.Status = this.leavelist[0].status
            if ((this.datepipe.transform(this.leavelist[0].date_Of_Marriage, 'yyyy-MM-dd')) == "1990-01-01") {
              this.Date_Of_Marriage = " "
            }
            else {
              this.Date_Of_Marriage = this.datepipe.transform(this.leavelist[0].date_Of_Marriage, 'yyyy-MM-dd')
            }
            this.Personal_Email = this.leavelist[0].personal_Email,
              this.Is_Solo_Parent = this.leavelist[0].is_Solo_Parent,
              this.Mobile = this.leavelist[0].mobile,
              this.Religion = this.leavelist[0].religion,
              this.Citizen_Ship = this.leavelist[0].citizen_Ship,
              this.Ethnicity = this.leavelist[0].ethnicity,
              this.Nationality = this.leavelist[0].nationality,
              this.Is_Disabled = this.leavelist[0].is_Disabled,
              this.Blood_Group = this.leavelist[0].blood_Group,
              this.Height = this.leavelist[0].height,
              this.Weight = this.leavelist[0].weight,
              this.MajorIllness = this.leavelist[0].majorIllness,
              this.IS_Night_Blind = this.leavelist[0].iS_Night_Blind,
              this.Is_Color_Blind = this.leavelist[0].is_Color_Blind,
              this.DOB = this.datepipe.transform(this.leavelist[0].dob, 'yyyy-MM-dd'),
              this.JoiningDate = this.datepipe.transform(this.leavelist[0].joiningDate, 'yyyy-MM-dd'),
              this.RoleType = this.leavelist[0].type,
              this.Supervisor1 = this.leavelist[0].supervisor,
              this.Restdays = this.leavelist[0].restDays;
            this.Restdays1 = this.leavelist[0].restDays;
            this.DigiofficeService.GetMyDetails().subscribe(data => {
              debugger
              this.supervisorlist12 = data.filter(x => x.id == this.Supervisor1);
              this.loader = false;
              this.Supervisor = this.supervisorlist12
            });
            this.Paygroup = this.leavelist[0].paygroup,
              this.PagiBig_ID = this.leavelist[0].pagiBig_ID,
              this.PagiBigAccountNo = this.leavelist[0].pagiBigAccountNo,
              this.PagibigRemarks = this.leavelist[0].pagibigRemarks,
              this.EMPLOYEE_TIN = this.leavelist[0].employeE_TIN,
              this.PHILHEALTH_NO = this.leavelist[0].philhealtH_NO,
              this.SSSNO = this.leavelist[0].sssno,
              this.PagibigMembership = this.leavelist[0].pagibigMembership,
              this.level = this.leavelist[0].level,
              this.Department = this.leavelist[0].department;
            this.DigiofficeService.GetMyAddressDetails().subscribe(
              data => {
                debugger;
                this.leavelist = data.filter(x => x.staffId == this.ID);
                this.AddressType = this.leavelist[0].addressType,
                  this.Relationship = this.leavelist[0].relationship,
                  this.FindPlace = this.leavelist[0].findPlace,
                  this.AddressLine1 = this.leavelist[0].addressLine1,
                  this.AddressLine2 = this.leavelist[0].addressLine2,
                  this.AddressLine3 = this.leavelist[0].addressLine3,
                  this.AddressLine4 = this.leavelist[0].addressLine4,
                  this.SubDistrictPostcode = this.leavelist[0].subDistrictPostcode,
                  this.Mobile = this.leavelist[0].mobile,
                  this.LandLineFax = this.leavelist[0].landLineFax,
                  this.IsCorrespondance = this.leavelist[0].isCorrespondance,
                  this.RequestType = this.leavelist[0].requestType,
                  this.EmergencyContactName = this.leavelist[0].emergencyContactName,
                  this.EmergencyContactRelationship = this.leavelist[0].emergencyContactRelationship,
                  this.EmergencyContactMobileNumber = this.leavelist[0].emergencyContactMobileNumber,
                  this.EmergencyContactOfficeNumber = this.leavelist[0].emergencyContactOfficeNumber,
                  this.EmergencyContactLandLineNumber = this.leavelist[0].emergencyContactLandLineNumber,
                  this.EmergencyContact_EmailID = this.leavelist[0].emergencyContact_EmailID,
                  this.EmergencyContact_Address = this.leavelist[0].emergencyContact_Address,
                  this.CountryID = this.leavelist[0].country,
                  this.StateID = this.leavelist[0].province,
                  this.CityID = this.leavelist[0].district,
                  this.Barangay = this.leavelist[0].barangay
                if (this.CountryID == 5) {
                  debugger
                  this.show = 2;
                }
                else {
                  this.show = 1
                }
                this.getstate();
                this.getcity();
                this.getbarangay();
              })
            this.DigiofficeService.GetPositionDetails().subscribe(
              data => {
                debugger
                this.leavelist = data.filter(x => x.staffId == this.ID);
                this.EmployeeCode = this.leavelist[0].employeeCode,
                  this.OfficialEmail = this.leavelist[0].official_Email,
                  this.Band = this.leavelist[0].band,
                  this.Grade = this.leavelist[0].grade,
                  this.JobRole = this.leavelist[0].job_Role,
                  this.Manager = this.leavelist[0].manager,
                  this.EmployeeType = this.leavelist[0].employee_Type,
                  this.EmployeeStatus = this.leavelist[0].employement_Status,
                  this.NoticePeriod = this.leavelist[0].notice_Period,
                  this.ProbationPeriod = this.leavelist[0].probation_Period,
                  this.ConfirmationDueDate = this.datepipe.transform(this.leavelist[0].confirmation_Due_Date, 'yyyy-MM-dd'),
                  this.ConfirmationStatus = this.leavelist[0].confirmation_Status,
                  this.EmployeeName = this.leavelist[0].employeeName
                this.loader = false;
              },
            );
            this.DigiofficeService.GetEmploymentDetails().subscribe(
              data => {
                debugger
                this.employmentlist = data.filter(x => x.staffID == this.ID).splice(0, 1);
                this.ComapanyName = this.employmentlist[0].comapanyName
                this.Title = this.employmentlist[0].title
                this.StartDate = this.employmentlist[0].startDate
                this.EndDate = this.employmentlist[0].endDate
                this.Salary = this.employmentlist[0].salary
                this.loader = false;
              },
            );
            this.loader = false;
          },
        );
        this.DigiofficeService.GetDependentDetails().subscribe(
          data => {
            debugger
            this.leavelist = data.filter(x => x.staffId == this.ID);
            this.cb = this.leavelist[0].cb,
              this.Religion = this.leavelist[0].religion,
              this.DependentName = this.leavelist[0].dependentName,
              this.Relationship1 = this.leavelist[0].relationship,
              this.Gender1 = this.leavelist[0].gender,
              this.DateOfBirth = this.datepipe.transform(this.leavelist[0].dateOfBirth, 'yyyy-MM-dd'),
              this.Address = this.leavelist[0].address,
              this.Mobile = this.leavelist[0].mobile,
              this.Is_Dependent = this.leavelist[0].is_Dependent,
              this.Id_Number = this.leavelist[0].id_Number,
              this.Is_Child_Adopted = this.leavelist[0].is_Child_Adopted,
              this.Race = this.leavelist[0].race,
              this.CitizenShip = this.leavelist[0].citizenShip,
              this.Working_Status = this.leavelist[0].working_Status,
              this.Request_Type = this.leavelist[0].request_Type
            this.loader = false;
          },
        );
        this.DigiofficeService.GetNomination().subscribe(
          data => {
            debugger
            this.leavelist = data.filter(x => x.staffId == this.ID);
            this.Dependent = this.leavelist[0].dependent,
              this.Percentage = this.leavelist[0].percentage,
              this.NomineeType = this.leavelist[0].nomineeType,
              this.GuardianName = this.leavelist[0].guardianName,
              this.GuardianRelationship = this.leavelist[0].guardianRelationship
            this.loader = false;
          },
        );
        this.DigiofficeService.GetEducationDetails().subscribe(
          data => {
            debugger
            this.leavelist = data.filter(x => String(x.staffId) == this.ID);
            this.EducationType = this.leavelist[0].educationType,
              this.Qualification = this.leavelist[0].qualification,
              this.NameOfQualification = this.leavelist[0].nameOfQualification,
              this.Branch = this.leavelist[0].branch,
              this.InstitutionName = this.leavelist[0].institutionName,
              this.Country = this.leavelist[0].country,
              this.ScoreType = this.leavelist[0].scoreType,
              this.EducationGrade = this.leavelist[0].grade,
              this.StartDateMonth = this.datepipe.transform(this.leavelist[0].startDateMonth, 'yyyy-MM-dd'),
              this.StartDateYear = this.datepipe.transform(this.leavelist[0].startDateYear, 'yyyy-MM-dd'),
              this.EndDateMonth = this.datepipe.transform(this.leavelist[0].endDateMonth, 'yyyy-MM-dd'),
              this.EndDateYear = this.datepipe.transform(this.leavelist[0].endDateYear, 'yyyy-MM-dd')
            this.loader = false;
          },
        );
        this.DigiofficeService.GetBankDetails().subscribe(
          data => {
            debugger
            this.leavelist = data.filter(x => x.staffId == this.ID);
            this.NameOfBank = this.leavelist[0].nameOfBank,
              this.AccountHolderName = this.leavelist[0].accountHolderName,
              this.BankAccountNumber = this.leavelist[0].bankAccountNumber
            this.loader = false;
          },
        );
        this.DigiofficeService.GetID_Details().subscribe(
          data => {
            debugger
            let temp: any = data.filter(x => x.staffId == this.ID);
            this.IDType = temp[0].idType,
              this.Number = temp[0].number,
              this.NameOnDocument = temp[0].nameOnDocument,
              this.IssueDate = this.datepipe.transform(temp[0].issueDate, 'yyyy-MM-dd'),
              this.ExpiryDate = this.datepipe.transform(temp[0].expiryDate, 'yyyy-MM-dd'),
              this.IssuingAuthority = temp[0].issuingAuthority,
              this.PlaceOfIssue = temp[0].placeOfIssue
            this.loader = false;
          },
        );
        this.DigiofficeService.GetVisaDetails().subscribe(
          data => {
            debugger
            this.leavelist = data.filter(x => x.staffId == this.ID);
            this.VisaType = this.leavelist[0].visaType,
              this.VisaNumber = this.leavelist[0].visaNumber,
              this.VisaIssueDate = this.datepipe.transform(this.leavelist[0].visaIssueDate, 'yyyy-MM-dd'),
              this.VisaExpiryDate = this.datepipe.transform(this.leavelist[0].visaExpiryDate, 'yyyy-MM-dd')
            this.loader = false;
          },
        );
        this.DigiofficeService.GetSalaryDetails().subscribe(
          data => {
            debugger
            this.leavelist = data.filter(x => x.staffId == this.ID);
            this.EmployeeName = this.leavelist[0].employeeName,
              this.Grade = this.leavelist[0].grade,
              this.Designation = this.leavelist[0].designation,
              this.PayRateType = this.leavelist[0].payRateType,
              this.PayStructure = this.leavelist[0].payStructure,
              this.EffectiveFromDate = this.datepipe.transform(this.leavelist[0].effectiveFromDate, 'yyyy-MM-dd'),
              this.Reason = this.leavelist[0].reason
            this.loader = false;
          },
        );
      }
    })
  }

  getstate() {
    this.DigiofficeService.GetStateType().subscribe(data => {
      debugger
      this.Provincelist = data.filter(x => x.countryID == this.CountryID);

    })
  }

  public getcity() {
    this.DigiofficeService.GetCityType().subscribe(data => {
      debugger
      this.Citylist = data.filter(x => x.stateID == this.StateID);

    })
  }

  barangaylist: any;
  public getbarangay() {
    debugger
    this.DigiofficeService.GetBarangayMaster().subscribe(data => {
      debugger
      this.barangaylist = data.filter(x => x.cityID == this.CityID);
    })
  }


  DOB: any;

  stepChanged(args: StepChangedArgs) {
    debugger

    // console.log(args.step)
    // window.scroll({
    //   top: 0,
    //   left: 0,    debugger
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'auto'
    });
    //   behavior: 'smooth'
    // });

    // if ((args instanceof NavigationEnd)) {

    //   window.scrollTo(0, 0)
    // }



  }
  public attachments2: any = [];
  public attachments2url: any = [];

  onSelect2(event: any) {
    debugger
    console.log(event);
    this.attachments2.push(...event.addedFiles);

    this.DigiofficeService.ProjectAttachments(this.attachments2).subscribe(res => {
      debugger
      this.attachments2url.push(res);

      debugger
    })

  }
  onRemove2(event: any) {
    debugger
    console.log(event);
    this.attachments2.splice(this.attachments2.indexOf(event), 1);
  }
  PagiBigAccountNo: any;
  PagiBig_ID: any;
  Paygroup: any;
  SSSNO: any;
  PHILHEALTH_NO: any;
  EMPLOYEE_TIN: any;
  PagibigRemarks: any;
  PagibigMembership: any;


  public getemploymentdetails() {
    this.DigiofficeService.GetEmploymentDetails().subscribe(
      data => {
        debugger

        this.leavelist = data.filter(x => x.staffID == this.ID);
        this.ComapanyName = this.leavelist[0].comapanyName,
          this.Title = this.leavelist[0].title,
          this.StartDate = this.datepipe.transform(this.leavelist[0].startDate, 'yyyy-MM-dd'),
          this.EndDate = this.datepipe.transform(this.leavelist[0].endDate, 'yyyy-MM-dd'),
          this.Salary = this.leavelist[0].salary,
          this.CurrentEmployer = this.leavelist[0].currentEmployer
        this.loader = false;
      },
    );

  }




  public Save() {
    debugger
    if (this.Name == " " || this.Mobile == " " || this.Personal_Email == " " || this.RoleType == " " || this.JoiningDate == " " || this.Supervisor == " " || this.Title == " " || this.Last_Name == "" || this.Paygroup == " " || this.PagiBig_ID == " " || this.PagiBigAccountNo == " " || this.PagibigMembership == " " || this.PagibigRemarks == " " || this.EMPLOYEE_TIN == " " || this.PHILHEALTH_NO == " " || this.SSSNO == " " || this.Department == " " || this.PlaceO_f_Birth == " " || this.Country_Of_Birth == " " || this.Gender == " " || this.DOB == " ") {
      Swal.fire('Please Fill All The Mandatory Fields')
    }
    else {

      this.Restdays = '';
      for (let i = 0; i < this.restdaysarray1.length; i++) {
        this.Restdays = this.Restdays + this.restdaysarray1[i].name + ','
      }

      var eb = {
        'BuildingID': 56,
        'Name': this.Name,
        'PhoneNo': this.Mobile,


        'EmailID': ((this.Personal_Email).replaceAll(' ', '')),
        'TypeID': this.RoleType,
        // 'Type': Number(this.RoleType),
        'Address': this.Address,
        'Attachment': this.Attachment == " " ? null : this.Attachment,
        'JoiningDate': this.JoiningDate,
        'Salary': this.Salary,
        'LeavesPerMonth': this.LeavesPerMonth,
        'WorkTimings': this.WorkTimings,
        'ContactNumber': this.ContactNumber,
        'Supervisor': this.Supervisor,

        'EmployeeID': this.EmployeeID,
        'ResignationDate': this.JoiningDate,
        'ChaildTotal': 10,
        'MedicalLeaveEntitlement': 10,
        'MaternitityLeaveEntitlement': 105,
        'PaternitityLeaveEntitlement': 7,
        'CompassionateLeaveEntitlement': 10,
        'Leavesfrompreviousyear': 10,
        'ExtendedChildcareLeaveEntitlement': 10,
        'MarriageLeaveEntitlement': 10,
        'Title': this.Title,
        'Middle_Name': this.Middle_Name,
        'Last_Name': this.Last_Name,
        'PlaceO_f_Birth': this.PlaceO_f_Birth,
        'Country_Of_Birth': this.Country_Of_Birth,
        'Age': this.Age,
        'Gender': this.Gender,
        'Status': this.Status,
        // 'Date_Of_Marriage' : (String(this.Date_Of_Marriage ) == "" ? "Null" + "," : "'" + String(this.Date_Of_Marriage) + "',"),

        'Date_Of_Marriage': this.Date_Of_Marriage == " " ? "1990-01-01 00:00:00.000" : this.Date_Of_Marriage,
        // 'Date_Of_Marriage': this.Date_Of_Marriage,
        'Religion': this.Religion == undefined ? null : this.Religion,
        'Citizen_Ship': this.Citizen_Ship == undefined ? null : this.Citizen_Ship,
        'Ethnicity': this.Ethnicity == undefined ? null : this.Ethnicity,
        'Nationality': this.Nationality,
        'Is_Disabled': this.Is_Disabled,
        'Blood_Group': this.Blood_Group,
        'Height': this.Height,
        'Weight': this.Weight,
        'MajorIllness': this.MajorIllness,
        'IS_Night_Blind': this.IS_Night_Blind,
        'Is_Color_Blind': this.Is_Color_Blind,
        'DOB': this.DOB,
        'Signature': this.attachments2url[0],
        'Paygroup': this.Paygroup,
        'PagiBig_ID': this.PagiBig_ID,
        'PagiBigAccountNo': this.PagiBigAccountNo,
        'PagibigMembership': this.PagibigMembership,
        'PagibigRemarks': this.PagibigRemarks,
        'EMPLOYEE_TIN': this.EMPLOYEE_TIN,
        'PHILHEALTH_NO': this.PHILHEALTH_NO,
        'SSSNO': this.SSSNO,
        'Restdays': this.Restdays,
        'department': this.Department,
        'Level': this.level,
        'Is_Solo_Parent': this.Is_Solo_Parent == undefined ? 0 : this.Is_Solo_Parent,
        'HiringDate': this.HiringDate

      }
      this.DigiofficeService.InsertMyDetails(eb).subscribe(

        data => {
          debugger
          if (data == 10) {
            Swal.fire('User Already Exists')
          }
          else {
            this.StaffID = data;

            Swal.fire('Saved Successfully')
          }


          // this.SaveDependantDetails();
          // this.SaveNomination();
          // this.SaveEmployment();
          // this.SaveEducation();
          // this.SaveIdDetails();
          // this.SaveBankDetails();
          // this.SaveVisaDetails();

          //  this.SaveSalaryDetails();

          // this.SaveAddressDetails();
          // this.SavePositionDetails();


        },

      )
    }

  }


  HiringDate: any;
  Supervisor1: any;
  public Update() {
    debugger

    this.Restdays = '';
    for (let i = 0; i < this.restdaysarray1.length; i++) {
      this.Restdays = this.Restdays + this.restdaysarray1[i].name + ','
    }


    if (this.Restdays == '') {
      this.Restdays = this.Restdays1
    }


    var eb = {
      'ID': this.ID,
      'BuildingID': 56,
      'Name': this.Name,
      'PhoneNo': this.Mobile,
      'EmailID': this.Personal_Email,
      'TypeID': this.RoleType,
      'Address': this.Address,
      'Attachment': this.Attachment,
      'JoiningDate': this.JoiningDate,
      'Salary': this.Salary,
      'LeavesPerMonth': this.LeavesPerMonth,
      'WorkTimings': this.WorkTimings,
      'ContactNumber': this.ContactNumber,
      'Supervisor': this.Supervisor1,
      'EmployeeID': this.EmployeeID,
      'ResignationDate': this.JoiningDate,
      'ChaildTotal': 10,
      'MedicalLeaveEntitlement': 10,
      'MaternitityLeaveEntitlement': 10,
      'PaternitityLeaveEntitlement': 10,
      'CompassionateLeaveEntitlement': 10,
      'Leavesfrompreviousyear': 10,
      'ExtendedChildcareLeaveEntitlement': 10,
      'MarriageLeaveEntitlement': 10,
      'Title': this.Title,
      'Middle_Name': this.Middle_Name,
      'Last_Name': this.Last_Name,
      'PlaceO_f_Birth': this.PlaceO_f_Birth,
      'Country_Of_Birth': this.Country_Of_Birth,
      'Age': this.Age,
      'Gender': this.Gender,
      'Status': this.Status,
      'Date_Of_Marriage': (this.Date_Of_Marriage == " " || this.Date_Of_Marriage == "") ? "1990-01-01 00:00:00.000" : this.Date_Of_Marriage,
      // 'Date_Of_Marriage': this.Date_Of_Marriage == " " ? this.JoiningDate : this.Date_Of_Marriage,
      // 'Date_Of_Marriage': this.Date_Of_Marriage,
      'Religion': this.Religion,
      'Citizen_Ship': this.Citizen_Ship,
      'Ethnicity': this.Ethnicity,
      'Nationality': this.Nationality,
      'Is_Disabled': this.Is_Disabled,
      'Blood_Group': this.Blood_Group,
      'Height': this.Height,
      'Weight': this.Weight,
      'MajorIllness': this.MajorIllness,
      'IS_Night_Blind': this.IS_Night_Blind,
      'Is_Color_Blind': this.Is_Color_Blind,
      'DOB': this.DOB,
      'Signature': this.attachments2url[0],
      'Paygroup': this.Paygroup,
      'PagiBig_ID': this.PagiBig_ID,
      'PagiBigAccountNo': this.PagiBigAccountNo,
      'PagibigMembership': this.PagibigMembership,
      'PagibigRemarks': this.PagibigRemarks,
      'EMPLOYEE_TIN': this.EMPLOYEE_TIN,
      'PHILHEALTH_NO': this.PHILHEALTH_NO,
      'SSSNO': this.SSSNO,
      'Restdays': this.Restdays,
      'department': this.Department,
      'Level': this.level,
      'Is_Solo_Parent': this.Is_Solo_Parent == undefined ? 0 : this.Is_Solo_Parent,
      'HiringDate': this.HiringDate

    }
    this.DigiofficeService.UpdateStaff(eb).subscribe(

      data => {
        debugger

        Swal.fire('Updated Successfully')
        location.reload();
        // this.UpdateDependentDetails();
        // this.UpdateNomination();
        // this.UpdateEmploymentDetails();
        // this.UpdateEducationDetails();
        // this.UpdateID_Details();
        // this.UpdateBankDetails();
        // this.UpdateVisaDetails();

        // this.UpdateSalaryDetails();

        // this.UpdateMyAddressDetails();
        // this.UpdatePositionDetails();


      },

    )
  }

  cb: any;
  public SaveDependantDetails() {
    debugger

    var eb = {
      'DependentName': this.DependentName == undefined ? null : this.DependentName,
      'Relationship': this.Relationship1 == undefined ? null : this.Relationship1,
      'Gender': this.Gender1 == undefined ? null : this.Gender1,
      'DateOfBirth': this.DateOfBirth == " " ? this.DOB : this.DateOfBirth,
      'Address': this.Address == undefined ? null : this.Address,
      'Mobile': this.Mobile == undefined ? null : this.Mobile,
      'Is_Dependent': this.Is_Dependent == " " ? 0 : this.Is_Dependent,
      'Id_Number': this.Id_Number == undefined ? null : this.Id_Number,
      'Is_Child_Adopted': this.Is_Child_Adopted == undefined ? 0 : this.Is_Child_Adopted,
      'Race': this.Race == undefined ? null : this.Race,
      'CitizenShip': this.CitizenShip == undefined ? null : this.CitizenShip,
      'Country_Of_Birth': this.cb == undefined ? null : this.cb,
      'Religion': this.Religion == undefined ? null : this.Religion,
      'Working_Status': this.Working_Status == undefined ? null : this.Working_Status,
      'Request_Type': this.Request_Type == undefined ? null : this.Request_Type,
      'StaffID': this.StaffID

    }
    this.DigiofficeService.InsertDependentDetails(eb).subscribe(

      data => {
        debugger

        Swal.fire('Saved Successfully')

      },
    )
  }


  public SaveNomination() {
    debugger

    var eb = {

      'Dependent': this.Dependent,
      'Percentage': this.Percentage,
      'NomineeType': this.NomineeType,
      'GuardianName': this.GuardianName,
      'GuardianRelationship': this.GuardianRelationship,
      'StaffID': this.StaffID



    }
    this.DigiofficeService.InsertNomination(eb).subscribe(

      data => {
        debugger

        Swal.fire('Saved Successfully')

      },
    )
  }

  public SaveEmployment() {
    debugger

    for (let i = 0; i <= this.unitdetailsarray.length; i++) {
      var eb = {
        'ComapanyName': this.unitdetailsarray[0].ComapanyName,
        'Title': this.unitdetailsarray[0].Title,
        'StartDate': this.unitdetailsarray[0].StartDate,
        'EndDate': this.unitdetailsarray[0].EndDate,
        'Salary': this.unitdetailsarray[0].Salary,
        'CurrentEmployer': this.CurrentEmployer,
        'StaffID': this.StaffID

      }
      this.DigiofficeService.InsertEmploymentDetails(eb).subscribe(

        data => {
          debugger

          Swal.fire('Saved Successfully')
        },
      )
    }

  }

  public SaveEducation() {
    debugger

    var eb = {

      'EducationType': this.EducationType == undefined ? null : this.EducationType,
      'Qualification': this.Qualification == undefined ? null : this.Qualification,
      'NameOfQualification': this.NameOfQualification == undefined ? null : this.NameOfQualification,
      'Branch': this.Branch == undefined ? null : this.Branch,
      'InstitutionName': this.InstitutionName == undefined ? null : this.InstitutionName,
      'Country': this.Country == undefined ? null : this.Country,
      'ScoreType': this.ScoreType == undefined ? null : this.ScoreType,
      'grade': this.EducationGrade == undefined ? null : this.EducationGrade,
      'StartDateMonth': this.StartDateMonth == " " ? this.DOB : this.StartDateMonth,
      'StartDateYear': this.StartDateMonth == " " ? this.DOB : this.StartDateMonth,
      'EndDateMonth': this.EndDateMonth == " " ? this.DOB : this.EndDateMonth,
      'EndDateYear': this.EndDateMonth == " " ? this.DOB : this.EndDateMonth,
      'StaffID': this.StaffID




    }
    this.DigiofficeService.InsertEducationDetails(eb).subscribe(

      data => {
        debugger

        Swal.fire('Saved Successfully')
      },
    )
  }

  public SaveIdDetails() {
    debugger

    var eb = {
      'IDType': this.IDType,
      'Number': this.Number,
      'NameOnDocument': this.NameOnDocument,
      'IssueDate': this.IssueDate,
      'ExpiryDate': this.ExpiryDate,
      'IssuingAuthority': this.IssuingAuthority,
      'PlaceOfIssue': this.PlaceOfIssue,
      'StaffID': this.StaffID




    }
    this.DigiofficeService.InsertID_Details(eb).subscribe(

      data => {
        debugger

        Swal.fire('Saved Successfully')

      },
    )
  }

  public SaveBankDetails() {
    debugger

    var eb = {

      'NameOfBank': this.NameOfBank,
      'AccountHolderName': this.AccountHolderName,
      'BankAccountNumber': this.BankAccountNumber,
      'StaffID': this.StaffID




    }
    this.DigiofficeService.InsertBankDetails(eb).subscribe(

      data => {
        debugger

        Swal.fire('Saved Successfully')

      },
    )
  }



  public SaveVisaDetails() {
    debugger

    var eb = {

      'VisaType': this.VisaType == undefined ? null : this.VisaType,
      'VisaNumber': this.VisaNumber == undefined ? null : this.VisaNumber,
      'VisaIssueDate': this.VisaIssueDate == " " ? this.DOB : this.VisaIssueDate,
      'VisaExpiryDate': this.VisaExpiryDate == " " ? this.DOB : this.VisaExpiryDate,
      'StaffID': this.StaffID
    }
    this.DigiofficeService.InsertVisaDetails(eb).subscribe(
      data => {
        debugger
        Swal.fire('Saved Successfully')
        this.router.navigate(['/EmployeeDashboard']);
      },
    )
  }


  public SaveSalaryDetails() {
    debugger

    var eb1 = {
      'EmployeeName': this.EmployeeName,
      'Grade': this.Grade,
      'Designation': this.Designation,
      'PayRateType': this.PayRateType,
      'PayStructure': this.PayStructure,
      'EffectiveFromDate': this.EffectiveFromDate,
      'Reason': this.Reason,
      'StaffID': this.StaffID


    }
    this.DigiofficeService.InsertSalaryDetails(eb1).subscribe(

      data => {
        debugger


        Swal.fire('Saved Successfully')
        // this.router.navigate(['/EmployeeDashboard']);
      },
    )
  }


  public SaveAddressDetails() {
    debugger
    if (this.AddressType == " " || this.AddressType == undefined || this.AddressLine1 == " " || this.AddressLine1 == undefined ||
      this.CityID == " " || this.CityID == undefined || this.StateID == " " || this.StateID == undefined || this.CountryID == " " || this.CountryID == undefined ||
      this.Barangay == " " || this.Barangay == undefined || this.SubDistrictPostcode == " " || this.SubDistrictPostcode == undefined ||
      this.EmergencyContactName == "" || this.EmergencyContactName == undefined || this.EmergencyContactRelationship == "" || this.EmergencyContactRelationship == undefined
      || this.EmergencyContactMobileNumber == 0 || this.EmergencyContactMobileNumber == undefined) {
      Swal.fire('Please Fill All The Mandatory Fields')
    }
    else {
      var eb = {
        'AddressType': this.AddressType,

        'FindPlace': this.FindPlace == undefined ? null : this.FindPlace,
        'AddressLine1': this.AddressLine1,
        'AddressLine2': this.AddressLine2,
        'AddressLine3': this.AddressLine3,
        'AddressLine4': this.AddressLine4,
        'District': this.CityID,
        'Province': this.StateID,
        'Country': this.CountryID,
        'barangay': this.Barangay,
        'subDistrictPostcode': this.SubDistrictPostcode,
        'Mobile': this.Mobile1,
        'LandLineFax': this.LandLineFax,
        'IsCorrespondance': 0,
        'RequestType': this.RequestType,
        'EmergencyContactName': this.EmergencyContactName,
        'EmergencyContactRelationship': this.EmergencyContactRelationship,
        'EmergencyContactMobileNumber': this.EmergencyContactMobileNumber,
        'EmergencyContactOfficeNumber': this.EmergencyContactOfficeNumber,
        'EmergencyContactLandLineNumber': this.EmergencyContactLandLineNumber,
        'EmergencyContact_EmailID': this.EmergencyContact_EmailID,
        'EmergencyContact_Address': this.EmergencyContact_Address,
        'StaffID': this.StaffID




      }
      this.DigiofficeService.InsertMyAddressDetails(eb).subscribe(

        data => {
          debugger
          Swal.fire('Saved successfully.');
          // this.router.navigate(['/EmployeeDashboard']);

        },
      )
    }


  }

  public getRoleType(event: any) {
    debugger
    this.RoleType = event.target.value;
  }


  public SavePositionDetails() {
    debugger
    if (this.EmployeeCode == 0 || this.OfficialEmail == undefined || this.Band == " " || this.JobRole == undefined || this.EmployeeStatus == " " || this.NoticePeriod == " " || this.ProbationPeriod == " " || this.ConfirmationDueDate == " ") {
      Swal.fire('Please Fill All The Mandatory Fields')
    }
    else {
      var eb = {
        'EmployeeCode': this.EmployeeCode,
        'OfficialEmail': this.OfficialEmail,
        'Band': this.Band,
        'Grade': this.Grade2,
        'JobRole': this.JobRole,
        'Manager': this.Manager,
        'EmployeeType': this.EmployeeType == undefined ? null : this.EmployeeType,
        'EmployeeStatus': this.EmployeeStatus,
        'NoticePeriod': this.NoticePeriod,
        'ProbationPeriod': this.ProbationPeriod,
        'ConfirmationDueDate': this.ConfirmationDueDate == undefined ? " " : this.ConfirmationDueDate,
        'ConfirmationStatus': this.ConfirmationStatus,
        'EmployeeName': this.EmployeeName,
        'StaffID': this.StaffID




      }
      this.DigiofficeService.InsertPositionDetails(eb).subscribe(

        data => {
          debugger

          Swal.fire('Saved Successfully')

        },
      )
    }

  }


  public UpdateDependentDetails() {
    debugger

    var eb = {
      'ID': this.StaffID,
      'DependentName': this.DependentName == undefined ? null : this.DependentName,
      'Relationship': this.Relationship1 == undefined ? null : this.Relationship1,
      'Gender': this.Gender1 == undefined ? null : this.Gender1,
      'DateOfBirth': this.DateOfBirth == " " ? this.DOB : this.DateOfBirth,
      'Address': this.Address == undefined ? null : this.Address,
      'Mobile': this.Mobile == undefined ? null : this.Mobile,
      'Is_Dependent': this.Is_Dependent == undefined ? 0 : this.Is_Dependent,
      'Id_Number': this.Id_Number == undefined ? null : this.Id_Number,
      'Is_Child_Adopted': this.Is_Child_Adopted == undefined ? 0 : this.Is_Child_Adopted,
      'Race': this.Race == undefined ? null : this.Race,
      'CitizenShip': this.CitizenShip == undefined ? null : this.CitizenShip,
      'Country_Of_Birth': this.cb == undefined ? null : this.cb,
      'Religion': this.Religion == undefined ? null : this.Religion,
      'Working_Status': this.Working_Status == undefined ? null : this.Working_Status,
      'Request_Type': this.Request_Type == undefined ? null : this.Request_Type,

    }
    this.DigiofficeService.UpdateDependentDetails(eb).subscribe(

      data => {
        debugger
        Swal.fire("Updated Successfully!!!")
        // location.reload();
      },
    )
  }


  public UpdateNomination() {
    debugger

    var eb = {
      'ID': this.StaffID,
      'Dependent': this.Dependent,
      'Percentage': this.Percentage,
      'NomineeType': this.NomineeType,
      'GuardianName': this.GuardianName,
      'GuardianRelationship': this.GuardianRelationship,




    }
    this.DigiofficeService.UpdateNomination(eb).subscribe(

      data => {
        debugger
        Swal.fire("Updated Successfully!!!")
        // location.reload();

      },
    )
  }

  public UpdateEmploymentDetails() {
    debugger

    var eb = {
      'StaffID': this.StaffID,
      'ComapanyName': this.ComapanyName,
      'Title': this.Title,
      'StartDate': this.StartDate,
      'EndDate': this.EndDate,
      'Salary': this.Salary,
      'CurrentEmployer': this.CurrentEmployer,




    }
    this.DigiofficeService.UpdateEmploymentDetails(eb).subscribe(

      data => {
        debugger
        Swal.fire("Updated Successfully!!!")
        // location.reload();
      },
    )
  }

  public UpdateEducationDetails() {
    debugger

    var eb = {
      'ID': this.StaffID,

      'EducationType': this.EducationType == undefined ? null : this.EducationType,
      'Qualification': this.Qualification == undefined ? null : this.Qualification,
      'NameOfQualification': this.NameOfQualification == undefined ? null : this.NameOfQualification,
      'Branch': this.Branch == undefined ? null : this.Branch,
      'InstitutionName': this.InstitutionName == undefined ? null : this.InstitutionName,
      'Country': this.Country == undefined ? null : this.Country,
      'ScoreType': this.ScoreType == undefined ? null : this.ScoreType,
      'Grade': this.EducationGrade == undefined ? null : this.EducationGrade,
      'StartDateMonth': this.StartDateMonth == " " ? this.DOB : this.StartDateMonth,
      'StartDateYear': this.StartDateMonth == " " ? this.DOB : this.StartDateMonth,
      'EndDateMonth': this.EndDateMonth == " " ? this.DOB : this.EndDateMonth,
      'EndDateYear': this.EndDateMonth == " " ? this.DOB : this.EndDateMonth,






    }
    this.DigiofficeService.UpdateEducationDetails(eb).subscribe(

      data => {
        debugger
        Swal.fire("Updated Successfully!!!")
        // location.reload();
      },
    )
  }

  public restdaysarray: any = [];
  public restdaysarray1: any = [];

  onItemSelect2(item: any) {
    debugger
    console.log(item);
    this.restdaysarray1.push(item)
  }



  public UpdateID_Details() {
    debugger

    var eb = {
      'ID': this.StaffID,

      'IDType': this.IDType,
      'Number': this.Number,
      'NameOnDocument': this.NameOnDocument,
      'IssueDate': this.IssueDate,
      'ExpiryDate': this.ExpiryDate,
      'IssuingAuthority': this.IssuingAuthority,
      'PlaceOfIssue': this.PlaceOfIssue,




    }
    this.DigiofficeService.UpdateID_Details(eb).subscribe(

      data => {
        debugger
        Swal.fire("Updated Successfully!!!")
        // location.reload();

      },
    )
  }

  public UpdateBankDetails() {
    debugger

    var eb = {
      'ID': this.StaffID,
      'NameOfBank': this.NameOfBank,
      'AccountHolderName': this.AccountHolderName,
      'BankAccountNumber': this.BankAccountNumber,





    }
    this.DigiofficeService.UpdateBankDetails(eb).subscribe(

      data => {
        debugger
        Swal.fire("Updated Successfully!!!")
        // location.reload();

      },
    )
  }



  public UpdateVisaDetails() {
    debugger

    var eb = {
      'ID': this.StaffID,

      'VisaType': this.VisaType == undefined ? null : this.VisaType,
      'VisaNumber': this.VisaNumber == undefined ? null : this.VisaNumber,
      'VisaIssueDate': this.VisaIssueDate == " " ? this.DOB : this.VisaIssueDate,
      'VisaExpiryDate': this.VisaExpiryDate == " " ? this.DOB : this.VisaExpiryDate,





    }
    this.DigiofficeService.UpdateVisaDetails(eb).subscribe(

      data => {
        debugger

        Swal.fire("Updated Successfully!!!")
        // location.reload();
      },
    )
  }


  public UpdateSalaryDetails() {
    debugger

    var eb1 = {
      'ID': this.StaffID,
      'EmployeeName': this.EmployeeName,
      'Grade': this.Grade,
      'Designation': this.Designation,
      'PayRateType': this.PayRateType,
      'PayStructure': this.PayStructure,
      'EffectiveFromDate': this.EffectiveFromDate,
      'Reason': this.Reason,
    }
    this.DigiofficeService.UpdateSalaryDetails(eb1).subscribe(

      data => {
        debugger

        Swal.fire("Updated Successfully!!!")
        // location.reload();
      },
    )
  }


  public UpdateMyAddressDetails() {
    debugger
    if (this.AddressType == " " || this.AddressType == undefined || this.AddressLine1 == " " || this.AddressLine1 == undefined ||
      this.CityID == " " || this.CityID == undefined || this.StateID == " " || this.StateID == undefined || this.CountryID == " " || this.CountryID == undefined ||
      this.Barangay == " " || this.Barangay == undefined || this.SubDistrictPostcode == " " || this.SubDistrictPostcode == undefined ||
      this.EmergencyContactName == "" || this.EmergencyContactName == undefined || this.EmergencyContactRelationship == "" || this.EmergencyContactRelationship == undefined
      || this.EmergencyContactMobileNumber == 0 || this.EmergencyContactMobileNumber == undefined) {
      Swal.fire('Please Fill All The Mandatory Fields')
    }
    else {
      var eb = {
        'ID': this.StaffID,
        'AddressType': this.AddressType,

        'FindPlace': this.FindPlace,
        'AddressLine1': this.AddressLine1,
        'AddressLine2': this.AddressLine2,
        'AddressLine3': this.AddressLine3,
        'AddressLine4': this.AddressLine4,
        // 'District': this.District,
        // 'Province': this.Province,
        // 'Country': this.Country1,
        'District': this.CityID,
        'Province': this.StateID,
        'Country': this.CountryID,
        'barangay': this.Barangay,
        'SubDistrictPostcode': this.SubDistrictPostcode,
        'Mobile': '9975766322',
        'LandLineFax': this.LandLineFax,
        'IsCorrespondance': this.IsCorrespondance,
        'RequestType': this.RequestType,
        'EmergencyContactName': this.EmergencyContactName,
        'EmergencyContactRelationship': this.EmergencyContactRelationship,
        'EmergencyContactMobileNumber': this.EmergencyContactMobileNumber,
        'EmergencyContactOfficeNumber': this.EmergencyContactOfficeNumber,
        'EmergencyContactLandLineNumber': this.EmergencyContactLandLineNumber,
        'EmergencyContact_EmailID': this.EmergencyContact_EmailID,
        'EmergencyContact_Address': this.EmergencyContact_Address,
      }
      this.DigiofficeService.UpdateMyAddressDetails(eb).subscribe(

        data => {
          debugger
          Swal.fire("Updated Successfully!!!")
          location.reload();
        },
      )
    }

  }



  public UpdatePositionDetails() {
    debugger
    if (this.EmployeeCode == 0 || this.OfficialEmail == undefined || this.Band == " " || this.Band == undefined || this.JobRole == undefined || this.EmployeeStatus == " " || this.EmployeeStatus == undefined || this.NoticePeriod == " " || this.NoticePeriod == undefined || this.ProbationPeriod == 0 || this.ProbationPeriod == undefined || this.ConfirmationDueDate == " " || this.ConfirmationDueDate == undefined) {
      Swal.fire('Please Fill All The Mandatory Fields')
    }
    else {
      var eb = {
        'ID': this.StaffID,
        'EmployeeCode': this.EmployeeCode,
        'OfficialEmail': this.OfficialEmail,
        'Band': this.Band,
        'Grade': this.Grade2,
        'JobRole': this.JobRole,
        'Manager': this.Manager,
        'EmployeeType': this.EmployeeType,
        'EmployeeStatus': this.EmployeeStatus,
        'NoticePeriod': this.NoticePeriod,
        'ProbationPeriod': this.ProbationPeriod,
        'ConfirmationDueDate': this.ConfirmationDueDate,
        'ConfirmationStatus': this.ConfirmationStatus,
        'EmployeeName': this.EmployeeName,

      }


      this.DigiofficeService.UpdatePositionDetails(eb).subscribe(

        data => {
          Swal.fire('Updated Successfully')
          // this.router.navigate(['/EmployeeForm']);

        },
      )
    }
  }

  unitdetailsarray: any = [];
  arrayid: any;
  public showtable: any;

  public insertdetails() {
    this.showtable = 1;
    debugger
    var stt = {

      'ComapanyName': this.ComapanyName,
      'Title': this.Title,
      'StartDate': this.StartDate,
      'EndDate': this.EndDate,
      'Salary': this.Salary
    }
    this.unitdetailsarray.push(stt);
    this.arrayid = this.arrayid + 1;
  }




  public cancel() {
    debugger
    location.reload();
  }




  Provincelist: any;
  CountryID: any;
  public GetCountryID(event: any) {
    this.CountryID = event.target.value;
    this.DigiofficeService.GetStateType().subscribe(data => {
      debugger
      this.Provincelist = data.filter(x => x.countryID == this.CountryID)
    })
  }

  StateID: any;
  CityID: any;
  Citylist: any;
  Barangay: any;
  public GetProvinceID(event: any) {
    this.StateID = event.target.value;
    this.DigiofficeService.GetCityType().subscribe(data => {
      debugger
      this.Citylist = data.filter(x => x.stateID == this.StateID)
    })
  }
  show: any;

  public GetCItyID(event: any) {
    debugger
    this.CityID = event.target.value;
    if (this.CityID == 103) {
      this.show = 1;
    } else {
      this.show = 2;
    }

  }

  onItemSelect(item: any) {
    debugger
    console.log(item);
    this.Supervisor = item.id
    this.Supervisor1 = item.id

    this.DigiofficeService.GetMyDetails().subscribe(data => {
      debugger
      this.supervisorlist12 = data.filter(x => x.id == this.Supervisor);

      this.Department = this.supervisorlist12[0].department
    });
  }

  public getAssignedCompany() {
    debugger
    this.DigiofficeService.GetMyDetails().subscribe(data => {
      debugger
      this.supervisorlist = data.filter(x => x.type == 2 && x.assignedCompany == this.AssignedCompany);
      this.loader = false;
    });
  }

}