import {createSlice} from '@reduxjs/toolkit'

const documentSlice = createSlice({
    name: 'document',
    initialState: {
        isAddDocumentOpen: false,
        documents: []
    },
    reducers:{
        setIsAddDocumentOpen: (state, action) => {
            state.isAddDocumentOpen = action.payload
        },
        setDocuments: (state, action) => {
            state.documents = action.payload
        }
    }
})

export const {setIsAddDocumentOpen, setDocuments} = documentSlice.actions
export default documentSlice.reducer