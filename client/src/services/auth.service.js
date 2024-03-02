import { jwtDecode } from 'jwt-decode'
import { $authHost, $host } from '../http/http'

export const AuthService = {
    async registration(email, password) {
        const {data} = await $host.post('auth/register', {email, password})
        localStorage.setItem('token', data.token)
        return jwtDecode(data.token)
    },
    async login(email, password) {
        const {data} = await $host.post('auth/login', {email, password})
        localStorage.setItem('token', data.token)
        return jwtDecode(data.token)
    },
    async check() {
        const {data} = await $authHost.get('auth')
        localStorage.setItem('token', data.token)
        return jwtDecode(data.token)
    }
}