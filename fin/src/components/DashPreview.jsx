function DashPreview() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      <h2 className="text-4xl font-bold text-center mb-12">
        Your Financial Command Center
      </h2>

      <div className="bg-slate-800 rounded-3xl p-8 shadow-2xl">

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-slate-900 rounded-2xl p-6">
            <p className="text-slate-400 mb-2">
              AI Insights
            </p>

            <h3 className="text-2xl font-bold text-blue-400">
              Smart Analysis
            </h3>
          </div>

          <div className="bg-slate-900 rounded-2xl p-6">
            <p className="text-slate-400 mb-2">
              Reports
            </p>

            <h3 className="text-2xl font-bold text-green-400">
              PDF Export
            </h3>
          </div>

          <div className="bg-slate-900 rounded-2xl p-6">
            <p className="text-slate-400 mb-2">
              Automation
            </p>

            <h3 className="text-2xl font-bold text-purple-400">
              Receipt Scanner
            </h3>
          </div>

        </div>

        <div className="mt-8 bg-slate-900 rounded-2xl p-6">

          <h3 className="text-xl font-semibold mb-4">
            Recent Activity
          </h3>

          <div className="space-y-3">

            <div className="flex justify-between">
              <span>📄 Monthly Report Generated</span>
              <span className="text-green-400">
                Completed
              </span>
            </div>

            <div className="flex justify-between">
              <span>🤖 AI Spending Insight Available</span>
              <span className="text-blue-400">
                New
              </span>
            </div>

            <div className="flex justify-between">
              <span>🧾 Receipt Scanned Successfully</span>
              <span className="text-purple-400">
                Processed
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default DashPreview;