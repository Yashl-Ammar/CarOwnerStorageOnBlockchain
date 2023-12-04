import { Link, useNavigate } from "react-router-dom";
import RegularButton from "../Components/RegularButton";
import RegularInputField from "../Components/RegularInputField";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../Utilities/Validation/RegisterSchema";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

function RegisterPage() {

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({ resolver:  zodResolver(registerSchema)});

    const onSubmit = async (data) => {
        if(data.password === data.cpassword) {
            await axios.post('http://localhost:3002/Owner/signup',{
                fname: data.fname,
                lname: data.lname,
                email: data.email,
                DoB: data.dob,
                contactDetails: data.phoneNumber,
                cnic: data.cnic,
                password : data.password
            })

            navigate('/');
        }
        else
        {
            toast("Password and confirm password must be same!");
        }
    }

    return ( 
            <div className="bg-gray-200 flex justify-center items-center min-h-screen w-screen py-8">
                <div className=" border-t-8 rounded-sm border-indigo-600 bg-white p-12 shadow-2xl w-96">
                    <h2 className="font-bold text-center block text-3xl">Register</h2>
                    <form className="mb-4" onSubmit={handleSubmit(onSubmit)}>
                        <RegularInputField type="text" id="fname" name="fname" label="First Name" placeholder="John" autofocus={true} register={register('fname')}/>
                        {errors.fname && <p className="mt-1 text-xs text-red-500">{errors.fname.message}</p>}
                        <RegularInputField type="text" id="lname" name="lname" label="Last Name" placeholder="Doe" autofocus={true} register={register('lname')}/>
                        {errors.lname && <p className="mt-1 text-xs text-red-500">{errors.lname.message}</p>}
                        <RegularInputField type="email" id="email" name="email" label="Email Address" placeholder="me@example.com" autofocus={true} register={register('email')}/>
                        {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
                        <RegularInputField type="text" id="phonenumber" name="phonenumber" label="Phone Number" placeholder="0333XXXXXXX" autofocus={true} register={register('phoneNumber')}/>
                        {errors.phoneNumber && <p className="mt-1 text-xs text-red-500">{errors.phoneNumber.message}</p>}
                        <RegularInputField type="text" id="cnic" name="cnic" label="CNIC" placeholder="61101XXXXXXXX" autofocus={true} register={register('cnic')}/>
                        {errors.cnic && <p className="mt-1 text-xs text-red-500">{errors.cnic.message}</p>}
                        <RegularInputField type="date" id="dob" name="dob" label="Date of Birth"  autofocus={true} register={register('dob')}/>
                        {errors.dob && <p className="mt-1 text-xs text-red-500">{errors.dob.message}</p>}
                        <RegularInputField type="password" id="password" name="password" label="Password" placeholder="••••••••••" register={register('password')} />
                        {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
                        <RegularInputField type="password" id="cpassword" name="cpassword" label="Confirm Password" placeholder="••••••••••" register={register('cpassword')} />
                        {errors.cpassword && <p className="mt-1 text-xs text-red-500">{errors.cpassword.message}</p>}
                        <div className="mt-6">
                            <RegularButton text="Register" />
                        </div>
                    </form>
                    <p>Already have an account? <Link to='/' className="text-indigo-600">Login Here!</Link></p>
                </div>
                <ToastContainer />
            </div>
     );
}

export default RegisterPage;
