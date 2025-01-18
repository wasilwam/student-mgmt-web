import { Routes } from '@angular/router';
import {AuthLayoutComponent} from './layouts/auth-layout/auth-layout.component';
import {LoginComponent} from './pages/login/login.component';
import {MainLayoutComponent} from './layouts/main-layout/main-layout.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {UploadComponent} from './pages/upload/upload.component';
import {GenerateComponent} from './pages/generate/generate.component';
import {ManageComponent} from './pages/manage/manage.component';
import {ReportComponent} from './pages/report/report.component';
import {ProcessComponent} from './pages/process/process.component';
import {ViewStudentComponent} from './pages/manage/view-student/view-student.component';
import {EditStudentComponent} from './pages/manage/edit-student/edit-student.component';
import {AuthGuard} from './shared/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
    ],
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'generate', component: GenerateComponent },
      { path: 'process', component: ProcessComponent },
      { path: 'upload', component: UploadComponent },
      { path: 'manage', component: ManageComponent },
      { path: 'manage/view/:id', component: ViewStudentComponent },
      { path: 'manage/edit/:id', component: EditStudentComponent },
      { path: 'report', component: ReportComponent },
    ],
  },
  { path: '**', redirectTo: '/login' },
];
