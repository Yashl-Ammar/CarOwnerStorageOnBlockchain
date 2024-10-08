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

function TransferCarPage() {

    const [data, setData] = useState();

    const location = useLocation();
    const vid = location.state?.vid || ''; 

    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    },[])

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({ resolver:  zodResolver(transferSchema)});

    const fetchData = async () => {
        let response = await axios.get('http://localhost:3002/Car/getCarDetail/' + vid, {headers: {
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

    const submit = async (data) => {
        console.log(localStorage.getItem('token'))
        try {
            await axios.put('http://localhost:3002/Car/transferOwnership/' + vid , {
                email: data.email
            }, {headers: {
                token: localStorage.getItem('token')
            }});

            navigate('/home');
        } catch (e) {
            console.log(e);
        }

    } 

    return ( 
        <div className="flex items-center justify-between flex-col min-h-screen w-full">
            <div className="w-4/5">
                <Navbar />

                <div className="my-8 border rounded-2xl py-8 px-12">
                    <div className="flex justify-between flex-col lg:flex-row">
                        <h1 className="text-5xl font-bold font-serif  mb-8 text-indigo-600">Transfer Vehicle</h1>
                    </div>
                    <form onSubmit={handleSubmit(submit)}>
                        <RegularInputField id='email' label='Email' name='email' autofocus={true} placeholder='example@gmail.com' register={register('email')} />
                        {errors.email && <p className="text-red-500 mt-4">{errors.email.message}</p>}
                        <div className="w-full my-5">
                            <RegularButton text='Transfer Vehicle' />
                        </div>
                    </form>
                </div>

                <div className=" my-8 border rounded-2xl py-8 px-12 bg-indigo-600 text-white">
                    <div className="flex justify-between flex-col lg:flex-row">
                        <h1 className="text-5xl font-bold font-serif  mb-8">General Details</h1>
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
                            <p>{data ? data.chassisNumber : ''}</p>
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
            </div>
            <div className="w-full">
                <Footer />
            </div>
        </div>
     );
}

export default TransferCarPage;