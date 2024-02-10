import ApiService from "./ApiService";

export async function apiAllCategoryList(data) {
    return ApiService.fetchData({
        url: 'web/category',
        method: 'post',
        data
    })
}


export async function apiCreateNewCategory(data) {
  return ApiService.fetchData({
      url: 'web/category/register',
      method: 'post',
      data,
  })
}


export async function apiUnitsDetailsById(data) {
    return ApiService.fetchData({
        url: 'unit/get_unit/id',
        method: 'post',
        data
    })
}


export async function apiUnitsRegister(data) {
    return ApiService.fetchData({
        url: '/unit/new_unit',
        method: 'post',
        data
    })
}

export async function apiDeleteUnits(unitId) {
    return ApiService.fetchData({
      url: `/unit/remove_unit/${unitId}`, // Use the appropriate URL to delete an employee by ID
      method: 'delete', // Use the appropriate HTTP method (typically DELETE)
    });
  }

  export async function apiUpdateUnitsDetails(unitData) {
    return ApiService.fetchData({
      url: `/unit/update_unit/${unitData.id}`,
      method: 'put',
      data: unitData,
    });
  }