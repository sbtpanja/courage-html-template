import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommingSoonComponent } from './component/comming-soon/comming-soon.component';
import { HomeComponent } from './component/home/home.component';
import { LayoutComponent } from './component/layout/layout.component';
import { NotFoundComponent } from './component/not-found/not-found.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      { path: '', component: HomeComponent }
    ]
  },
  { path: '**', component: CommingSoonComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
