import {createSlice} from '@reduxjs/toolkit'

const semesterSlice = createSlice({
    name: 'semester',
    initialState: {
        semesters: [],
        isOpenModal: false
    },
    reducers:{
        setSemesters: (state, action) => {
            state.semesters = action.payload
        },
        setIsOpenModal: (state, action) => {
            state.isOpenModal = action.payload
        }
    }
})

export const {setSemesters, setIsOpenModal} = semesterSlice.actions
export default semesterSlice.reducer