import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables/src/angular-datatables.directive';
import { Subject } from 'rxjs';
import { CountriesService } from 'src/services/data.service';



@Component({
  selector: 'app-table-data',
  templateUrl: './table-data.component.html',
  styleUrls: ['./table-data.component.css']
})
export class TableDataComponent implements OnInit {

  //@ts-ignore
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  dtTrigger: Subject<any> = new Subject();
  dtOptions: any = {};
  countries: [] = [];



  constructor(private countryService: CountriesService) { }

  ngOnInit(): void {

    this.dtOptions = {
      pagingType: 'simple_numbers',
      pageLength: 10,
      serverSide: true,
      responsive: true,
      processing: true,
      ordering: false,
      language: {
        emptyTable: 'No data available'
      },
      ajax: (request: any, callback) => {
        this.countryService.getAllCountires(request).subscribe(data => {
          this.countries = data.data.data;
          console.log(this.countries)
          callback({
            recordsTotal: data.data.total,
            recordsFiltered: data.data.total,
            data: []
          });
        });
      },
    };

  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }
}


