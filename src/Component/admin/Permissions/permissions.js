import { useCallback, useEffect, useState } from "react"
import { notification } from "antd";
import "./permissions.css";
import TablePermissions from "./tablePermissions";

export default function Permissions() {
    const [roles, setRoles] = useState([])
    const [api, contextHolder] = notification.useNotification();
    const [reload, setReload] = useState(false);

    const handleUpdatePermissions = () => {
        const permissions = []

        roles.map((item) => {
            permissions.push({
                "id": item._id,
                "permission": []
            })
        })

        const permissionList = document.querySelectorAll("tr[permissions]");

        if (permissionList.length > 0) {
            permissionList.forEach((item) => {
                const permission = item.getAttribute("permissions");
                const inputs = item.querySelectorAll("input");
                inputs.forEach((item, index) => {
                    if (item.checked) {
                        console.log(permissions);
                        permissions[index].permission.push(permission);
                    }
                })
            })
        }

        fetch("http://localhost:5000/admin1/phan-quyen/update", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(permissions)
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    api.success({
                        "title": "Thông báo",
                        "description": "Phân quyền thành công"
                    })
                    setReload(true);
                } else {
                    api.error({
                        "title": "Thông báo",
                        "description": data.error
                    })
                }
            })
    }

    const handleTickPermissions = useCallback((roles) => {
        roles.map((item, index) => {
            item.permissions.map((item) => {
                const inputs = document.querySelectorAll(`[permissions = ${item}] input`)
                inputs[index].checked = true;
            })
        })
    })

    useEffect(() => {
        handleTickPermissions(roles);
    }, [roles])

    useEffect(() => {
        fetch("http://localhost:5000/admin1/phan-quyen")
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setRoles(data.roles);
                }
            })
    }, [reload])

    return (
        <>
            {contextHolder}
            <div className="container-fluid text-align-start">
                <div className="container px-4">
                    <div className="permission-header">
                        <div>
                            <h1 className="permission-title">
                                Phân Quyền
                            </h1>
                            <p className="permission-subtitle">
                                Phân quyền theo từng nhóm quyền có trong hệ thống
                            </p>
                        </div>
                        <button
                            className="permission-btn"
                            onClick={handleUpdatePermissions}
                        >
                            Cập Nhật
                        </button>
                    </div>
                    <TablePermissions roles = {roles} />
                </div>
            </div>
        </>
    )
}