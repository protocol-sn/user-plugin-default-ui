import {inject, Injectable} from '@angular/core';
import {AuthConfig, OAuthService} from "angular-oauth2-oidc";
import {Router} from "@angular/router";
import {environment} from '../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserService} from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly oidcSecurityService = inject(OAuthService);
  private readonly httpClient = inject(HttpClient);
  public roles: string[] = [];
  public sub: string = "";
  public userName: string = "";

  authCodeFlowConfig: AuthConfig = {
    // Url of the Identity Provider
    issuer: environment.oauthIssuer,

    // URL of the SPA to redirect the user to after login
    redirectUri: window.location.origin,

    // The SPA's id. The SPA is registerd with this id at the auth-server
    // clientId: 'server.code',
    clientId: environment.oauthClientId,

    // Just needed if your auth server demands a secret. In general, this
    // is a sign that the auth server is not configured with SPAs in mind
    // and it might not enforce further best practices vital for security
    // such applications.
    // dummyClientSecret: 'secret',

    responseType: 'code',

    // set the scope for the permissions the client should request
    // The first four are defined by OIDC.
    // Important: Request offline_access to get a refresh token
    // The api scope is a usecase specific one
    // scope: 'openid profile email offline_access api',
    scope: 'openid profile email offline_access roles',

    showDebugInformation: true,
  };

  async initialize(userService: UserService) {
    console.log("initializing...");
    this.oidcSecurityService.loadDiscoveryDocumentAndTryLogin().then(r => {});
    this.oidcSecurityService.events
      .forEach(event => {
        console.log(event);
        if (event.type === 'token_received') {
          this.oidcSecurityService.loadUserProfile()
            .then((value:Record<string, any>) => {
              this.loadUser();
              userService.setUser(this.sub);
            });
        }
        else if(event.type === 'token_expires') {
          //TODO: implement some sort of refresh logic e.g. warn the user
          this.oidcSecurityService.refreshToken();
        }
      })
      .then(value => {
        console.log(value);
      })
      .finally(() => {});
  }

  constructor(router: Router) {
    this.oidcSecurityService.configure(this.authCodeFlowConfig);
  }

  login(redirectRoute: string = '/') {
    this.oidcSecurityService.initLoginFlow();
    return new Observable<boolean>(subscriber => subscriber.next(true));
  }

  logout() {
    this.oidcSecurityService.logOut();
  }

  isAuthenticated() {
    return this.oidcSecurityService.hasValidIdToken() && this.oidcSecurityService.hasValidAccessToken();
  }

  getAccessToken() {
    return this.oidcSecurityService.getAccessToken();
  }

  getIdentityData() {
    return this.oidcSecurityService.getIdentityClaims();
  }

  getScopes() {
    return this.oidcSecurityService.getGrantedScopes();
  }

  loadUser() {
    if (this.isAuthenticated()) {
      if (!this.oidcSecurityService.discoveryDocumentLoaded) {
        this.oidcSecurityService.loadDiscoveryDocument()
          .then(value => {
            this.setValuesFromUserProfile();
          });
      }
      else {
        this.setValuesFromUserProfile();
      }
    }
  }

  private setValuesFromUserProfile() {
    this.oidcSecurityService.loadUserProfile().then((value: Record<string, any>) => {
      console.log("got user profile");
      console.log(value);
      this.roles = value['info'].realm_access.roles;
      this.sub = value['info'].sub;
      this.userName = value['info'].preferred_username;
    });
  }
}
