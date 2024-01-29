import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { Domaine, Festival } from './model_api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {


constructor(private appService: AppService) { }

title = 'angular-nodejs-example';

ngOnInit() {}

}
