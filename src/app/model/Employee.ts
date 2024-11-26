export class EmployeeModel {
    empId: number;
    name: string;
    city: string;
    state: string;
    emailId: string;
    contactNo: string
    address: string;
    pincode: string

    constructor() {
        this.address = '';
        this.city = '';
        this.contactNo = '';
        this.name = '';
        this.emailId = '';
        this.empId = 0;
        this.state = '';
        this.pincode = '';

    }
}