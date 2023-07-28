// 生成唯一uid
export const generateRandomId = function (){
    return new Date().getTime() + Math.random().toString(36).substring(2)
}