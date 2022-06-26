import {createSlice} from '@reduxjs/toolkit'

const studentSlice = createSlice({
    name: 'student',
    initialState: {
        students: [],
        studentsInSemester: [],
        isAddStudentModal: false
    },
    reducers:{
        setStudents: (state, action) => {
            state.students = action.payload
        },
        setStudentsInSemester: (state, action) => {
            state.studentsInSemester = action.payload
        },
        setIsAddStudentModal: (state, action) => {
            state.isAddStudentModal = action.payload
        }
    }
})

export const {setStudents, setStudentsInSemester, setIsAddStudentModal} = studentSlice.actions
export default studentSlice.reducer