import { clickOptions } from '@testing-library/user-event/dist/click';
import React, { ChangeEvent, MouseEvent, DragEvent, FC, useState, useRef } from 'react';

const EventsExample: FC = () => {
    const [value, setValue] = useState<string>('')
    const [isDrag, setIsDrag] = useState<boolean>(false)
    const inputRef = useRef<HTMLInputElement>(null)
    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)

    const clickHandler = (e: MouseEvent<HTMLButtonElement>) => console.log(inputRef.current?.value)

    const dragHandler = (e: DragEvent<HTMLDivElement>) => console.log('drag')

    const dropHandler = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setIsDrag(true)
        console.log('DROP')
    }

    const leaveHandler = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setIsDrag(false)
    }

    const dragWidthPreventHandler = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setIsDrag(true)
    }
    
    return (
        <div>
            <input type="text" value={value} onChange={changeHandler} placeholder="Управляемый" />
            <input type="text" ref={inputRef} placeholder="Неуправляемый"/>
            <button onClick={clickHandler}>Button</button>
            <div onDrag={dragHandler}draggable style={{width: 200, height: 200, background: 'red'}}></div>
            <div 
                onDrop={dropHandler}
                onDragLeave={leaveHandler}
                onDragOver={dragWidthPreventHandler}
                style={{width: 200, height: 200, background: isDrag ? 'blue' : 'red', marginTop: 15}}>
            </div>
        </div>
    );
};

export default EventsExample;