import { Component, OnInit } from '@angular/core';
import {MainNewsService} from '../../../services/main-news.service';
import {Post} from '../../../interfaces/post';
import {CategoriesService} from '../../../services/categories.service';
import {Category} from '../../../interfaces/category';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  categories: Category[];
  category: string;
  errorMessage: string;
  isImportant: boolean;
  post: Post;
  photo: any;

  constructor(
    private postService: MainNewsService,
    private categoryService: CategoriesService,
    
  ) { }

  ngOnInit() {
    this.isImportant = false;
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

  save(category, title, intro, content){
    var photoName = this.makeid();
    this.postService.uploadPhoto(this.photo, photoName).subscribe();
    this.postService.addPost(category, title, intro, content, photoName + '.jpeg', this.isImportant).subscribe(() => {console.log('sent')});
  }

  fileChange(event) {
    let fileList: FileList = event.target.files;
    this.photo = fileList[0];
  }



}
