import ApiService from "./ApiService";

export async function apiCreateProductMaster(data) {
    return ApiService.fetchData({
        url: 'web/product/register',
        method: 'post',
        data,
    })
}
export async function apiImageUploadSingle(data) {
    return ApiService.fetchData({
        url: 'common/file/upload',
        content: "multipart/form-data",
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

export async function apiAllProductMasterList(data) {
    return ApiService.fetchData({
        url: 'web/product',
        method: 'post',
        data,
    }
    )
    
}
// export async function apigetImage(filename) {
//     return ApiService.fetchData({
//         url: 'common/file/view/:{filename}',
//         method: 'get',
//         filename,
//     })
// }

export async function apigetImage(filename) {
    return ApiService.fetchData({
      url: `common/file/view/${filename}`,  // Use template literal to replace the placeholder
      method: 'get',
    });
  }


export async function apiOwnerDetails(data) {
    return ApiService.fetchData({
        url: 'owner/id',
        method: 'post',
        data,
    })
}