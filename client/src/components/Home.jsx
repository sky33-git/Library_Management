import React from 'react';

const Home = () => {
  
  return (
    <div
      className="min-h-screen w-full grid place-items-center bg-[url('/images/background.png')] bg-no-repeat bg-cover bg-center">

      <div className="relative 
                      h-[40vh] w-[90%] md:w-[70%] lg:w-[51%] 
                      bg-white/30 backdrop-blur-md 
                      p-8 rounded-xl shadow-2xl 
                      flex flex-col justify-center items-center text-center">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl text-gray-900 font-extrabold mb-4 leading-tight">
            The more that you read, the more things you will know. The more that you learn, the more places you’ll go.
          </h1>
          <p className="flex justify-end text-lg sm:text-xl lg:text-2xl mr-6 text-gray-700 font-semibold italic">
            - Experts
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;