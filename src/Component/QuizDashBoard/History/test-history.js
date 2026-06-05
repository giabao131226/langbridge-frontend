import { useEffect, useState } from "react"
import "./test-history.css"
import { Link } from "react-router-dom";
export default function TestHistory() {

    const [account, setAccount] = useState(JSON.parse(localStorage.getItem("user")));
    const [listTest, setListTest] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:5000/test-history/${account.id}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.success) {
                    setListTest(data.listTest);
                }
            })
    }, [])

    return (
        <>
            <div className="main-wrapper">
                <main className="content-area">
                    <div id="history-view" className="fade-in view-max-w">
                        <div className="card-header">
                            <div>
                                <h2 className="title-sup m-0">Overview</h2>
                                <h1 className="title-main m-0">Learning History</h1>
                                <p className="text-desc m-0">
                                    Xem lại các bài đã làm để nắm vững kiến thức.
                                </p>
                            </div>
                        </div>


                        <div id="test-list" className="history-grid">
                            {listTest.map((item, index) => (
                                <Link to = {`${item.IDTest._id}`}><div key={index} className="history-item">
                                    <div className="h-info">
                                        <div className="h-icon">
                                            {item.IDTest.language.substring(0, 2).toUpperCase()}
                                        </div>

                                        <div>
                                            <span className="h-lang">
                                                {item.IDTest.language}
                                            </span>

                                            <h3 className="h-name">
                                                {item.IDTest.testName}
                                            </h3>

                                            <p className="h-date">
                                                <i
                                                    className="far fa-calendar-alt"
                                                    style={{ marginRight: "4px" }}
                                                ></i>

                                                {new Date(item.testTakenAt).toLocaleString("vi-VN")}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="h-result-box">
                                        <p className="h-result-lbl m-0">
                                            Result
                                        </p>

                                        <p className="h-result-val m-0">
                                            {item.score}
                                        </p>
                                    </div>
                                </div></Link>
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}