export function L4kAgeSelect() {
  const ageGroupsRow1 = ["18 Months +", "2 Years +", "3-4 Years"];
  const ageGroupsRow2 = ["5-7 Years", "8 Years +"];

  return (
    <div className="bg-yellow-400 py-6">
      <div className="px-4">
        {/* Mobile Layout */}
        <div className="md:hidden">
          <h2 className="text-xl font-bold text-[#0076be] text-center mb-4">
            Shop By Age
          </h2>
          
          {/* First Row */}
          <div className="flex justify-center gap-2 mb-3">
            {ageGroupsRow1.map((age, index) => (
              <button
                key={index}
                className="bg-[#0076be] text-white px-4 py-2 rounded-full font-semibold text-sm flex-1 min-w-fit max-w-fit"
              >
                {age}
              </button>
            ))}
          </div>
          
          {/* Second Row */}
          <div className="flex justify-center gap-2">
            {ageGroupsRow2.map((age, index) => (
              <button
                key={index}
                className="bg-[#0076be] text-white px-4 py-2 rounded-full font-semibold text-sm flex-1 min-w-fit max-w-fit"
              >
                {age}
              </button>
            ))}
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:block max-w-7xl mx-auto">
          <div className="flex items-center justify-center flex-wrap gap-4">
            <h2 className="text-2xl font-bold text-[#0076be] mr-6">
              Shop By Age
            </h2>
            {[...ageGroupsRow1, ...ageGroupsRow2].map((age, index) => (
              <button
                key={index}
                className="bg-[#0076be] text-white px-6 py-3 rounded-full font-semibold transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                {age}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 