import { Link } from "react-router-dom"
import { IoPersonSharp } from "react-icons/io5";
import { FaBan } from "react-icons/fa";
import { FaUnlockAlt } from "react-icons/fa";

import "../QuanLyTaiKhoan/quanlytaikhoan.css"
import { useCallback, useEffect, useState } from "react";

import { Modal, notification } from "antd";
import { FaTrash } from "react-icons/fa6";



export default function NhomQuyen(){
    const [roles,setRoles] = useState([]);
    const [listAccount, setListAccount] = useState([]);
    const [idRemove, setIDRemove] = useState(null);
    const [statusModal, setStatusModal] = useState(false);
    const [api, contextHolder] = notification.useNotification();
    const [textSearch, setTextSearch] = useState("");
    const [status, setStatus] = useState("");
    const [pageInfo, setPageInfo] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [tongQuan,setTongQuan] = useState({});


    function handleChangeStatus(id, status = "banned") {
        fetch(`http://localhost:5000/admin1/quan-ly-tai-khoan/change-status/${id}/${status}?_method=PATCH`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    api.info({
                        title: "Notification",
                        description: `You have banned the account with ID ${id}`,
                    });
                    const newList = listAccount.map((item) => {
                        if (item._id == id) item.status = status;
                        return item;
                    });
                    setListAccount(newList);
                    if (statusModal) setStatusModal(false);
                }
            })
    }

    function handleRemove(id){
        console.log(id);
        fetch(`http://localhost:5000/admin1/quan-ly-nhom-quyen/delete/${id}?_method=PATCH`,{method: 'POST'})
            .then(res => res.json())
            .then(data => {
                if(data.success){
                    api.success({
                        title: "Thông báo",
                        description: `Bạn vừa xoá nhóm quyền có id là ${id}`
                    })
                    const newList = roles.filter((item) => item._id != id);
                    setRoles(newList);
                }else{
                    console.log(data.error);
                    api.error({
                        title: "Thông báo",
                        description: "Xoá không thành công"
                    })
                }
            })
    }

    function handleCancel() {
        setStatusModal(false);
    }

    function getBackGround(status) {
        if (status == "active") return "bg-blue";
        else if (status == "banned") return "bg-red";
        return "bg-orange";
    }

    function handleChangeStatusMiddleware(id) {
        setStatusModal(true);
        setIDRemove(id);
    }

    function handleChangeStatusFilter(e) {
        setStatus(e.target.value);
    }

    function handleChangeTextSearch(e) {
        setTextSearch(e.target.value);
    }

    function handleChangePage(e) {
        setCurrentPage(parseInt(e.target.getAttribute("pag")));
    }

    function loadPagination(first, last) {
        const items = [pageInfo.pageCurrent == 1 ? <></> : <button pag={pageInfo.pageCurrent - 1} onClick={handleChangePage}>Previous</button>];
        for (var i = first; i <= last; i++) {
            items.push(<button pag={i} key={i} className={pageInfo.pageCurrent == i ? "active" : ""} onClick={handleChangePage}>{i}</button>)
        }
        items.push(pageInfo.pageCurrent == pageInfo.numberPages ? <></> : <button pag={pageInfo.pageCurrent + 1} onClick={handleChangePage}>Next</button>)
        return items;
    }

    useEffect(() => {
        fetch(`http://localhost:5000/admin1/quan-ly-nhom-quyen?textSearch=${textSearch}&status=${status}&page=${currentPage}`, {
            method: "GET"
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setRoles(data.roles);
                    // setTongQuan(data.tongQuanTaiKhoan);
                    // setListAccount(data.listAccount);
                    // setPageInfo(data.pageInfo);
                }
            })
    }, [status, textSearch, currentPage])


    return (
        <>
            <Modal title="Notification!!" open={statusModal} onOk={() => { handleChangeStatus(idRemove) }} onCancel={handleCancel} >
                <p>Are you sure you want to ban this account?</p>
            </Modal>
            <div className="container-fluid text-align-start px-3">
                <div className="container">
                    <div className="d-flex items-center justify-between py-2">
                        <div className="d-flex flex-column py-3">
                            <h1 className="m-0">Quản Lý Nhóm Quyền</h1>
                            <p className="m-0 font-14 font-bold" style={{ color: "#afa6a6" }}>Quản lý và theo dõi tất cả nhóm quyền trong hệ thống</p>
                        </div>
                        <Link to = {"create"}><button className="bg-blue font-bold text-white px-2 py-2 rounded cursor-pointer"><i class="fa-solid fa-plus"></i> Thêm mới</button></Link>
                    </div>

                    <div className="stats-grid">

                        <div className="stat-card">
                            <div className="stat-icon blue">
                                <i className="fa-solid fa-users"></i>
                            </div>

                            <div>
                                <p className="m-0 font-14">Tổng tài khoản</p>
                                <h4 className="m-0 py-2">24</h4>
                                <span className="font-14 m-0">Toàn bộ hệ thống</span>
                            </div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-icon green">
                                <i className="fa-solid fa-circle-check"></i>
                            </div>

                            <div>
                                <p className="m-0 font-14">Đang hoạt động</p>
                                <h4 className="m-0 py-2">13</h4>
                                <span className="font-14 m-0">{((tongQuan.countActiveAccount/tongQuan.countToTalAccount)*100).toFixed(2)}% tổng tài khoản</span>
                            </div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-icon red">
                                <i className="fa-solid fa-lock"></i>
                            </div>

                            <div>
                                <p className="m-0 font-14">Bị khóa</p>
                                <h4 className="m-0 py-2">{tongQuan.countBannedAccount}</h4>
                                <span className="font-14 m-0">{((tongQuan.countBannedAccount/tongQuan.countToTalAccount)*100).toFixed(2)}% tổng tài khoản</span>
                            </div>
                        </div>

                    </div>

                    <div className="filter-card">

                        <div className="filter-top">

                            <h3 className="m-0">Filter And Search</h3>

                        </div>

                        <div className="filter-row">

                            <div className="input-group col-8 px-0 py-0">
                                <i className="fa-solid fa-magnifying-glass"></i>
                                <input type="text" name="search" placeholder="Tên,Email,SĐT" className="col-8" onChange={handleChangeTextSearch}></input>
                            </div>

                            <select className="col-2" name="filterStatus" onChange={handleChangeStatusFilter}>
                                <option value={""}>Status</option>
                                <option value={"active"}>Active</option>
                                <option value={"banned"}>Ban</option>
                            </select>

                            {/* <input type="date" /> */}
                        </div>

                    </div>

                    <div className="quanLyNhanVienMain bg-white">
                        <table className="listTaiKhoan col-12 px-0 py-0">
                            <thead>
                                <tr>
                                    <th className="bg-blue text-white py-2">STT</th>
                                    <th className="bg-blue text-white py-2">Tên Nhóm Quyền</th>
                                    <th className="bg-blue text-white py-2">Miêu Tả</th>
                                    <th className="bg-blue text-white py-2">Trạng Thái</th>
                                    <th className="bg-blue text-white py-2">Hoạt Động</th>
                                </tr>
                            </thead>

                            <tbody>
                                {roles.map((item,index) => <tr key={item._id}>
                                    <td>{index+1}</td>
                                    <td>{item.title}</td>
                                    <td><span dangerouslySetInnerHTML={{__html: `${item.description}`}}></span></td>
                                    <td><button className={"border-none px-2 py-2 rounded text-white font-bold " + getBackGround(item.status)}>{item.status}</button></td>
                                    <td>
                                        <div className="d-flex items-center justify-center gap-x-2">
                                            <Link to={`account/${item._id}`}><button className="border-none cursor-pointer bg-blue text-white px-2 py-2 rounded"><IoPersonSharp /></button></Link>
                                            {item.status == "banned" ? <button className="border-none cursor-pointer bg-coral text-white px-2 py-2 rounded" onClick={() => { handleChangeStatus(item._id, "active") }}><FaUnlockAlt /></button> : <button className="border-none cursor-pointer bg-red text-white px-2 py-2 rounded" onClick={() => { handleChangeStatusMiddleware(item._id, "banned") }}><FaBan /></button>}
                                            <button className="border-none cursor-pointer bg-coral text-white px-2 py-2 rounded" onClick={() => {handleRemove(item._id)}}><FaTrash /></button>
                                        </div>
                                    </td>
                                </tr>)}

                            </tbody>
                        </table>

                        <span className="font-14">Tổng số bản ghi: {roles.length}</span>

                        <div className="pagination d-flex items-center justify-center gap-x-3">

                            {Object.keys(pageInfo).length > 0 ? loadPagination(pageInfo.firstPage, pageInfo.lastPage) : <></>}

                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}