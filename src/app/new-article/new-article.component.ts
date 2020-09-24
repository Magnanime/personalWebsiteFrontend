import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormBuilder} from '@angular/forms';
import {ArticlePayload} from './article-payload';
import {AddPostService} from '../article-service.service';
import {Router} from '@angular/router';
import { TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';

@Component({
  selector: 'app-new-article',
  templateUrl: './new-article.component.html',
  styleUrls: ['./new-article.component.css']
})
export class NewArticleComponent implements OnInit {

  addPostForm: FormGroup;
  articlePayload: ArticlePayload;

  constructor(private formBuilder:FormBuilder, private addpostService: AddPostService, private router: Router) {
    this.addPostForm = this.formBuilder.group({
      title: '',
      body: '',
      desc: ''
    });
    this.articlePayload = {
      id: '',
      content: '',
      desc: '',
      title: '',
      username: ''
    }
  }

  ngOnInit() {
  }

  addPost() {
    this.articlePayload.content = this.addPostForm.get('body').value;
    this.articlePayload.desc = this.addPostForm.get('desc').value;
    console.log(this.articlePayload.content);
    this.articlePayload.title = this.addPostForm.get('title').value;
    this.addpostService.addPost(this.articlePayload).subscribe(data => {
      this.router.navigateByUrl('/');
    }, error => {
      console.log('Failure Response');
    })
  }
}