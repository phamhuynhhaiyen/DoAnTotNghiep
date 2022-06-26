import {createSlice} from '@reduxjs/toolkit'

const actionSlice = createSlice({
    name: 'action',
    initialState: {
        isFetching: false,
        error: false,
        isDeleteForm: false,
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
        },
        setIsDeleteForm: (state, action) => {
            state.isDeleteForm = action.payload
        }
    }
})

export const {actionStart, actionFailure, actionSuccess, setIsDeleteForm} = actionSlice.actions
export default actionSlice.reducer