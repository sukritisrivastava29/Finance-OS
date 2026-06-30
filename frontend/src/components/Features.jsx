function Features() {
  const features = [
    {
      title: "Expense Tracking",
      description:
        "Track every rupee you spend and understand your spending habits.",
      icon: "💸",
    },
    {
      title: "Analytics Dashboard",
      description:
        "Visualize expenses, income, and trends through interactive charts.",
      icon: "📊",
    },
    {
      title: "Budget Goals",
      description:
        "Set monthly budgets and stay on top of your financial goals.",
      icon: "🎯",
    },
  ];

  return (
    <section className="py-24 px-6">
      <h2 className="text-4xl font-bold text-center mb-12">
        Everything You Need
      </h2>

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="bg-slate-800 p-8 rounded-2xl hover:scale-105 transition"
          >
            <div className="text-5xl mb-4">
              {feature.icon}
            </div>

            <h3 className="text-2xl font-semibold mb-3">
              {feature.title}
            </h3>

            <p className="text-slate-300">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Features;