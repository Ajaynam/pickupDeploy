import ApiService from "./ApiService"

export async function apiAllStates(data) {
    return ApiService.fetchData({
        url: 'address/state',
        method: 'post',
        data
    })
}

export async function apiStateRegister(data) {

    return ApiService.fetchData({
        url: 'address/state/register',
        method: 'post',
        data
    })
}

export async function apiAllDistrictByStateId(data) {
    return ApiService.fetchData({
        url: 'address/district/state',
        method: 'post',
        data
    })
}

export async function apiDistrictRegisterByStateId(data) {
    return ApiService.fetchData({
        url: 'address/district/register',
        method: 'post',
        data
    })
}

export async function apiAllBlockBYDistrictId(data) {
    return ApiService.fetchData({
        url: 'address/block/district',
        method: 'post',
        data
    })
}

export async function apiBlockRegisterByDistrictId(data) {
    return ApiService.fetchData({
        url: 'address/block/register',
        method: 'post',
        data
    })
}

export async function apiAllVillageByBlockId(data) {
    return ApiService.fetchData({
        url: 'address/village/block',
        method: 'post',
        data
    })
}

export async function apiVillageRegisterByBlockId(data) {
   
    return ApiService.fetchData({
        url: 'address/village/register',
        method: 'post',
        data
    })
}


export async function apiAllVillagesByEmployeeId(data) {
    return ApiService.fetchData({
        url: 'address/village/employee/id',
        method: 'post',
        data
    })
}



export async function apiUpdateVillagesAccessByEmployeeId(data) {
    return ApiService.fetchData({
        url: 'address/village/employee/id/update',
        method: 'put',
        data
    })
}