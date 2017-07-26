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

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit() {
    this.getCategories();
  }

  getCategories(){
    this.categoriesService.getCategories().subscribe(
      categories =>{
        this.categories = categories;
      },
      error => this.errorMessage = <any>error
    )
  }

  delete(id: Category, index){
    this.categoriesService.sendToDelete(id._id).subscribe();
    this.getCategories();
  }


  onSelect(category: Category): void{
    this.selectedCategory = category;
  }

  addCategory(title: string): void{
    title = title.slice(0,19);
    console.log(title);
    this.categoriesService.addCategory(title).subscribe();
    this.getCategories();
  }

  afterFocus(category: Category){
    category.title = category.title.slice(0, 19);
    this.categoriesService.editCategory(category).subscribe();
  }
}
