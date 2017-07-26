import { Component, OnInit } from '@angular/core';
import {CategoriesService} from '../../services/categories.service';
import {Category} from '../../interfaces/category';

@Component({
  selector: 'app-platform',
  templateUrl: './platform.component.html',
  styleUrls: ['./platform.component.css']
})
export class PlatformComponent implements OnInit {
  categories: Category[];
  err: string;

  constructor(
    private CategoriesService: CategoriesService
  ) { }

  ngOnInit() {
    this.getCategories();
  }

  getCategories(){
    this.CategoriesService.getCategories().subscribe(
      cat => {
        this.categories = cat;
      },
      err => {
        this.err = err;
      }
    )
  }



}
