import React, { useEffect, useRef, useState } from 'react';
import SplitType from 'split-type';
// import { animate, stagger } from 'motion';
import { stagger, useAnimate } from 'framer-motion';

import { navigate } from 'astro:transitions/client';


export default function HoverableText({
    text,
    link,
    className
}: {
    text: string,
    link?: string,
    className?: string,
}) {
    const outer = useRef<HTMLDivElement>(null);
    const first = useRef<HTMLDivElement>(null);
    const second = useRef<HTMLDivElement>(null);

    const [scope, animate] = useAnimate();

    const [hovering, setHovering] = useState<boolean | null>(null);


    useEffect(() => {
        if (!outer.current || !first.current || !second.current) return;

        new SplitType(scope.current.querySelector("#second")).chars;
        new SplitType(scope.current.querySelector("#first")).chars;
        const fe = scope.current.querySelectorAll("#first .char");



        outer.current.style.height = `${first.current.clientHeight}px`;
        animate(fe, {

            y: ["-100%", 0],
        }, {
            duration: 0.5,
            delay: stagger(0.015),
        });

        return;

    }, [outer.current, first.current, second.current])

    useEffect(() => {
        if (hovering === null) return;

        const fe = scope.current.querySelectorAll("#first .char");
        const se = scope.current.querySelectorAll("#second .char");

        if (hovering) {
            animate(fe, {
                y: "-100%",
            }, {
                duration: 0.5,
                delay: stagger(0.01),
            });

            animate(se, {
                y: "-100%",
            }, {
                duration: 0.5,
                delay: stagger(0.01),
            });
        } else {
            animate(fe, {
                y: 0,
            }, {
                duration: 0.5,
                delay: stagger(0.01),
            });

            animate(se, {
                y: "0",
            }, {
                duration: 0.5,
                delay: stagger(0.01),
            });
        }


        document.addEventListener('astro:before-preparation', ev => {
            console.log('before-swap', ev);
            animate(fe, {
                y: "-100%",
            }, {
                duration: 0.5,
                delay: stagger(0.01),
            });
        });

    }, [hovering])

    return <div ref={scope} className={className ?? ""}>
        <div ref={outer} className={`overflow-clip ${link ? "cursor-pointer" : ""}`} onMouseEnter={() => {
            setHovering(true);
        }}
            onMouseLeave={() => {
                setHovering(false);
            }}
            onClick={() => {
                if (!link) return;
                //send the user to the `link`
                navigate(link);
            }}
        >
            <p ref={first} id='first' className='text-xl md:text-4xl'>
                {text}
            </p>
            <p ref={second} id='second' className='text-xl md:text-4xl'>
                {text}
            </p>
        </div>
    </div>
}