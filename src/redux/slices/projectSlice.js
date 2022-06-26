import {createSlice} from '@reduxjs/toolkit'

const projectSlice = createSlice({
    name: 'project',
    initialState: {
        myFinalProjects: [],
        projects: []
    },
    reducers:{
        setMyFinalProjects: (state, action) => {
            state.myFinalProjects = action.payload
        },
        setProjects: (state, action) => {
            state.projects = action.payload
        }
    }
})

export const { setMyFinalProjects, setProjects} = projectSlice.actions
export default projectSlice.reducer