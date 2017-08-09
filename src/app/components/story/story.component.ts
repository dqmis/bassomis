import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {MainNewsService} from '../../services/main-news.service';
import {Post} from '../../interfaces/post';

@Component({
  moduleId: module.id.toString(),
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css']
})
export class StoryComponent implements OnInit {
  post: Post;
  postId: string;
  errorMessage: string;
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private postController: MainNewsService
  ) {
      if (window.matchMedia("(min-width: 1800px)").matches) {
        document.body.style.backgroundImage = "url('/assets/background.png')";
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundSize = "contain";
      } 
  }

  ngOnInit() {
    this.getId();
    this.getPostInfo();
  }

  getId(){
    this.activatedRoute.params.subscribe((params: Params) => {
        let postId = params['id'];
        return this.postId = postId;
    });
  }

  getPostInfo(){
    this.postController.getPostById(this.postId).subscribe(
      post =>{
        this.post = post;
      },
      error => this.errorMessage = <any>error
    );
  }

  ngOnDestroy(){
    document.body.style.backgroundImage = "none";
  }
}
