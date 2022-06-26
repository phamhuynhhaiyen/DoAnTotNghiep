import { deleteDocumentSuccess, setDoc, setDocuments, updateDocPrivacy, uploadDocumentSuccess } from './slices/documentSlice'
import { actionFailure, actionStart, actionSuccess } from './slices/actionSlice'
import { publishRequest } from './requesMethod'
import { setSubjects } from './slices/subjectSlice'
import { setInitPath, setMessage, setUser } from './slices/authSlice'
import { setLectures } from './slices/lectureSlice'
import { setStudents, setStudentsInSemester } from './slices/studentSlice'
import { setSemesters } from './slices/semesterSlice'
import { setMyFinalProjects, setProjects } from './slices/projectSlice'
import { setAssignment, setClassList, setDocPublic, setReferencesList, setThisClass, updateReference, updateWhenDeleteReference } from './slices/classSlice'

//documents
export const getDocuments = async (req, dispatch) => {
    dispatch(actionStart())
    try {
        const res = await publishRequest.post('/documents', req)
        dispatch(setDocuments(res.data))
        dispatch(actionSuccess())
    } catch (error) {
        dispatch(actionFailure())
    }
}
export const getMyDocuments = async (id, page, dispatch) => {
    dispatch(actionStart())
    try {
        const res = await publishRequest.get(`/my_documents/${id}?page=${page}`)
        dispatch(setDocuments(res.data))
        dispatch(actionSuccess())
    } catch (error) {
        dispatch(actionFailure())
    }
}
export const deleteDocument = async (id, dispatch) => {
    dispatch(actionStart())
    try {
        const res = await publishRequest.get(`/document/delete/${id}`)
        // dispatch(deleteDocumentSuccess(id))
        dispatch(actionSuccess())
    } catch (error) {
        dispatch(actionFailure())
    }
}
export const getDocument = async (id, dispatch) => {
    dispatch(actionStart())
    try {
        const res = await publishRequest.get(`/document/${id}`)
        dispatch(setDoc(res.data[0]))
        dispatch(actionSuccess())
    } catch (error) {
        dispatch(actionFailure())
    }
}
export const uploadDocument = async (doc, dispatch) => {
    dispatch(actionStart())
    try {
        const res = await publishRequest.post("/upload_document", doc)
        // const lecname = JSON.parse(localStorage.getItem("user")).name
        // dispatch(uploadDocumentSuccess({...res.data[0], lecture: lecname, subject: subname}))
        dispatch(actionSuccess())
    } catch (error) {
        dispatch(actionFailure())
    }
}
export const changePrivacy = async (data, dispatch) => {
    dispatch(actionStart())
    try {
        const res = await publishRequest.post("/changePrivacy", data)
        dispatch(updateDocPrivacy(data))
        // const lecname = JSON.parse(localStorage.getItem("user")).name
        // dispatch(uploadDocumentSuccess({...res.data[0], lecture: lecname, subject: subname}))
        dispatch(actionSuccess())
    } catch (error) {
        dispatch(actionFailure())
    }
}
//subjects
export const getSubjects = async (dispatch) => {
    dispatch(actionStart())
    try {
        const res = await publishRequest.get("/subjects")
        dispatch(setSubjects(res.data))
        dispatch(actionSuccess())
    } catch (error) {
        dispatch(actionFailure())
    }
}

//login
export const signin = async (dispatch, user) => {
    dispatch(actionStart())
    try {
        const res = await publishRequest.post("/login", user)
        if (res.data.hasOwnProperty("message")) {
            dispatch(setMessage(res.data.message))
        } else {
            // dispatch(setUser(res.data))
            localStorage.setItem("user", JSON.stringify(res.data))
            if (res.data.permission === "admin") {
                dispatch(setInitPath("/students"))
            }else {
                dispatch(setInitPath("/document-list"))
            }
            dispatch(setMessage(""))
            dispatch(actionSuccess())
        }

    } catch (error) {
        dispatch(actionFailure())
    }
}

//lecture
export const getAllLectures = async (dispatch) => {
    dispatch(actionStart())
    try {
        const res = await publishRequest.get(`/lectures`)
        dispatch(setLectures(res.data))
        dispatch(actionSuccess())
    } catch (error) {
        dispatch(actionFailure())
    }
}
export const getLecture = async (dispatch, userid) => {
    dispatch(actionStart())
    try {
        const res = await publishRequest.get(`/lecture/${userid}`)
        dispatch(setUser(res.data[0]))
        dispatch(actionSuccess())
    } catch (error) {
        dispatch(actionFailure())
    }
}

//students
export const getAllStudents = async (req, dispatch) => {
    dispatch(actionStart())
    try {
        const res = await publishRequest.post(`/students`, req)
        dispatch(setStudents(res.data))
        dispatch(actionSuccess())
    } catch (error) {
        dispatch(actionFailure())
    }
}
export const getStudentsInSemester = async (semesterid, page, dispatch) => {
    dispatch(actionStart())
    try {
        const res = await publishRequest.get(`/students/${semesterid}?page=${page}`)
        dispatch(setStudentsInSemester(res.data))
        dispatch(actionSuccess())
    } catch (error) {
        dispatch(actionFailure())
    }
}
export const getStudent = async (dispatch, userid) => {
    dispatch(actionStart())
    try {
        const res = await publishRequest.get(`/student/${userid}`)
        dispatch(setUser(res.data[0]))
        dispatch(actionSuccess())
    } catch (error) {
        dispatch(actionFailure())
    }
}

//semester
export const getAllSemesters = async (dispatch) => {
    dispatch(actionStart())
    try {
        const res = await publishRequest.get(`/semesters`)
        dispatch(setSemesters(res.data))
        dispatch(actionSuccess())
    } catch (error) {
        dispatch(actionFailure())
    }
}


//project
export const getMyFinalProjects = async (studentid, dispatch) => {
    dispatch(actionStart())
    try {
        const res = await publishRequest.get(`/my-final-projects/${studentid}`)
        dispatch(setMyFinalProjects(res.data))
        dispatch(actionSuccess())
    } catch (error) {
        dispatch(actionFailure())
    }
}
export const getProjectList = async (req, dispatch) => {
    dispatch(actionStart())
    try {
        const res = await publishRequest.post('/projects', req)
        dispatch(setProjects(res.data))
        dispatch(actionSuccess())
    } catch (error) {
        dispatch(actionFailure())
    }
}

//class
export const getClassList = async (lectureid, dispatch) => {
    dispatch(actionStart())
    try {
        const res = await publishRequest.get(`/classes?lectureid=${lectureid}`)
        dispatch(setClassList(res.data))
        dispatch(actionSuccess())
    } catch (error) {
        dispatch(actionFailure())
    }
}
export const getClassListStudent = async (studentid, dispatch) => {
    dispatch(actionStart())
    try {
        const res = await publishRequest.get(`/classes?studentid=${studentid}`)
        dispatch(setClassList(res.data))
        dispatch(actionSuccess())
    } catch (error) {
        dispatch(actionFailure())
    }
}
export const getClass = async (classid, dispatch) => {
    dispatch(actionStart())
    try {
        const res = await publishRequest.get(`/classes/${classid}`)
        dispatch(setThisClass(res.data))
        dispatch(actionSuccess())
    } catch (error) {
        dispatch(actionFailure())
    }
}

export const getStudentClass = async (classid, dispatch) => {
    dispatch(actionStart())
    try {
        const res = await publishRequest.get(`/classes/student/${classid}`)
        dispatch(setThisClass(res.data))
        dispatch(actionSuccess())
    } catch (error) {
        dispatch(actionFailure())
    }
}
export const getDocPublic = async (subid, dispatch) => {
    dispatch(actionStart())
    try {
        const res = await publishRequest.get(`/classes/doc_public/${subid}`)
        dispatch(setDocPublic(res.data))
        dispatch(actionSuccess())
    } catch (error) {
        dispatch(actionFailure())
    }
}
export const addAssignment = async (data, dispatch) => {
    dispatch(actionStart())
    try {
        const res = await publishRequest.post(`/classes/add_assignment`, data)
        dispatch(actionSuccess())
    } catch (error) {
        dispatch(actionFailure())
    }
}

export const getAssignmentofStudent = async (classid, studentid, dispatch) => {
    dispatch(actionStart())
    try {
        const res = await publishRequest.get(`/assignment?classid=${classid}&studentid=${studentid}`)
        dispatch(setAssignment(res.data))
        dispatch(actionSuccess())
    } catch (error) {
        dispatch(actionFailure())
    }
}
export const getAssignmentofLecture = async (classid, dispatch) => {
    dispatch(actionStart())
    try {
        const res = await publishRequest.get(`/assignment?classid=${classid}`)
        dispatch(setAssignment(res.data))
        dispatch(actionSuccess())
    } catch (error) {
        dispatch(actionFailure())
    }
}

export const getClassPrev = async (body, dispatch) => {
    dispatch(actionStart())
    try {
        const res = await publishRequest.post('/classes/prev', body)
        dispatch(setReferencesList(res.data))
        // console.log(res.data)
        dispatch(actionSuccess())
    } catch (error) {
        dispatch(actionFailure())
    }
}
export const insertReference = async (reference, dispatch) => {
    dispatch(actionStart())
    try {
        const res = await publishRequest.post(`/reference`, reference)
        dispatch(updateReference(res.data))
        dispatch(actionSuccess())
    } catch (error) {
        dispatch(actionFailure())
    }
}

export const deleteReference = async (id, dispatch) => {
    dispatch(actionStart())
    try {
        const res = await publishRequest.get(`/reference/${id}`)
        dispatch(updateWhenDeleteReference(id))
        // console.log(res.data)
        dispatch(actionSuccess())
    } catch (error) {
        dispatch(actionFailure())
    }
}