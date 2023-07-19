"use client";
// Axios
import axios from "axios";
// React Icons
import { AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
// React Module
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
// Hooks
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
// Components
import { Modal, Heading, Input, Button } from "..";
// Toaster
import {Toaster, toast} from 'react-hot-toast'
// Next Auth
import { signIn } from 'next-auth/react'
// Next Module
import { useRouter } from "next/navigation";

const LoginModal = () => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isLoading, setIsloading] = useState(false);

    const router = useRouter();

    // react-hook-form
    const {
        register,
        handleSubmit,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: '',
        }
    });

    // hook form (SubmitHandler)
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsloading(true);

        // next-auth/react
        // Sign In
        signIn('credentials', {
            ...data,
            redirect: false,
        })
        .then((callback) => {
            setIsloading(false);

            if(callback?.ok){
                toast.success('Login Successful');
                router.refresh();
                loginModal.onClose();
            }

            if(callback?.error){
                toast.error(callback.error);
            }
        })
    }

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading 
                title="Welcome Back"
                subtitle="Login to your account"
            />

            <Input 
                id="email"
                label="Email"
                disabled={isLoading}
                required
                register={register}
                errors={errors}
            />

            <Input 
                id="password"
                label="Password"
                disabled={isLoading}
                required
                register={register}
                errors={errors}
            />
            
        </div>
    )

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
            <hr />
            <Button 
                outline
                label="Continue with Google"
                icon={FcGoogle}
                onClick={() => {}}
            />

             <Button 
                outline
                label="Continue with Github"
                icon={AiFillGithub}
                onClick={() => {}}
            />

            <div className="
                text-neutral-500
                text-center
                mt-4
                font-light
                "
            >
                <div className="flex flex-row items-center justify-center gap-2">
                    <div>
                        Already have an account?
                    </div>

                    <div onClick={loginModal.onClose} 
                        className="text-neutral-800 cursor-pointer hover:underline transition">
                        Log in
                    </div>
                </div>
            </div>
        </div>
    )

  return (
    <Modal 
        disabled={isLoading}
        isOpen={loginModal.isOpen}
        title="Login"
        actionLabel="Continue"
        onClose={loginModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
        footer={footerContent}
    />
  )
}

export default LoginModal