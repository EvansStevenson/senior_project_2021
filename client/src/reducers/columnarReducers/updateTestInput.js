export default function (state = "", action) {
    switch (action.type) {
        case "UPDATE_COLUMNAR_TEST_INPUT":
            return action.payload
        default:
            return state;
    }
}
