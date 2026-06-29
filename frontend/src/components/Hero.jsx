import { Link } from "react-router-dom";
function Hero() {
  return (
    <section className="flex flex-col items-center justify-center text-center py-32 px-6">

      <h1 className="text-5xl md:text-7xl font-bold mb-6">
        Take Control Of
        <span className="text-blue-500">
          {" "}Your Finances
        </span>
      </h1>

      <p className="text-slate-400 max-w-2xl text-lg">
        Track expenses, manage budgets,
        analyze spending patterns and
        achieve your financial goals.
      </p>
<div className="flex gap-4 justify-center mt-6">
     <Link to="/signup">
  <button className="bg-blue-600 px-6 py-3 rounded-lg hover:bg-blue-700">
    Get Started
  </button>
</Link>
      
</div>
    </section>
  );
}

export default Hero;