import { SimpleHeader } from "@/app/components/SimpleHeader";
import { SimpleFooter } from "@/app/components/SimpleFooter";

export function Contact() {
  return (
    <>
      <SimpleHeader />
      <main className="bg-gray-50 py-16">
        <div className="max-w-screen-xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-6">Contact Page Coming Soon</h1>
          <p className="text-xl text-gray-600 mb-8">
            We're currently working on our contact form. Please check back later.
          </p>
          <a href="/" className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-lg px-5 py-2.5 focus:outline-none">
            Return to Home
          </a>
        </div>
      </main>
      <SimpleFooter />
    </>
  );
}
