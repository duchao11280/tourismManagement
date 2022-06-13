import React, { useState, useEffect } from 'react'
import '../css/placeManagement.css'
import SearchBox from '../../component/SearchBox'
import { BiPencil } from "react-icons/bi";
import { IoBan } from "react-icons/io5";
import { TiTick } from "react-icons/ti"
import { AiOutlinePlus } from 'react-icons/ai'
import { useParams } from 'react-router-dom'
import { FaComment } from "react-icons/fa";
import { useHistory } from 'react-router-dom'
import { getAllCommentByPlaceID, deleteCommentByAdmin } from "../../networking/adminNetworking"
import Admin from '../admin'
const CommentPlace = () => {

    const [searchfield, setSearchfield] = useState('');
    const [listComment, setListComment] = useState([]);
    const history = useHistory();
    const [refresh, setRefresh] = useState(true)
    let { id } = useParams()
    useEffect(() => {

        getCommentFromServer(id);
        return () => {
            setListComment([])
        }
    }, [id, refresh])
    const getCommentFromServer = (id) => {

        getAllCommentByPlaceID(id)
            .then((listComment) => {
                setListComment(listComment)
                console.log(listComment)
            })
            .catch((err) => { alert(err); listComment([]) })
    }



    const onSearchChange = (event) => {
        setSearchfield(event.target.value);
    }

    const handleDeleteImage = (id) => {
        deleteCommentByAdmin(id).then((result) => {

            setRefresh(!refresh);

        })
    }


    const filteredComment = listComment === undefined ? [] : listComment.filter(comment => {
        var searchName = comment.fullName.toLowerCase().includes(searchfield.toLowerCase());
        var searchContent = comment.content.toLowerCase().includes(searchfield.toLowerCase());
        var search = searchName || searchContent;
        return search;
    })
    return (
        <div className="containerWithsideBar">
            <Admin />
            <div className="container-manager">
                <h2 className="title">Quản lý bình luận</h2>
                <SearchBox searchChange={onSearchChange} />
                <div>
                    <div className="box_button_add">
                        <h3> Danh sách bình luận</h3>
                    </div>

                    <table className="table_place">
                        <thead className="thead-table-place">
                            <tr>
                                <th>ID</th>
                                <th>Mã người dùng</th>
                                <th>Tên người dùng</th>
                                <th> nội dung bình luận</th>
                                <th> Đánh giá</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody className="tbody-place-management">
                            {filteredComment.map((item, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{item.id}</td>
                                        <td>{item.userID}</td>
                                        <td>{item.fullName}</td>
                                        <td>{item.content}</td>
                                        <td>{item.vote}/5</td>
                                        <td>
                                            <div className="action_button">
                                                <button className="btn_action button_disable" title="Xóa" onClick={() => { handleDeleteImage(item.id) }}><IoBan /></button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default CommentPlace