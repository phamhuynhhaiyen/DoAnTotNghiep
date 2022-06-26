import {createSlice} from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: {},
        message: "",
        initPath:"/"
    },
    reducers:{
        setUser: (state, action) => {
            state.user = action.payload
        },
        setMessage: (state, action) => {
            state.message = action.payload
        },
        setInitPath: (state, action) => {
            state.initPath = action.payload
        }
    }
})

export const { setMessage, setUser, setInitPath } = authSlice.actions
export default authSlice.reducer