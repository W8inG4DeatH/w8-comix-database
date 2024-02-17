import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';

import { UserComponent } from 'src/app/common-components/user/user.component';

@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        FormsModule
    ],
    declarations: [
        UserComponent
    ],
    exports: [
        UserComponent
    ]
})

export class CommonComponentsModule { }
