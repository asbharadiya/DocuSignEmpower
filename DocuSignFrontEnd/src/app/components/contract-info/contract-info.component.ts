import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { ContractDataService } from '../../services/contract-data.service';

@Component({
  selector: 'app-contract-info',
  templateUrl: './contract-info.component.html',
  styleUrls: ['./contract-info.component.css']
})
export class ContractInfoComponent implements OnInit {

  recipients = [];
  recipientsKeys: any[] = [];

  constructor(private contractDataService: ContractDataService, private restService: RestService) { }

  ngOnInit() {
    this.getRecipientsFields();
  }

  getRecipientsFields(): void {
    this.restService.getRecipientsFields(this.contractDataService.getTemplate()).subscribe((data: any) => {
      // TODO: loop through object, then loop through array, then set name and email to empty
      for (const cat of data) {
        for (const rec of cat) {
          rec.name = '';
          rec.email = '';
        }
      }
      this.contractDataService.setInfo(data);
      this.getContractDataInfo();
    }, error => {
      // this._alert.create('error', 'There was some error in fetching your farms');
    });
  }

  getContractDataInfo(): any {
    this.recipients = this.contractDataService.getInfo();
    this.recipientsKeys = Object.keys(this.recipients);
  }

  isArray(val: any): boolean {
    if (val !== null && val.constructor === Array) {
      return true;
    } else {
      return false;
    }
  }

}
