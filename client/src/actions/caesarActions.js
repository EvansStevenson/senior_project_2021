import axios from "axios";
export const incrementKey = () => dispatch =>{
    dispatch({
        type: "INCREMENT_CAESAR_KEY"
    })
} 

export const decrementKey = () => dispatch =>{
    dispatch({
        type: "DECREMENT_CAESAR_KEY"
    })
}

export const resetKey = () => dispatch =>{
    dispatch({
        type: "RESET_KEY"
    })
}

export const updateCaesarCiphertext = (plainText, key) => dispatch =>{
    let cipherText = ""
    if(plainText !== ""){
        let base = "abcdefghijklmnopqrstuvwxyz"
        let baseMap = new Map();
        for (let i = 0; i < 26; i++){
            baseMap.set(base[i], i)
        }
        for(let i = 0; i < plainText.length; i++){
            if ("~`!#$%^&*+=-[]\\\';,/{}|\":<>? 1234567890".search(plainText[i]) !== -1){
                cipherText += plainText[i]
            }else{
                let cipher = baseMap.get(plainText[i]) + key;
                if(cipher > 25){
                    cipher = (cipher - 26)
                } else if(cipher < 0){
                    cipher = (26 - Math.abs(cipher))
                }
                cipherText += base[cipher]
            }
        }
    }
    dispatch({
        type: "UPDATE_CAESAR_CIPHERTEXT",
        payload: {cipherText: cipherText, plainText: plainText}
    })
}

export const updateCaesarPlaintext = (cipherText, key) => dispatch =>{
    let plainText = ""
    if(cipherText !== ""){
        let base = "abcdefghijklmnopqrstuvwxyz"
        let baseMap = new Map();
        for (let i = 0; i < 26; i++){
            baseMap.set(base[i], i)
        }
        for(let i = 0; i < cipherText.length; i++){
            if ("~`!#$%^&*+=-[]\\\';,/{}|\":<>? 1234567890".search(cipherText[i]) !== -1){
                plainText += cipherText[i]
            }else{
                let cipher = baseMap.get(cipherText[i]) - key;
                if(cipher > 25){
                    cipher = (cipher - 26)
                } else if(cipher < 0){
                    cipher = (26 - Math.abs(cipher))
                }
                plainText += base[cipher]
            }
        }
    }
    dispatch({
        type: "UPDATE_CAESAR_PLAINTEXT",
        payload: {cipherText: cipherText, plainText: plainText}
    })
}

export const setDefaultText = () => dispatch =>{
    dispatch({
        type: "DEFAULT_TEXT"
    })
}

export const caesarToggle = (toggle) => dispatch =>{
    if(toggle){
        toggle = false; 
    }
    else if (!toggle){
        toggle = true;
    }
    dispatch({
        type: "TOGGLE_CAESAR",
        payload: toggle
    })
}

export const updateModAlphabet = (mod) => dispatch => {
    let base = "abcdefghijklmnopqrstuvwxyz"
    let modAlphabet = ""
    for (let character in base){
        modAlphabet += base[(Number(character) + mod) % 26]
    }
    dispatch({
        type: "CAESAR_MOD_ALPHABET",
        payload: modAlphabet
    })
}

export const updateCaesarInput = (input) => dispatch => {
    dispatch({
        type: "UPDATE_CAESAR_INPUT",
        payload: input
    })
}

export const checkError = (answer, input, userId, id) => dispatch => {
    let message = ""
    if (answer === input){
        message = "you are correct"
        let progress = JSON.parse(localStorage.getItem("progress"));
        progress.caesar[id] = true;
        console.log(progress)
        axios.post("/api/users/updateprogress", {payload: progress, userid: userId});
        localStorage.setItem("progress", JSON.stringify(progress));
    }
    else{
        message = "That is incorrect. Try again!"
    }
    dispatch({
        type: "CHECK_ERROR",
        payload: message
    })
}

