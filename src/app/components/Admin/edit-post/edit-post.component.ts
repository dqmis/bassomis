import { Component, OnInit } from '@angular/core';
import {MainNewsService} from '../../../services/main-news.service';
import {Post} from '../../../interfaces/post';
import {CategoriesService} from '../../../services/categories.service';
import {Category} from '../../../interfaces/category';
import { ActivatedRoute, Params } from '@angular/router';
import {Router} from '@angular/router';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {
  categories: Category[];
  post: Post;
  category: string;
  postId: string;
  errorMessage: string;
  errorBox: boolean;
  isImportant: boolean;
  sucessBox: boolean;
  photo: any;
  public editorContent: string

  constructor(
    private postService: MainNewsService,
    private categoryService: CategoriesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.getId();
    this.getCategories();
    this.getPost();
  }

  getPost(){
    this.postService.getPostById(this.postId).subscribe(
      post => {
        this.post = post;
        this.editorContent = post.content;
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

  getCategories(){
    this.categoryService.getCategories().subscribe(
      categories => {
        this.categories = categories;
      }
    )
  }
  

  fileChange(event) {
    let fileList: FileList = event.target.files;
    this.photo = fileList[0];
  }

  save(title, intro){
    if(title && intro && this.editorContent){
      var photoTitle = this.post.image;
      if(this.photo){
        this.postService.deltePhoto(this.post.image).subscribe();
        photoTitle = 'https://s3.amazonaws.com/bassomisbicket/photos/' + this.photo.name;
        this.postService.uploadPhoto(this.photo).subscribe();
      }
      if(!this.category){
        this.category = this.post.category;
      }
      this.postService.updatePost(this.post._id, this.category, title, intro, this.editorContent,  photoTitle, this.isImportant).subscribe(() => {console.log('sent')});
      this.errorBox = false;
      this.sucessBox = true;
      setTimeout(()=>{this.router.navigateByUrl('/admin/posts');}, 2000);
    }
    else{
      this.errorBox = true;
      setTimeout(()=> {this.errorBox = false}, 2000 )
    }
  }


  

}
