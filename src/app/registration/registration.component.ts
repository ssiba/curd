import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,Validators, FormArray } from '@angular/forms';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  regForm:FormGroup
  data:any=[];
  submitted=false;
   result: any = new Array<any[]>();
  itemArray: any;
  RowId : any;
  isEdit:boolean=false;
  constructor(public fb:FormBuilder,
    public router:Router
    ) { }

  ngOnInit() {
    this.regForm=this.fb.group({
      firstName: ['', [Validators.required,]],
      lastName: ['', [Validators.required,]],
      mobile: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      // result: [this.fb.array([]), []]
    })
  }
  get f() { return this.regForm.controls; }

  clearForm(){
    this.regForm.reset();
  }
  saveData(){
    this.submitted=true;
    // console.log(this.regForm.value);
    this.result.push(this.regForm.value)
    console.log(this.result)
    if (this.regForm.valid) {
      // this.router.navigate(['/login']);
      // console.log(this.regForm.value);
      this.regForm.reset();
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Your Registration  has been saved Successfully',
        showConfirmButton: false,
        timer: 1500
      })
    
    }else{
      alert('please fill all the data')
    }
    
  }
  // onSave(value){
  //   this.data.push(this.regForm.value);
  // }
  editForm(i){
    let data = this.result[i];
  this.RowId = i;
  //  data.firstName
   this.regForm.controls['firstName'].setValue(data.firstName);
   this.regForm.controls['lastName'].setValue(data.lastName);
   this.regForm.controls['mobile'].setValue(data.mobile);
   this.regForm.controls['email'].setValue(data.email);
   this.regForm.controls['password'].setValue(data.password);
   this.isEdit=true;

  }
  deleteForm(i) {
    this.result.splice(i,1);
    // console.log(i);
  }
  updateForm(){
    this.result[this.RowId] = this.regForm.value;
  this.RowId = '';
this.clearForm();
this.isEdit=false;

  }

  
  
  
}
