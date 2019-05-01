const initialState = {
    age: 20,
    text:'',
    data: null,
    jobList: null
};

const reducer = (state = initialState, action) =>{
    const newState = {...state};

    switch(action.type){
        case 'AGE_UP_ASYNC':
            newState.age+= action.value;
            break;

        case 'AGE_DOWN':
            newState.age -= action.value;
            break;

        case 'SEARCH_TEXT':
            newState.text = action.value;
            break;

        case 'SET_DATA':
            newState.data = action.value;
            break;

        case 'SET_JOB_LIST':
            newState.jobList = action.value;
            break;
    }
    return newState;
};

export default reducer;