import { Component, OnInit } from '@angular/core';
import {MainNewsService} from '../../../services/main-news.service';
import {Post} from '../../../interfaces/post';
import {CategoriesService} from '../../../services/categories.service';
import {Category} from '../../../interfaces/category';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {
  categories: Category[];
  post: Post;
  postId: string;
  errorMessage: string;

  constructor(
    private postService: MainNewsService,
    private categoryService: CategoriesService,
    private activatedRoute: ActivatedRoute 
  ) { }

  ngOnInit() {
    this.getId();
    this.getPost();
  }

  getPost(){
    this.postService.getPostById(this.postId).subscribe(
      post => {
        this.post = post;
      },
      error => {
        this.errorMessage = error;
      }
    );
  }

  getId(){
    this.activatedRoute.params.subscribe((params: Params) => {
        let postId = params['id'];
        return this.postId = postId;
    });
  }

}
