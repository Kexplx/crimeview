import { Component } from '@angular/core';
import { CitySearchService } from '../city-search/city-search.service';

@Component({
  selector: 'app-search-details',
  templateUrl: './search-details.component.html',
  styles: [
    `
      .table-wrapper {
        overflow: auto;
        max-height: 40vh;
      }
    `,
  ],
})
export class SearchDetailsComponent {
  search$ = this.searchService.search$;

  constructor(private searchService: CitySearchService) {}
}
