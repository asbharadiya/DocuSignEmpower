import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { ModalService } from '../../modal/modal.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  envelopes: any[] = [];
  envelopeEvents: any[] = [];

  constructor(private restService: RestService, private modalService: ModalService) { }

  ngOnInit() {
    this.getHistory();
  }

  getHistory(): void {
    this.restService.getHistory().subscribe((data: any) => {
      this.envelopes = data.folderItems;
    }, error => {
      // this._alert.create('error', 'There was some error in fetching your farms');
    });
  }

  viewEvents(index: any): void {
    this.restService.getEnvelopeEvents(this.envelopes[index].envelopeId).subscribe((data: any) => {
      this.envelopeEvents = data.auditEvents;
      this.modalService.open('events-modal');
    }, error => {
      // this._alert.create('error', 'There was some error in fetching your farms');
    });
  }

  closeEventsModal(): void {
    this.modalService.close('events-modal');
    this.envelopeEvents = [];
  }

}
