import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
export default function BoxDashBoard({testHistoryDetail,setTestHistoryDetail}) {
    const [account,setAccount] = useState(JSON.parse(localStorage.getItem("user")))

    useEffect(() => {
        fetch(`http://localhost:5000/test-history/${account.id}`,{
        })
            .then(res => res.json())
            .then(data => {
                if(data.success){
                    setTestHistoryDetail(data.detail);
                }
            })
    },[])
    return (
        <>
            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-label">📚 Lessons Completed</div>
                    <div className="stat-value">24/35</div>
                    <div className="stat-desc">68% done</div>
                </div>

                <Link to={"history"}><div className="stat-card">
                    <div className="stat-label">🎯 Tests Taken</div>
                    <div className="stat-value">{testHistoryDetail.countTestHistory}/{testHistoryDetail.countTest}</div>
                    <div className="stat-desc">{testHistoryDetail.countTest - testHistoryDetail.countTestHistory} pending</div>
                </div></Link>
            </div>
        </>
    )
}