import wahab from '../assets/wahab.jpeg';
import shofik from '../assets/shofik.jpeg';
import ayas from '../assets/ayas.jpeg';
import raj from '../assets/raj.jpeg';

export default function About() {
  return (
    <div className="flex-grow flex flex-col min-h-screen">
      <div className="bg-green-800 text-white py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Meet the Team</h1>
        <p className="text-lg text-green-100 max-w-2xl mx-auto">We are a passionate team dedicated to making fresh, organic groceries accessible to everyone.</p>
      </div>
      
      <div className="container mx-auto px-4 py-16 flex-grow">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          <div className="bg-white rounded-lg shadow-lg text-center overflow-hidden">
            <img src={wahab} alt="Abdul Wahab" className="w-full h-72 object-cover object-top" />
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800">Abdul Wahab</h3>
              <p className="text-green-600 font-medium mb-3">Founder & Lead Developer</p>
              <p className="text-gray-600 text-sm">"My dream is to connect local farmers directly with consumers using smart tech."</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg text-center overflow-hidden">
            <img src={shofik} alt="Sofikul Islam" className="w-full h-72 object-cover object-top" />
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800">Mohammad Sofikul Islam</h3>
              <p className="text-green-600 font-medium mb-1">UI/UX Designer</p>
              <p className="text-gray-600 text-sm">"I dream of creating digital experiences so seamless that shopping feels like a breeze."</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg text-center overflow-hidden">
            <img src={ayas} alt="Md Ayas" className="w-full h-72 object-cover object-top" />
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800">Md Ayas</h3>
              <p className="text-green-600 font-medium mb-3">Database Manager</p>
              <p className="text-gray-600 text-sm">"I want to build systems that scale perfectly, ensuring fast checkout."</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg text-center overflow-hidden">
            <img src={raj} alt="Raj Kumar" className="w-full h-72 object-cover object-top" />
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800">Raj Kumar</h3>
              <p className="text-green-600 font-medium mb-3">Marketing</p>
              <p className="text-gray-600 text-sm">"My goal is to make 'Fresh Wahab Smart' a household name."</p>
            </div>
          </div>

        </div>
      </div>

      <footer className="bg-gray-800 text-white py-10 text-center mt-auto">
        <h3 className="text-2xl font-bold mb-2">Fresh Wahab Smart</h3>
        <a href="https://www.facebook.com/share/1EqWqHc3Zv/" target="_blank" rel="noreferrer" className="inline-flex items-center text-blue-400 hover:text-blue-300 mt-4 bg-gray-700 px-4 py-2 rounded-lg">
            <i className="fab fa-facebook text-xl mr-2"></i> Follow us on Facebook
        </a>
      </footer>
    </div>
  );
}