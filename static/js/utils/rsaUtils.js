/**
 * rsa算法公钥加密
 * @param params
 */
export function rsa_encrypt(params) {
  // console.log(params)
  const PublicKey = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuOETBCLuWJWTguFSiUXHvg02qRXNaeS5zYYtd7WaA8e2q4aG4wiCreOwFVGJXFRLvvtPKJ9A6B128Hh6bncMa+GeloA00DMoVccs6dyLAmYuhu7jifhSrevfhFyz1flVrTdCiIrdgNfbcmqx7c1kldMb/1cbSgNQ8cOqVqiXI+KV59MloW43M6n4HBjtdplUUx1f/jLqVk5bHB9pyD0E95rnOV7zQu9u0RvCP+vHfyOOSl60m3mZcMhzKQYr36g2fb6PDeRBDuzXTeqmbDhD3Lk9xsaPvereS/eBxZuh0e/rl8a/mQTYMnhFKsTQwjrtHkkJ6NFhvvl4TO2Q1LTuPQIDAQAB"

  const Encrypt = new JSEncrypt();

  Encrypt.setPublicKey(PublicKey);

  let timestamp = "" + parseInt(new Date() / 1000);
  let param = params.toString() + timestamp;
  let data = Encrypt.encrypt(
    typeof params === 'object' ? JSON.stringify(params) : param
  );
  return data
}
