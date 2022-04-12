import React, {useState, useEffect} from 'react'
import '../css/placeManagement.css'
import SearchBox from '../../component/SearchBox'
import { BiPencil } from "react-icons/bi";
import { IoBan } from "react-icons/io5";
import { TiTick } from "react-icons/ti"
import {AiOutlinePlus} from 'react-icons/ai'
import {getAllPlaces} from "../../networking/adminNetworking"
const PlaceManagement = () => {
 
    const [searchfield, setSearchfield] = useState('');
    const [listPlaces, setListPlaces] = useState([]);
    useEffect(()=>{
        getPlaceFromServer();
        console.log("Hello")
    },[])
    const getPlaceFromServer = () => {

        getAllPlaces()
            .then((listPlaces) => {
                setListPlaces(listPlaces)
            })
            .catch((err) => { alert("Xảy ra lỗi, vui lòng thử lại sau"); setListPlaces([]) })
    }
    const onSearchChange = (event)  => {
        setSearchfield(event.target.value);
    }
    const filteredPlaces = listPlaces === undefined ? [] : listPlaces.filter(place => {
        var searchName = place.placeName.toLowerCase().includes(searchfield.toLowerCase());
        var searchCity = place.city.toLowerCase().includes(searchfield.toLowerCase());
        var search = searchName || searchCity;
        return search;
    })
    return (
        <div className="container">
            <h2 className="title">Quản lý địa điểm du lịch</h2>
            <SearchBox searchChange ={onSearchChange}/>
            <div>
                <div className="box_button_add">
                <h3> Danh sách địa điểm</h3>
                <button className="button_add">
                    <AiOutlinePlus/>
                    Thêm mới
                </button>
                </div>
                <table className="table_place">
                    <tr>
                        <th>ID</th>
                        <th>Tên địa điểm</th>
                        <th>Tỉnh thành</th>
                        <th>Tình trạng</th>
                        <th></th>
                    </tr>
                    {filteredPlaces.map((item, i) => {
                        return (
                            <tr>
                                <td>{item.placeID}</td>
                                <td>{item.placeName}</td>
                                <td>{item.city}</td>
                                <td>{item.isDeleted ? "Bị vô hiệu hóa" : "Đang hoạt động"}</td>
                                <td>
                                    <div className="action_button">
                                    <button className="btn button_edit" title="Chỉnh sửa"><BiPencil/></button>
                                    {item.isDeleted?
                                        <button className="btn button_enable" title="Kích hoạt" onClick={()=>{alert(item.placeName)}}><TiTick /></button>
                                        :<button  className="btn button_disable" title="Vô hiệu hóa" onClick={()=>{alert(item.placeName)}}><IoBan/></button>}
                                    </div>
                                </td>
                            </tr>
                        )
                    })}

                </table>
            </div>
        </div>
    )
}

export default PlaceManagement
