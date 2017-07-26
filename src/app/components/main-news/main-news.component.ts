import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {MainNewsService} from '../../services/main-news.service';
import {Post} from '../../interfaces/post';


@Component({
  moduleId: module.id.toString(),
  selector: 'app-main-news',
  templateUrl: './main-news.component.html',
  styleUrls: ['./main-news.component.css'],
})
export class MainNewsComponent implements OnInit {
  posts: Post[];
  importantPosts: Post[] = [];
  errorMessage: string;
  post: Post;
  imgSrc: string;

  constructor(private mainPostService: MainNewsService) { }

  ngOnInit() {
    this.getPosts();
  }

  getPosts(){
    this.mainPostService.getPosts().subscribe(
      post =>{
        this.posts = post;
        this.selectImportantPosts();
      },
      error => this.errorMessage = <any>error
    )
  }

  selectImportantPosts(){
    for(let object of this.posts){
      if(object.isImportant == true){
        this.importantPosts.push(object);
      }
    }
  }

}
