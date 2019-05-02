const initialState = {
    text:'',
    data: null,
    jobList: null
};

const reducer = (state = initialState, action) =>{
    const newState = {...state};

    switch(action.type){
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