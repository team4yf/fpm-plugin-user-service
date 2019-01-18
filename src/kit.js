const crypto = require('crypto')

const randomStr = (bytes = 4) => {
  return crypto.randomBytes(bytes).toString('hex');
}
const encodeMd5 = (password) => {
  var md5 = crypto.createHash('md5');
  return md5.update(password).digest('hex');
}

const compareMd5 = (password, encodedPassword) => {
  return (encodeMd5(password) == encodedPassword)
}

/**
 * AES encode 
 * @param { srouce content } src 
 * @param { seed } seed 
 */
const encodePassword = (src, seed = 'fpm') => {
  const cipher = crypto.createCipher('aes-256-cbc', seed)
  var crypted = cipher.update(src, 'utf8', 'hex')
  crypted += cipher.final('hex')
  return crypted
}

const comparePassword = (password, encodedPassword) => {
  return (encodePassword(password) == encodedPassword)
}

const getIp = (ip) => {
  const reg = /(?=(\b|\D))(((\d{1,2})|(1\d{1,2})|(2[0-4]\d)|(25[0-5]))\.){3}((\d{1,2})|(1\d{1,2})|(2[0-4]\d)|(25[0-5]))(?=(\b|\D))$/
  if(reg.test(ip)){
    let ipv4 = reg.exec(ip)[0]
    return ipv4
  }
  return ip
}

exports.comparePassword = comparePassword
exports.encodePassword = encodePassword
exports.encodeMd5 = encodeMd5
exports.compareMd5 = compareMd5

exports.randomStr = randomStr

exports.getIp = getIp