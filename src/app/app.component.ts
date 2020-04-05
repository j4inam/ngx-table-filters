import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'filters-demo';

  data$: Observable<any[]>;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.data$ = this.dataService.data$;
    this.dataService.getData().subscribe();
  }

  filterChanged(eventArgs: any) {
    console.log("Filter by: ", eventArgs);
    this.dataService.filterData(eventArgs);
  }

  resetFilters() {
    this.dataService.resetFilteredData();
  }
}
