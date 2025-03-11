import { Routes } from '@angular/router';
import {HomeScreenComponent} from './home-screen/home-screen.component';
import {PendingApprovalComponent} from './pending-approval/pending-approval.component';
import {PendingVerificationComponent} from './pending-verification/pending-verification.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeScreenComponent },
  {
    path: 'pendingApproval',
    component: PendingApprovalComponent,
  },
  {
    path: 'pendingVerification',
    component: PendingVerificationComponent,
  },
];
