export enum ProductLisTyp {
  NORMAL = '01',
  HOT_DEAL = '02',
  WEEKLY = '03',
  LEASE = '04',
  RENT = '05',
  AUCTION = '10',
  EXPORT = '20',
  TRANSECTION_SUCCESS = '30',
  TRANSECTION_FAIL = '40'
}
export enum StockLisTyp {
  WAITING = 'waiting',
  FAILED = 'failed',
  SUCCESS = 'success',
  CONTRACT_SUCCESS = 'contract_success'
}

export enum StateEnum {
  ACTIVE = '01',
  INPROGRESS = '02',
  SUCCESS = '03'
}
export enum MonLeaDet {
  TAX = '01',
  INSURANCE = '02',
  MAINTENANCE = '03'
}

export const MonLeaDetLabel: Record<MonLeaDet, string> = {
  [MonLeaDet.TAX]: '자동차 세금',
  [MonLeaDet.INSURANCE]: '보험료',
  [MonLeaDet.MAINTENANCE]: '정비 서비스'
};
