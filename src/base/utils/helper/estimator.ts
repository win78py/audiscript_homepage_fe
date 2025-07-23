// // Calculate and round function
// const calculateAndRound = (value: number, fixed?: number): number => {
//   if (isNaN(value) || !isFinite(value)) {
//     return 0;
//   }
//   if (fixed) {
//     return Number(value.toFixed(fixed));
//   }
//   return Number(value);
// };

// // Round up to nearest thousand
// const roundUpToThousands = (num: number): number => {
//   return Math.ceil(num / 1000) * 1000;
// };

// // Calculate PPMT (Principal Payment)
// const PPMT = (rate: number, per: number, nper: number, pv: number, fv: number = 0, type: number = 0): number => {
//   const pmt = PMT(rate, nper, pv, fv, type);
//   const ipmt = IPMT(rate, per, nper, pv, fv, type);
//   return pmt - ipmt;
// };

// // Calculate IPMT (Interest Payment)
// const IPMT = (rate: number, per: number, nper: number, pv: number, fv: number = 0, type: number = 0): number => {
//   if (per <= 0 || per > nper) return 0;
//   const pmt = PMT(rate, nper, pv, fv, type);
//   let ipmt;
//   if (per === 1) {
//     ipmt = type === 1 ? 0 : -pv * rate;
//   } else {
//     ipmt = FV(rate, per - 1, pmt, pv, type) * rate;
//     if (type === 1) {
//       ipmt /= 1 + rate;
//     }
//   }
//   return ipmt;
// };

// // Calculate PMT (Payment)
// const PMT = (rate: number, nper: number, pv: number, fv: number = 0, type: number = 0): number => {
//   if (rate === 0) {
//     return -(pv + fv) / nper;
//   }
//   const pvif = Math.pow(1 + rate, nper);
//   let pmt = (rate / (pvif - 1)) * -(pv * pvif + fv);
//   if (type === 1) {
//     pmt /= 1 + rate;
//   }
//   return pmt;
// };

// // Calculate FV (Future Value)
// const FV = (rate: number, nper: number, pmt: number, pv: number, type: number = 0): number => {
//   const pow = Math.pow(1 + rate, nper);
//   let fv;
//   if (rate === 0) {
//     fv = -1 * (pv + pmt * nper);
//   } else {
//     fv = -1 * (pv * pow + (pmt * (1 + rate * type) * (pow - 1)) / rate);
//   }
//   return fv;
// };

// // Common function to calculate form values based on input data
// export const reCalculateEstimator = (inputData: any): any => {
//   // Default values for fields if not provided
//   const allValues = { ...inputData };

//   const newCarPrice = allValues?.newCarPrice || 0;
//   const carCC = allValues?.car_cc || 0;
//   const loanInterestRate = Number(allValues?.loanInterestRate) || 0;

//   const purchasePrice = calculateAndRound(
//     newCarPrice - (calculateAndRound(allValues?.discountAmount) + calculateAndRound(allValues?.additionalDiscount))
//   );
//   const vat = calculateAndRound(purchasePrice - purchasePrice / 1.1);
//   const purchasePriceExclVAT = calculateAndRound(purchasePrice - vat);

//   const greenCol: string[][] = [
//     ['installment', 'month'],
//     ['registrationTax', 'month'],
//     ['insurancePremium', 'month'],
//     ['gps', 'month'],
//     ['tax', 'month'],
//     ['transportationFee', 'month'],
//     ['generalMaintenance', 'month'],
//     ['inspectionMaintenance', 'month']
//   ];
//   const purpleCol: string[][] = [
//     ['salesIncomeCorrection', 'month'],
//     ['vatRefund', 'month'],
//     ['electricVehicleSubsidy', 'month']
//   ];

//   const monthlyRate = loanInterestRate / 100 / 12;
//   const periods = 60;
//   let principalSum36 = 0;
//   let principalSum48 = 0;
//   let principalSum60 = 0;
//   let interestSum36 = 0;
//   let interestSum48 = 0;
//   let interestSum60 = 0;

//   for (let i = 1; i <= periods; i++) {
//     const ppmt = -PPMT(monthlyRate, i, periods, purchasePrice);
//     const ipmt = -IPMT(monthlyRate, i, periods, purchasePrice);

//     if (i <= 36) {
//       principalSum36 += ppmt;
//       interestSum36 += ipmt;
//     }
//     if (i <= 48) {
//       principalSum48 += ppmt;
//       interestSum48 += ipmt;
//     }
//     principalSum60 += ppmt;
//     interestSum60 += ipmt;
//   }

//   const taxByCCValue = !carCC ? 0 : carCC < 2000 ? carCC * 18 : carCC >= 2000 && carCC <= 2500 ? carCC * 19 : carCC * 24;

//   // Tab 대여료
//   const residualValue36m = calculateAndRound((newCarPrice * allValues?.residualValueRate36m) / 100);
//   const residualValue48m = calculateAndRound((newCarPrice * allValues?.residualValueRate48m) / 100);
//   const residualValue60m = calculateAndRound((newCarPrice * allValues?.residualValueRate60m) / 100);

//   const wonPerMonth36m = calculateAndRound(allValues?.prepayment36m / 36, 2);
//   const wonPerMonth48m = calculateAndRound(allValues?.prepayment48m / 48, 2);
//   const wonPerMonth60m = calculateAndRound(allValues?.prepayment60m / 60, 2);

//   // Tab 대출(금융)
//   const totalInterest36m = calculateAndRound(interestSum36);
//   const totalInterest48m = calculateAndRound(interestSum48);
//   const totalInterest60m = calculateAndRound(interestSum60);

//   const periodPrincipal36m = calculateAndRound(principalSum36);
//   const periodPrincipal48m = calculateAndRound(principalSum48);
//   const periodPrincipal60m = calculateAndRound(principalSum60);

//   const totalLoanAmount36m = purchasePrice;
//   const totalLoanAmount48m = purchasePrice;
//   const totalLoanAmount60m = purchasePrice;

//   const totalPrincipalAndInterest36m = calculateAndRound(interestSum36 + principalSum36);
//   const totalPrincipalAndInterest48m = calculateAndRound(interestSum48 + principalSum48);
//   const totalPrincipalAndInterest60m = calculateAndRound(interestSum60 + principalSum60);

//   const monthlyPrincipal36m = calculateAndRound(principalSum36 / 36);
//   const monthlyPrincipal48m = calculateAndRound(principalSum48 / 48);
//   const monthlyPrincipal60m = calculateAndRound(principalSum60 / 60);

//   const monthlyInterest36m = calculateAndRound(interestSum36 / 36);
//   const monthlyInterest48m = calculateAndRound(interestSum48 / 48);
//   const monthlyInterest60m = calculateAndRound(interestSum60 / 60);

//   const remainingInstallmentPrincipal36m = calculateAndRound(purchasePrice - principalSum36);
//   const remainingInstallmentPrincipal48m = calculateAndRound(purchasePrice - principalSum48);
//   const remainingInstallmentPrincipal60m = calculateAndRound(purchasePrice - principalSum60);

//   // Tab 이자총액
//   const guaranteeRatio36m = allValues?.guaranteeRatio36m ? allValues?.guaranteeRatio36m : 0;
//   const guaranteeRatio48m = allValues?.guaranteeRatio48m ? allValues?.guaranteeRatio48m : 0;
//   const guaranteeRatio60m = allValues?.guaranteeRatio60m ? allValues?.guaranteeRatio60m : 0;

//   const guarantee36m = calculateAndRound((newCarPrice * guaranteeRatio36m) / 100);
//   const guarantee48m = calculateAndRound((newCarPrice * guaranteeRatio48m) / 100);
//   const guarantee60m = calculateAndRound((newCarPrice * guaranteeRatio60m) / 100);

//   let interestSum36_tabA = 0;
//   let interestSum48_tabB = 0;
//   let interestSum60_tabC = 0;

//   for (let i = 1; i <= periods; i++) {
//     const ipmt36 = -IPMT(monthlyRate, i, periods, purchasePrice - guarantee36m);
//     const ipmt48 = -IPMT(monthlyRate, i, periods, purchasePrice - guarantee48m);
//     const ipmt60 = -IPMT(monthlyRate, i, periods, purchasePrice - guarantee60m);

//     if (i <= 36) {
//       interestSum36_tabA += ipmt36;
//     }

//     if (i <= 48) {
//       interestSum48_tabB += ipmt48;
//     }

//     interestSum60_tabC += ipmt60;
//   }

//   const totalGuaranteeInterest36m = calculateAndRound(interestSum36_tabA);
//   const totalGuaranteeInterest48m = calculateAndRound(interestSum48_tabB);
//   const totalGuaranteeInterest60m = calculateAndRound(interestSum60_tabC);

//   const totalInterestAmount36m = totalInterest36m;
//   const totalInterestAmount48m = totalInterest48m;
//   const totalInterestAmount60m = totalInterest60m;

//   const interestWonPerYear36m = totalGuaranteeInterest36m - totalInterest36m;
//   const interestWonPerYear48m = totalGuaranteeInterest48m - totalInterest48m;
//   const interestWonPerYear60m = totalGuaranteeInterest60m - totalInterest60m;

//   const interestWonPerMonth36m = calculateAndRound(interestWonPerYear36m / 36);
//   const interestWonPerMonth48m = calculateAndRound(interestWonPerYear48m / 48);
//   const interestWonPerMonth60m = calculateAndRound(interestWonPerYear60m / 60);

//   // Tab 매각차액
//   const sellingPrice36m = residualValue36m;
//   const sellingPrice48m = residualValue48m;
//   const sellingPrice60m = residualValue60m;

//   const salesVAT36m = (sellingPrice36m * 10) / 100;
//   const salesVAT48m = (sellingPrice48m * 10) / 100;
//   const salesVAT60m = (sellingPrice60m * 10) / 100;

//   const loanBalance36m = remainingInstallmentPrincipal36m;
//   const loanBalance48m = remainingInstallmentPrincipal48m;
//   const loanBalance60m = remainingInstallmentPrincipal60m;

//   const salesIncome36m = sellingPrice36m - loanBalance36m;
//   const salesIncome48m = sellingPrice48m - loanBalance48m;
//   const salesIncome60m = sellingPrice60m - loanBalance60m;

//   const salesAmountProfitTarget36m = calculateAndRound((newCarPrice * allValues?.salesAmountProfitRate36m) / 100);
//   const salesAmountProfitTarget48m = calculateAndRound((newCarPrice * allValues?.salesAmountProfitRate48m) / 100);
//   const salesAmountProfitTarget60m = calculateAndRound((newCarPrice * allValues?.salesAmountProfitRate60m) / 100);

//   const salesAmountProfitDifference36m = salesIncome36m - salesAmountProfitTarget36m;
//   const salesAmountProfitDifference48m = salesIncome48m - salesAmountProfitTarget48m;
//   const salesAmountProfitDifference60m = salesIncome60m - salesAmountProfitTarget60m;

//   // Tab 월 기본
//   const installment36m_month = monthlyPrincipal36m + monthlyInterest36m;
//   const installment48m_month = monthlyPrincipal48m + monthlyInterest48m;
//   const installment60m_month = monthlyPrincipal60m + monthlyInterest60m;

//   const registrationTax36m_year = purchasePriceExclVAT * (4 / 100);
//   const registrationTax48m_year = purchasePriceExclVAT * (4 / 100);
//   const registrationTax60m_year = purchasePriceExclVAT * (4 / 100);
//   const registrationTax36m_month = calculateAndRound(registrationTax36m_year / 36);
//   const registrationTax48m_month = calculateAndRound(registrationTax48m_year / 48);
//   const registrationTax60m_month = calculateAndRound(registrationTax60m_year / 60);

//   const insurancePremium36m_month = calculateAndRound(allValues?.insurancePremium36m_year / 12);
//   const insurancePremium48m_month = calculateAndRound(allValues?.insurancePremium48m_year / 12);
//   const insurancePremium60m_month = calculateAndRound(allValues?.insurancePremium60m_year / 12);

//   const gps36m_month = (allValues?.gps36m_year || 0) / 12;
//   const gps48m_month = (allValues?.gps48m_year || 0) / 12;
//   const gps60m_month = (allValues?.gps60m_year || 0) / 12;

//   const tax36m_year = taxByCCValue;
//   const tax48m_year = taxByCCValue;
//   const tax60m_year = taxByCCValue;

//   const tax36m_month = calculateAndRound(tax36m_year / 12);
//   const tax48m_month = calculateAndRound(tax48m_year / 12);
//   const tax60m_month = calculateAndRound(tax60m_year / 12);

//   // const transportationFee36m_month = calculateAndRound((allValues?.transportationFee36m_year || 0) / 36);
//   // const transportationFee48m_month = calculateAndRound(((allValues?.transportationFee48m_year || 0) * 2) / 48);
//   // const transportationFee60m_month = calculateAndRound(((allValues?.transportationFee60m_year || 0) * 3) / 60);

//   const transportationFee36m_month = calculateAndRound((allValues?.['transportationFee36m_year'] || 0) / 12);
//   const transportationFee48m_month = calculateAndRound((allValues?.['transportationFee48m_year'] || 0) / 12);
//   const transportationFee60m_month = calculateAndRound((allValues?.['transportationFee60m_year'] || 0) / 12);

//   const salesIncomeCorrection36m_year = calculateAndRound(salesAmountProfitDifference36m / 3);
//   const salesIncomeCorrection48m_year = calculateAndRound(salesAmountProfitDifference48m / 4);
//   const salesIncomeCorrection60m_year = calculateAndRound(salesAmountProfitDifference60m / 5);

//   const salesIncomeCorrection36m_month = calculateAndRound(-salesIncomeCorrection36m_year / 12);
//   const salesIncomeCorrection48m_month = calculateAndRound(-salesIncomeCorrection48m_year / 12);
//   const salesIncomeCorrection60m_month = calculateAndRound(-salesIncomeCorrection60m_year / 12);

//   const provision36m_month = calculateAndRound((newCarPrice * allValues?.provision36m_year) / 100 / 36);
//   const provision48m_month = calculateAndRound((newCarPrice * allValues?.provision48m_year) / 100 / 48);
//   const provision60m_month = calculateAndRound((newCarPrice * allValues?.provision60m_year) / 100 / 60);

//   const generalMaintenance36m_month = calculateAndRound((allValues?.generalMaintenance36m_year || 0) / 12);
//   const generalMaintenance48m_month = calculateAndRound((allValues?.generalMaintenance48m_year || 0) / 12);
//   const generalMaintenance60m_month = calculateAndRound((allValues?.generalMaintenance60m_year || 0) / 12);

//   const inspectionMaintenance36m_month = (allValues?.inspectionMaintenance36m_year || 0) / 12;
//   const inspectionMaintenance48m_month = (allValues?.inspectionMaintenance48m_year || 0) / 12;
//   const inspectionMaintenance60m_month = (allValues?.inspectionMaintenance60m_year || 0) / 12;

//   const vatRefund36m_year = vat;
//   const vatRefund48m_year = vat;
//   const vatRefund60m_year = vat;

//   const vatRefund36m_month = calculateAndRound(-vatRefund36m_year / 36);
//   const vatRefund48m_month = calculateAndRound(-vatRefund48m_year / 48);
//   const vatRefund60m_month = calculateAndRound(-vatRefund60m_year / 60);

//   const electricVehicleSubsidy36m_month = (allValues?.electricVehicleSubsidy36m_year || 0) / 36;
//   const electricVehicleSubsidy48m_month = (allValues?.electricVehicleSubsidy48m_year || 0) / 48;
//   const electricVehicleSubsidy60m_month = (allValues?.electricVehicleSubsidy60m_year || 0) / 60;

//   // Tab AG 수수료/매출이익
//   const AGFeeAmount36m = calculateAndRound((newCarPrice * allValues?.AGFee36m) / 100);
//   const AGFeeAmount48m = calculateAndRound((newCarPrice * allValues?.AGFee48m) / 100);
//   const AGFeeAmount60m = calculateAndRound((newCarPrice * allValues?.AGFee60m) / 100);

//   const AGFeeMonthlyPayment36m = calculateAndRound(AGFeeAmount36m / 36);
//   const AGFeeMonthlyPayment48m = calculateAndRound(AGFeeAmount48m / 48);
//   const AGFeeMonthlyPayment60m = calculateAndRound(AGFeeAmount60m / 60);

//   const salesProfitAmount36m = calculateAndRound((newCarPrice * allValues?.salesProfitRate36m) / 100);
//   const salesProfitAmount48m = calculateAndRound((newCarPrice * allValues?.salesProfitRate48m) / 100);
//   const salesProfitAmount60m = calculateAndRound((newCarPrice * allValues?.salesProfitRate60m) / 100);

//   const salesProfitMonthlyPayment36m = calculateAndRound(salesProfitAmount36m / 36);
//   const salesProfitMonthlyPayment48m = calculateAndRound(salesProfitAmount48m / 48);
//   const salesProfitMonthlyPayment60m = calculateAndRound(salesProfitAmount60m / 60);

//   // Combine all calculated values
//   let newValue = {
//     ...allValues,
//     purchasePrice,
//     vat,
//     purchasePriceExclVAT,
//     residualValue36m,
//     residualValue48m,
//     residualValue60m,
//     wonPerMonth36m,
//     wonPerMonth48m,
//     wonPerMonth60m,
//     totalInterest36m,
//     totalInterest48m,
//     totalInterest60m,
//     periodPrincipal36m,
//     periodPrincipal48m,
//     periodPrincipal60m,
//     totalLoanAmount36m,
//     totalLoanAmount48m,
//     totalLoanAmount60m,
//     totalPrincipalAndInterest36m,
//     totalPrincipalAndInterest48m,
//     totalPrincipalAndInterest60m,
//     monthlyPrincipal36m,
//     monthlyPrincipal48m,
//     monthlyPrincipal60m,
//     monthlyInterest36m,
//     monthlyInterest48m,
//     monthlyInterest60m,
//     remainingInstallmentPrincipal36m,
//     remainingInstallmentPrincipal48m,
//     remainingInstallmentPrincipal60m,
//     guarantee36m,
//     guarantee48m,
//     guarantee60m,
//     totalGuaranteeInterest36m,
//     totalGuaranteeInterest48m,
//     totalGuaranteeInterest60m,
//     totalInterestAmount36m,
//     totalInterestAmount48m,
//     totalInterestAmount60m,
//     interestWonPerYear36m,
//     interestWonPerYear48m,
//     interestWonPerYear60m,
//     interestWonPerMonth36m,
//     interestWonPerMonth48m,
//     interestWonPerMonth60m,
//     sellingPrice36m,
//     sellingPrice48m,
//     sellingPrice60m,
//     salesVAT36m,
//     salesVAT48m,
//     salesVAT60m,
//     loanBalance36m,
//     loanBalance48m,
//     loanBalance60m,
//     salesIncome36m,
//     salesIncome48m,
//     salesIncome60m,
//     salesAmountProfitTarget36m,
//     salesAmountProfitTarget48m,
//     salesAmountProfitTarget60m,
//     salesAmountProfitDifference36m,
//     salesAmountProfitDifference48m,
//     salesAmountProfitDifference60m,
//     installment36m_month,
//     installment48m_month,
//     installment60m_month,
//     registrationTax36m_year,
//     registrationTax48m_year,
//     registrationTax60m_year,
//     registrationTax36m_month,
//     registrationTax48m_month,
//     registrationTax60m_month,
//     insurancePremium36m_month,
//     insurancePremium48m_month,
//     insurancePremium60m_month,
//     gps36m_month,
//     gps48m_month,
//     gps60m_month,
//     tax36m_year,
//     tax48m_year,
//     tax60m_year,
//     tax36m_month,
//     tax48m_month,
//     tax60m_month,
//     transportationFee36m_month,
//     transportationFee48m_month,
//     transportationFee60m_month,
//     salesIncomeCorrection36m_year,
//     salesIncomeCorrection48m_year,
//     salesIncomeCorrection60m_year,
//     salesIncomeCorrection36m_month,
//     salesIncomeCorrection48m_month,
//     salesIncomeCorrection60m_month,
//     provision36m_month,
//     provision48m_month,
//     provision60m_month,
//     generalMaintenance36m_month,
//     generalMaintenance48m_month,
//     generalMaintenance60m_month,
//     inspectionMaintenance36m_month,
//     inspectionMaintenance48m_month,
//     inspectionMaintenance60m_month,
//     vatRefund36m_year,
//     vatRefund48m_year,
//     vatRefund60m_year,
//     vatRefund36m_month,
//     vatRefund48m_month,
//     vatRefund60m_month,
//     electricVehicleSubsidy36m_month,
//     electricVehicleSubsidy48m_month,
//     electricVehicleSubsidy60m_month,
//     AGFeeAmount36m,
//     AGFeeAmount48m,
//     AGFeeAmount60m,
//     AGFeeMonthlyPayment36m,
//     AGFeeMonthlyPayment48m,
//     AGFeeMonthlyPayment60m,
//     salesProfitAmount36m,
//     salesProfitAmount48m,
//     salesProfitAmount60m,
//     salesProfitMonthlyPayment36m,
//     salesProfitMonthlyPayment48m,
//     salesProfitMonthlyPayment60m
//   };

//   let requiredExpenses36m_month = 0;
//   let requiredExpenses48m_month = 0;
//   let requiredExpenses60m_month = 0;
//   greenCol.forEach((ele) => {
//     requiredExpenses36m_month += newValue?.[`${ele[0]}36m_${ele[1]}`];
//     requiredExpenses48m_month += newValue?.[`${ele[0]}48m_${ele[1]}`];
//     requiredExpenses60m_month += newValue?.[`${ele[0]}60m_${ele[1]}`];
//   });

//   let subtotal36m_month = 0;
//   let subtotal48m_month = 0;
//   let subtotal60m_month = 0;
//   purpleCol.forEach((ele) => {
//     subtotal36m_month += newValue?.[`${ele[0]}36m_${ele[1]}`];
//     subtotal48m_month += newValue?.[`${ele[0]}48m_${ele[1]}`];
//     subtotal60m_month += newValue?.[`${ele[0]}60m_${ele[1]}`];
//   });

//   subtotal36m_month += calculateAndRound(requiredExpenses36m_month + provision36m_month);
//   subtotal48m_month += calculateAndRound(requiredExpenses48m_month + provision48m_month);
//   subtotal60m_month += calculateAndRound(requiredExpenses60m_month + provision60m_month);

//   const deposit36m = guarantee36m;
//   const deposit48m = guarantee48m;
//   const deposit60m = guarantee60m;

//   const monthlyEstimate36m = subtotal36m_month + salesProfitMonthlyPayment36m;
//   const monthlyEstimate48m = subtotal48m_month + salesProfitMonthlyPayment48m;
//   const monthlyEstimate60m = subtotal60m_month + salesProfitMonthlyPayment60m;

//   const depositDiscount36m = interestWonPerMonth36m;
//   const depositDiscount48m = interestWonPerMonth48m;
//   const depositDiscount60m = interestWonPerMonth60m;

//   const prepaymentDiscount36m = wonPerMonth36m;
//   const prepaymentDiscount48m = wonPerMonth48m;
//   const prepaymentDiscount60m = wonPerMonth60m;

//   const vat36m = calculateAndRound(((salesProfitMonthlyPayment36m + provision36m_month) * 10) / 100);
//   const vat48m = calculateAndRound(((salesProfitMonthlyPayment48m + provision48m_month) * 10) / 100);
//   const vat60m = calculateAndRound(((salesProfitMonthlyPayment60m + provision60m_month) * 10) / 100);

//   const proposalAmount36m = monthlyEstimate36m + depositDiscount36m + prepaymentDiscount36m + vat36m;
//   const proposalAmount48m = monthlyEstimate48m + depositDiscount48m + prepaymentDiscount48m + vat48m;
//   const proposalAmount60m = monthlyEstimate60m + depositDiscount60m + prepaymentDiscount60m + vat60m;

//   const totalRent136m = proposalAmount36m * 36;
//   const totalRent148m = proposalAmount48m * 48;
//   const totalRent160m = proposalAmount60m * 60;

//   const amountWithFee36m = calculateAndRound(proposalAmount36m + AGFeeMonthlyPayment36m);
//   const amountWithFee48m = calculateAndRound(proposalAmount48m + AGFeeMonthlyPayment48m);
//   const amountWithFee60m = calculateAndRound(proposalAmount60m + AGFeeMonthlyPayment60m);

//   const proposalAmountWithFee36m = roundUpToThousands(amountWithFee36m);
//   const proposalAmountWithFee48m = roundUpToThousands(amountWithFee48m);
//   const proposalAmountWithFee60m = roundUpToThousands(amountWithFee60m);

//   const totalRent236m = amountWithFee36m * 36;
//   const totalRent248m = amountWithFee48m * 48;
//   const totalRent260m = amountWithFee60m * 60;

//   const salesProfit36m = salesAmountProfitTarget36m + salesProfitAmount36m;
//   const salesProfit48m = salesAmountProfitTarget48m + salesProfitAmount48m;
//   const salesProfit60m = salesAmountProfitTarget60m + salesProfitAmount60m;

//   newValue = {
//     ...newValue,
//     requiredExpenses36m_month,
//     requiredExpenses48m_month,
//     requiredExpenses60m_month,
//     subtotal36m_month,
//     subtotal48m_month,
//     subtotal60m_month,
//     deposit36m,
//     deposit48m,
//     deposit60m,
//     monthlyEstimate36m,
//     monthlyEstimate48m,
//     monthlyEstimate60m,
//     depositDiscount36m,
//     depositDiscount48m,
//     depositDiscount60m,
//     prepaymentDiscount36m,
//     prepaymentDiscount48m,
//     prepaymentDiscount60m,
//     vat36m,
//     vat48m,
//     vat60m,
//     proposalAmount36m,
//     proposalAmount48m,
//     proposalAmount60m,
//     totalRent136m,
//     totalRent148m,
//     totalRent160m,
//     amountWithFee36m,
//     amountWithFee48m,
//     amountWithFee60m,
//     proposalAmountWithFee36m,
//     proposalAmountWithFee48m,
//     proposalAmountWithFee60m,
//     totalRent236m,
//     totalRent248m,
//     totalRent260m,
//     salesProfit36m,
//     salesProfit48m,
//     salesProfit60m
//   };

//   const preventRoundingKeys = [
//     'loanInterestRate',
//     'AGFee36m',
//     'AGFee48m',
//     'AGFee60m',
//     'salesProfitRate36m',
//     'salesProfitRate48m',
//     'salesProfitRate60m',
//     'residualValueRate36m',
//     'residualValueRate48m',
//     'residualValueRate60m',
//     'salesAmountProfitRate36m',
//     'salesAmountProfitRate48m',
//     'salesAmountProfitRate60m',
//     'provision36m_year',
//     'provision48m_year',
//     'provision60m_year',
//     'AGFee36m',
//     'AGFee48m',
//     'AGFee60m',
//     'salesProfitRate36m',
//     'salesProfitRate48m',
//     'salesProfitRate60m'
//   ];

//   for (let key in newValue) {
//     if (!preventRoundingKeys.includes(key) && newValue.hasOwnProperty(key) && newValue[key] && typeof newValue[key] === 'number') {
//       newValue[key] = Math.round(newValue[key]);
//     }
//   }

//   return newValue;
// };

// export const formattedGetData = (payload: any) => {
//   const data: any = {};

//   // Flatten estimator_details
//   payload?.estimator_details?.forEach((detail: any) => {
//     const period = detail.period_type;

//     data[`AGFee${period}`] = detail.ag_fee;
//     data[`AGFeeAmount${period}`] = detail.ag_fee_amount;
//     data[`AGFeeMonthlyPayment${period}`] = detail.ag_fee_monthly_payment;
//     data[`amountWithFee${period}`] = detail.amount_with_fee;
//     data[`deposit${period}`] = detail.deposit;
//     data[`depositDiscount${period}`] = detail.deposit_discount;
//     data[`electricVehicleSubsidy${period}_month`] = detail.electric_vehicle_subsidy_month;
//     data[`electricVehicleSubsidy${period}_year`] = detail.electric_vehicle_subsidy_year;
//     data[`generalMaintenance${period}_month`] = detail.general_maintenance_month;
//     data[`generalMaintenance${period}_year`] = detail.general_maintenance_year;
//     data[`gps${period}_month`] = detail.gps_month;
//     data[`gps${period}_year`] = detail.gps_year;
//     data[`guarantee${period}`] = detail.guarantee;
//     data[`guaranteeRatio${period}`] = detail.guarantee_ratio;
//     data[`inspectionMaintenance${period}_month`] = detail.inspection_maintenance_month;
//     data[`inspectionMaintenance${period}_year`] = detail.inspection_maintenance_year;
//     data[`installment${period}_month`] = detail.installment_month;
//     data[`insurancePremium${period}_month`] = detail.insurance_premium_month;
//     data[`insurancePremium${period}_year`] = detail.insurance_premium_year;
//     data[`interestWonPerMonth${period}`] = detail.interest_won_per_month;
//     data[`interestWonPerYear${period}`] = detail.interest_won_per_year;
//     data[`loanBalance${period}`] = detail.loan_balance;
//     data[`monthlyEstimate${period}`] = detail.monthly_estimate;
//     data[`monthlyInterest${period}`] = detail.monthly_interest;
//     data[`monthlyPrincipal${period}`] = detail.monthly_principal;
//     data[`periodPrincipal${period}`] = detail.period_principal;
//     data[`prepayment${period}`] = detail.prepayment;
//     data[`prepaymentDiscount${period}`] = detail.prepayment_discount;
//     data[`proposalAmount${period}`] = detail.proposal_amount;
//     data[`proposalAmountWithFee${period}`] = detail.proposal_amount_with_fee;
//     data[`provision${period}_month`] = detail.provision_month;
//     data[`provision${period}_year`] = detail.provision_year;
//     data[`registrationTax${period}_month`] = detail.registration_tax_month;
//     data[`registrationTax${period}_year`] = detail.registration_tax_year;
//     data[`remainingInstallmentPrincipal${period}`] = detail.remaining_installment_principal;
//     data[`residualValue${period}`] = detail.residual_value;
//     data[`residualValueRate${period}`] = detail.residual_value_rate;
//     data[`salesAmountProfitRate${period}`] = detail.sales_amount_profit_rate;
//     data[`salesAmountProfitDifference${period}`] = detail.sales_amount_profit_difference;
//     data[`salesAmountProfitTarget${period}`] = detail.sales_amount_profit_target;
//     data[`salesIncome${period}`] = detail.sales_income;
//     data[`salesIncomeCorrection${period}_month`] = detail.sales_income_correction_month;
//     data[`salesIncomeCorrection${period}_year`] = detail.sales_income_correction_year;
//     data[`salesProfit${period}`] = detail.sales_profit;
//     data[`salesProfitRate${period}`] = detail.sales_profit_rate;
//     data[`salesProfitAmount${period}`] = detail.sales_profit_amount;
//     data[`salesProfitMonthlyPayment${period}`] = detail.sales_profit_monthly_payment;
//     data[`salesVAT${period}`] = detail.sales_vat;
//     data[`vat${period}`] = detail.vat;
//     data[`sellingPrice${period}`] = detail.selling_price;
//     data[`subtotal${period}_month`] = detail.subtotal_month;
//     data[`tax${period}_month`] = detail.tax_month;
//     data[`tax${period}_year`] = detail.tax_year;
//     data[`totalGuaranteeInterest${period}`] = detail.total_guarantee_interest;
//     data[`totalInterest${period}`] = detail.total_interest;
//     data[`totalInterestAmount${period}`] = detail.total_interest_amount;
//     data[`totalLoanAmount${period}`] = detail.total_loan_amount;
//     data[`totalPrincipalAndInterest${period}`] = detail.total_principal_and_interest;
//     data[`totalRent1${period}`] = detail.total_rent1;
//     data[`totalRent2${period}`] = detail.total_rent2;
//     data[`transportationFee${period}_month`] = detail.transportation_fee_month;
//     data[`transportationFee${period}_year`] = detail.transportation_fee_year;
//     data[`vatRefund${period}_month`] = detail.vat_refund_month;
//     data[`vatRefund${period}_year`] = detail.vat_refund_year;
//     data[`wonPerMonth${period}`] = detail.won_per_month;
//   });

//   data['group_id'] = payload?.['group_id'];
//   data['brand_nm'] = payload?.['brand_nm'];
//   data['model_nm'] = payload?.['model_nm'];
//   data['model_detail_nm'] = payload?.['model_detail_nm'];
//   data['model_grade_nm'] = payload?.['model_grade_nm'];
//   data['model_grade_detail_nm'] = payload?.['model_grade_detail_nm'];
//   data['exterior'] = payload?.['exterior']?.split(',');
//   data['interior'] = payload?.['interior']?.split(',');
//   data['year'] = payload?.['year'];
//   data['fuel'] = payload?.['fuel']?.split(',');
//   data['option'] = payload?.['option'];
//   data['newCarPrice'] = payload?.['new_car_price'];
//   data['optionPrice'] = payload?.['option_price'];
//   data['discountAmount'] = payload?.['discount_amount'];
//   data['purchasePrice'] = payload?.['purchase_price'];
//   data['purchasePriceExclVat'] = payload?.['purchase_price_excl_vat'];
//   // data['totalVehiclePrice'] = payload?.['total_vehicle_price'];
//   data['vat'] = payload?.['vat'];
//   data['vehicle_type'] = payload?.['vehicle_type'];
//   data['vehicle_year'] = payload?.['vehicle_year'];
//   data['loanInterestRate'] = payload?.['loan_interest_rate'];
//   data['car_cc'] = payload?.['car_cc'];
//   data['additionalDiscount'] = payload?.['additional_discount'];
//   data['insurancePremium'] = payload?.['insurance_premium'];

//   data['car_number'] = payload?.['car_number'];
//   data['car_owner'] = payload?.['car_owner'];
//   data['used_car'] = payload?.['used_car'];

//   return data;
// };

// export const finalParams = (data: any) => {
//   const periods = ['36m', '48m', '60m'];
//   const estimator_details = periods.map((period) => {
//     return {
//       period_type: period,
//       ag_fee: data[`AGFee${period}`],
//       ag_fee_amount: data[`AGFeeAmount${period}`],
//       ag_fee_monthly_payment: data[`AGFeeMonthlyPayment${period}`],
//       amount_with_fee: data[`amountWithFee${period}`],
//       deposit: data[`deposit${period}`],
//       deposit_discount: data[`depositDiscount${period}`],
//       electric_vehicle_subsidy_month: data[`electricVehicleSubsidy${period}_month`],
//       electric_vehicle_subsidy_year: data[`electricVehicleSubsidy${period}_year`],
//       general_maintenance_month: data[`generalMaintenance${period}_month`],
//       general_maintenance_year: data[`generalMaintenance${period}_year`],
//       gps_month: data[`gps${period}_month`],
//       gps_year: data[`gps${period}_year`],
//       guarantee: data[`guarantee${period}`],
//       guarantee_ratio: data[`guaranteeRatio${period}`],
//       inspection_maintenance_month: data[`inspectionMaintenance${period}_month`],
//       inspection_maintenance_year: data[`inspectionMaintenance${period}_year`],
//       installment_month: data[`installment${period}_month`],
//       insurance_premium_month: data[`insurancePremium${period}_month`],
//       insurance_premium_year: data[`insurancePremium${period}_year`],
//       interest_won_per_month: data[`interestWonPerMonth${period}`],
//       interest_won_per_year: data[`interestWonPerYear${period}`],
//       loan_balance: data[`loanBalance${period}`],
//       monthly_estimate: data[`monthlyEstimate${period}`],
//       monthly_interest: data[`monthlyInterest${period}`],
//       monthly_principal: data[`monthlyPrincipal${period}`],
//       period_principal: data[`periodPrincipal${period}`],
//       prepayment: data[`prepayment${period}`],
//       prepayment_discount: data[`prepaymentDiscount${period}`],
//       proposal_amount: data[`proposalAmount${period}`],
//       proposal_amount_with_fee: data[`proposalAmountWithFee${period}`],
//       provision_month: data[`provision${period}_month`],
//       provision_year: data[`provision${period}_year`],
//       registration_tax_month: data[`registrationTax${period}_month`],
//       registration_tax_year: data[`registrationTax${period}_year`],
//       remaining_installment_principal: data[`remainingInstallmentPrincipal${period}`],
//       // required_expenses_month: data[`subtotal${period}_month`],
//       residual_value: data[`residualValue${period}`],
//       residual_value_rate: data[`residualValueRate${period}`],
//       sales_amount_profit_rate: data[`salesAmountProfitRate${period}`],
//       sales_amount_profit_difference: data[`salesAmountProfitDifference${period}`],
//       sales_amount_profit_target: data[`salesAmountProfitTarget${period}`],
//       sales_income: data[`salesIncome${period}`],
//       sales_income_correction_month: data[`salesIncomeCorrection${period}_month`],
//       sales_income_correction_year: data[`salesIncomeCorrection${period}_year`],
//       sales_profit: data[`salesProfit${period}`],
//       sales_profit_rate: data[`salesProfitRate${period}`],
//       sales_profit_amount: data[`salesProfitAmount${period}`],
//       sales_profit_monthly_payment: data[`salesProfitMonthlyPayment${period}`],
//       sales_vat: data[`salesVAT${period}`],
//       vat: data[`vat${period}`],
//       selling_price: data[`sellingPrice${period}`],
//       subtotal_month: data[`subtotal${period}_month`],
//       tax_month: data[`tax${period}_month`],
//       tax_year: data[`tax${period}_year`],
//       total_guarantee_interest: data[`totalGuaranteeInterest${period}`],
//       total_interest: data[`totalInterest${period}`],
//       total_interest_amount: data[`totalInterestAmount${period}`],
//       total_loan_amount: data[`totalLoanAmount${period}`],
//       total_principal_and_interest: data[`totalPrincipalAndInterest${period}`],
//       total_rent1: data[`totalRent1${period}`],
//       total_rent2: data[`totalRent2${period}`],
//       transportation_fee_month: data[`transportationFee${period}_month`],
//       transportation_fee_year: data[`transportationFee${period}_year`],
//       vat_refund_month: data[`vatRefund${period}_month`],
//       vat_refund_year: data[`vatRefund${period}_year`],
//       won_per_month: data[`wonPerMonth${period}`]
//     };
//   });

//   let nParams: any = {};
//   nParams.group_id = data?.group_id;
//   nParams.brand_nm = data?.brand_nm;
//   nParams.model_nm = data?.model_nm;
//   nParams.model_detail_nm = data?.model_detail_nm;
//   nParams.model_grade_nm = data?.model_grade_nm;
//   nParams.model_grade_detail_nm = data?.model_grade_detail_nm;
//   nParams.exterior = data?.exterior?.join(',');
//   nParams.interior = data?.interior?.join(',');
//   nParams.year = data?.year;
//   nParams.fuel = data?.fuel?.join(',');
//   // nParams.mo_price = data?.mo_price
//   nParams.option = data?.option;
//   // nParams.sec_pay = data?.
//   // nParams.adv_pay = data?.
//   nParams.new_car_price = data?.newCarPrice;
//   nParams.option_price = data?.optionPrice;
//   nParams.discount_amount = data?.discountAmount;
//   nParams.purchase_price = data?.purchasePrice;
//   nParams.purchase_price_excl_vat = data?.purchasePriceExclVAT;
//   // nParams.total_vehicle_price = data?.totalVehiclePrice;
//   nParams.vat = data?.vat;
//   nParams.vehicle_type = data?.vehicle_type;
//   nParams.vehicle_year = data?.vehicle_year;

//   nParams.loan_interest_rate = data?.loanInterestRate;
//   nParams.car_cc = data?.car_cc;
//   nParams.additional_discount = data?.additionalDiscount;

//   nParams.car_number = data?.car_number;
//   nParams.car_owner = data?.car_owner;
//   nParams.used_car = data?.used_car;

//   nParams.estimator_details = estimator_details;

//   return nParams;
// };

// export const calFinalMoPrice = (estimatorData: any, formDataVal: any) => {
//   const mileagePrice: any = {
//     1: 4,
//     1.5: 2,
//     2: 0,
//     2.5: -2,
//     3: -4
//   };
//   const advancePayAmount: any = {
//     1: 4000,
//     2: 8000,
//     3: 12000,
//     5: 16000,
//     8: 20000
//   };

//   let nEstimatorData = formattedGetData(estimatorData);

//   nEstimatorData['residualValueRate36m'] =
//     Number(nEstimatorData['residualValueRate36m']) + mileagePrice?.[formDataVal?.selectedAnnualMileageCommit] || 0;
//   nEstimatorData['residualValueRate48m'] =
//     Number(nEstimatorData['residualValueRate48m']) + mileagePrice?.[formDataVal?.selectedAnnualMileageCommit] || 0;
//   nEstimatorData['residualValueRate60m'] =
//     Number(nEstimatorData['residualValueRate60m']) + mileagePrice?.[formDataVal?.selectedAnnualMileageCommit] || 0;

//   nEstimatorData['guaranteeRatio36m'] =
//     formDataVal.payMethod === 'deposit' ? (formDataVal.payAmount / nEstimatorData?.newCarPrice) * 100 : 0;
//   nEstimatorData['guaranteeRatio48m'] =
//     formDataVal.payMethod === 'deposit' ? (formDataVal.payAmount / nEstimatorData?.newCarPrice) * 100 : 0;
//   nEstimatorData['guaranteeRatio60m'] =
//     formDataVal.payMethod === 'deposit' ? (formDataVal.payAmount / nEstimatorData?.newCarPrice) * 100 : 0;

//   nEstimatorData = reCalculateEstimator(nEstimatorData);
//   nEstimatorData = finalParams(nEstimatorData);

//   const basedMoPrice =
//     nEstimatorData?.estimator_details?.find((ele: any) => ele.period_type === `${formDataVal.selectedContractPeriod}m`)
//       ?.proposal_amount_with_fee || 0;
//   const driverAgePrice = formDataVal.selectedInsuranceAge === 21 ? 125000 : 0;
//   const paymentAmount = formDataVal.payMethod === 'advance' ? Number(formDataVal.payAmount) / formDataVal?.selectedContractPeriod : 0;
//   // const salespersonFee = estimatorData?.new_car_price * (formDataVal.salePercent / 100) || 0;
//   const salespersonFee = 0;

//   const result = Math.round(
//     basedMoPrice + driverAgePrice + salespersonFee + advancePayAmount?.[formDataVal?.selectedPropertyDamage] - paymentAmount
//   );

//   return basedMoPrice ? result : 0;
// };
