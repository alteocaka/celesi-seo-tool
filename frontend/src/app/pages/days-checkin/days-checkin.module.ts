import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DaysCheckinComponent } from './containers/days-checkin/days-checkin.component';
import { MessageModule } from 'primeng/message';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessagesModule } from 'primeng/messages';
import { Router, RouterModule, Routes } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {MenuModule} from 'primeng/menu';
import { ToObjectPipe } from 'src/app/core/pipes/toObject.pipe';
import { TableModule } from 'primeng/table';


const routes: Routes = [ {
  path: '',
  component: DaysCheckinComponent
}];

@NgModule({
  declarations: [DaysCheckinComponent, ToObjectPipe],
  imports: [
    CommonModule,
    MessageModule,
    MessagesModule,
    ButtonModule,
    InputTextModule,
    ConfirmDialogModule,
    OverlayPanelModule,
    MenuModule,
    TableModule,
    RouterModule.forChild(routes)
  ],
  exports: [ToObjectPipe],
})
export class DaysCheckinModule {}
