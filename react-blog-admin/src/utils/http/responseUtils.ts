/**
 * check resp data statue
 * @param resp
 * @returns true
 */
const checkRespStatues = (resp) => {
  return resp && resp.code === 0
}

const getRespData = (resp) => {
  return checkRespStatues(resp) ? resp.data : undefined
}


export { checkRespStatues, getRespData }