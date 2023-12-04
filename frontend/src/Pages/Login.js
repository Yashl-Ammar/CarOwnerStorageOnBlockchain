import { Link, useNavigate } from "react-router-dom";
import RegularButton from "../Components/RegularButton";
import RegularInputField from "../Components/RegularInputField";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../Utilities/Validation/LoginSchema";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function LoginPage() {

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({ resolver:  zodResolver(loginSchema)});

    const onSubmit = async (data) => {

        try{

            let response = await axios.post('http://localhost:3002/Owner/signin',{
                email:data.email,
                password:data.password,
                rememberMe: data.remember
            })

            console.log(response);

            localStorage.setItem('token', response.data);

            navigate('/home');
        }
        catch(e){
            toast(e.response.data);
        }

    }

    return ( 
        <div className="flex w-full justify-center items-center min-h-screen">
            <div className="flex flex-col">
                <div className="bg-gray-200 flex justify-center items-center h-screen w-screen">
                    <div className=" border-t-8 rounded-sm border-indigo-600 bg-white p-12 shadow-2xl w-96">
                        <h2 className="font-bold text-center block text-3xl">Log In</h2>
                        <form className="mb-4" onSubmit={handleSubmit(onSubmit)}>
                            <RegularInputField type="email" id="email" name="email" label="Email Address" placeholder="me@example.com" autofocus={true} register={register('email')}/>
                            <RegularInputField type="password" id="password" name="password" label="Password" placeholder="••••••••••" register={register('password')} />
                            <div className="flex my-3">
                                <input id="remember" className="mr-3" type="checkbox" {...register('remember')}  />
                                <label htmlFor="remember"> Remember me</label>
                            </div>
                            <RegularButton text="Login" />
                        </form>
                        <p>Don't have an account? <Link to='/register' className="text-indigo-600">Register Here!</Link></p>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </div>
     );
}

export default LoginPage;
