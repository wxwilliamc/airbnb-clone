"use client";
// Axios
import axios from "axios";
// React Icons
import {AiFillGithub} from 'react-icons/ai'
import {FcGoogle} from 'react-icons/fc'
// React Module
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
// Hooks
import useRegisterModal from "@/app/hooks/useRegisterModal";
// Components
import {Modal, Heading, Input, Button, LoginModal} from "..";
// Toaster
import {toast} from 'react-hot-toast'
// Next Auth
import { signIn } from "next-auth/react";
import useLoginModal from "@/app/hooks/useLoginModal";

const RegisterModal = () => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isLoading, setIsloading] = useState(false);

    // react-hook-form
    const {
        register,
        handleSubmit,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: '',
        }
    });

    // react-hook-form
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsloading(true);

        axios.post('/api/register', data)
            .then(() => {
                registerModal.onClose();
                toast.success('Account Sign Up Successful');
                loginModal.onOpen();
            })
            .catch(() => {
                toast.error('Something went wrong');
            })
            .finally(() => {
                setIsloading(false);
            })
    }

    const toggle = useCallback(() => {
        registerModal.onClose();
        loginModal.onOpen();
    }, [registerModal, loginModal])

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading 
                title="Welcome to Airbnb"
                subtitle="Create an account"
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
                id="name"
                label="Username"
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
                onClick={() => signIn('google')}
            />

             <Button 
                outline
                label="Continue with Github"
                icon={AiFillGithub}
                onClick={() => signIn('github')}
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

                    <div onClick={toggle} 
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
        isOpen={registerModal.isOpen}
        title="Register"
        actionLabel="Continue"
        onClose={registerModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
        footer={footerContent}
    />
  )
}

export default RegisterModal