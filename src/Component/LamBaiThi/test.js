
import { useCallback, useEffect, useState } from "react";
import "./test.css"
import { Outlet, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

function Test() {
    const [question, setQuestion] = useState([])
    const [testDetail, setTestDetail] = useState({})
    const [answerSelect, setAnswerSelect] = useState([])
    const [percentDone, setPercentDone] = useState(0)
    const params = useParams();
    const idTest = params.id;
    const navigate = useNavigate()

    // Thời gian làm bài
    const [timeLeft, setTimeLeft] = useState(3600);
    // 

    function getLevel(level) {
        if (level == "easy") return "Easy";
        else if (level == "medium") return "Medium"
        else if (level == "hard") return "Hard"
        return "Expert"
    }

    // Hàm Tính toán phần trăm hoàn thành
    const updateProgress = useCallback((done) => {
        let percent = ((done / question.length) * 100).toFixed(2);
        setPercentDone(percent)
    })
    //  

    // Hàm chọn đáp án
    function selectAnswer(questionID, value, answerID, isCorrect, indexQ) {
        const newObject = [...answerSelect]
        const index = newObject.findIndex((item) => item.questionID == questionID)
        if (index >= 0) {
            newObject[index].tieuDe = value
            setAnswerSelect(newObject);
            return;
        }
        const newData = [...answerSelect, { "questionID": questionID, "answerID": answerID, "tieuDe": value, "index": indexQ, "isCorrect": isCorrect }]
        setAnswerSelect(newData)
        updateProgress(newData.length);
    }
    // 

    //Hàm đếm thời gian
    useEffect(() => {

        if (timeLeft <= 0) {
            submitTest();
            return;
        }

        const interval = setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);

        return () => clearInterval(interval);

    }, []);

    useEffect(() => {

        if (timeLeft === 0) {
            submitTest();
        }

    }, [timeLeft]);
    //End hàm đếm thời gian

    // submit
    const submitTest = useCallback((e) => {
        const user = JSON.parse(localStorage.getItem("user"))
        const timeTaken = (testDetail.timeLimit * 60) - timeLeft;

        const data = {
            "IDAccount": user.id,
            "IDTest": testDetail._id,
            "answer": answerSelect,
            "testTaken": new Date(),
            "totalQuestion": question.length,
            "timeTaken": timeTaken
        }

        console.log(data);

        fetch("http://localhost:5000/test/submit", {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json"
            },
            "body": JSON.stringify(data)

        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    localStorage.setItem("dataMark", JSON.stringify(data.detailSubmit))
                    navigate("/quiz/result")
                }
            })
    }, [answerSelect])
    // 

    useEffect(() => {
        fetch(`http://localhost:5000/test/get-test/${idTest}`)
            .then(res => res.json())
            .then(async (data) => {
                console.log(data);
                if (data.success) {
                    setTimeLeft(data.testDetail.timeLimit * 60);
                    setQuestion(data.listQuestion);
                    setTestDetail(data.testDetail);
                }
            })
    }, [])

    const minute = Math.floor(timeLeft / 60);
    const second = timeLeft % 60;

    return (
        <>
            <Outlet />
            <div className="test container-fluid text-align-start d-flex justify-center">
                <div className="testContainer">

                    {/* Left */}
                    <div className="left">

                        <div className="header">
                            <div>
                                <p className="tag m-0">ENGLISH SKILLS</p>
                                <h2 className="m-0">{testDetail.testName}</h2>
                                <div className="badge">{getLevel(testDetail.level)} Level</div>
                            </div>

                            <div className="timer">
                                ⏱ <span id="time">{minute < 10 ? `0${minute}` : minute}:
                                    {second < 10 ? `0${second}` : second}</span>
                            </div>
                        </div>

                        <div className="col-12 d-flex flex-column items-center gap-y-4">
                            {question.map((item, indexQ) => (
                                <div key={item._id} className="question bg-white" id={`question${indexQ + 1}`}>
                                    <div>
                                        <p className="m-0 font-bold text-red">
                                            Question {indexQ + 1 < 10 ? `0${indexQ + 1}` : indexQ + 1}
                                        </p>
                                        <p className="m-0 font-bold">{item.title}</p>
                                    </div>
                                    <div className="rows justify-center gap-x-2">
                                        {item.answer.map((answer, index) => (
                                            <button
                                                key={answer.id}
                                                className={`answer d-flex items-center gap-x-2 col-5 ${answerSelect.find(item => item.index === indexQ && item.tieuDe === answer.tieuDe)
                                                    ? "active"
                                                    : ""
                                                    }`}
                                                onClick={() => {
                                                    selectAnswer(item._id, answer.tieuDe, answer._id, answer.isCorrect, (indexQ))
                                                }}
                                            >
                                                <span className="bg-white px-2 py-2">
                                                    {String.fromCharCode(index + 65)}
                                                </span>
                                                <span
                                                    id={`answer${index + 1}`}
                                                    value={answer.tieuDe}
                                                >
                                                    {answer.tieuDe}
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                    {/* End left */}
                    {/* Right */}
                    <div className="testOverview right d-flex flex-column gap-y-3">
                        <h4 className="m-0">Test Overview</h4>

                        <div className="stats d-flex gap-x-2">
                            <div>
                                <p className="m-0 py-2">Answered</p>
                                <h3 id="answered" className="m-0">{answerSelect.length}</h3>
                            </div>
                            <div>
                                <p className="m-0 py-2">Remaining</p>
                                <h3 id="remaining" className="m-0">{question.length - answerSelect.length}</h3>
                            </div>
                        </div>

                        <div className="numberList col-12 px-0 py-0 rows gap-x-4 justify-center">
                            {question.map((item, index) => (
                                <label
                                    key={item.id}
                                    onClick={() => {
                                        document
                                            .querySelector(`#question${index + 1}`)
                                            ?.scrollIntoView({ behavior: "smooth" });
                                    }}
                                    className={`numberQ font-bold d-flex ${answerSelect.find(item => item.index === index)
                                        ? "active"
                                        : ""}`}
                                    id={`numberQ${index + 1}`}
                                >
                                    {index + 1 < 10 ? `0${index + 1}` : index + 1}
                                </label>
                            ))}
                        </div>

                        <div className="Progress col-12 px-0 py-0">
                            <div className="d-flex items-center justify-between py-2">
                                <span className="font-bold">PROGRESS</span>
                                <span className="font-bold">{percentDone}%</span>
                            </div>

                            <div className="progressPercentage">
                                <div className="progressDonePercentage" style={{ width: `${percentDone}%` }}>
                                </div>
                            </div>
                        </div>

                        <button
                            className="buttonSubmitTest cursor-pointer py-3 font-20 font-bold d-flex items-center justify-center text-white gap-x-2"
                            onClick={submitTest}
                        >
                            Submit <i className="fa-solid fa-paper-plane"></i>
                        </button>
                    </div>
                    {/* End Right */}
                </div>
            </div >
        </>
    )
}
export default Test;