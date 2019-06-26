import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { 
  MatButtonModule,
  MatCheckboxModule,
  MatSidenavModule,
  MatToolbarModule
} from '@angular/material';

@NgModule({
    declarations: [
        ToolbarComponent,
        SidebarComponent
    ],
    exports: [
        ToolbarComponent,
        SidebarComponent
    ],
    imports: [
        CommonModule,
        MatButtonModule,
        MatCheckboxModule,
        MatSidenavModule,
        MatToolbarModule
    ]
})
export class AppLayoutModule { }
