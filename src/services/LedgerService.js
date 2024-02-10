import ApiService from './ApiService'

export async function apiAllLedgerListByShopId(data) {
    return ApiService.fetchData({
        url: 'ledger/shop',
        method: 'post',
        data,
    })
}
export async function apiPayLedgerAmountByShopId(data) {
    return ApiService.fetchData({
        url: 'ledger/debit',
        method: 'post',
        data,
    })
}
export async function apiPayLedgerByEmployeeId(data) {
    return ApiService.fetchData({
        url: 'ledger/employee/id',
        method: 'post',
        data,
    })
}