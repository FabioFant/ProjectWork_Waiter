import { Component } from '@angular/core';
import { QRCodeComponent } from 'angularx-qrcode';
import { WaiterService } from '../../services/waiter.service';
import { TableDetailComponent } from '../table-detail/table-detail.component';

@Component({
  selector: 'app-qr-code',
  standalone: true,
  imports: [QRCodeComponent],
  templateUrl: './qr-code.component.html',
  styleUrl: './qr-code.component.css'
})
export class QrCodeComponent {
  qrData = 'https://storage.googleapis.com/pw2025/';
}