import ApiService from "./ApiService";




export async function apiAllSupplierList(data) {
    return ApiService.fetchData({
        url: 'order/getOrders',
        method: 'get',
        data,
    })
}


export async function apiDeleteSalesOrders(id) {
    return ApiService.fetchData({
        url: `order/deleteOrder/${id}`,
        method: 'delete',

    })
}

export async function apiAllSupplierList1(data) {
    return ApiService.fetchData({
        url: 'quickOrder/get_QuickOrder',
        method: 'get',
        data,
    })
}


export async function apiDeleteSalesOrders1(id) {
    return ApiService.fetchData({
        url: `quickOrder/delete_QuickOrder/${id}`,
        method: 'delete',

    })
}


export async function apiAllProductMasterList(id) {
    if (id) {
        return ApiService.fetchData({
            url: `order/getOrderById/${id}`,
            method: 'get',
        });
    } else {
        console.error('ID is undefined');
        return Promise.reject('ID is undefined');
    }
}



export async function apiAddTrackingNo(userId, trackingNo) {
    try {
        const response = await ApiService.fetchData({
            url: `order/updateTrackingNo/${userId}`,
            method: 'post',
            data: {
                trackingNo, // Include trackingNo in the request body
            },
        });
        return response;
    } catch (error) {
        throw error;
    }
}



// ApiService.js

export async function apiEditOrder(id, updatedOrderData) {
    try {
        const response = await ApiService.fetchData({
            url: `order/updateOrder/${id}`,
            method: 'put',
            data: updatedOrderData,
        });
        return response;
    } catch (error) {
        throw error;
    }
}
