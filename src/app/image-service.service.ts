import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { Http, HttpModule } from '@angular/http';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient) {}


  public uploadImage(image: File): Observable<JSON> {
    const formData = new FormData();
    formData.append('imageFile', image);
    return this.http.post<JSON>('http://localhost:8080/api/posts/image', formData);
  }
}
