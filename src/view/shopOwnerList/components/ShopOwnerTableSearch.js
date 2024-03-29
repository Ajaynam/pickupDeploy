import React, { forwardRef } from 'react'
import { HiOutlineSearch } from 'react-icons/hi'
import debounce from 'lodash/debounce'
import { Input } from '../../../components/ui'

const ShopOwnerTableSearch = forwardRef((props, ref) => {
    const { onInputChange } = props

    const debounceFn = debounce(handleDebounceFn, 500)

    function handleDebounceFn(val) {
        onInputChange?.(val)
    }

    const handleInputChange = (e) => {
        debounceFn(e.target.value)
    }

    return (
        <Input
            ref={ref}
            className="max-w-md md:w-52 mb-4"
            size="sm"
            placeholder="Search"
            prefix={<HiOutlineSearch className="text-lg" />}
            onChange={handleInputChange}
        />
    )
})

export default ShopOwnerTableSearch
