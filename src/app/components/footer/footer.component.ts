import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  date: string;

  constructor() { }

  ngOnInit() {
    this.getDate(new Date());
  }

  getDate(date){
     return this.date = date.getFullYear();
  }

}
