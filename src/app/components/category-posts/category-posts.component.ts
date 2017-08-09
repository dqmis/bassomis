import { Component, OnInit, Input } from '@angular/core';
import {MainNewsService} from '../../services/main-news.service';
import { ActivatedRoute, Params } from '@angular/router';
import {Post} from '../../interfaces/post';
import {CategoriesService} from '../../services/categories.service';
import {Category} from '../../interfaces/category';

@Component({
  selector: 'app-category-posts',
  templateUrl: './category-posts.component.html',
  styleUrls: ['./category-posts.component.css']
})
export class CategoryPostsComponent implements OnInit {
  catId: string;
  posts: Post[];
  category: Category;

  constructor(
    private catServie: CategoriesService,
    private activatedRoute: ActivatedRoute,
    private postService: MainNewsService
  ) { 
      if (window.matchMedia("(min-width: 1800px)").matches) {
        document.body.style.backgroundImage = "url('/assets/background.png')";
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundSize = "contain";
      }
  }

  ngOnInit() {
    this.getPosts();
    this.getCategory();
  }

  getId(){
    this.activatedRoute.params.subscribe((params: Params) => {
        let catId = params['id'];
        return this.catId = catId;
    });
  }

  getCategory(){
    this.catServie.getCategoryById(this.catId).subscribe(
      cat => {
        this.category = cat
      }
    )
  }

  getPosts(){
    this.getId();
    this.postService.getPostsByCategory(this.catId).subscribe(
      posts => {
        this.posts = posts;
      }
    )
  }

  ngOnDestroy(){
    document.body.style.backgroundImage = "none";
  }

}
