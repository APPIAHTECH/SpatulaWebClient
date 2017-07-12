import { Component, OnInit } from '@angular/core';
import {UserDataService} from './../shared/UserData.service';
import {HelperService} from './../shared/helper.service';
import {User} from './../model/User.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private userAccesToken : string;
  private canRender:boolean = false;

  constructor(private user:User , private request:UserDataService , private helperService : HelperService) {
    this.userAccesToken = helperService.getLocalStorageUserToken();
    if(this.userAccesToken){
      this.canRender = true;
      this.user.setaAccesToken(this.userAccesToken);
      this.user.getData();
    }

  }

  ngOnInit() { }

}
