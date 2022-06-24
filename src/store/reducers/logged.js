const loggedReducer = (state = false, action) => {
    switch (action.type) {
        case 'LOGGED':
            if(action.payload)
                return action.payload;
        default:
            return false;
    }
};
export default loggedReducer;