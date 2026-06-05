import { Editor } from "@tinymce/tinymce-react";
import { useState } from "react";
import {notification} from "antd"


export default function Create() {
    const [data,setData] = useState({});
    const [api,contextHolder] = notification.useNotification();
    const handleChange = (e) => {
        const {name,value} = e.target;
        setData({...data,[name]: value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(data);
        const url = "http://localhost:5000/admin1/quan-ly-nhom-quyen/create";
        fetch(url,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                if(data.success){
                    api.success({
                        title: "Thành Công",
                        description: "Đã thêm mới nhóm quyền thành công!!"
                    })
                    e.target.reset();
                }
            })
    }
    return (
        <>
            {contextHolder}
            <div className="container-fluid text-align-start">
                <h1>Trang tạo mới nhóm quyền</h1>
                <form onSubmit={handleSubmit} className="d-flex flex-column gap-y-3">
                    <div className="d-flex flex-column">
                        <label>Tên nhóm quyền</label>
                        <input type="text" name="title" onChange={handleChange}></input>
                    </div>
                    <div className="d-flex flex-column">
                        <label>Miêu tả</label>
                        <Editor
                            onEditorChange={(description) => {
                                setData({...data,["description"]: description});
                            }}
                            name="description"
                            className="compose-textarea"
                            apiKey='1a2hzecrr53ypadb7v095uo5i8u7xzhzy2a0al9uyn03q53h'
                            init={{
                                height: 500,
                                width: "100%",
                                menubar: true,
                                plugins: [
                                    'lists',
                                    'link',
                                    'image',
                                    'table',
                                    'code'
                                ],

                                toolbar: `
      undo redo |
      bold italic underline |
      forecolor backcolor |
      fontsizeselect |
      alignleft aligncenter alignright alignjustify |
      bullist numlist outdent indent |
      image table code
    `
                            }}
                        >

                        </Editor>
                    </div>
                    <div className="d-flex flex-column">
                        <label>Trạng thái</label>
                        <div className="d-flex items-center gap-x-3">
                            <div className="d-flex items-center gap-x-2">
                                <input type="radio" name="status" onChange={handleChange} value={"active"}></input>
                                <label>Hoạt động</label>
                            </div>
                            <div className="d-flex items-center gap-x-2">
                                <input type="radio" name="status" onChange={handleChange} value={"inactive"}></input>
                                <label>Không Hoạt động</label>
                            </div>
                        </div>
                    </div>
                    <div>
                        <button className="bg-blue font-bold text-white px-2 py-2 rounded">Thêm mới</button>
                    </div>
                </form>
            </div>
        </>
    )
}