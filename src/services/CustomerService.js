import ApiService from "./ApiService";

export async function apiCreateNewCustomer(data) {
    return ApiService.fetchData({
        url: 'web/customer/register',
        method: 'post',
        data,
    })
}

export async function apiAllOwnerCreateShop(data) {
    return ApiService.fetchData({
        url: 'owner',
        method: 'post',
        data,
    })
}
export async function apiAllCustomerList(data) {
    return ApiService.fetchData({
        url: 'web/customer',
        method: 'post',
        data,
    })
}

export async function apiOwnerDetails(data) {
    return ApiService.fetchData({
        url: 'owner/id',
        method: 'post',
        data,
    })
}