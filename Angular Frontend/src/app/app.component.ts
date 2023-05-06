import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { SearchService } from '../search.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  data$!: Observable<any[]>;
  searchResults: any[] = [];
  domainResults: any[] = [];
  query = '';

  constructor(private apiService: ApiService, private searchService: SearchService) {}

  ngOnInit() {
    this.data$ = this.apiService.getData();
    this.search();
    // This functionality is still to-be fixed
    // this.insertDomain();
  }

  search() {
    this.searchService.search(this.query).subscribe((data: any) => {
      this.searchResults = data.items;
      this.domainResults = data.items.map((item: any) => item.displayLink);
      console.log(this.domainResults);
    });
  }

  insertDomain() {
    this.apiService.insertDomain(this.domainResults[1]).subscribe(() => {
      console.log(`Inserted ${this.domainResults[1]} into database`);
    });
  }

}
