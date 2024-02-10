import ApiService from "./ApiService";

export async function apiCreateNewOwner(data) {
    return ApiService.fetchData({
        url: 'auth/register/owner',
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
export async function apiAllOwnerList(data) {
    return ApiService.fetchData({
        url: 'owner/shop',
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