import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { UserInputComponent } from './user-input/user-input.component';
import { InvestmentInput } from './investment-input.model';
import { InvestmentResultsComponent } from "./investment-results/investment-results.component";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [HeaderComponent, UserInputComponent, InvestmentResultsComponent, InvestmentResultsComponent]
})
export class AppComponent {
  resultsData?: {
    year: number;
    interest: number;
    valueEndOfYear: number;
    annuallnvestment: number;
    totallnterest: number;
    totalAmountInvested: number;
  }[];

  onCalculateInvestmentResults(data: InvestmentInput) {
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
    this.resultsData = annualData;
  }
}
