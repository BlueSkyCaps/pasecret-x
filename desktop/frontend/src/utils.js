export function isNullOrEmpty(value) {
    return value === null || value === undefined || value === '';
}
export function isNullOrWhitespace(value) {
    return value === null || value === undefined || value === ''||value.trim()=== '';
}

// 根据当前日期生成一个整型数字，每次生成的值都比之前生成的要大，最小值基于秒
export function genAscRankId(){
    const now = new Date();
    return `${now.getFullYear()}${now.getMonth() + 1}${now.getDate()}${now.getHours()}${now.getMinutes()}${now.getSeconds()}`;
}
