import { BrowserModule } from '@angular/platform-browser';
import { ModuleWithProviders } from '@angular/core';
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule }   from '@angular/forms';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MainNewsComponent } from './components/main-news/main-news.component';
import { NewPostsComponent } from './components/new-posts/new-posts.component';
import { StoryComponent } from './components/story/story.component';
import { LoginComponent } from './components/admin/login/login.component';
import { CategoriesComponent } from './components/admin/categories/categories.component';
import { AdminNavbarComponent } from './components/admin/admin-navbar/admin-navbar.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
 
import {CategoriesService} from './services/categories.service';
import {MainNewsService} from './services/main-news.service';
import { CreatePostComponent } from './components/Admin/create-post/create-post.component';
import { EditPostComponent } from './components/Admin/edit-post/edit-post.component';
import { PostsListComponent } from './components/Admin/posts-list/posts-list.component';
import { FooterComponent } from './components/footer/footer.component';
import { PlatformComponent } from './components/platform/platform.component';
import { FullNavbarComponent } from './components/full-navbar/full-navbar.component';

const appRoutes: Routes = [
  {path: '', redirectTo: 'main-news', pathMatch: 'full'},
  {path: 'main-news', component: MainNewsComponent, children: [
    {path: '', component: NewPostsComponent}
  ]},
  {path: 'story/:id', component: StoryComponent},
  {path: 'admin/login', component: LoginComponent},
  {path: 'admin', component: DashboardComponent},
  {path: 'admin/posts', component: PostsListComponent},
  {path: 'admin/posts/create', component: CreatePostComponent},
  {path: 'admin/posts/edit/:id', component: EditPostComponent},
];

export const aboutRouting: ModuleWithProviders = RouterModule.forChild(appRoutes);

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MainNewsComponent,
    NewPostsComponent,
    StoryComponent,
    LoginComponent,
    CategoriesComponent,
    AdminNavbarComponent,
    DashboardComponent,
    CreatePostComponent,
    EditPostComponent,
    PostsListComponent,
    FooterComponent,
    PlatformComponent,
    FullNavbarComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [CategoriesService, MainNewsService],
  bootstrap: [AppComponent]
})



export class AppModule { }
