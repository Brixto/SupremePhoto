import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SwipePage } from './swipe/swipe.page';

const routes: Routes = [
  { path: '', redirectTo: 'swipe', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'swipe', component: SwipePage}  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
