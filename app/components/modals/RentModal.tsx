"use client";

import { useMemo, useState } from "react";
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
import { useRouter } from "next/navigation";

import Modal from "./Modal";
import useRentModal from "@/app/hooks/useRentModal";
import Heading from "../Heading";
import Counter from "../inputs/Counter";
import ImageUpload from "../inputs/ImageUpload";
import Input from "../inputs/Input";
import ChooseAddressMap from "../ChooseAdressMap";

import axios from "axios";
import toast from "react-hot-toast";

enum STEPS {
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5
}

const RentModal = () => {

    const router = useRouter();
    const rentModal = useRentModal();

    const [step, setStep] = useState(STEPS.LOCATION);
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors,
        },
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            // category: '',
            location: [55.75, 37.57],
            guestCount: 1,
            roomCount: 1,
            bathroomCount: 1,
            imageSrc: '',
            price: 1,
            title: '',
            description: ''
        }
    });

    // const category = watch('category');
    const location = watch('location');
    const guestCount = watch('guestCount');
    const roomCount = watch('roomCount');
    const bathroomCount = watch('bathroomCount');
    const imageSrc = watch('imageSrc');

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
        });
    };

    const onBack = () => {
        setStep((value) => value - 1);
    };

    const onNext = () => {
        setStep((value) => value + 1);
    };

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if (step !== STEPS.PRICE) {
            return onNext();
        }

        setIsLoading(true);

        axios.post('/api/listings', data)
        .then(() => {
            toast.success("Объявление создано!");
            router.refresh();
            reset();
            setStep(STEPS.LOCATION);
            rentModal.onClose();
        })
        .catch(() => {
            toast.error('Что-то пошло не так');
        })
        .finally(() => {
            setIsLoading(false);
        });
    };

    const actionLabel = useMemo(() => {
        if (step === STEPS.PRICE){
            return 'Разместить';
        }

        return 'Следующий шаг';
    }, [step]);

    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.LOCATION){
            return undefined;
        }

        return 'Назад';
    }, [step]);

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading
                title="Где расположена ваша квартира?"
                subtitle="Это поможет людям найти ваше объявление."
            />
            <ChooseAddressMap
                modules="Map,Placemark,control.SearchControl,control.ZoomControl,control.FullscreenControl,geocode,package.full"
                value={location}
                onChange={(value) => setCustomValue('location', value)}
            />
        </div>
    );
    // }

    if (step === STEPS.INFO){
        bodyContent = (
            <div
                className="flex flex-col gap-8"
            >
                <Heading
                    title="Заполните эти поля для описания квартиры"
                />
                <Counter
                    title="Гости"
                    subtitle="Сколько гостей разрешено в квартире?"
                    value={guestCount}
                    onChange={(value) => setCustomValue('guestCount', value)}
                />
                <hr/>
                <Counter
                    title="Комнаты"
                    subtitle="Сколько доступных комнат в наличии?"
                    value={roomCount}
                    onChange={(value) => setCustomValue('roomCount', value)}
                />
                <hr/>
                <Counter
                    title="Ванные"
                    subtitle="Сколько ванных комнат в наличии?"
                    value={bathroomCount}
                    onChange={(value) => setCustomValue('bathroomCount', value)}
                />
            </div>
        );
    };

    if (step === STEPS.IMAGES) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Добавьте фото вашей квартиры"
                />
                <ImageUpload
                    value={imageSrc}
                    onChange={(value) => setCustomValue('imageSrc', value)}
                />
            </div>
        );
    };

    if (step === STEPS.DESCRIPTION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Как вы можете описать вашу квартиру?"
                    subtitle="Лучше всего подходят короткие описания!"
                />
                <Input
                    id="title"
                    label="Название квартиры"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
                <hr/>
                <Input
                    id="description"
                    label="Описание"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
            </div>
        );
    };

    if (step === STEPS.PRICE){
        bodyContent = (
            <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-8">
                    <Heading
                        title="Теперь напишите цену объявления."
                        subtitle="Сколько вы взимаете за месяц?"
                    />
                    <Heading
                        title="Условия размещения объявлений:"
                        subtitle="Наш сервис будет взимать дополнительно с арендатора 5000 рублей за 
                        использование наших услуг сопровождения при съеме квартир, следовательно, цена объявления = ([ваша цена] + 5000 рублей)"
                    />
                </div>
                <Input
                    id='price'
                    label='price'
                    formatPrice
                    type='number'
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
            </div>
        );
    }

    return (
        <Modal
            isOpen={rentModal.isOpen}
            onClose={rentModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            actionLabel={actionLabel}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
            title="Добавление объявления"
            body={bodyContent}
        />
    );
}
 
export default RentModal;