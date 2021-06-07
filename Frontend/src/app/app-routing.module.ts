import { CategoriesComponent } from './components/categories/categories.component';
import { HomeComponent } from './components/home/home.component';
import { InstructorsComponent } from './components/instructors/instructors.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AreasComponent } from './components/areas/areas.component';
import { CoursesComponent } from './components/courses/courses.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'instructores', component: InstructorsComponent},
  { path: 'categories', component: CategoriesComponent},
  { path: 'areas', component: AreasComponent},
  { path: 'courses', component: CoursesComponent},
  { path: 'home', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
