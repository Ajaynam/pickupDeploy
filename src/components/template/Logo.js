import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { APP_NAME } from '../../constants/app.constant'
import jivhalaLogo from './logoJivhala.png'
import brotherLogo from './pickupLogo.png'

// const LOGO_SRC_PATH = '/img/logo/'

const Logo = (props) => {
    const { gutter, className, imgClass, style, logoWidth } = props

    return (
        <div
            className={classNames('logo', className, gutter)}
            style={{
                ...style,
                ...{ width: logoWidth },
            }}
        >
            <img
                className={imgClass}
                // src={`${LOGO_SRC_PATH}logo-${mode}-${type}.png`}
                // src={`https://www.gmartnx.co.in/user-assets/images/company/web-logo.svg`}
                src={brotherLogo}
                alt={`${APP_NAME} logo`}
                width={140}
            />
        </div>
    )
}

Logo.defaultProps = {
    mode: 'light',
    type: 'full',
    logoWidth: 'auto',
}

Logo.propTypes = {
    mode: PropTypes.oneOf(['light', 'dark']),
    type: PropTypes.oneOf(['full', 'streamline']),
    gutter: PropTypes.string,
    imgClass: PropTypes.string,
    logoWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

export default Logo
