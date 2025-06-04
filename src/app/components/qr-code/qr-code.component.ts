import { Component } from '@angular/core';

import { WaiterService } from '../../services/waiter.service';
import { TableDetailComponent } from '../table-detail/table-detail.component';
import { QRCodeComponent } from 'angularx-qrcode';

@Component({
  selector: 'app-qr-code',
  standalone: true,
  imports: [QRCodeComponent],
  templateUrl: './qr-code.component.html',
  styleUrl: './qr-code.component.css'
})
export class QrCodeComponent {
  qrData = 'https://storage.googleapis.com/pw2025/';
  constructor(private waiterService: WaiterService){}

 //
}