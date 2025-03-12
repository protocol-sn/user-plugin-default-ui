import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly authService: AuthService = inject(AuthService);

  public doSecurePUT<T>(url: string, accept: string = "application/json", body: any = null) {

    let headers = new HttpHeaders();
    headers = headers.set('Accept', accept);
    headers = headers.set('Authorization', 'Bearer ' + this.authService.getAccessToken());
    return this.http.put<T>(url, body, {headers: headers, observe: "response"})
  }

  public doSecureGET<T>(url: string, accept: string = "application/json") {

    let headers = new HttpHeaders();
    headers = headers.set('Accept', accept);
    headers = headers.set('Authorization', 'Bearer ' + this.authService.getAccessToken());

    return this.http
      .get<T>(url, { headers: headers, observe: "response"} )
  }

  public doUnsecureGET(url: string, accept: string = "application/json") {

    let headers = new HttpHeaders();
    headers.set('Accept', 'text/json');

    return this.http
      .get(url, { headers: headers })
  }

  public doSecurePOST<T>(url: string, accept: string = "application/json", body: any = null) {
    let headers = new HttpHeaders();
    headers = headers.set('Accept', accept);
    headers = headers.set('Authorization', 'Bearer ' + this.authService.getAccessToken());
    headers = headers.set('Content-Type', 'application/json');
    return this.http.post<T>(url, body, {headers: headers, observe: "response"})
  }

  doSecureDELETE<T>(url: string, accept: string = "application/json") {
    let headers = new HttpHeaders();
    headers = headers.set('Accept', accept);
    headers = headers.set('Authorization', 'Bearer ' + this.authService.getAccessToken());
    return this.http.delete<T>(url, {headers: headers, observe: "response"})
  }
}
