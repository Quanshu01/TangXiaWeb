import request from '@/utils/request'
import global from '@/global/global.js'

export function userLogin(data) {
    return request({
        url: global.apiURL+8001+'/login', // 修改成專用的用戶管理端口
        method: 'post',
        data
    })
}
