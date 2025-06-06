import { Component } from '@angular/core';
import { WaiterService } from '../../services/waiter.service';
import Table from '../../models/Table';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tables',
  imports: [CommonModule, RouterLink],
  templateUrl: './tables.component.html',
  styleUrl: './tables.component.css'
})
export class TablesComponent {
  tables: Table[] = [];
  available = '?';
  occupied = '?';
  loading = true;

  constructor(private waiterService: WaiterService)
  {
    this.waiterService.GetAllTables().subscribe(r => {
      this.tables = r;
      let count = 0;
      this.tables.forEach(t => {
        if (t.occupied) {
          count++;
        }
      })

      this.occupied = count.toString();
      this.available = (this.tables.length - count).toString();
      this.loading = false;
    });
  }
}
