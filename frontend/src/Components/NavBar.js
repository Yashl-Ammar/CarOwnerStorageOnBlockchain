import { Link } from "react-router-dom";

function Navbar() {
    return ( <div className=" flex justify-between items-center my-3">
    <div className="flex items-center">
        <img className="w-20 mr-5" src="/Car.png" alt="" />
        <h2 className="font-black text-3xl font-serif text-indigo-600">AMS</h2>
    </div>
    <ul className="lg:flex w-full lg:justify-between px-32 hidden">
        <li className="font-bold hover:text-indigo-600  hover:border-indigo-600 hover:border-b-2"><Link to='/add'>Add Vehicle</Link></li>
        <li className="font-bold hover:text-indigo-600  hover:border-indigo-600 hover:border-b-2"><Link to='/vehicle/search'>Get a Vehicle's Details</Link></li>
        <li className="font-bold hover:text-indigo-600  hover:border-indigo-600 hover:border-b-2"><Link to='/home'>View Your Cars</Link></li>
    </ul>
    <div className="lg:flex lg:justify-end hidden">
        <img className="w-12 h-12" src="/User.svg" alt="" />
    </div>
    <div className="flex lg:hidden">
        <img className="w-12 h-12" src="/Menu.png" alt="" />
    </div>
</div> );
}

export default Navbar;