import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Navbar from "../Components/NavBar";
import Footer from "../Components/Footer";
import RegularButton from "../Components/RegularButton";

function ViewSpecificSelfVehiclePage() {
    
    const [data, setData] = useState();

    const location = useLocation();
    const vid = location.state?.vid || ''; 

    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    },[])

    const fetchData = async () => {
        let response = await axios.get('http://localhost:3002/Car/getCarDetail2/' + vid, {headers: {
            token: localStorage.getItem('token')
        }});

        console.log(response);
        setData(response.data);
    }

    const mapOwners = () => {
        if(data){
            return data.previousOwners.map((val,index) => {
                return <p className="my-5" key={index}>{val}</p>
            })
        }
    }

    const mapAccidents = () => { 
        if(data){
            return data.accidentDetails.map((val,index) => {
                return <div key={index} className="border rounded-lg px-12 py-8 my-5">
                    <h3 className="font-bold text-xl">Details of accident number {index + 1}</h3>
                    <p>{val}</p>
                </div>
            })
        }
    }
    const mapMaintainances = () => { 
        if(data){
            return data.maintenanceDetails.map((val,index) => {
                return <div key={index} className="border rounded-lg px-12 py-8 my-5">
                    <h3 className="font-bold text-xl">Details of maintenance number {index + 1}</h3>
                    <p>{val}</p>
                </div>
            })
        }
    }

    return ( 
        <div className="flex items-center justify-between flex-col min-h-screen w-full">
            <div className="w-4/5">
                <Navbar />
                <div className=" my-8 border rounded-2xl py-8 px-12 bg-indigo-600 text-white">
                    <div className="flex justify-between flex-col lg:flex-row">
                        <h1 className="text-5xl font-bold font-serif  mb-8">General Details</h1>
                        <button 
                            onClick={() => {navigate('/vehicle/transfer', {state:{vid: vid}})}}
                            className="transition transition-all block py-3 px-4 w-full lg:w-1/5 text-white font-bold rounded cursor-pointer bg-purple-400 hover:bg-purple-500 focus:bg-indigo-900 transform hover:-translate-y-1 hover:shadow-lg">
                            Transfer Car
                        </button>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 mb-8">
                        <div className="my-4">
                            <h3 className="text-xl font-bold">Make:</h3>
                            <p>{data? data.make : ''}</p>
                        </div>
                        <div className="my-4">
                            <h3 className="text-xl font-bold">Model:</h3>
                            <p>{data? data.model : ''}</p>
                        </div>
                        <div className="my-4">
                            <h3 className="text-xl font-bold">Varient:</h3>
                            <p>{data ? data.varient : ''}</p>
                        </div>
                    
                    
                        <div className="my-4">
                            <h3 className="text-xl font-bold">Chassis Number:</h3>
                            <p>{vid}</p>
                        </div>
                        <div className="my-4">
                            <h3 className="text-xl font-bold">Number Plate:</h3>
                            <p>{data ? data.numberPlate : ''}</p>
                        </div>
                        <div className="my-4">
                            <h3 className="text-xl font-bold">Manufacturing Date:</h3>
                            <p>{data ? data.manufactureDate : ''}</p>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold">Previous Owners</h2>
                        {mapOwners()}
                    </div>
                    
                </div>
                <div className=" my-8 border rounded-2xl py-8 px-12">
                    <div className="flex justify-between flex-col lg:flex-row mb-5">
                        <h1 className="text-5xl font-bold font-serif text-indigo-600 mb-8">Accident Details</h1>
                        <div className="w-full lg:w-1/5">
                            <RegularButton text='Record Accident' onClick={() => {navigate('/vehicle/recordaccident', {state:{vid: vid}})}} />
                        </div>
                    </div>
                    <h2 className="font-bold text-3xl">Total Accidents: {data ? data.accidentCount : '0'}</h2>
                    {mapAccidents()}
                    

                </div>
                <div className=" my-8 border rounded-2xl py-8 px-12">
                    <div className="flex justify-between flex-col lg:flex-row mb-5">
                        <h1 className="text-5xl font-bold font-serif text-indigo-600 mb-8">Maintenance Details</h1>
                        <div className="w-full lg:w-1/5">
                            <RegularButton text='Record Maintenance' onClick={() => {navigate('/vehicle/recordmaintainence', {state:{vid: vid}})}} />
                        </div>
                        
                    </div>
                    <h2 className="font-bold text-3xl">Total Maintenance Cycles: {data ? data.maintenanceCount : '0'}</h2>
                    {mapMaintainances()}

                </div>
            </div>
            <div className="w-full">
                <Footer />
            </div>
        </div>
    );
}

export default ViewSpecificSelfVehiclePage;