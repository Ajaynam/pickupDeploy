import ApiService from "./ApiService";

export async function apiChartData(data) {
    return ApiService.fetchData({
        url: 'order/chart',
        method: 'post',
        data
    })
}
