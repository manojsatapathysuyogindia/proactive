import CryptoJS from "crypto-js";

// Use hexadecimal string correctly
const encryptionKey = CryptoJS.enc.Hex.parse('00112233445566778899aabbccddeeff00112233445566778899aabbccddeeff');
const encryptionIv = CryptoJS.enc.Hex.parse('00112233445566778899aabbccddeeff'); // IV should be 32 hex characters

export const encrypt = (plaintext: string): string => {
  const encrypted = CryptoJS.AES.encrypt(plaintext, encryptionKey, { iv: encryptionIv });
  return encrypted.toString();
};

export const decrypt = (ciphertext: string): string => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, encryptionKey, { iv: encryptionIv });
  return bytes.toString(CryptoJS.enc.Utf8);
};
