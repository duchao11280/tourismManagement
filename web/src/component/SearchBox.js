import React from 'react'
import { FcSearch } from "react-icons/fc";
import './css/searchbox.css'
const SearchBox = (props) => {
    return (
        <div className="box_search">
            <FcSearch className="icon" />
            <input className="input_search" style={{ backgroundColor: "rgb(255 251 251 / 96%)" }}
                type="search"
                placeholder="Nhập từ khóa..."
                onChange={props.searchChange}
            />
        </div>
    )
}

export default SearchBox
