import {createSlice} from '@reduxjs/toolkit'

const actionSlice = createSlice({
    name: 'action',
    initialState: {
        isFetching: false,
        error: false
    },
    reducers:{
        //START
        actionStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        //FAILURE
        actionFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
        //SUCCESS
        actionSuccess: (state) => {
            state.isFetching = false;
            state.error = false;
        }
    }
})

export const {actionStart, actionFailure, actionSuccess} = actionSlice.actions
export default actionSlice.reducer