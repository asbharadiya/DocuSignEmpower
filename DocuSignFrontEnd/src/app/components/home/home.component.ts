import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContractDataService } from '../../services/contract-data.service';
import { RestService } from '../../services/rest.service';
import { ModalService } from '../../modal/modal.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private contractDataService: ContractDataService,
              private restService: RestService, private modalService: ModalService) { }

  ngOnInit() {
  }

  prev(): void {
    this.contractDataService.setTemplate('');
    this.router.navigate(['/home/template']);
  }

  next(): void {
    if (this.router.routerState.snapshot.url === '/home/template') {
      this.router.navigate(['/home/information']);
    } else if (this.router.routerState.snapshot.url === '/home/information') {
      this.modalService.open('payment-modal');
    }
  }

  createAndSendEnvelope(): void {
    this.restService.createAndSendEnvelope(this.contractDataService.getInfo(), this.contractDataService.getTemplate())
      .subscribe((data: any) => {
        this.router.navigate(['/home/done']);
        // TODO: should empty contract data after success
        // this.contractDataService.setTemplate('');
        // this.contractDataService.setInfo({});
      }, error => {
        // this._alert.create('error', 'There was some error in saving the proposal');
      });
  }

  closePaymentModal(): void {
    this.modalService.close('payment-modal');
  }

  isPrevShown(): boolean {
    if (this.router.routerState.snapshot.url === '/home/information') {
      return true;
    }
    return false;
  }

  isNextShown(): boolean {
    if (this.router.routerState.snapshot.url === '/home/template' && this.contractDataService.getTemplate() !== '') {
      return true;
    } else if (this.router.routerState.snapshot.url === '/home/information' && this.contractDataService.isInfoValid()) {
      return true;
    }
    return false;
  }

}
