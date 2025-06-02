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
            <ul className="flex flex-col font-medium lg:flex-row lg:space-x-4 lg:mt-0">
              <li>
                <a
                  href="/"
                  className="block py-2 pr-4 pl-3 text-gray-700 hover:text-primary-700 lg:p-0"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/blog"
                  className="block py-2 pr-4 pl-3 text-gray-700 hover:text-primary-700 lg:p-0"
                >
                  Blog
                </a>
              </li>
              {/* Contact link removed temporarily */}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
} 