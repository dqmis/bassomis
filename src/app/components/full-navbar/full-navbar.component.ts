import { Component, OnInit } from '@angular/core';
import {CategoriesService} from '../../services/categories.service';
import {Category} from '../../interfaces/category';
import * as $ from 'jquery';

@Component({
  selector: 'app-full-navbar',
  templateUrl: './full-navbar.component.html',
  styleUrls: ['./full-navbar.component.css']
})
export class FullNavbarComponent implements OnInit {
  categories: Category[];

  constructor(private catService: CategoriesService) { 
          $(document).scroll(function () {
        var $nav = $(".navbar-fixed-top");
        $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
      });
  }

  ngOnInit() {
    this.getCategories();
  }


  getCategories(){
    this.catService.getCategories().subscribe(
      cat => {
        this.categories = cat;
      }
    )
  }

}
