export interface PsnUser {
  id: string;
  username: string;
  email: string;
  givenName: string;
  familyName: string;
  approved: boolean;
  verified: boolean;
  requestsVerification:boolean;
}
