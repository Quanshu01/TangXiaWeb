import request from '@/utils/request'
import global from '@/global/global.js'

export function userLogin(data) {
    return request({
        url: global.apiURL+global.ports[global.JFname]+'/login',
        method: 'post',
        data
    })
}
