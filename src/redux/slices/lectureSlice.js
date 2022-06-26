import {createSlice} from '@reduxjs/toolkit'

const lectureSlice = createSlice({
    name: 'lecture',
    initialState: {
        lectures: []
    },
    reducers:{
        setLectures: (state, action) => {
            state.lectures = action.payload
        }
    }
})

export const {setLectures} = lectureSlice.actions
export default lectureSlice.reducer