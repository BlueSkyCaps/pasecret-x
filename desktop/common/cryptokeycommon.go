package common

// AppStartPwdKeyAES 在此定义你的App启动密码最终加解密密钥于生产环境，确保不要泄露
var AppStartPwdKeyAES = "the key is gift for my love HPT."

// GetDataKeyAES 加解密密码项的密钥，有AppStartPwdKeyAES+启动密码明文组成，以此凑够32字节
func GetDataKeyAES(appStartPwdPure string) string {
	return "theKeyIsGiftForMyLove HPT." + appStartPwdPure
}
