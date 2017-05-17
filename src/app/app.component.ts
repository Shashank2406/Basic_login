import { Component } from '@angular/core';
import { FacebookService, InitParams,LoginResponse, LoginOptions} from 'ngx-facebook';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular Login Page';
  data;
  ap;
  token;
  img;
  frnd;
  constructor(private fb: FacebookService) {
 
    let initParams: InitParams = {
      appId: '1411172165617274',
      version: 'v2.9'
    };
 
    fb.init(initParams);
 
  }
   login() {
    const loginOptions: LoginOptions = {
      enable_profile_selector: true,
      return_scopes: true,
      scope: 'public_profile,user_friends,email,pages_show_list'
    };
    this.fb.login(loginOptions)
      .then((res: LoginResponse) => {
        console.log('Logged in', res);
        this.data=res.authResponse.userID
        this.token=res.authResponse.accessToken;
        
      })
      .catch(this.handleError);
     // this.getLoginStatus();

  }
  private handleError(error) {
    console.error('Error processing action', error);
  }
  getLoginStatus() {
    this.ap='/'+this.data+'/friends'+'/?access_token='+this.token;
    console.log(this.ap)
    this.fb.api(this.ap).then((response)=>{
        console.log(response)
        this.frnd=response.summary.total_count;
    })
    this.fb.api('/me?fields=gender,first_name,last_name,email')
      .then((res: any) => {
        // console.log('Got the users profile', res);
        this.img=res;
        console.log(this.img)
      })
      .catch(this.handleError);
    this.fb.api('/me')
      .then((res: any) => {
        // console.log('Got the users profile', res);
        this.img=res.name;
      })
      .catch(this.handleError);
  }
  logout(){
  this.fb.logout().then((res) => console.log(res
  ));
  }
     
}
