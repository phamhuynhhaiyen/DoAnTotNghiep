import {createSlice} from '@reduxjs/toolkit'

const classSlice = createSlice({
    name: 'class',
    initialState: {
        classlist: [],
        thisClass: {},
        doc_public: [],
        assignment: [],
        reference_list: []
    },
    reducers:{
        setClassList: (state, action) => {
            state.classlist = action.payload
        },
        setThisClass: (state, action) => {
            state.thisClass = action.payload
        },
        setDocPublic: (state, action) => {
            state.doc_public = action.payload
        },
        setAssignment: (state, action) => {
            state.assignment = action.payload
        },
        setReferencesList: (state, action) => {
            state.reference_list = action.payload
        },
        updateReference: (state, action) => {
            state.reference_list.find(v => v.classid === action.payload.classid_reference).id = action.payload.id;
        },
        updateWhenDeleteReference: (state, action) => {
            state.reference_list.find(v => v.id === action.payload).id = null;
        }
    }
})

export const { setClassList, setThisClass, setDocPublic, setAssignment, setReferencesList, updateReference, updateWhenDeleteReference } = classSlice.actions
export default classSlice.reducer