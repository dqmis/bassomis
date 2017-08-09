import { Component, OnInit } from '@angular/core';
import {MainNewsService} from '../../../services/main-news.service';
import {Post} from '../../../interfaces/post';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit {
  posts: Post[];
  errorMessage: string;

  constructor(private postService: MainNewsService) { }

  ngOnInit() {
    this.getPostList();
  }

  getPostList(){
    this.postService.getPosts().subscribe(
      posts => {
        this.posts = posts;
      },
      error => {
        this.errorMessage = error;
      }
    );
  }

  deletePost(post: Post){
    this.postService.deltePhoto(post.image).subscribe();
    this.postService.sendToDelete(post._id).subscribe();
    this.posts = this.posts.filter(item => item._id !== post._id);
  }

}
