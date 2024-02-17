import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPanelComponent } from 'src/app/areas/list/list-panel/list-panel.component';
import { ComixEditorComponent } from 'src/app/areas/edition/comix-editor/comix-editor.component';
import { EditionGuardGuard } from 'src/app/areas/edition/edition-guard.guard';

const routes: Routes = [
    { path: '', component: ListPanelComponent },
    { path: 'list', component: ListPanelComponent },
    { path: 'edition/:id', component: ComixEditorComponent, canActivate: [EditionGuardGuard] }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule { }
