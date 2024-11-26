import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { EmployeeModel } from './model/Employee';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  employeeForm: FormGroup = new FormGroup({});
  employeeObj: EmployeeModel = new EmployeeModel();
  employeeList: EmployeeModel[] = [];

  constructor() {
    this.createForm();
    debugger;
    const oldData = localStorage.getItem("EmpData");
    if (oldData != null) {
      const parseData = JSON.parse(oldData);
      this.employeeList = parseData;
    }
  }

  createForm() {
    this.employeeForm = new FormGroup({
      empid: new FormControl(this.employeeObj.empId),
      name: new FormControl(this.employeeObj.name),
      city: new FormControl(this.employeeObj.city),
      address: new FormControl(this.employeeObj.address), // Fixed capitalization
      contactNo: new FormControl(this.employeeObj.contactNo),
      emailId: new FormControl(this.employeeObj.emailId),
      pincode: new FormControl(this.employeeObj.pincode),
      state: new FormControl(this.employeeObj.state)
    });
  }

  onSave() {
    debugger;
    const oldData = localStorage.getItem("EmpData");
    if (oldData != null) {
      const parseData = JSON.parse(oldData);
      // Increment empid based on the number of existing entries
      this.employeeForm.controls['empId'].setValue(parseData.length + 1);
      this.employeeList.unshift(this.employeeForm.value);
    } else {
      // For the first entry, set empid as 1
      this.employeeForm.controls['empId'].setValue(1);
      this.employeeList.unshift(this.employeeForm.value);
    }
    // Save to localStorage
    localStorage.setItem("EmpData", JSON.stringify(this.employeeList));
  }
onEdit(item: EmployeeModel) {
  this.employeeObj = item;
  this.createForm()
}
onUpdate() {
  const record= this.employeeList.find(m=>m.empId == this.employeeForm.controls['empId'].value);
  if(record!= undefined){
    record.address = this.employeeForm.controls['address'].value;
    record.name = this.employeeForm.controls['name'].value;
    record.contactNo = this.employeeForm.controls['contactNo'].value;
    record.emailId = this.employeeForm.controls['EmailId'].value;
    record.city = this.employeeForm.controls['city'].value;
    record.state = this.employeeForm.controls['state'].value;
    record.pincode = this.employeeForm.controls['pincode'].value;
  }
  localStorage.setItem("EmpData", JSON.stringify(this.employeeList));
  this.employeeObj = new EmployeeModel();
  this.createForm();
}
}
