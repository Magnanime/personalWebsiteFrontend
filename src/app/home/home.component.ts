import { Component, OnInit } from '@angular/core';
import {AddPostService} from '../article-service.service';
import {Observable} from 'rxjs';
import {ArticlePayload} from '../new-article/article-payload';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  articles: Observable<Array<ArticlePayload>>;
  constructor(private postService: AddPostService) { }

  ngOnInit() {
    this.articles = this.postService.getAllPosts();
  }

}