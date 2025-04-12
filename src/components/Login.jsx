import React, { useEffect, useState } from 'react'
import * as Yup from "yup"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from './ui/input'
import { Button } from './ui/button'
import { BeatLoader } from 'react-spinners'
import Error from './Error'
import UseFetch from '@/hooks/UseFetch'
import { login } from '@/db/apiAuth'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { UrlState } from '@/Context'


const Login = () => {
    const [errors, setErrors] = useState([]);
    const [formData, setformData] = useState({
        email: "",
        password: ""
    });
    
    const navigate=useNavigate();
    let [searchParams]=useSearchParams();
    const longLink=searchParams.get("createNew");

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setformData((prevState) => ({ ...prevState, [name]: value }))
    }

    const { data, loading, error, fn:fnLogin } = UseFetch(login, formData);
    const { fetchUser } = UrlState();

    useEffect(()=>{
        if(error===null && data){
            navigate(`/dashboard?${longLink?`createNew=${longLink}`:""}`);
            fetchUser();
        }
    },[data,error]);

    const handleLogin = async () => {
        setErrors([]);
        try {
            const schema = Yup.object().shape({
                email: Yup.string().email("Invalid Email").required("Email is required"),
                password: Yup.string().min(6, "Password must be atleast 6 characters").required("Password is required"),
            });

            await schema.validate(formData, { abortEarly: false });
            await fnLogin();
        } catch (e) {
            const newErrors = {};
            e?.inner?.forEach((err) => {
                newErrors[err.path] = err.message
            });

            setErrors(newErrors);
        }
    };

    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Login</CardTitle>
                    <CardDescription>If you have already have an account</CardDescription>
                    {error && <Error message={error.message} />}
                </CardHeader>
                <CardContent className='space-y-2'>
                    <div className="space-y-1">
                        <Input onChange={handleInputChange} name='email' type="email" placeholder="Enter Email" />
                        {errors.email && <Error message={errors.email} />}
                    </div>
                    <div className="space-y-1">
                        <Input onChange={handleInputChange} name='password' type="password" placeholder="Enter Password" />
                        {errors.password && <Error message={errors.password} />}
                    </div>
                </CardContent>
                <CardFooter>
                    <Button onClick={handleLogin}>
                        {loading ? <BeatLoader size={10} color='#36d7b7' /> : "Login"}
                    </Button>
                </CardFooter>
            </Card>

        </div>
    )
}

export default Login