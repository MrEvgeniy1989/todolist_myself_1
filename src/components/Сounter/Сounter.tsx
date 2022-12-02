import React, {ChangeEvent, useState} from 'react';
import s from './Сounter.module.css'

export type CounterPropsType = {
    value: number
    setValue: (value: number) => void
    initialValue: number
    setInitialValue: (initialValue: number) => void
    finalValue: number
    setFinalValue: (finalValue: number) => void
}

export const Сounter: React.FC<CounterPropsType> = (props) => {
    let {value, setValue, initialValue, setInitialValue, finalValue, setFinalValue, ...otherProps} = props

    const onClickHandler = () => {
        if (value >= +initialValue && value < +finalValue) {
            return setValue(value + 1)
        } else {
            alert('Расчет окончен')
            setValue(+initialValue)
        }
    }

    const InitialValueOnChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setInitialValue(+e.currentTarget.value)
        setValue(+e.currentTarget.value)
    }

    const FinalValueOnChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setFinalValue(+e.currentTarget.value)
    }

    return (
        <div className={s.counterAll}>

            <div className={s.field}>
                <label htmlFor={'number'}>Стартовое значение: </label>
                <input type={'number'} value={initialValue} onChange={InitialValueOnChangeHandler}/>
            </div>
            <div className={s.field}>
                <label htmlFor={'number'}>Финальное значение: </label>
                <input type={'number'} value={finalValue} onChange={FinalValueOnChangeHandler}/>
            </div>

            <div className={s.counter} onClick={onClickHandler}>
                {value}
            </div>
        </div>

    );
};