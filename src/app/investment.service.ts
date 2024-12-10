import { Injectable } from "@angular/core";
import { InvestmentInput } from "./investment-input.model";

@Injectable({providedIn: 'root'})
export class InvestmentService {
resultData?: {
  year: number;
  interest: number;
  valueEndOfYear: number;
  annuallnvestment: number;
  totallnterest: number;
  totalAmountInvested: number;
}[];

  calculateInvestmentResults(data: InvestmentInput) {
    const {initialInvestment, annualInvestment, expectedReturn, duration} = data;
    const annualData= [];
    let investmentValue = initialInvestment;

    for (let i = 0; i < duration; i++) {
      const year = i + 1;
      const interestEarnedInYear = investmentValue * (expectedReturn / 100);
      investmentValue += interestEarnedInYear + annualInvestment;
      const totallnterest = investmentValue - annualInvestment * year - initialInvestment;
      annualData.push({
        year: year,
        interest: interestEarnedInYear,
        valueEndOfYear: investmentValue,
        annuallnvestment: annualInvestment,
        totallnterest: totallnterest,
        totalAmountInvested: initialInvestment + annualInvestment * year,
      });
    }
    //this.resultsData.set(annualData);
    this.resultData = annualData;
  }
}
