import { Link, useNavigate } from "react-router-dom";
import RegularButton from "../Components/RegularButton";
import RegularInputField from "../Components/RegularInputField";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../Utilities/Validation/RegisterSchema";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { useState } from "react";
import { addVehicleSchema, getVehicleSchema } from "../Utilities/Validation/AddVehicleSchema";

function AddVehiclePage() {

    const navigate = useNavigate();

    const [prevOwners, setPrevOwners] = useState([])
    const [prev, setPrev] = useState()

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({ resolver:  zodResolver(addVehicleSchema)});

    const onSubmit = async (data) => {
        console.log(data);

        try {
                
            await axios.post('http://localhost:3002/Car/registerCar',{
                manufactureDate : data.mdate,
                numberPlate : data.nplate,
                chassisNumber : data.cnumber,
                previousOwners : prevOwners,
                make : data.make,
                model : data.model,
                varient : data.varient,
            },{
                headers:{
                    token: localStorage.getItem('token')
                }
            })
            
            await axios.post('http://localhost:3002/Car/registerCar2',{
                manufactureDate : data.mdate,
                numberPlate : data.nplate,
                chassisNumber : data.cnumber,
                previousOwners : prevOwners,
                make : data.make,
                model : data.model,
                varient : data.varient,
            },{
                headers:{
                    token: localStorage.getItem('token')
                }
            })
    
            navigate('/home');
        } catch (error) {
            toast('Could not add car. Please Try later!')
        }
        
    }

    const mapOwners = () => {
        return prevOwners.map((val,index) => {
            return <p key={index}>{val}</p>
        });
    }

    return ( 
            <div className="bg-gray-200 flex justify-center items-center min-h-screen w-screen py-8">
                <div className=" border-t-8 rounded-sm border-indigo-600 bg-white p-12 shadow-2xl w-1/2">
                    <h2 className="font-bold text-center block text-3xl">Add a vehicle</h2>
                    <form className="mb-4" onSubmit={handleSubmit(onSubmit)}>
                        <RegularInputField type="date" id="mdate" name="mdate" label="Manufacturing Date" placeholder="12/12/2023" autofocus={true} register={register('mdate')}/>
                        {errors.mdate && <p className="mt-1 text-xs text-red-500">{errors.mdate.message}</p>}
                        <RegularInputField type="text" id="nplate" name="nplate" label="Number Plate" placeholder="1234" autofocus={true} register={register('nplate')}/>
                        {errors.nplate && <p className="mt-1 text-xs text-red-500">{errors.nplate.message}</p>}
                        <RegularInputField type="text" id="cnumber" name="cnumber" label="Chassis Number" placeholder="16283" autofocus={true} register={register('cnumber')}/>
                        {errors.cnumber && <p className="mt-1 text-xs text-red-500">{errors.cnumber.message}</p>}
                        <RegularInputField type="text" id="make" name="make" label="Make" placeholder="Honda" autofocus={true} register={register('make')}/>
                        {errors.make && <p className="mt-1 text-xs text-red-500">{errors.make.message}</p>}
                        <RegularInputField type="text" id="model" name="model" label="Model" placeholder="City" autofocus={true} register={register('model')}/>
                        {errors.model && <p className="mt-1 text-xs text-red-500">{errors.model.message}</p>}
                        <RegularInputField type="text" id="varient" name="varient" label="Varient" placeholder='IVTEC'  autofocus={true} register={register('varient')}/>
                        {errors.varient && <p className="mt-1 text-xs text-red-500">{errors.varient.message}</p>}
                        <div className="flex w-full items-end">
                            <label class="text-gray-500 block mt-3 w-full">Previous Owners
                                <input type="text" id="prevowner" name="password" placeholder="john doe" value={prev} onChange={(e) => {setPrev(e.target.value)}} class="rounded px-4 py-3 w-full mt-1 bg-white text-gray-900 border border-gray-200 focus:border-indigo-400 focus:outline-none focus:ring focus:ring-indigo-100" />
                            </label>
                            <button type="button" className="bg-indigo-600 px-5 py-3 ml-2 text-white font-bold rounded" onClick={() => {setPrevOwners(pr => {
                                let temp = [...pr, prev];
                                return temp;
                            })}}>Add</button>
                        </div>
                        {mapOwners()}
                        <div className="mt-6">
                            <RegularButton text="Add" type='submit'/>
                        </div>
                    </form>
                </div>
                <ToastContainer />
            </div>
     );
}

export default AddVehiclePage;



