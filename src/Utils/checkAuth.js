import jwt_decode from 'jwt-decode'

const checkAuth = () => {
    const token = JSON.parse(window.localStorage.getItem('user'))
    if (!token)
        return false

    try {
        const decodedToken = jwt_decode(token.accessToken)
        const currentTime = new Date()

        if (decodedToken.exp * 1000 < currentTime.getTime())
            return false
        return true
    }
    catch(e){
        console.log('some Hap')
        return false;
    }
    
}

export default checkAuth