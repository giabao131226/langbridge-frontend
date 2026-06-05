
export default function TablePermissions({roles}) {
    return (
        <>
            <table className="permission-table col-12">
                <thead>
                    <tr className="roles-id">
                        <th>Tính Năng</th>

                        {roles.map((item) => (
                            <th key={item._id} role-id={item._id}>
                                {item.title}
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {/* Danh mục bài đăng */}
                    <tr className="group-title">
                        <th colSpan={roles.length + 1}>
                            Danh mục bài đăng
                        </th>
                    </tr>

                    <tr permissions="permissions-permission-view">
                        <td>Xem</td>
                        {roles.map((item) => (
                            <td key={item._id}>
                                <input type="checkbox" />
                            </td>
                        ))}
                    </tr>

                    <tr permissions="permissions-permission-create">
                        <td>Thêm mới</td>
                        {roles.map((item) => (
                            <td key={item._id}>
                                <input type="checkbox" />
                            </td>
                        ))}
                    </tr>

                    <tr permissions="permissions-permission-edit">
                        <td>Sửa</td>
                        {roles.map((item) => (
                            <td key={item._id}>
                                <input type="checkbox" />
                            </td>
                        ))}
                    </tr>

                    <tr permissions="permissions-permission-delete">
                        <td>Xóa</td>
                        {roles.map((item) => (
                            <td key={item._id}>
                                <input type="checkbox" />
                            </td>
                        ))}
                    </tr>

                    {/* Bài đăng */}
                    <tr className="group-title">
                        <th colSpan={roles.length + 1}>
                            Bài đăng
                        </th>
                    </tr>

                    <tr permissions="permissions-post-view">
                        <td>Xem</td>
                        {roles.map((item) => (
                            <td key={item._id}>
                                <input type="checkbox" />
                            </td>
                        ))}
                    </tr>

                    <tr permissions="permissions-post-create">
                        <td>Thêm mới</td>
                        {roles.map((item) => (
                            <td key={item._id}>
                                <input type="checkbox" />
                            </td>
                        ))}
                    </tr>

                    <tr permissions="permissions-post-edit">
                        <td>Sửa</td>
                        {roles.map((item) => (
                            <td key={item._id}>
                                <input type="checkbox" />
                            </td>
                        ))}
                    </tr>

                    <tr permissions="permissions-post-delete">
                        <td>Xóa</td>
                        {roles.map((item) => (
                            <td key={item._id}>
                                <input type="checkbox" />
                            </td>
                        ))}
                    </tr>

                    {/* Nhóm quyền */}
                    <tr className="group-title">
                        <th colSpan={roles.length + 1}>
                            Nhóm quyền
                        </th>
                    </tr>

                    <tr permissions="permissions-role-view">
                        <td>Xem</td>
                        {roles.map((item) => (
                            <td key={item._id}>
                                <input type="checkbox" />
                            </td>
                        ))}
                    </tr>

                    <tr permissions="permissions-role-create">
                        <td>Thêm mới</td>
                        {roles.map((item) => (
                            <td key={item._id}>
                                <input type="checkbox" />
                            </td>
                        ))}
                    </tr>

                    <tr permissions="permissions-role-edit">
                        <td>Sửa</td>
                        {roles.map((item) => (
                            <td key={item._id}>
                                <input type="checkbox" />
                            </td>
                        ))}
                    </tr>

                    <tr permissions="permissions-role-delete">
                        <td>Xóa</td>
                        {roles.map((item) => (
                            <td key={item._id}>
                                <input type="checkbox" />
                            </td>
                        ))}
                    </tr>

                    {/* Tài khoản */}
                    <tr className="group-title">
                        <th colSpan={roles.length + 1}>
                            Tài khoản
                        </th>
                    </tr>

                    <tr permissions="permissions-account-view">
                        <td>Xem</td>
                        {roles.map((item) => (
                            <td key={item._id}>
                                <input type="checkbox" />
                            </td>
                        ))}
                    </tr>

                    <tr permissions="permissions-account-create">
                        <td>Thêm mới</td>
                        {roles.map((item) => (
                            <td key={item._id}>
                                <input type="checkbox" />
                            </td>
                        ))}
                    </tr>

                    <tr permissions="permissions-account-edit">
                        <td>Sửa</td>
                        {roles.map((item) => (
                            <td key={item._id}>
                                <input type="checkbox" />
                            </td>
                        ))}
                    </tr>

                    <tr permissions="permissions-account-delete">
                        <td>Xóa</td>
                        {roles.map((item) => (
                            <td key={item._id}>
                                <input type="checkbox" />
                            </td>
                        ))}
                    </tr>
                </tbody>
            </table>
        </>
    )
}