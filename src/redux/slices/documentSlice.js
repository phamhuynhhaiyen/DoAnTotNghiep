import {createSlice} from '@reduxjs/toolkit'

const documentSlice = createSlice({
    name: 'document',
    initialState: {
        isAddDocumentOpen: false,
        documents: [],
        doc:{}
    },
    reducers:{
        setIsAddDocumentOpen: (state, action) => {
            state.isAddDocumentOpen = action.payload
        },
        setDocuments: (state, action) => {
            state.documents = action.payload
        },
        setDoc: (state, action) => {
            state.doc = action.payload
        },
        updateDocPrivacy: (state, action) => {
            state.documents.data.find(v => v.docid === action.payload.docid).privacy = action.payload.privacy;
        }
        // uploadDocumentSuccess: (state, action) => {
        //     state.documents.data.unshift(action.payload);
        // },
        // deleteDocumentSuccess: (state, action) => {
        //     state.documents.data.filter(doc => doc.docid !== action.payload)
        // }
    }
})

export const {setIsAddDocumentOpen, setDocuments, setDoc, updateDocPrivacy} = documentSlice.actions
export default documentSlice.reducer