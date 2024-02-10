import ApiService from './ApiService'

export async function apiSignUpRequest(data) {
    return ApiService.fetchData({
        url: 'common/auth/login',
        method: 'post',
        data,
    })
}
export async function apiSignInRequest(data) {
    return ApiService.fetchData({
        url: 'auth/login',
        method: 'post',
        data,
    })
}



// export const apiSignInRequest = async (credentials) => {
//     try {
//         const response = await axios.post(`${BASE_URL}/signin`, credentials);
//         return response;
//     } catch (error) {
//         throw error;
//     }
// };
export async function apiForgotPasswordRequest(data) {
    return ApiService.fetchData({
        url: 'auth/forgot-password',
        method: 'post',
        data,
    })
}
