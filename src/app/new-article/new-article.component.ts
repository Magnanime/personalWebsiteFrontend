import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ArticlePayload} from './article-payload';
import {AddPostService} from '../article-service.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-new-article',
  templateUrl: './new-article.component.html',
  styleUrls: ['./new-article.component.css']
})
export class NewArticleComponent implements OnInit {

  addPostForm: FormGroup;
  articlePayload: ArticlePayload;
  title = new FormControl('');
  body = new FormControl('');

  constructor(private addpostService: AddPostService, private router: Router) {
    this.addPostForm = new FormGroup({
      title: this.title,
      body: this.body
    });
    this.articlePayload = {
      id: '',
      content: '',
      title: '',
      username: ''
    }
  }

  ngOnInit() {
  }

  addPost() {
    this.articlePayload.content = this.addPostForm.get('body').value;
    this.articlePayload.title = this.addPostForm.get('title').value;
    this.addpostService.addPost(this.articlePayload).subscribe(data => {
      this.router.navigateByUrl('/');
    }, error => {
      console.log('Failure Response');
    })
  }
}