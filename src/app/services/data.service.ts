import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, from, of } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { IPost } from '../models/PostModel';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(public router: Router, private http: HttpClient) {}
  postsURL = 'https://jsonplaceholder.typicode.com/todos';
  usersURL = 'https://jsonplaceholder.typicode.com/users';
  currentActivatedRoute = 'surveyform';
  pageSize = 20;

  //RXJS-Playground
  getTodos() {
    const usersUrl = 'https://jsonplaceholder.typicode.com/users';
    const postsUrl = 'https://jsonplaceholder.typicode.com/posts';

    this.http
      .get<any[]>(usersUrl)
      .pipe(
        switchMap((users) => {
          // For each user, make a separate HTTP request to get their posts
          const userPostsRequests = users.map((user) =>
            this.http.get<any[]>(`${postsUrl}?userId=${user.id}`)
          );
          // Combine the results of all requests into a single observable
          return forkJoin(userPostsRequests).pipe(
            map((postsByUser) => {
              // Combine the user data with their posts
              const usersWithPosts = users.map((user, index) => ({
                ...user,
                posts: postsByUser[index].map((posts) => {
                  const { userId, ...others } = posts;
                  return others;
                }),
              }));
              return usersWithPosts;
            })
          );
        })
      )
      .subscribe((usersWithPosts) => {
        // Process the data here
        console.log(usersWithPosts);
      });
  }

  //RXJS-Pagination-Challenge
  getPosts(pageNumber: number, pageSize: number): Observable<IPost[]> {
    const postsURL = 'https://jsonplaceholder.typicode.com/posts';
    const startIndex = (pageNumber - 1) * pageSize;

    const params = {
      _start: startIndex.toString(),
      _limit: pageSize.toString(),
    };

    return this.http.get<IPost[]>(postsURL, { params });
  }
}
