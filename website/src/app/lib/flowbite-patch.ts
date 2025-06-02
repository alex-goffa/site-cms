// This is a workaround for the Flowbite-React compatibility issue with Tailwind CSS v4
// It replaces the functionality of the get-tailwind-version.js file in Flowbite-React

export const getTailwindVersion = (): number => {
  // Hardcoded version for Tailwind CSS v4
  return 4;
};
