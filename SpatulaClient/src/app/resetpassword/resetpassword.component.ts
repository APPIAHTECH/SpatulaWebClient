import { Component, OnInit } from '@angular/core';
import {User} from './../model/User.model';
import { HelperService} from './../shared/helper.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {

  private showAlertEmail : boolean;
  private alertMessage : string;
  private html :string = "";

  constructor(private user:User , private helperService : HelperService) {
    this.showAlertEmail = false;
    this.alertMessage = "this field is required";
  }

  ngOnInit() {
  }

  resetPassword(event:any){
    event.preventDefault();
    if(this.valid()){
      this.user.resetPassword(this.user , (response , error)=>{
        if(error)
          this.html = this.helperService.notify("danger" , "Someting went wrong with the proces , please try it again");
          if(!response.find)
            this.html = this.helperService.notify("warning" , "This email address dosent exist");
          else if(response.toVerifyPasswordRestor)
            this.html = this.helperService.notify("success" , "We have send you a confirmation key");
      });
    }
  }

  valid(){
    if(this.user.getEmail().length <= 0 || this.user.getEmail() === ""){
      this.showAlertEmail = true;
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
