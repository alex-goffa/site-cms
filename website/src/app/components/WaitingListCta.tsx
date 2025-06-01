// Component for the 'Join Our Waitlist' Call to Action section

export function WaitingListCta() {
  const imageUrl = "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1080&auto=format&fit=crop"; // New image: student sitting on chairs in front of chalkboard

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Text and Form Column */}
          <div className="mx-auto max-w-screen-md text-center md:text-left">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
              We're Currently Full!
            </h2>
            <p className="mb-6 font-light text-gray-500 md:text-lg dark:text-gray-400">
              Our math school for kids is at capacity, but don't worry! You can join our waiting list to be notified as soon as a spot opens up. 
              We're dedicated to helping young minds explore the wonders of mathematics.
            </p>
            <form 
              action="https://formspree.io/f/mdkznrgv" 
              method="POST"
              className="mx-auto max-w-screen-sm md:mx-0"
            >
              <div className="flex items-center mb-3">
                <div className="relative mr-3 w-full">
                  <label htmlFor="member_email" className="hidden mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Email address
                  </label>
                  <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-gray-500 dark:text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                    </svg>
                  </div>
                  <input
                    className="block p-3 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Enter your email"
                    type="email"
                    name="member_email" // Changed from member[email]
                    id="member_email"
                    required
                  />
                </div>
                <div>
                  <input
                    type="submit"
                    value="Join Waitlist" // Changed button text
                    className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg cursor-pointer bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    name="member_submit"
                    id="member_submit"
                  />
                </div>
              </div>
              <div className="text-sm font-medium text-left text-gray-500 dark:text-gray-300">
                We'll email you when a spot is available. No spam, we promise!
              </div>
            </form>
          </div>
          {/* Image Column */}
          <div className="mt-8 md:mt-0">
            <img
              className="w-full rounded-lg shadow-xl"
              src={imageUrl}
              alt="Child learning math at a desk"
            />
          </div>
        </div>
      </div>
    </section>
  );
} 