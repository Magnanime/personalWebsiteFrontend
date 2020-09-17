import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AddPostService} from '../article-service.service';
import {ArticlePayload} from '../new-article/article-payload';

// @ts-ignore
@Component({
  selector: 'app-post',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  article: ArticlePayload;
  permaLink: Number;

  constructor(private router: ActivatedRoute, private postService: AddPostService) {
  }

  ngOnInit() {
    this.router.params.subscribe(params => {
      this.permaLink = params['id'];
    });

    this.postService.getPost(this.permaLink).subscribe((data:ArticlePayload) => {
      this.article = data;
    },(err: any) => {
      console.log('Failure Response');
    })
  }

}