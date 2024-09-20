'use client';

import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import {
    FieldValues,
    SubmitHandler,
    useForm
} from "react-hook-form";

import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";

import Modal from "./Modal";
import Input from "../inputs/Input";
import Heading from "../Heading";
import Button from "../Button";

const RegisterModal = () => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: {
            errors,
        },
    } = useForm<FieldValues>({
        defaultValues: {
            email: '',
            name: '',
            password: '',
            repeated_password: ''
        },
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        axios.post('/api/register', data)
            .then(() => {
                toast.success('Регистрация прошла успешно!');
                registerModal.onClose();
                loginModal.onOpen();
            })
            .catch((error) => {
                toast.error(error);
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    const onToggle = useCallback(() => {
        registerModal.onClose();
        loginModal.onOpen();
    }, [registerModal, loginModal])

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading
                title="Добро пожаловать!"
                subtitle="Создать аккаунт!"
            />
            <Input
                id="email"
                label="Почта"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id="name"
                label="Имя"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id="password"
                label="Пароль"
                type="password"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id="repeated_password"
                label="Повторить пароль"
                type="password"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
        </div>
    )

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
            <hr />
            <Button
                outline
                label="Продолжить с Google"
                icon={FcGoogle}
                onClick={() => signIn('google')}
            />
            <Button
                outline
                label="Продолжить с Github"
                icon={AiFillGithub}
                onClick={() => signIn('github')}
            />
            <div
                className="
                    text-neutral-500 
                    text-center 
                    mt-4 
                    font-light
                "
            >
                <p>Уже есть аккаунт?
                    <span
                        onClick={onToggle}
                        className="
                            text-neutral-800
                            cursor-pointer 
                            hover:underline
                        "
                    > Войти</span>
                </p>
            </div>
        </div>
    )

    return (
        <Modal
            disabled={isLoading}
            isOpen={registerModal.isOpen}
            title="Регистрация"
            actionLabel="Продолжить"
            onClose={registerModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    );
}

export default RegisterModal;
