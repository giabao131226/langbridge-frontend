
export default function QuestionCard({ testHistoryDetail,item, index }) {
    const qIdx = index;

    const q = {
        text: "She ______ to school every day.",
        isCorrect: false,
        user: "B) goes",
        ans: "C) goeses",
        opts: ["A) go", "B) goes", "C) goeses", "D) going"],
        explain: `"She" là ngôi thứ 3 số ít nên động từ phải thêm s/es.`
    };

    function getCorrect(id, arr) {
        const index = arr.findIndex((item) => item._id == id);
        return arr[index].isCorrect;
    }

    return (
        <>
            <div className="card-header card-header-sm">
                <div>
                    <h2 className="title-sup m-0" id="detail-lang">{testHistoryDetail.IDTest.language}</h2>
                    <h1 className="title-md m-0" id="detail-title">{testHistoryDetail.IDTest.testName}</h1>
                </div>

                <div className="status-badge">
                    <div className="status-badge-lbl">Finished</div>
                    <div className="status-badge-val" id="detail-date">{new Date(testHistoryDetail.testTakenAt).toLocaleString("vi-VN")}</div>
                </div>
            </div>

            <div className="q-card">
                {/* Header */}
                <div className="q-head">
                    <h3 className="q-title">
                        Question {String(qIdx + 1).padStart(2, "0")}
                    </h3>

                    <span className={`q-mark ${getCorrect(item.IDSelectedAnswer, item.IDQuestion.answer) ? "q-mark-correct" : "q-mark-incorrect"}`}>
                        {getCorrect(item.IDSelectedAnswer, item.IDQuestion.answer) ? "Correct" : "Incorrect"}
                    </span>
                </div>

                {/* Question text */}
                <p className="q-text">{item.IDQuestion.title}</p>

                {/* Options */}
                <div className="opt-grid">
                    {item.IDQuestion.answer.map((o, idx) => {
                        let pillClass = "opt-neutral";
                        let letterBadgeClass = "letter-default";
                        let iconHtml = null;

                        if (o._id === item.IDSelectedAnswer && o.isCorrect) {
                            pillClass = "opt-selected";
                            letterBadgeClass = "letter-selected";
                            iconHtml = <i className="fas fa-check-circle icon-status icon-correct" />;
                        } else if (o._id === item.IDSelectedAnswer && o.isCorrect !== true) {
                            pillClass = "opt-selected";
                            letterBadgeClass = "letter-selected";
                            iconHtml = <i className="fas fa-times-circle icon-status icon-wrong" />;
                        } else if (o._id === item.IDSelectedAnswer) {
                            pillClass = "opt-correct";
                            letterBadgeClass = "letter-correct";
                            iconHtml = <i className="fas fa-check-circle icon-status icon-correct" />;
                        }


                        return (
                            <div key={idx} className={`opt-pill ${pillClass}`}>
                                <div className={`opt-letter ${letterBadgeClass}`}>
                                    {String.fromCharCode(idx + 65)}
                                </div>

                                <span className="opt-text-val">{o.tieuDe}</span>

                                {iconHtml}
                            </div>
                        );
                    })}
                </div>

                {/* Explanation */}
                {/* {!q.isCorrect && (
                    <div className="exp-box">
                        <h4 className="exp-title">
                            <i className="fas fa-lightbulb" style={{ marginRight: 4 }}></i>
                            Explanation
                        </h4>

                        <p className="exp-text">{q.explain}</p>
                    </div>
                )} */}
            </div>
        </>
    )
}