import ApiService from './ApiService'

export async function apiAllOrderByShopId(data) {
    return ApiService.fetchData({
        url: 'order/shop',
        method: 'post',
        data,
    })
}

export async function apiOrderDetailsByOrderId(data) {
    return ApiService.fetchData({
        url: 'order/id',
        method: 'post',
        data,
    })
}
export async function apiAllOrder(data) {
    return ApiService.fetchData({
        url: 'order',
        method: 'post',
        data,
    })
}


export async function apiPlaceOrder(data) {
    return ApiService.fetchData({
        url: 'order/register',
        method: 'post',
        data
    })
}
export async function apiOrderConfirmation(data) {
    return ApiService.fetchData({
        url: 'order/confirm',
        method: 'post',
        data
    })
}