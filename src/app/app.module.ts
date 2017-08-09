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
import { FroalaEditorModule, FroalaViewModule } from 'angular2-froala-wysiwyg';
import { UserService } from './services/user.service';
 
import {CategoriesService} from './services/categories.service';
import {MainNewsService} from './services/main-news.service';
import { CreatePostComponent } from './components/Admin/create-post/create-post.component';
import { EditPostComponent } from './components/Admin/edit-post/edit-post.component';
import { PostsListComponent } from './components/Admin/posts-list/posts-list.component';
import { FooterComponent } from './components/footer/footer.component';
import { PlatformComponent } from './components/platform/platform.component';
import { FullNavbarComponent } from './components/full-navbar/full-navbar.component';
import { CategoryPostsComponent } from './components/category-posts/category-posts.component';
import { LazyLoadImageModule } from 'ng2-lazyload-image';
import { AboutComponent } from './components/about/about.component';
import { UsersComponent } from './components/Admin/users/users.component';
import { AuthGuard } from './guards/auth.guard';

const appRoutes: Routes = [
  {path: '', component: MainNewsComponent},
  {path: 'story/:id', component: StoryComponent},
  {path: 'category/:id', component: CategoryPostsComponent},
  {path: 'login', component: LoginComponent},
  {path: 'admin', redirectTo: 'admin/categories', pathMatch: 'full', canActivate: [AuthGuard]},
  {path: 'admin/categories', component: CategoriesComponent, canActivate: [AuthGuard]},
  {path: 'admin/posts', component: PostsListComponent, canActivate: [AuthGuard]},
  {path: 'admin/posts/create', component: CreatePostComponent, canActivate: [AuthGuard]},
  {path: 'admin/posts/edit/:id', component: EditPostComponent, canActivate: [AuthGuard]},
  {path: 'admin/users', component: UsersComponent, canActivate: [AuthGuard]},
  {path: '**', redirectTo: ''}
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
    CreatePostComponent,
    EditPostComponent,
    PostsListComponent,
    FooterComponent,
    PlatformComponent,
    FullNavbarComponent,
    CategoryPostsComponent,
    AboutComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    LazyLoadImageModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [CategoriesService, MainNewsService, UserService, AuthGuard],
  bootstrap: [AppComponent]
})



export class AppModule { }
