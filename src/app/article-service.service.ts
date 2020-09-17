import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ArticlePayload} from './new-article/article-payload';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddPostService {

  constructor(private httpClient: HttpClient) {
  }

  addPost(articlePayload: ArticlePayload){
    return this.httpClient.post('http://localhost:8080/api/posts/', articlePayload);
  }

  getAllPosts(): Observable<Array<ArticlePayload>>{
    return this.httpClient.get<Array<ArticlePayload>>("http://localhost:8080/api/posts/all");
  }

  getPost(permaLink: Number):Observable<ArticlePayload>{
    return this.httpClient.get<ArticlePayload>('http://localhost:8080/api/posts/get/' + permaLink);
  }
}