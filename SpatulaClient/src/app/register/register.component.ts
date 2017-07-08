import { Component, OnInit } from '@angular/core';
import {User} from './../model/User.model';
import { HelperService} from './../shared/helper.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  private showAlertUsername : boolean;
  private showAlertEmail : boolean;
  private showAlertPassword : boolean;
  private alertMessage : string;
  private html :string = "";

  constructor(private user:User , private helperService : HelperService) {

    this.showAlertUsername = false;
    this.showAlertEmail = false;
    this.showAlertPassword = false;
    this.alertMessage = "this field is required";

  }

  ngOnInit() {}

  singupUser(event:any){
    event.preventDefault();
    if(this.valid()){
      this.user.singup(this.user ,(response , error)=>{

        if(error)
          this.html = this.helperService.notify("danger" , "Couldn't register user , someting went wrong with the proces , please try it again");
        else if(response.userExist)
          this.html = this.helperService.notify("info" , "This email is in use , please enter another email");
        else
          this.html = this.helperService.notify("success" , "You have been succesfull registed , please confirm your email account ");
      });
    }
  }

  valid(){
    if(this.user.getUsername().length <= 0 || this.user.getUsername() === ""){
      this.showAlertUsername = true;
      this.alertMessage = "This Filed Is Required";
      return false;
    }else if(this.user.getEmail().length <= 0 || this.user.getEmail() === ""){
      this.showAlertEmail = true;
      this.alertMessage = "This Filed Is Required";
      return false;
    }else if(this.user.getPassword().length <= 0 || this.user.getPassword() === ""){
      this.showAlertPassword = true;
      this.alertMessage = "This Filed Is Required";
      return false;

    }else if(!HelperService.isValidEmail(this.user.getEmail())){
      this.showAlertEmail = true;
      this.alertMessage = "Enter a valid email address";
      return false;
    }else
      return true;
  }
}
