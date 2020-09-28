import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Response} from '@angular/http';
import {ArticlePayload} from './new-article/article-payload';
import {Observable} from 'rxjs';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class AddPostService {

  constructor(private httpClient: HttpClient) {
  }

  addPost(articlePayload: ArticlePayload){
    return this.httpClient.post('http://localhost:8080/api/articles/', articlePayload);
  }

  getAllPosts(): Observable<JSON>{
    return this.httpClient.get<JSON>("http://localhost:8080/api/articles?page=0&size=2&sort=createdOn,desc");
  }

  getPost(permaLink: Number):Observable<ArticlePayload>{
    return this.httpClient.get<ArticlePayload>('http://localhost:8080/api/articles/' + permaLink);
  }
}