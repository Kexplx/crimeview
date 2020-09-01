import { Component } from '@angular/core';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-search-details',
  templateUrl: './search-details.component.html',
  styleUrls: ['./search-details.component.scss'],
})
export class SearchDetailsComponent {
  search$ = this.searchService.search$;

  constructor(private searchService: SearchService) {}
}
