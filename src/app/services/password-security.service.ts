import { Injectable } from '@angular/core';
import * as CryptoJs from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class PasswordSecurityService {

  constructor() { }

  encryptFun(data: string) {
    // var data = "123456";
    var key  = CryptoJs.enc.Latin1.parse('1234567812345678');
    var iv   = CryptoJs.enc.Latin1.parse('1234567812345678');  
    var encrypted = CryptoJs.AES.encrypt(
      data,
      key,
      {iv:iv,mode:CryptoJs.mode.CBC,padding:CryptoJs.pad.ZeroPadding
    });
    return encrypted.toString();
    // var decrypted = CryptoJS.AES.decrypt(encrypted,key,{iv:iv,padding:CryptoJS.pad.ZeroPadding});
    
  }


  set(keys:string,value:string){
    var key = CryptoJs.enc.Utf8.parse(keys);
    var iv = CryptoJs.enc.Utf8.parse(keys);
    var encrypted = CryptoJs.AES.encrypt(CryptoJs.enc.Utf8.parse(value.toString()),key,
    {
      keySize: 128/8,
      iv: iv,
      mode: CryptoJs.mode.CBC,
      padding: CryptoJs.pad.Pkcs7
    });
    return encrypted.toString();
  }

  get(keys:string, value:string){
    var key = CryptoJS.enc.Utf8.parse(keys);
    var iv = CryptoJS.enc.Utf8.parse(keys);
    var decrypted = CryptoJS.AES.decrypt(value, key, {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });

    return decrypted.toString(CryptoJS.enc.Utf8);
  }
}
