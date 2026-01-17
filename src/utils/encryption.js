import CryptoJS from "crypto-js";
import dotenv from "dotenv";
dotenv.config();

const SECRET_KEY = process.env.CRYPTO_SECRET;

/* =========================
   Encrypt Function
========================= */

export const encryptData = (data) => {
  const ciphertext = CryptoJS.AES.encrypt(
    JSON.stringify(data),
    SECRET_KEY
  ).toString();

  return ciphertext;
};

/* =========================
   Decrypt Function
========================= */

export const decryptData = (ciphertext) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);

  const decryptedData = JSON.parse(
    bytes.toString(CryptoJS.enc.Utf8)
  );

  return decryptedData;
};
