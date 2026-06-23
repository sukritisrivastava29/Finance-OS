function Work(){
    return(
  <section className="py-20">
  <h2 className="text-4xl font-bold text-center mb-12">
    How It Works
  </h2>

  <div className="grid md:grid-cols-3 gap-8">
    {/* Step 1 */}
    <div className="p-6 rounded-2xl bg-slate-800">
      <h3 className="text-xl font-semibold mb-3">
        Add Transactions
      </h3>
      <p>
        Record your income and expenses in seconds.
      </p>
    </div>

    {/* Step 2 */}
    <div className="p-6 rounded-2xl bg-slate-800">
      <h3 className="text-xl font-semibold mb-3">
        Analyze Spending
      </h3>
      <p>
        Understand spending patterns through visual insights.
      </p>
    </div>

    {/* Step 3 */}
    <div className="p-6 rounded-2xl bg-slate-800">
      <h3 className="text-xl font-semibold mb-3">
        Reach Goals
      </h3>
      <p>
        Stay on budget and achieve your financial goals.
      </p>
    </div>
  </div>
</section> 
); 
}
export default Work;