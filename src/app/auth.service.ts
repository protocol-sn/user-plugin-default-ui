import {inject, Injectable} from '@angular/core';
import {AuthConfig, OAuthService} from "angular-oauth2-oidc";
import {Router} from "@angular/router";
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly oidcSecurityService = inject(OAuthService);

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

  constructor(router: Router) {
    this.oidcSecurityService.configure(this.authCodeFlowConfig);
    this.oidcSecurityService.loadDiscoveryDocumentAndTryLogin();
  }

  login(redirectRoute: string = '/') {
    this.oidcSecurityService.initLoginFlow();
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
}
