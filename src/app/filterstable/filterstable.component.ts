import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
  Output,
  EventEmitter
} from '@angular/core';
import * as _ from 'lodash';
import { FormGroup, FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'filterstable',
  templateUrl: './filterstable.component.html',
  styleUrls: ['./filterstable.component.css']
})
export class FilterstableComponent implements OnInit, OnChanges {
  @Input('data') data: any[];

  @Output('filterChanged') filterChanged = new EventEmitter();
  @Output('filterReset') filterReset = new EventEmitter();

  displayedColumns: string[] = [
    'id',
    'name',
    'state',
    'city',
    'type',
    'action'
  ];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  names: string[];
  states: string[];
  cities: string[];
  types: string[];

  searchInput: FormControl = new FormControl('');

  searchFormGroup = new FormGroup({
    selectedNames: new FormControl(''),
    selectedStates: new FormControl(''),
    selectedCities: new FormControl(''),
    selectedTypes: new FormControl(''),
    nameSearchInput: new FormControl(' '),
    stateSearchInput: new FormControl(' '),
    citySearchInput: new FormControl(' '),
    typeSearchInput: new FormControl(' ')
  });

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.data.currentValue) {
      console.log('Current Value: ', changes.data.currentValue);
      this.dataSource = new MatTableDataSource(changes.data.currentValue);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      }, 100);
    }

    if (
      changes &&
      changes.data.previousValue == null &&
      changes.data.currentValue
    ) {
      this.initFilters();
    }
  }

  initFilters() {
    this.getStoreNames();
    this.getStates();
    this.getCities();
    this.getTypes();
  }

  getStoreNames() {
    this.names = _.uniq(
      this.data.map(d => d.name),
      'name'
    ).sort();
    console.log('Store names: ', this.names);
  }

  getStates() {
    this.states = _.uniq(
      this.data.map(d => d.state),
      'state'
    ).sort();
    console.log('Store states: ', this.states);
  }

  getCities() {
    this.cities = _.uniq(
      this.data.map(d => d.city),
      'city'
    ).sort();
    console.log('Store Cities: ', this.cities);
  }

  getTypes() {
    this.types = _.uniq(
      this.data.map(d => d.brewery_type),
      'brewery_type'
    ).sort();
    console.log('Types: ', this.types);
  }

  updateFilters(toggled: boolean) {
    if (!toggled) {
      this.filterChanged.emit(this.searchFormGroup.value);
    }
  }

  resetFilter() {
    this.searchFormGroup.reset();
    this.filterReset.emit();
  }

  applySearchFilter(event: Event) {
    console.log("From search: ", event);
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
