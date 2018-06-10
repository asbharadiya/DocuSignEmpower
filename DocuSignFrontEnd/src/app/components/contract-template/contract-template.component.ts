import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { ContractDataService } from '../../services/contract-data.service';

@Component({
  selector: 'app-contract-template',
  templateUrl: './contract-template.component.html',
  styleUrls: ['./contract-template.component.css']
})
export class ContractTemplateComponent implements OnInit {

  templates: any[] = [];

  constructor(private contractDataService: ContractDataService, private restService: RestService) { }

  ngOnInit() {
    this.getTemplates();
  }

  selectTemplate(index: any): void {
    this.templates[index].selected = true;
    this.contractDataService.setTemplate(this.templates[index].templateId);
  }

  getTemplates(): void {
    this.restService.getTemplates().subscribe((data: any) => {
      this.templates = data.envelopeTemplates;
    }, error => {
      // this._alert.create('error', 'There was some error in fetching your farms');
    });
  }

}
