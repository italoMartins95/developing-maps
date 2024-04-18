import { useState } from 'react';
import './Input.css';

interface IInput {
    placeholder: string,
    type: string,
    handleOnChange(value: string): void;
}

const Input: React.FC<IInput> = (props) => {
    const [inputValue, setInputValue] = useState('');

    const handleChange = (event: any) => {
        const newValue = event.target.value;
        setInputValue(newValue);
        props.handleOnChange(newValue);
      };

    return (
        <input
            type={props.type}
            placeholder={props.placeholder}
            onChange={handleChange}
        />
    )
}

export default Input;