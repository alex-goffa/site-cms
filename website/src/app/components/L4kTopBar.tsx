export function L4kTopBar() {
  return (
    <div className="bg-[#7dd3fc] text-black py-2 px-4 text-sm">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <div className="font-semibold hidden md:block">
          FREE SHIPPING On All Orders
        </div>
        <div className="md:hidden w-full text-center font-semibold">
          FREE SHIPPING On All Orders
        </div>
        <div className="hidden md:flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <img src="/images/join-icon.png" alt="agent-icon" className="w-4 h-4" />
            <span>ร่วมเป็นตัวแทน</span>
          </div>
          <div className="flex items-center space-x-2">
            <img src="/images/user-icon.png" alt="signin-icon" className="w-4 h-4" /> 
            <span>Sign In / Account</span>
          </div>
          <div className="flex items-center space-x-2">
            <img src="/images/lang-icon.png" alt="lang-icon" className="w-4 h-4" />
            <span>EN</span>
            <svg className="w-3 h-3 ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M7 10l5 5 5-5z"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
} 