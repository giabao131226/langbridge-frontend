import { useEffect ,useState} from "react"
import { useParams } from "react-router-dom";
import QuestionCard from "./QuestionCard/questionCard";

export default function TestHistoryDetail() {
    const [account, setAccount] = useState(JSON.parse(localStorage.getItem("user")));
    const [listQuestion,setListQuestion] = useState([]);
    const [testHistoryDetail,setTestHistoryDetail] = useState({});
    const params = useParams();
    const idTest = params.id;

    useEffect(() => {
        fetch(`http://localhost:5000/test-history/detail/${account.id}/${idTest}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if(data.success){
                    console.log(data.listTestHistory);
                    setListQuestion(data.listTestHistory);
                    setTestHistoryDetail(data.testHistoryDetail);
                }
            })
    },[])

    return (
        <>
            <div id="detail-view" className="fade-in view-max-w">
                <div id="question-list" className="q-container">
                    {listQuestion.map((item,index) => <QuestionCard testHistoryDetail = {testHistoryDetail} item = {item} index = {index} key = {index + 1} />)}
                </div>
            </div>

        </>
    )
}