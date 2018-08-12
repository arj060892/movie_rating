import { Component, OnInit } from '@angular/core';
import { IMovie } from '../helpers/models/movie.model';
import * as movies from 'app/helpers/data/movie-list.json';
import { Utility } from '../helpers/utility';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  movies: IMovie[] = movies;
  movieResultSet: IMovie[] = [];
  sortByAsc = true;
  pageSize = 10;
  pageCount: number;
  pagination = [];
  constructor() {
    this.pageCount = Math.ceil(this.movies.length / this.pageSize);
  }
  ngOnInit() {
    this.bindMovieList();
  }

  bindMovieList() {
    for (let index = 0; index < this.pageSize; index++) {
      this.movieResultSet.push(this.movies[index]);
    }
    for (let index = 0; index < this.pageCount; index++) {
      this.pagination.push(index + 1);

    }
  }
  sort(sortOn) {
    Utility.sort(this.movieResultSet, sortOn, this.sortByAsc);
    this.sortByAsc = !this.sortByAsc;
  }
  search(searchControl: HTMLInputElement) {
    const searchString = searchControl.value.trim();
    if (searchString === '') {
      this.movieResultSet = this.movies;
      return;
    }
    this.movieResultSet = Utility.search(this.movies, 'movie', searchControl.value.trim());
  }
  onPageChanged(pageSelected: number) {
    this.movieResultSet = [];
    const startIndex = this.pageSize * (pageSelected - 1);
    for (let index = startIndex; index < (this.pageSize * pageSelected); index++) {
      // tslint:disable-next-line:curly
      if (this.movies[index])
        this.movieResultSet.push(this.movies[index]);
    }
  }

}
