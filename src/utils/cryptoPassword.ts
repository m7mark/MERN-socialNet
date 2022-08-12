import CryptoJS from 'crypto-js'

export const decryptPassword = (password: string) => {
  const decryptedPassword = CryptoJS.AES.decrypt(
    password,
    process.env.PASS_SEC || ''
  ).toString(CryptoJS.enc.Utf8)
  return decryptedPassword
}

export const encryptPassword = (password: string) => {
  return CryptoJS.AES.encrypt(password, process.env.PASS_SEC || '').toString()
}
