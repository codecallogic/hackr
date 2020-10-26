import cookie from 'js-cookie'
import Router from 'next/router';

// set in cookie 
export const setCookie = (key, value) => {
    const date = new Date(new Date().getTime() + 60 * 20000);
    if(process.browser){ // if window.
        cookie.set(key, value, {
            expires: date
        })
    }
}

// remove from cookie
export const removeCookie = (key) => {
    if(process.browser){
        cookie.remove(key)
    }
}

// get from cookie such as stored token
// useful when we need to make a request to server with auth token
export const getCookie = (key, req) => {
    // if(process.browser){
    //     return cookie.get(key)
    // }
    return process.browser ? getCookieFromBrowser(key) : getCookieFromServer(key, req)
}

export const getCookieFromBrowser = (key) => {
    // console.log(key)
    return cookie.get(key)
}

export const getCookieFromServer = (key, req) => {
    // console.log(req.headers.cookie)
    if(!req.headers.cookie){
        return undefined
    }
    let token = req.headers.cookie
    if(!token){
        return undefined
    }

    let tokenValue = token.split('=')[1]

    return tokenValue
}

// set in localstorage 
export const setLocalStorage = (key, value) => {
    if(process.browser){
        localStorage.setItem(key, JSON.stringify(value))
    }
}

// remove from localstorage
export const removeLocalStorage = (key) => {
    if(process.browser){
        localStorage.removeItem(key)
    }
}

// authenticate user by passing data to cookie and localstoreage during signin
export const authenticate = (response, next) => {
    setCookie('token', response.data.token)
    setLocalStorage('user', response.data.user)
    next()
}

// access user info from localstorage
export const isAuth = () => {
    if(process.browser){
        const cookieChecked = getCookie('token')
        if(cookieChecked){
            if(localStorage.getItem('user')){
                return JSON.parse(localStorage.getItem('user'))
            } else {
                return false
            }
        }
    }
}

export const logout = () => {
    removeCookie('token')
    removeLocalStorage('user')
    Router.push('/login')
}