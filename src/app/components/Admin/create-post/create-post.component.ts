import { Component, OnInit } from '@angular/core';
import {MainNewsService} from '../../../services/main-news.service';
import {Post} from '../../../interfaces/post';
import {CategoriesService} from '../../../services/categories.service';
import {Category} from '../../../interfaces/category';
import {Router} from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  categories: Category[];
  category: string;
  errorMessage: string;
  errorBox: boolean;
  sucessBox: boolean;
  isImportant: boolean;
  post: Post;
  public editorContent: string
  photo: any;

  constructor(
    private postService: MainNewsService,
    private categoryService: CategoriesService,
    private router: Router
    
  ) { }

  ngOnInit() {
    this.isImportant = false;
    this.sucessBox = false;
    this.errorBox = false;
    this.getCategories();
  }

  

  getCategories(){
    this.categoryService.getCategories().subscribe(
      categories =>{
        this.categories = categories;
      },
      error => this.errorMessage = <any>error
    )
  }

  makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 40; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

     return text;
}

  save(category, title, intro){
    var photoName = this.makeid();

    if(category && title && intro && this.editorContent && this.photo){
      var photoTitle = 'https://s3.amazonaws.com/bassomisbucket/photos/' + this.photo.name;
      this.postService.uploadPhoto(this.photo).subscribe();
      this.postService.addPost(category, title, intro, this.editorContent,  photoTitle, this.isImportant).subscribe(() => {return 0});
      this.errorBox = false;
      this.sucessBox = true;
      setTimeout(()=>{      this.router.navigateByUrl('/admin/posts');}, 2000);

    }
    else{
      this.errorBox = true;
      setTimeout(()=> {this.errorBox = false}, 2000 )
    }
  }

  fileChange(event) {
    let fileList: FileList = event.target.files;
    this.photo = fileList[0];
  }

  alertBox(box){
    return box = false;
  }




}
