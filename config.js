import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

export const API            = publicRuntimeConfig.API
export const APP_NAME       = publicRuntimeConfig.API
export const DOMAIN         = publicRuntimeConfig.API
export const PRODUCTION     = publicRuntimeConfig.API
export const FB_APP_ID      = publicRuntimeConfig.API