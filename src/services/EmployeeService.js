import ApiService from "./ApiService";

export async function apiAllEmployeeList(data) {
    return ApiService.fetchData({
        url: 'employee',
        method: 'post',
        data
    })
}


export async function apiEmployeeDetailsByEmployeeId(data) {
    return ApiService.fetchData({
        url: 'employee/id',
        method: 'post',
        data
    })
}


export async function apiEmployeeRegister(data) {
    return ApiService.fetchData({
        url: 'auth/register/employee',
        method: 'post',
        data
    })
}
