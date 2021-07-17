 import axios from "axios";
export const updateKey = (textToUpdate, oldText) => dispatch =>{ 
    oldText.key = textToUpdate;
    dispatch({
        type: "UPDATE_COLUMNAR_KEY",
        payload: oldText
    })
}

export const updatePlaintext = (textToUpdate, oldText) => dispatch =>{
    oldText.plaintext = textToUpdate;
    dispatch({
        type: "UPDATE_COLUMNAR_PLAINTEXT",
        payload: oldText
    })
}

export const updateCiphertext = (textToUpdate, oldText) => dispatch =>{
    oldText.ciphertext = textToUpdate;
    dispatch({
        type: "UPDATE_COLUMNAR_CIPHERTEXT",
        payload: oldText
    })
}

export const defaultColumnarText = () => dispatch =>{
    dispatch({
        type: "DEFAULT_COLUMNAR_TEXT"
    })
}

export const encryptPlaintext = (columnarData) => dispatch =>{
    let key = columnarData.key;
    key = key.replace(/\s+/g, '');
    key = key
    .split('')
    .filter(function(item, pos, self) {
      return self.indexOf(item) == pos;
    })
    .join('');
    let plaintext = columnarData.plaintext;
    let ciphertext = "";
    //make first box
    let keysquare = []
    let tempArray = []
    for (let j = 0; j < key.length; j++){
        tempArray.push(key[j]);
    }
    keysquare.push(tempArray);   
    for (let i = 0; i < plaintext.length; i += key.length) {
        tempArray = [];
        for (let j = 0; j < key.length; j++){
            if(plaintext[i + j] === undefined){
                tempArray.push("x");
            }else{
                tempArray.push(plaintext[i + j]);
            }
        }
        keysquare.push(tempArray);   
    }
    console.log(keysquare)
    //make second box
    let col = []
    for (let i = 0; i < key.length; i++){
        tempArray = [];
        for(let j = 0; j < keysquare.length; j++){
            tempArray.push(keysquare[j][i])
        }
        col.push(tempArray);
    }
    console.log(col.sort())
    col = col.sort()
    for (let column of col){
        for (let i = 1; i < column.length; i++){
            ciphertext += column[i];
        }
    }
    columnarData.ciphertext = ciphertext;
    dispatch({
        type: "ENCRYPT_COLUMNAR",
        payload: columnarData
    })
}

export const decryptCiphertext = (columnarData) => dispatch =>{
    let key = columnarData.key;
    let ciphertext = columnarData.ciphertext;
    let plaintext = "";
    key = key.replace(/\s+/g, '');
    key = key
    .split('')
    .filter(function(item, pos, self) {
      return self.indexOf(item) == pos;
    })
    .join('');
    let sortedkey = key.split('').sort().join('')
    console.log(sortedkey)
    let rows = ciphertext.length / key.length;
    console.log("rows: " + rows)
    let keymap = new Map();
    let splitcipher = ciphertext.match(new RegExp('.{1,' + rows + '}', 'g'))
    console.log(splitcipher);
    for (let i = 0; i < sortedkey.length; i++){
        keymap.set(sortedkey[i], splitcipher[i])
    }
    console.log(keymap)
    //final square
    let decodedGrid = []
    for (let i = 0; i < key.length; i++){
        decodedGrid.push(keymap.get(key[i]).split(""))
    }
    console.log(decodedGrid);
    let col = []
    for (let i = 0; i < rows; i++){
        let tempArray = [];
        for(let j = 0; j < decodedGrid.length; j++){
            tempArray.push(decodedGrid[j][i])
        }
        col.push(tempArray);
    }
    console.log(col)
    for (let item of col){
        plaintext += item.join("")
    }
    columnarData.plaintext = plaintext
    dispatch({
        type: "DECRYPT_COLUMNAR",
        payload: columnarData
    })
}

export const updateColumnarInput = (input) => dispatch =>{
    dispatch({
        type: "UPDATE_COLUMNAR_TEST_INPUT",
        payload: input
    })
}

export const checkColumnarAnswer = (answer, input, userId, id) => dispatch =>{
    let message = ""
    if (answer === input){
        message = "you are correct"
        let progress = JSON.parse(localStorage.getItem("progress"));
        progress.columnar[id] = true;
        console.log(progress);
        axios.post("/api/users/updateprogress", {payload: progress, userid: userId});
        localStorage.setItem("progress", JSON.stringify(progress));
    }
    else{
        message = "That is incorrect. Try again!"
    }
    dispatch({
        type: "CHECK_COLUMNAR",
        payload: message
    })
}

