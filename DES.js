
function DES_decode() {
  let key = document.getElementById("key").value;
  let word = document.getElementById("word").value;
  let output = desDecrypt(word, key);
  document.getElementById("output").value = output;
} 
function DES_encode() {
  let key = document.getElementById("key").value;
  let word = document.getElementById("word").value;
  let output = desEncrypt(word, key);
  document.getElementById("output").value = output;
}  





function vigenere_encode() {
  let key = document.getElementById("key").value;
  let word = document.getElementById("word").value;
  let output = Vigenere_Encode(word, key);
  document.getElementById("output").value = output;
}
function vigenere_decode() {
  let key = document.getElementById("key").value;
  let word = document.getElementById("word").value;
  let output = Vigenere_Decode(word, key);
  document.getElementById("output").value = output;
}
function caesar_encode() {
  let key = parseInt(document.getElementById("key").value);
  let word = document.getElementById("word").value;
  let output = Caesar_Encode(word, key);
  document.getElementById("output").value = output;
}
function caesar_decode() {
  let key = parseInt(document.getElementById("key").value);
  let word = document.getElementById("word").value;
  let output = Caesar_Decode(word, key);
  document.getElementById("output").value = output;
}
function playfair_encode() {
  let key = document.getElementById("key").value;
  let word = document.getElementById("word").value;
  let output = Playfair_Encode(word, key);
  document.getElementById("output").value = output;
}
function playfair_decode() {
  let key = document.getElementById("key").value;
  let word = document.getElementById("word").value;
  let output = Playfair_Decode(word, key);
  document.getElementById("output").value = output;
}





function Vigenere_Encode(plaintext, key) {
let ciphertext = "";
let keyIndex = 0;
for (let i = 0; i < plaintext.length; i++) {
  let plainChar = plaintext[i].toUpperCase();
  let keyChar = key[keyIndex].toUpperCase();
  let plainCode = plainChar.charCodeAt(0) - 65;
  let keyCode = keyChar.charCodeAt(0) - 65;
  let cipherCode = (plainCode + keyCode) % 26;
  let cipherChar = String.fromCharCode(cipherCode + 65);
  ciphertext += cipherChar;
  keyIndex = (keyIndex + 1) % key.length;
}
return ciphertext;
}
function Vigenere_Decode(ciphertext, keyword) {
let n = ciphertext.length;
let m = keyword.length;
let plaintext = "";
for (let i = 0; i < n; i++) {
  let cipherChar = ciphertext[i].toUpperCase();
  let keyChar = keyword[i % m].toUpperCase();
  let cipherCode = cipherChar.charCodeAt(0) - 65;
  let keyCode = keyChar.charCodeAt(0) - 65;
  let plainCode = (cipherCode - keyCode + 26) % 26;
let plainChar = String.fromCharCode(plainCode + 65);
plaintext += plainChar;
}
return plaintext;
}
function Caesar_Encode(plaintext, shift) {
let ciphertext = "";
for (let i = 0; i < plaintext.length; i++) {
let plainChar = plaintext[i].toUpperCase();
let plainCode = plainChar.charCodeAt(0) - 65;
let cipherCode = (plainCode + shift) % 26;
let cipherChar = String.fromCharCode(cipherCode + 65);
ciphertext += cipherChar;
}
return ciphertext;
}
function Caesar_Decode(ciphertext, shift) {
let plaintext = "";
for (let i = 0; i < ciphertext.length; i++) {
let cipherChar = ciphertext[i].toUpperCase();
let cipherCode = cipherChar.charCodeAt(0) - 65;
let plainCode = (cipherCode - shift + 26) % 26;
let plainChar = String.fromCharCode(plainCode + 65);
plaintext += plainChar;
}
return plaintext;
}
function Playfair_Encode(origin, key) {
let i, j, k, n;
let s = '';
for (i = 0; i < origin.length; i++) {
if (origin[i] !== ' ')
s += origin[i];
}
let a = new Array(5);
for (i = 0; i < 5; i++) {
a[i] = new Array(5).fill(' ');
}
n = 5;
let mp = new Map();
k = 0;
let pi, pj;
for (i = 0; i < n; i++) {
for (j = 0; j < n; j++) {
while (mp.get(key[k]) > 0 && k < key.length) {
k++;
}
if (k < key.length) {
a[i][j] = key[k];
mp.set(key[k], 1);
pi = i;
pj = j;
}
if (k === key.length)
break;
}
if (k === key.length)
break;
}
k = 0;
for (; i < n; i++) {
for (; j < n; j++) {
while (mp.get(String.fromCharCode(k + 97)) > 0 && k < 26) {
k++;
}
if (String.fromCharCode(k + 97) === 'j') {
j--;
k++;
continue;
}
if (k < 26) {
a[i][j] = String.fromCharCode(k + 97);
mp.set(String.fromCharCode(k + 97), 1);
}
}
j = 0;
}

let ans = '';
if (s.length % 2 === 1)
s += 'x';
for (i = 0; i < s.length - 1; i++) {
if (s[i] === s[i + 1])
s = s.slice(0, i + 1) + 'x' + s.slice(i + 1);
}

let mp2 = new Map();

for (i = 0; i < n; i++) {
for (j = 0; j < n; j++) {
mp2.set(a[i][j], [i, j]);
}
}

for (i = 0; i < s.length - 1; i += 2) {
let y1 = mp2.get(s[i])[0];//row //x 
let x1 = mp2.get(s[i])[1];//col 
let y2 = mp2.get(s[i + 1])[0]; //y
let x2 = mp2.get(s[i + 1])[1];
if (y1 === y2) {
ans += a[y1][(x1 + 1) % 5];
ans += a[y1][(x2 + 1) % 5];
} else if (x1 === x2) {
ans += a[(y1 + 1) % 5][x1];
ans += a[(y2 + 1) % 5][x2];
} else {
ans += a[y1][x2];
ans += a[y2][x1];
}
}
return ans;
}
function Playfair_Decode(cipher_text, key) {
let i, j, k, n;
let s = '';
for (i = 0; i < cipher_text.length; i++) {
    if (cipher_text[i] !== ' ') {
        s += cipher_text[i];
    }
}

let a = Array.from(Array(5), () => Array(5).fill(' '));
n = 5;
let mp = new Map();
k = 0;
let pi, pj;
for (i = 0; i < n; i++) {
    for (j = 0; j < n; j++) {
        while (mp.has(key[k]) && mp.get(key[k]) > 0 && k < key.length) {
            k++;
        }
        if (k < key.length) {
            a[i][j] = key[k];
            mp.set(key[k], 1);
            pi = i;
            pj = j;
        }
        if (k === key.length) {
            break;
        }
    }
    if (k === key.length) {
        break;
    }
}

k = 0;
for (; i < n; i++) {
    for (; j < n; j++) {
        while (mp.has(String.fromCharCode(k + 97)) && mp.get(String.fromCharCode(k + 97)) > 0 && k < 26) {
            k++;
        }
        if (String.fromCharCode(k + 97) === 'j') {
            j--;
            k++;
            continue;
        }
        if (k < 26) {
            a[i][j] = String.fromCharCode(k + 97);
            mp.set(String.fromCharCode(k + 97), 1);
        }
    }
    j = 0;
}

let ans = '';
for (i = 0; i < s.length - 1; i += 2) {
    let y1, x1, y2, x2;
    for (j = 0; j < n; j++) {
        for (k = 0; k < n; k++) {
            if (a[j][k] === s[i]) {
                y1 = j;
                x1 = k;
            }
            if (a[j][k] === s[i + 1]) {
                y2 = j;
                x2 = k;
            }
        }
    }
    if (y1 === y2) {
        ans += a[y1][(x1 + n - 1) % n];
        ans += a[y1][(x2 + n - 1) % n];
    }
    else if (x1 === x2) {
        ans += a[(y1 + n - 1) % n][x1];
        ans += a[(y2 + n - 1) % n][x2];
    }
    else {
        ans += a[y1][x2];
        ans += a[y2][x1];
    }
}
return ans;
}


function desEncrypt(plaintext, key) {
  var cryptoKey = CryptoJS.enc.Utf8.parse(key);
  var encrypted = CryptoJS.DES.encrypt(plaintext, cryptoKey, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  return encrypted.ciphertext.toString(CryptoJS.enc.Hex);
}

function desDecrypt(ciphertext, key) {
  var cryptoKey = CryptoJS.enc.Utf8.parse(key);
  var decrypted = CryptoJS.DES.decrypt({
    ciphertext: CryptoJS.enc.Hex.parse(ciphertext)
  }, cryptoKey, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
}