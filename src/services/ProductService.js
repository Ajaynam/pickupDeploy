import ApiService from "./ApiService";

export async function apiAllProductsByCategoryId(data) {
    return ApiService.fetchData({
        url: 'product/category',
        method: 'post',
        data
    })
}
export async function apiAllProductsList(data) {
    return ApiService.fetchData({
        url: 'product',
        method: 'post',
        data
    })
}
export async function apiProductsDetailsByProductId(data) {
    return ApiService.fetchData({
        url: 'product/id',
        method: 'post',
        data
    })
}
export async function apiUpdateProductsDetailsByProductId(data) {
    return ApiService.fetchData({
        url: 'product/update/id',
        method: 'put',
        data
    })
}

export async function apiAddProduct(data){
    return ApiService.fetchData({
        url:'product/register',
        method:'post',
        data
    })
}

export async function apiDeleteProductImageByProductIdAndImageId(data){
    return ApiService.fetchData({
        url:'product-image/id',
        method:'delete',
        data
    })
}

export async function apiAddStockInExistingProduct(data){
    return ApiService.fetchData({
        url:'product/stock/id',
        method:'post',
        data
    })
}