let intialState=""
const SetMessageReducer=(state=intialState,{type,payload})=>{
    switch(type){
        case "SETMESSAGE":
            return state=payload;
        default:
            return state;
    }
}

export default SetMessageReducer;