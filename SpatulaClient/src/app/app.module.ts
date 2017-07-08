import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { FooterComponent } from './footer/footer.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule }   from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { HelperService} from './shared/helper.service';
import { UserDataService} from './shared/UserData.service';
import { User} from './model/User.model';
import { HomeComponent } from './home/home.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { RestorPasswordComponent } from './restor-password/restor-password.component';

const routing: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'singup', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path : 'resetpassword' , component : ResetpasswordComponent},
  { path : 'restorpassword/:token' , component : RestorPasswordComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    FooterComponent,
    RegisterComponent,
    HomeComponent,
    ResetpasswordComponent,
    RestorPasswordComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routing),
    FormsModule,
    HttpModule,
    JsonpModule
  ],
  providers: [HelperService , UserDataService , User ],
  bootstrap: [AppComponent]
})
export class AppModule { }
