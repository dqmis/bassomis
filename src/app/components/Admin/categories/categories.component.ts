import { Component, OnInit } from '@angular/core';
import {CategoriesService} from '../../../services/categories.service';
import {Category} from '../../../interfaces/category';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
   categories: Category[];
   errorMessage: string;
   selectedCategory: Category;
   newCat: Category;

  constructor(private categoriesService: CategoriesService) {

  }

  ngOnInit() {
    this.getCategories();
  }

  afterFocusEdit(){
    this.selectedCategory = null;
  }

  getCategories(){
    this.categoriesService.getCategories().subscribe(
      categories =>{
        this.categories = categories;
      },
      error => this.errorMessage = <any>error
    )
  }

  delete(id: string){
    this.categories = this.categories.filter(item => item._id !== id);
    this.categoriesService.sendToDelete(id).subscribe();
  }


  onSelect(category: Category): void{
    this.selectedCategory = category;
  }

  addCategory(title: string, about: string): void{
    title = title.slice(0,19);
    var cat = {title: title, about: about, _id: '5'};
    this.categories.push(cat);
    this.categoriesService.addCategory(title, about).subscribe();
  }

  afterFocus(category: Category){
    category.title = category.title.slice(0, 19);
    this.categoriesService.editCategory(category).subscribe();
  }
}
