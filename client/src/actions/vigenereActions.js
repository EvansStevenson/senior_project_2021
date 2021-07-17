import axios from "axios";
export const updateKey = (textToUpdate, oldText) => dispatch =>{ 
    oldText.key = textToUpdate;
    dispatch({
        type: "UPDATE_VIGENERE_KEY",
        payload: oldText
    })
}

export const updatePlaintext = (textToUpdate, oldText) => dispatch =>{
    oldText.plaintext = textToUpdate;
    dispatch({
        type: "UPDATE_VIGENERE_PLAINTEXT",
        payload: oldText
    })
}

export const updateCiphertext = (textToUpdate, oldText) => dispatch =>{
    oldText.ciphertext = textToUpdate;
    dispatch({
        type: "UPDATE_VIGENERE_CIPHERTEXT",
        payload: oldText
    })
}

export const defaultVigenereText = () => dispatch =>{
    dispatch({
        type: "DEFAULT_VIGENERE_TEXT"
    })
}

export const encryptPlaintext = (vigenereData) => dispatch =>{
    let key = vigenereData.key;
    key = key.replace(/\s+/g, '');
    let plaintext = vigenereData.plaintext;
    let ciphertext = "";
    let characters = "abcdefghijklmnopqrstuvwxyz";
    //make keystring
    if (key.length > plaintext.length){
        while (key.length !== plaintext.length){
            key = key.slice(0, -1);
        }
    } 
    else{
        while (key.length < plaintext.length){
            key += vigenereData.key;
            if (key.length > plaintext.length){
                while (key.length !== plaintext.length){
                    key = key.slice(0, -1);
                }
            }
        }
    }

    //math
    for (let i = 0; i < plaintext.length; i++) { 
        ciphertext += characters[(characters.search(plaintext[i]) + characters.search(key[i])) % characters.length];
    }
    vigenereData.ciphertext = ciphertext
    dispatch({
        type: "ENCRYPT_VIGENERE",
        payload: vigenereData
    })
}

export const decryptCiphertext = (vigenereData) => dispatch =>{
    let key = vigenereData.key;
    key = key.replace(/\s+/g, '');
    let plaintext = "";
    let ciphertext = vigenereData.ciphertext;
    let characters = "abcdefghijklmnopqrstuvwxyz";
    //make keystring
    if (key.length > ciphertext.length){
        while (key.length !== ciphertext.length){
            key = key.slice(0, -1);
        }
    } 
    else{
        while (key.length < ciphertext.length){
            key += vigenereData.key;
            if (key.length > ciphertext.length){
                while (key.length !== ciphertext.length){
                    key = key.slice(0, -1);
                }
            }
        }
    }

    //math
    for (let i = 0; i < ciphertext.length; i++) { 
        plaintext += characters[(characters.search(ciphertext[i]) - characters.search(key[i]) + characters.length) % characters.length];
    }
    vigenereData.plaintext = plaintext;
    dispatch({
        type: "DECRYPT_VIGENERE",
        payload: vigenereData
    })
}

export const updateVigenereInput = (input) =>  dispatch => {
    dispatch({
        type: "UPDATE_VIGENERE_TEST_INPUT",
        payload: input
    })
}

export const checkVigenereAnswer = (answer, input, userId, id) => dispatch =>{
    let message = ""
    if (answer === input){
        message = "you are correct"
        let progress = JSON.parse(localStorage.getItem("progress"));
        progress.vigenere[id] = true;
        console.log(progress)
        axios.post("/api/users/updateprogress", {payload: progress, userid: userId});
        localStorage.setItem("progress", JSON.stringify(progress));
    }
    else{
        message = "That is incorrect. Try again!"
    }
    dispatch({
        type: "CHECK_VIGENERE",
        payload: message
    })
}