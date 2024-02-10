import ApiService from './ApiService'

export async function apiAllShop(data) {
    return ApiService.fetchData({
        url: 'shop',
        method: 'post',
        data,
    })
}

export async function apiShopDetailsByShopId(data) {
    return ApiService.fetchData({
        url: 'shop/id',
        method: 'post',
        data,
    })
}


export async function apiAllShopOfPlaceOrder(data) {
    return ApiService.fetchData({
        url: 'shop/place/order/all',
        method: 'post',
        data
    })
}


export async function apiNewShopRegister(data) {
    return ApiService.fetchData({
        url: 'auth/register/shop',
        method: 'post',
        data
    })
}


export async function apiAllShopByEmployeeId(data) {
    return ApiService.fetchData({
        url: 'shop/employee/id',
        method: 'post',
        data
    })
}
export async function apiChangePasswordByShopId(data) {
    return ApiService.fetchData({
        url: 'shop/password/id',
        method: 'put',
        data
    })
}

export async function apiAllShopByOwnerId(data) {
    return ApiService.fetchData({
        url: 'shop/owner/id',
        method: 'post',
        data
    })
}