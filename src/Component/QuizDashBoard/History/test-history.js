import "./test-history.css"
export default function TestHistory() {
    return (
        <>
            <div className="test-history flex-1 flex overflow-hidden">

                <main className="flex-1 overflow-y-auto p-6 lg:p-10 relative">

                    <div id="history-view" className="fade-in max-w-4xl mx-auto">
                        <div className="bg-white rounded-[24px] p-8 shadow-sm mb-8 flex justify-between items-center">
                            <div>
                                <h2 className="text-emerald-500 font-bold text-xs uppercase tracking-widest mb-1">
                                    Overview
                                </h2>

                                <h1 className="text-3xl font-black text-slate-900 mb-2">
                                    Learning History
                                </h1>

                                <p className="text-slate-500">
                                    Xem lại các bài đã làm để nắm vững kiến thức.
                                </p>
                            </div>
                        </div>

                        <div id="test-list" className="grid grid-cols-1 gap-5">
                        </div>
                    </div>

                    <div id="detail-view" className="fade-in hidden max-w-4xl mx-auto">

                        <div className="bg-white rounded-[24px] p-6 shadow-sm mb-6 flex justify-between items-center">

                            <div>
                                <h2
                                    className="text-emerald-500 font-bold text-xs uppercase tracking-widest mb-1"
                                    id="detail-lang"
                                >
                                </h2>

                                <h1
                                    className="text-2xl font-black text-slate-900"
                                    id="detail-title"
                                >
                                </h1>
                            </div>

                            <div className="bg-[#ffc107] text-slate-900 rounded-[20px] px-6 py-2 font-bold text-center shadow-sm">

                                <div className="text-xs uppercase tracking-tighter opacity-80 mb-0.5">
                                    Finished
                                </div>

                                <div
                                    className="text-sm font-black"
                                    id="detail-date"
                                >
                                </div>

                            </div>
                        </div>

                        <div id="question-list" className="space-y-6 pb-20">
                        </div>

                    </div>

                </main>

                <aside className="w-[320px] p-6 hidden xl:block overflow-y-auto z-10 border-l border-emerald-100/50">

                    <div className="bg-white rounded-[24px] p-5 shadow-sm mb-6 flex items-center gap-4">

                        <div className="w-12 h-12 rounded-full bg-slate-100 border-2 border-[#eaf6ee] flex items-center justify-center text-blue-600 font-black text-xl">
                            MV
                        </div>

                        <div>
                            <p className="font-bold text-slate-800">
                                Minh Vũ
                            </p>

                            <p className="text-[10px] text-orange-500 font-bold uppercase tracking-wide">
                                Premium Member
                            </p>
                        </div>

                    </div>

                    <div
                        id="right-panel-content"
                        className="bg-[#faebe0] rounded-[24px] p-6 shadow-sm sticky top-6"
                    >
                    </div>

                </aside>

            </div>
        </>
    )
}