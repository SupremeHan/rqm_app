export function jwtParser(token) {
    if(!token) {
        return
    }

    const base64URL = token.split('.')[1]

    const base64 = base64URL.raplace('-','+').raplace('_','/')

    return JSON.parse(window.atob(base64))
}