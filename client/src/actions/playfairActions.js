import axios from "axios";
export const updateKey = (textToUpdate, oldText) => dispatch =>{ 
    oldText.key = textToUpdate;
    dispatch({
        type: "UPDATE_PLAYFAIR_KEY",
        payload: oldText
    })
}

export const updatePlaintext = (textToUpdate, oldText) => dispatch =>{
    oldText.plaintext = textToUpdate;
    dispatch({
        type: "UPDATE_PLAYFAIR_PLAINTEXT",
        payload: oldText
    })
}

export const updateCiphertext = (textToUpdate, oldText) => dispatch =>{
    oldText.ciphertext = textToUpdate;
    dispatch({
        type: "UPDATE_PLAYFAIR_CIPHERTEXT",
        payload: oldText
    })
}

export const defaultplayfairText = () => dispatch =>{
    dispatch({
        type: "DEFAULT_PLAYFAIR_TEXT"
    })
}

export const encryptPlaintext = (playfairData) => dispatch =>{
    let key = playfairData.key;
    let plaintext = playfairData.plaintext;
    let ciphertext = "";
    let alphabet = "ABCDEFGHIKLMNOPQRSTUVWXYZ"

    //********generate keysquar********e//
    key = key.toUpperCase()
    //remove spaces
    key = key.replace(/\s+/g, '');
    //remove duplicate characters (solution found at https://www.codegrepper.com/code-examples/javascript/how+to+remove+duplicate+characters+from+string+in+javascript)
    key = key
    .split('')
    .filter(function(item, pos, self) {
      return self.indexOf(item) == pos;
    })
    .join('');
    //add the rest of the alphabet
    for(let i = 0; i < alphabet.length; i++){
        if(key.includes(alphabet[i]) === false){
            key += alphabet[i];
        }
    }
    //make keysquare 
    let keysquare = []
    for (let i = 0; i < key.length; i += 5) {
        let tempArray = [key[i], key[i+1], key[i+2], key[i+3], key[i+4]];
        keysquare.push(tempArray);   
    }

    // for(let row of keysquare){
    //     console.log(row);
    // }

    //clean plaintext
    plaintext = plaintext.toUpperCase();
    plaintext = plaintext.replace(/\s+/g, '');
    let temp = ""
    for (let i = 0; i < plaintext.length; i++){
        if(plaintext[i] === 'J'){
            temp+= 'I'
        }else{
            temp += plaintext[i];
        }
        if (plaintext[i] === plaintext[i + 1]){
            temp += "X";
            i++
        }
    }

    //add X if odd number of characters
    plaintext = temp
    if (plaintext.length % 2 !== 0){
        plaintext += "X";
    }
    
    //split string into sets of 2
    plaintext = plaintext.match(/.{2}/g)

    let col = []
    for (let i = 0; i < 5; i++){
        col.push([keysquare[0][i], keysquare[1][i], keysquare[2][i], keysquare[3][i], keysquare[4][i]])
    }
    for (let pair of plaintext){
        //check row
        let found = false
        for (let i = 0; i < keysquare.length; i++){
            if (keysquare[i].includes(pair[0]) === true && keysquare[i].includes(pair[1]) === true){
                let temp1 = keysquare[i].indexOf(pair[0]) + 1;
                if (temp1 > 4){temp1 = 0;}
                ciphertext += keysquare[i][temp1];
                let temp2 = keysquare[i].indexOf(pair[1]) + 1;
                if (temp2 > 4){temp2 = 0;}
                ciphertext += keysquare[i][temp2];
                found = true
            }
        }
        if(found === false){
            for (let i = 0; i < keysquare.length; i++){
                if (col[i].includes(pair[0]) === true && col[i].includes(pair[1]) === true){
                    let temp1 = col[i].indexOf(pair[0]) + 1;
                    if (temp1 > 4){temp1 = 0;}
                    ciphertext += col[i][temp1];
                    let temp2 = col[i].indexOf(pair[1]) + 1;
                    if (temp2 > 4){temp2 = 0;}
                    ciphertext += col[i][temp2];
                    found = true
                }
            }
        }
        if (found === false){
            let index1 = 0;
            let row1 = 0;
            let index2 = 0;
            let row2 = 0;
            for(let i = 0; i < keysquare.length; i++){
                if (keysquare[i].indexOf(pair[0]) !== -1){
                    index1 = keysquare[i].indexOf(pair[0])
                    row1 = i
                }
                if (keysquare[i].indexOf(pair[1]) !== -1){
                    index2 = keysquare[i].indexOf(pair[1])
                    row2 = i
                }
            }
            ciphertext += keysquare[row1][index2];
            ciphertext += keysquare[row2][index1];
        } 
    }
    playfairData.ciphertext = ciphertext;
    dispatch({
        type: "ENCRYPT_PLAYFAIR",
        payload: playfairData
    })
}

export const decryptCiphertext = (playfairData) => dispatch =>{
    let key = playfairData.key;
    let ciphertext = playfairData.ciphertext;
    let plaintext = "";
    let alphabet = "ABCDEFGHIKLMNOPQRSTUVWXYZ"

    //********generate keysquar********e//
    key = key.toUpperCase()
    //remove spaces
    key = key.replace(/\s+/g, '');
    //remove duplicate characters (solution found at https://www.codegrepper.com/code-examples/javascript/how+to+remove+duplicate+characters+from+string+in+javascript)
    key = key
    .split('')
    .filter(function(item, pos, self) {
      return self.indexOf(item) == pos;
    })
    .join('');
    //add the rest of the alphabet
    for(let i = 0; i < alphabet.length; i++){
        if(key.includes(alphabet[i]) === false){
            key += alphabet[i];
        }
    }
    //make keysquare 
    let keysquare = []
    for (let i = 0; i < key.length; i += 5) {
        let tempArray = [key[i], key[i+1], key[i+2], key[i+3], key[i+4]];
        keysquare.push(tempArray);   
    }

    for(let row of keysquare){
        console.log(row);
    }

    //clean ciphertext
    ciphertext = ciphertext.toUpperCase();
    ciphertext = ciphertext.replace(/\s+/g, '');
   
    //add X if odd number of characters
    if (ciphertext.length % 2 !== 0){
        ciphertext += "X";
    }
    
    //split string into sets of 2
    ciphertext = ciphertext.match(/.{2}/g)

    let col = []
    for (let i = 0; i < 5; i++){
        col.push([keysquare[0][i], keysquare[1][i], keysquare[2][i], keysquare[3][i], keysquare[4][i]])
    }
    for (let pair of ciphertext){
        //check row
        let found = false
        for (let i = 0; i < keysquare.length; i++){
            if (keysquare[i].includes(pair[0]) === true && keysquare[i].includes(pair[1]) === true){
                let temp1 = keysquare[i].indexOf(pair[0]) - 1;
                if (temp1 < 0){temp1 = 4;}
                plaintext += keysquare[i][temp1];
                let temp2 = keysquare[i].indexOf(pair[1]) - 1;
                if (temp2 < 0){temp2 = 4;}
                plaintext += keysquare[i][temp2];
                found = true
            }
        }
        if(found === false){
            for (let i = 0; i < keysquare.length; i++){
                if (col[i].includes(pair[0]) === true && col[i].includes(pair[1]) === true){
                    let temp1 = col[i].indexOf(pair[0]) - 1;
                    if (temp1 < 0){temp1 = 4;}
                    plaintext += col[i][temp1];
                    let temp2 = col[i].indexOf(pair[1]) - 1;
                    if (temp2 < 0){temp2 = 4;}
                    plaintext += col[i][temp2];
                    found = true
                }
            }
        }
        if (found === false){
            let index1 = 0;
            let row1 = 0;
            let index2 = 0;
            let row2 = 0;
            for(let i = 0; i < keysquare.length; i++){
                if (keysquare[i].indexOf(pair[0]) !== -1){
                    index1 = keysquare[i].indexOf(pair[0])
                    row1 = i
                }
                if (keysquare[i].indexOf(pair[1]) !== -1){
                    index2 = keysquare[i].indexOf(pair[1])
                    row2 = i
                }
            }
            plaintext += keysquare[row1][index2];
            plaintext += keysquare[row2][index1];
        } 
    }
    playfairData.plaintext = plaintext;
    dispatch({
        type: "DECRYPT_PLAYFAIR",
        payload: playfairData
    })
}

export const updatePlayfairTestInput = (input) => dispatch =>{
    dispatch({
        type: "UPDATE_PLAYFAIR_TEST_INPUT",
        payload: input
    })
}

export const checkPlayfairAnswer = (answer, input, userId, id) => dispatch =>{
    let message = ""
    if (answer === input){
        message = "you are correct"
        let progress = JSON.parse(localStorage.getItem("progress"));
        progress.playfair[id] = true;
        console.log(progress)
        axios.post("/api/users/updateprogress", {payload: progress, userid: userId});
        localStorage.setItem("progress", JSON.stringify(progress));
    }
    else{
        message = "That is incorrect. Try again!"
    }
    dispatch({
        type: "CHECK_PLAYFAIR",
        payload: message
    })
}