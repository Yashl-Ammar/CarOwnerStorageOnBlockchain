import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../Components/NavBar";
import RegularButton from "../Components/RegularButton";
import Footer from "../Components/Footer";
import { useForm } from "react-hook-form";
import { transferSchema } from "../Utilities/Validation/TransferSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import RegularInputField from "../Components/RegularInputField";
import { maintenanceSchema } from "../Utilities/Validation/MaintenanceSchema";
import { getVehicleSchema } from "../Utilities/Validation/GetVehicleSchema";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function GetVehicleDetailsPage() {

    const [data, setData] = useState();

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({ resolver:  zodResolver(getVehicleSchema)});

    const onsubmit = async (data) => {
        console.log(data)
        try {
            await axios.get('http://localhost:3002/Car/getCarDetail2/'+data.search ,{headers: {
                token: localStorage.getItem('token')
            }});
            
            

            
            navigate('/vehicle/' + data.search );
        } catch (e) {
            toast('Vehicle does not exist in system!')
        }

    } 

    return ( 
        <div className="flex items-center justify-between flex-col min-h-screen w-full">
            <div className="w-4/5">
                <Navbar />

                <div className="my-8 border rounded-2xl py-8 px-12">
                    <div className="flex justify-between flex-col lg:flex-row">
                        <h1 className="text-5xl font-bold font-serif  mb-8 text-indigo-600">Record Maintenance</h1>
                    </div>
                    <form onSubmit={handleSubmit(onsubmit)}>
                        <RegularInputField id='search' label='Search Vehicle Through Chassiss Number' name='search' autofocus={true} placeholder='42521' register={register('search')} />
                        {errors.search && <p className="text-red-500 mt-4">{errors.search.message}</p>}
                        <div className="w-full my-5">
                            <RegularButton text='Search' />
                        </div>
                    </form>
                </div>
            </div>
            <div className="w-full">
                <Footer />
            </div>
            <ToastContainer />
        </div>
     );
}

export default GetVehicleDetailsPage;