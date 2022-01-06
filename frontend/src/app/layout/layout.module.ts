import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SidebarModule } from 'primeng/sidebar';
import { PasswordModule } from 'primeng/password';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { MessagesModule } from 'primeng/messages';
import { TableModule } from 'primeng/table';
import { MessageModule } from 'primeng/message';
import { CardModule } from 'primeng/card';
import { BadgeModule } from 'primeng/badge';
import { RippleModule } from 'primeng/ripple';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { RestrictedComponent } from '../shared/components/restricted-layout/restricted.component';
import { MainComponent } from './main/main.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';

export const routes: Routes = [

];
@NgModule({
  declarations: [
    RestrictedComponent,
    MainComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
  ],
  imports: [
    TableModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DialogModule,
    InputTextModule,
    ButtonModule,
    CardModule,
    RadioButtonModule,
    ConfirmDialogModule,
    BadgeModule,
    RippleModule,
    PasswordModule,
    SidebarModule,
    RouterModule,
    MessagesModule,
    MessageModule,
    ToastModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    InputTextModule,
    TableModule,
    ButtonModule,
    RadioButtonModule,
    RippleModule,
    DialogModule,
    CardModule,
    BadgeModule,
    PasswordModule,
    SidebarModule,
    MessageModule,
    MessagesModule,
  ],
  providers: [ConfirmationService],
})
export class LayoutModule {}
