import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormBuilder} from '@angular/forms';
import {ArticlePayload} from './article-payload';
import {AddPostService} from '../article-service.service';
import {Router} from '@angular/router';
import { TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import {ImageService} from '../image-service.service';
import { map } from 'rxjs/operators';

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-new-article',
  templateUrl: './new-article.component.html',
  styleUrls: ['./new-article.component.css']
})
export class NewArticleComponent implements OnInit {

  addPostForm: FormGroup;
  articlePayload: ArticlePayload;
  selectedFile: File;
  imageResponse: JSON;

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
  }

  constructor(private formBuilder:FormBuilder, private addpostService: AddPostService, private router: Router, private imageService: ImageService) {
    this.addPostForm = this.formBuilder.group({
      title: '',
      body: '',
      shortContent: ''
    });
    this.articlePayload = {
      id: '',
      content: '',
      shortContent: '',
      title: '',
      username: '',
      thumbnailPath: '',
      createdOn: '',
      updatedOn: ''
    }
  }

  ngOnInit() {
  }

  addPost() {
    this.articlePayload.createdOn = new Date().toISOString();
    this.articlePayload.updatedOn = new Date().toISOString();
    this.articlePayload.content = this.addPostForm.get('body').value;
    this.articlePayload.shortContent = this.addPostForm.get('shortContent').value;
    this.articlePayload.title = this.addPostForm.get('title').value;
    this.imageService.uploadImage(this.selectedFile).subscribe(data => {
      this.articlePayload.thumbnailPath = data['pathName'];
      this.addpostService.addPost(this.articlePayload).subscribe(data => {
        this.router.navigateByUrl('/');
      }, error => {
        console.log('Failure Response');
      })
    }, error => {
      console.log('Failure Response');
    })
  }
}