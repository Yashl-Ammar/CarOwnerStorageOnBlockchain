import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Components/NavBar";
import Footer from "../Components/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import RegularButton from "../Components/RegularButton";

function HomePage() {

    const [data, setData] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        fetchCars()
    },[])

    const fetchCars = async () => {
        let response = await axios.get('http://localhost:3002/Car/getAllCars',{headers : {
            token: localStorage.getItem('token')
        }});

        console.log(response);
        setData(response.data);
    }

    const mapData = () => {
        return data.map((val, index) => {
            return <tr className="border-b text-center hover:bg-slate-100" key={index}>
                <td className="py-5">{index + 1}</td>
                <td>{val.make}</td>
                <td>{val.model}</td>
                <td>{val.manufactureDate}</td>
                <td>{val.chassisNumber}</td>
                <td>{val.numberPlate}</td>
                <td>{val.accidentCount}</td>
                <td>{val.maintenanceCount}</td>
                <td><RegularButton text='View' onClick={() => {navigate('/vehicle', {state: {vid: val.chassisNumber}})}} /></td>
            </tr>
        })
    }

    return ( 
        <div className="flex items-center justify-between flex-col min-h-screen w-full">
            <div className="w-4/5">
                <Navbar />
                <div className="my-14 bg-indigo-800 w-full rounded-lg text-white px-12 py-8">
                    <h1 className="text-5xl font-serif font-bold mb-5">Welcome to AMS.</h1>
                    <p>Asset Management System (AMS) is a web application that leverages blockchain technology to track the ownership, sale, and history of vehicles. It ensures transparency and security in transactions, providing a tamper-proof record of each vehicle's lifecycle, from manufacture to sale, and subsequent ownership changes. This system greatly enhances trust and reliability in the used car market by offering an immutable history of vehicle condition, ownership, and maintenance.</p>
                </div>
                <div className="px-12 py-8 rounded-2xl border ">
                    <h2 className="font-bold text-3xl mb-5 text-indigo-600">Your Cars</h2>
                    <div className="h-1 bg-black w-full"></div>
                    <table className="w-full my-5">
                        <tr className="border-y">
                            <th className="py-5">Sr.</th>
                            <th>Make</th>
                            <th>Model</th>
                            <th>Manufacturing Date</th>
                            <th>Chassis Number</th>
                            <th>Number Plate</th>
                            <th>Accidents</th>
                            <th>Maintainences</th>
                            <th>Action</th>
                        </tr>
                        {mapData()}
                    </table>
                </div>
            </div>
            <div className="w-full">
                <Footer />
            </div>
        </div>
     );
}

export default HomePage;