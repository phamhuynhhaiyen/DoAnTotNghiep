import React, { useEffect, useState } from 'react'
import { FilterWrapper, PageHeader, Wrapper } from './StudentsListInProjectStyle'
import { CloseOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { setIsOpenModal } from '../../redux/slices/semesterSlice'
import { getProjectList } from '../../redux/apiCalls'
import Table, { TableBody, TableHeader } from '../Table'
import Loading from '../Loading'
import Filter from '../../components/Filter'
import Pagination from '../Pagination'
import Button from '../Button'
import SearchInput from '../SearchInput'
import CheckBox from '../Checkbox'
import imgArtwork from '../../assets/artwork.svg'


const StudentsListInProject = (props) => {

    const isOpenModal = useSelector(state => state.semester.isOpenModal)
    const dispatch = useDispatch()

    const semesterid = props.semesterid

    const projects = useSelector(state => state.project.projects)

    const isFetching = useSelector(state => state.action.isFetching)

    const docHeader = ["", "STT", "Mã sinh viên", "Tên sinh viên", "Khóa", "Giảng viên hướng dẫn", "Tên đề tài", "Báo cáo", ""]

    const pageNumberLimit = projects.totalPages;
    const [currentPage, setCurrentPage] = useState(1);
    const [maxPageLimit, setMaxPageLimit] = useState(projects.totalPages);
    const [minPageLimit, setMinPageLimit] = useState(0);


    useEffect(() => {
        getProjectList({
            semesterid: semesterid,
            page: currentPage
        }, dispatch);
    }, [currentPage, semesterid]);


    const onPrevClick = () => {
        if ((currentPage - 1) % pageNumberLimit === 0) {
            setMaxPageLimit(maxPageLimit - pageNumberLimit);
            setMinPageLimit(minPageLimit - pageNumberLimit);
        }
        setCurrentPage(prev => prev - 1);
    }
    const onNextClick = () => {
        if (currentPage + 1 > maxPageLimit) {
            setMaxPageLimit(maxPageLimit + pageNumberLimit);
            setMinPageLimit(minPageLimit + pageNumberLimit);
        }
        setCurrentPage(prev => prev + 1);
    }
    const onPageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    return (
        <Wrapper isVisible={isOpenModal}>
            <div className="header">
                <div className="close" onClick={() => dispatch(setIsOpenModal(false))}><CloseOutlined /></div>
                <h3 className="title">{props.name}</h3>
            </div>
            <div className="body">
                <div className="container">
                    {
                        isFetching ? <Loading /> :
                            <>
                                <PageHeader>
                                    <SearchInput placeholder="Tìm kiếm" width="436px" />
                                    <div className="button-group">
                                        <div className="btn-group">
                                            <button className="btn-excel">
                                                Thêm từ file Excel
                                                <input type="file"
                                                // accept={SheetJSFT}
                                                // onChange={(event) => handleImportFile(event)}
                                                // onClick={(event) => { event.target.value = null }} 
                                                />
                                            </button>
                                            <Button>Thêm sinh viên</Button>
                                        </div>
                                    </div>
                                </PageHeader>
                                <FilterWrapper>
                                    <Filter title="Khóa" dataOptions="" />
                                </FilterWrapper>
                                <Table>
                                    <TableHeader>
                                        {docHeader.map((item, index) => (<td key={index}>{item}</td>))}
                                    </TableHeader>
                                    <TableBody>
                                        {projects.data?.map((item, index) => (
                                            <tr key={item.projectid}>
                                                <td>
                                                    <CheckBox
                                                        img={imgArtwork}
                                                    // checked={true}
                                                    />
                                                </td>
                                                <td>{currentPage === 1 ? index + 1 : (index + 1) + 10 * currentPage - 10}</td>
                                                <td>{item.studentid}</td>
                                                <td>{item.studentname}</td>
                                                <td>{item.grade}</td>
                                                <td>{item.lecture}</td>
                                                <td>{item.projectname === null ? 'Chưa có' : item.projectname}</td>
                                                <td>{item.url === null ? 'Chưa có' : item.url}</td>
                                                <td className="tbl-icon">
                                                    <EditOutlined />
                                                    <DeleteOutlined />
                                                </td>
                                            </tr>
                                        ))}
                                    </TableBody>
                                </Table>
                                <Pagination currentPage={currentPage} response={projects}
                                    onPrevClick={onPrevClick}
                                    onNextClick={onNextClick}
                                    onPageChange={onPageChange} />
                            </>
                    }
                </div>
            </div>
        </Wrapper>
    )
}

export default StudentsListInProject