import { Component, OnInit } from '@angular/core';
import {User} from './../model/User.model';
import { HelperService} from './../shared/helper.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private showAlertEmail : boolean;
  private showAlertPassword : boolean;
  private alertMessage : string;
  private html :string = "";

  constructor(private user:User , private helperService : HelperService) {

    this.showAlertEmail = false;
    this.showAlertPassword = false;
    this.alertMessage = "this field is required";
  }

  ngOnInit() {
  }

  loginUser() {
    event.preventDefault();
    if(this.valid()){
      this.user.login(this.user ,(response , error)=>{
        if(error){
          this.html = this.helperService.notify("danger" , "Someting went wrong with the proces , please try it again");
          return;
        }

          if(response.find && response.passwordMathed){
            localStorage.setItem('tokenAcces' , response.tokenAcces);
            this.helperService.redirectTo('/home');
          }else if(response.find === false){
            this.html = this.helperService.notify("warning" , "Cant find user, please singup to create an account ");
          }else if (response.passwordMathed === false){
            this.html = this.helperService.notify("info" , "Bad credentials , make sure username and password are correct");
          }


      });
    }
  }

  valid(){
    if(this.user.getEmail().length <= 0 || this.user.getEmail() === ""){
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
