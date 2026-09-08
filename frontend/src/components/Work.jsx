const steps = [
  {
    number: "01",
    title: "Add Transactions",
    description: "Record your income and expenses in seconds.",
  },
  {
    number: "02",
    title: "Analyze Spending",
    description: "Understand spending patterns through visual insights.",
  },
  {
    number: "03",
    title: "Reach Goals",
    description: "Stay on budget and achieve your financial goals.",
  },
];

function Work() {
  return (
    <section className="py-20">
      <h2 className="text-4xl font-bold text-center mb-12">
        How It Works
      </h2>

      <div className="grid md:grid-cols-3 gap-8">
        {steps.map((step) => (

          <div
            key={step.title}
            className="card-theme p-6 rounded-2xl"
          >
            <div className="text-primary text-4xl font-bold mb-4">
              {step.number}
            </div>
            <h3 className="text-xl font-semibold mb-3">
              {step.title}
            </h3>

            <p className="text-muted">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Work;