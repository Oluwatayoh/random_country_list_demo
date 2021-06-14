import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-table',
  templateUrl: './search-table.component.html',
  styleUrls: ['./search-table.component.css']
})
export class SearchTableComponent implements OnInit {


  searchInput;

  constructor() { }

  ngOnInit(): void {
  }


  search() {
    // if (this.searchInput != "") {
    //   this.countryService.getCountriesByName(this.searchInput).subscribe(data => {
    //     const ct = JSON.stringify(data);
    //     this.countries = JSON.parse(ct);
    //   });
    // } else {
    //   this.countryService.getAllCountires().subscribe(data => {
    //     const ct = JSON.stringify(data);
    //     this.countries = JSON.parse(ct);
    //   });
    // }

  }
}
