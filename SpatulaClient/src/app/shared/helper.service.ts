import { Injectable } from '@angular/core';

@Injectable()
export class HelperService {

  constructor() { }

  static isValidEmail(email:string):boolean{

    if(email.length <=0) return false;
    if(!email.includes('@') || !email.includes('.')) return false;

    let mail= email.split('@') , domain , i , count = 0 , pos;
    if(mail.length > 2) return false;

    for(i = 0 ; i < mail[1].length; i++){
      if(mail[1].charAt(i) == '.') count++;
      if(count >= 2) return false;
    }

    pos = mail[1].indexOf('.')+1;
    domain = mail[1].substring(pos);
    if(domain.length <= 1) return false;

    return true;
  }

  getLocalStorageUserToken():any{
    if(!localStorage.getItem('tokenAcces')){
      this.redirectTo('/login');
      return false;
    }else
      return localStorage.getItem('tokenAcces');
  }

  notificationAlert(event):void{

    let alert = event.target;
    let div = event.path[1];
    div.style.opacity = "0";
    setTimeout(function(){ div.style.display = "none"; }, 600);
  }


  notify(notificationType:string , message:string):string{
    //<span class="closebtn">&times;</span>
    let type = ""
    let div = "";

    if(notificationType === "danger"){

      div = `<div class="notification-alert-red">
        ${message}
      </div>`;

    }else if(notificationType === "success"){
      div = `<div class="notification-alert-green">
        ${message}
      </div>`;
    }else if(notificationType === "info"){
       div = `<div class="notification-alert-blue">
        ${message}
      </div>`;
    }else if(notificationType === "warning"){
      div = `<div class="notification-alert-orange">
        ${message}
      </div>`;
    }

    return div;
  }

  public redirectTo(url:string):void{
    window.location.href = url;
  }

}
