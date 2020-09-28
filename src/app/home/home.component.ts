import { Component, OnInit } from '@angular/core';
import {AddPostService} from '../article-service.service';
import {Observable} from 'rxjs';
import {ArticlePayload} from '../new-article/article-payload';
import { map } from 'rxjs/internal/operators/map';
import { Router } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeUrl, SafeValue } from '@angular/platform-browser';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  articles: Observable<Array<ArticlePayload>>;
  olderUrl: string;
  newerUrl: string;
  constructor(private sanitize: DomSanitizer ,private postService: AddPostService, private httpClient: HttpClient) { }

  ngOnInit() {
    this.articles = this.postService.getAllPosts().pipe(
      map((result: any)=>{
        if (result._links.hasOwnProperty("next")) {
          this.olderUrl = result._links.next.href;
        }
        if (result._links.hasOwnProperty("prev")){
          this.newerUrl = result._links.prev.href;
        }
        console.log(result);
        //this.olderUrl = result._links.next.href;
        return result._embedded.article;
      }));

  }

  sanitizePath(articlePayload: ArticlePayload){
    console.log(articlePayload.thumbnailPath);
    console.log(this.sanitize.bypassSecurityTrustResourceUrl(articlePayload.thumbnailPath));
    return this.sanitize.bypassSecurityTrustResourceUrl("http://"+articlePayload.thumbnailPath);
  }

  olderPage() {
    this.articles = this.httpClient.get(this.olderUrl).pipe(
      map((result:any)=>{
        if (result._links.hasOwnProperty("next")) {
          this.olderUrl = result._links.next.href;
        } else {
          this.olderUrl = null;
        }
        if (result._links.hasOwnProperty("prev")){
          this.newerUrl = result._links.prev.href;
        } else {
          this.newerUrl = null;
        }
        return result._embedded.article;
      })
    )
  }

  newerPage() {
    this.articles = this.httpClient.get(this.newerUrl).pipe(
      map((result:any)=>{
        if (result._links.hasOwnProperty("next")) {
          this.olderUrl = result._links.next.href;
        } else {
          this.olderUrl = null;
        }
        if (result._links.hasOwnProperty("prev")){
          this.newerUrl = result._links.prev.href;
        } else {
          this.newerUrl = null;
        }
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