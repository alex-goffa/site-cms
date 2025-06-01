// A simple header component using standard HTML and Tailwind/Flowbite CSS classes
export function SimpleHeader() {
  return (
    <header>
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          {/* Logo/Brand */}
          <a href="/" className="flex items-center">
            <img src="/images/som-academy-logo.png" className="h-8 me-3" alt="SoM Academy Logo" />
            <span className="self-center text-xl font-semibold whitespace-nowrap text-gray-900">
              SoM Academy
            </span>
          </a>
          
          {/* Navigation Group */}
          <div>
            <ul className="flex flex-col font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <a
                  href="/blog"
                  className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                >
                  Blog
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
} 