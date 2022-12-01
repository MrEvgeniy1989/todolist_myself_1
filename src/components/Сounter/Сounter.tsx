import React, {ChangeEvent, useState} from 'react';
import s from './Сounter.module.css'

export type CounterPropsType = {
    value: string
    setValue: (value: string) => void
    initialValue: string
    setInitialValue: (initialValue: string) => void
    finalValue: string
    setFinalValue: (finalValue: string) => void
}

export const Сounter: React.FC<CounterPropsType> = (props) => {
    let {value, setValue, initialValue, setInitialValue, finalValue, setFinalValue, ...otherProps} = props

    const onClickHandler = () => {
        if (+value >= +initialValue && +value < +finalValue) {
            return setValue(`${+value + 1}`)
        } else {
            alert('Расчет окончен')
            setValue(initialValue)
        }
    }

    const InitialValueOnChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setInitialValue(e.currentTarget.value)
        setValue(e.currentTarget.value)
    }

    const FinalValueOnChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setFinalValue(e.currentTarget.value)
    }

    return (
        <div>
            <p>Стартовое значение</p>
            <input value={initialValue} onChange={InitialValueOnChangeHandler}/>
            <p>Финальное значение</p>
            <input value={finalValue}  onChange={FinalValueOnChangeHandler}/>
            <div className={s.counter} onClick={onClickHandler}>
                {value}
            </div>
        </div>

    );
};