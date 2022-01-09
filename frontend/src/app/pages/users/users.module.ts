import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllUsersComponent } from './containers/all-users/all-users.component';
import { CreateUserComponent } from './containers/create-user/create-user.component';
import { EditUserComponent } from './containers/edit-user/edit-user.component';
import { RouterModule, Routes } from '@angular/router';
import { UsersTableComponent } from './components/users-table/users-table.component';
import { UsersFormComponent } from './components/users-form/users-form.component';
import { UserDetailsComponent } from './containers/user-details/user-details.component';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { BadgeModule } from 'primeng/badge';
import { UserDaysTableComponent } from './components/user-days-table/user-days-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { UserProfileComponent } from './containers/user-profile/user-profile.component';
import { ToHoursPipe } from 'src/app/core/pipes/hours.pipe';
import { CreateUserFormComponent } from './components/create-user-form/create-user-form.component';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { UserProfileDaysTableComponent } from './components/user-profile-days-table/user-profile-days-table.component';
import { RadioButtonModule } from 'primeng/radiobutton';
import { LoadingComponent } from 'src/app/shared/components/loading/loading.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ConversionPipe } from 'src/app/core/pipes/conversion.pipe';
import { AuthGuard } from 'src/app/core/auth/auth.guard';
import { AdminGuard } from 'src/app/core/auth/admin.guard';
import { CalendarModule } from 'primeng/calendar';


const routes: Routes = [
  {
    path: '',
    component: AllUsersComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'my-profile',
    component: UserProfileComponent
  },
  {
    path: 'create',
    component: CreateUserComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'edit/:userId',
    component: EditUserComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'details/:userId',
    component: UserDetailsComponent,
    canActivate: [AdminGuard]
  }
]

@NgModule({
  declarations: [
    AllUsersComponent,
    CreateUserComponent,
    CreateUserFormComponent,
    EditUserComponent,
    UsersTableComponent,
    UsersFormComponent,
    UserProfileDaysTableComponent,
    UserDetailsComponent,
    UserDaysTableComponent,
    UserProfileComponent,
    ToHoursPipe,
    ConversionPipe,
    LoadingComponent
  ],
  imports: [
    CommonModule,
    ProgressSpinnerModule,
    RouterModule.forChild(routes),
    PaginatorModule,
    FormsModule,
    CalendarModule,
    ReactiveFormsModule,
    ConfirmDialogModule,
    TableModule,
    RadioButtonModule,
    ButtonModule,
    RippleModule,
    BadgeModule,
    InputTextModule,
    ToastModule
  ]
})
export class UsersModule {
}
