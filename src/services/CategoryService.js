import ApiService from "./ApiService";

export async function apiAllCategoryList(data) {
    return ApiService.fetchData({
        url: 'category',
        method: 'post',
        data
    })
}

export async function apiAddProductCategory(data) {
    return ApiService.fetchData({
        url: 'category/register',
        method: 'post',
        data
    })
}
