import { setDocuments } from './slices/documentSlice'
import { actionFailure, actionSuccess } from './slices/actionSlice'
import { publishRequest } from '../requesMethods'


export const getDocuments = async (dispatch) => {
    dispatch(actionStart())
    try {
        const res = await publishRequest.get("/documents")
        dispatch(setDocuments(res.data))
        dispatch(actionSuccess())
    } catch (error) {
        dispatch(actionFailure())
    }
}
