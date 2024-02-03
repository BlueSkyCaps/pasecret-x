export function isNullOrEmpty(value) {
    return value === null || value === undefined || value === '';
}
export function isNullOrWhitespace(value) {
    return value === null || value === undefined || value === ''||value.trim()=== '';
}
