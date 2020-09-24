import { Component, OnInit } from '@angular/core';
import {AddPostService} from '../article-service.service';
import {Observable} from 'rxjs';
import {ArticlePayload} from '../new-article/article-payload';
import { map } from 'rxjs/internal/operators/map';
import { Router } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  articles: Observable<Array<ArticlePayload>>;
  nextUrl: string;
  prevUrl: string;
  constructor(private postService: AddPostService, private httpClient: HttpClient) { }

  ngOnInit() {
    this.articles = this.postService.getAllPosts().pipe(
      map((result: any)=>{
        this.nextUrl = result._links.next.href;
        return result._embedded.article;
      }));

  }

  nextPage() {
    this.articles = this.httpClient.get(this.nextUrl).pipe(
      map((result:any)=>{
        this.nextUrl = result._links.next.href;
        return result._embedded.article;
      })
    )
  }

}

interface GetArticleResponse {
  _embedded: {
      bookList: ArticlePayload[];
      _links: {self: {href: string}};
  };
}