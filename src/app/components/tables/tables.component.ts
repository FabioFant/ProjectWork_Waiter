import { Component, OnDestroy, OnInit } from '@angular/core';
import { WaiterService } from '../../services/waiter.service';
import Table from '../../models/Table';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { interval, Subscription, switchMap } from 'rxjs';
import { enviroment } from '../../../enviroments/enviroment';

@Component({
  selector: 'app-tables',
  imports: [CommonModule, RouterLink],
  templateUrl: './tables.component.html',
  styleUrl: './tables.component.css'
})
export class TablesComponent implements OnInit, OnDestroy {
  private polling!: Subscription;

  tables: Table[] = [];
  available = '?';
  occupied = '?';
  loading = true;

  constructor(private waiterService: WaiterService)
  {
    this.waiterService.GetAllTables().subscribe({
      next: r => {this.updateData(r); this.loading = false},
      error: err => {console.error('Fetch error:', err); this.loading = false}
    });
  }

  updateData(data: Table[]) 
  {
    this.tables = data;
    const count = this.tables.filter(t => t.occupied).length;
    this.occupied = count.toString();
    this.available = (this.tables.length - count).toString();
  }

  ngOnInit() 
  {
    this.polling = interval(enviroment.pollingInterval)
      .pipe(
        // New request while ignoring the previous one if it hasn't completed yet
        switchMap(() => this.waiterService.GetAllTables())
      )
      .subscribe({
        next: r => this.updateData(r),
        error: err => console.error('Polling error:', err)
      });
  }

  ngOnDestroy() 
  {
    if( this.polling ) {
      this.polling.unsubscribe();
    }
  }
}
