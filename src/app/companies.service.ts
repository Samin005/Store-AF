import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CompaniesService {
    currentCompanyName: string;

    constructor() {
    }

    setCurrentCompany(companyName) {
        this.currentCompanyName = companyName;
    }

    getCurrentCompany() {
        return this.currentCompanyName;
    }
}
