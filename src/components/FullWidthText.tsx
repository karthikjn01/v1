import { useAnimate } from 'framer-motion';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

export default function FullWidthText({
    text,
    className
}: {
    text: string,
    className?: string,
}) {

    const [scope, animate] = useAnimate();

    function useWindowSize() {
        const [size, setSize] = useState([0, 0]);
        useLayoutEffect(() => {
            function updateSize() {
                setSize([window.innerWidth, window.innerHeight]);
            }
            window.addEventListener('resize', updateSize);
            updateSize();
            return () => window.removeEventListener('resize', updateSize);
        }, []);
        return size;
    }
    const oc = useRef<HTMLDivElement>(null);
    const tc = useRef<HTMLDivElement>(null);
    const sc = useRef<HTMLDivElement>(null);

    const [windowWidth] = useWindowSize();
    //create a component that'll scale the text to fit the width of the container

    useEffect(() => {

        if (!oc.current || !tc.current || !sc.current) return;

        const textContainer = oc.current;
        const textContent = tc.current;
        const scaleContainer = sc.current;

        const containerWidth = textContainer.clientWidth;
        const textWidth = textContent.clientWidth;
        //subtract the line height
        const textHeight = textContent.getBoundingClientRect().height;

        console.log({ textHeight, containerWidth, textWidth })

        const scale = containerWidth / textWidth;
        scaleContainer.style.transform = `scale(${scale})`;
        //set the height of the container to be the same as the text
        scaleContainer.style.height = `${textHeight}px`;

    }, [
        oc.current,
        tc.current,
        windowWidth
    ]);


    return <div ref={scope} className="w-full">
        <div className={"w-full " + className} ref={oc}>
            <div ref={sc} className='flex flex-col justify-center items-center'>
                <p ref={tc} className='w-fit font-bold text-8xl whitespace-nowrap p-2'>{text}</p>
            </div>
        </div>
    </div>
}


