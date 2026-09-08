function DashPreview() {
  const features = [
    {
      title: "AI Insights",
      value: "Smart Analysis",
      color: "status-info",
    },
    {
      title: "Reports",
      value: "PDF Export",
      color: "status-success",
    },
    {
      title: "Automation",
      value: "Receipt Scanner",
      color: "status-accent",
    },
  ];

  const activities = [
    {
      text: "📄 Monthly Report Generated",
      status: "Completed",
      color: "status-success",
    },
    {
      text: "🤖 AI Spending Insight Available",
      status: "New",
      color: "status-info",
    },
    {
      text: "🧾 Receipt Scanned Successfully",
      status: "Processed",
      color: "status-accent",
    },
  ];

  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      <h2 className="text-4xl font-bold text-center mb-12">
        Your Financial Command Center
      </h2>

      <div className="card-theme rounded-3xl p-8 shadow-2xl">

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="card-theme rounded-2xl p-6"
            >
              <p className="text-muted mb-2">
                {feature.title}
              </p>

              <h3 className={`text-2xl font-bold ${feature.color}`}>
                {feature.value}
              </h3>
            </div>
          ))}
        </div>

        <div className="card-theme mt-8 rounded-2xl p-6">
          <h3 className="text-xl font-semibold mb-4">
            Recent Activity
          </h3>

          <div className="space-y-3">
            {activities.map((activity) => (
              <div
                key={activity.text}
                className="flex justify-between items-center"
              >
                <span>{activity.text}</span>

                <span className={`font-medium ${activity.color}`}>
                  {activity.status}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

export default DashPreview;