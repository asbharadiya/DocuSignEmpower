import { Injectable } from '@angular/core';

@Injectable()
export class ContractDataService {

  contractData: any = {
    templateId: '',
    info: {}
  };

  constructor() { }

  setTemplate(templateId: any): void {
    this.contractData.templateId = templateId;
  }

  getTemplate(): string {
    return this.contractData.templateId;
  }

  setInfo(info: any): void {
    this.contractData.info = info;
  }

  getInfo(): any {
    return this.contractData.info;
  }

  isInfoValid(): boolean {
    if (Object.keys(this.contractData.info).length === 0) {
      return false;
    }
    for (const t of this.contractData.info) {
      for (const r of t) {
        if (r.name === '' || r.email === '') {
          return false;
        }
      }
    }
    return true;
  }


}
