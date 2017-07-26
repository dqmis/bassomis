import { Component, OnInit, Input } from '@angular/core';
import {MainNewsService} from '../../services/main-news.service';
import {Post} from '../../interfaces/post';
import {CategoriesService} from '../../services/categories.service';
import {Category} from '../../interfaces/category';

@Component({
  selector: 'app-new-posts',
  templateUrl: './new-posts.component.html',
  styleUrls: ['./new-posts.component.css']
})
export class NewPostsComponent implements OnInit {
  @Input() category: Category;
  posts: Post[];
  err: string;

  constructor(
    private postService: MainNewsService,
    private CategoriesService: CategoriesService
  ) { }

  ngOnInit() {
    this.getposts();
  }

  getposts(){
    this.postService.getPostsbyCategoryL(this.category._id).subscribe(
      posts => {
        this.posts = posts;
      },
      err => {
        this.err = err;
      }
    )
  }

}
