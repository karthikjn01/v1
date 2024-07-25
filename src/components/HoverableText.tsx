import React, { useEffect, useRef, useState } from 'react';
import SplitType from 'split-type';
// import { animate, stagger } from 'motion';
import { stagger, useAnimate } from 'framer-motion';


export default function HoverableText({
    text,
    link,
    className
}: {
    text: string,
    link: string,
    className?: string,
}) {
    const outer = useRef<HTMLDivElement>(null);
    const first = useRef<HTMLDivElement>(null);
    const second = useRef<HTMLDivElement>(null);

    const [scope, animate] = useAnimate();

    const [hovering, setHovering] = useState<boolean | null>(null);

    console.log({ o: outer.current, f: first.current, s: second.current })

    useEffect(() => {
        console.log({ o: outer.current, f: first.current, s: second.current })
        if (!outer.current || !first.current || !second.current) return;

        new SplitType(scope.current.querySelector("#second")).chars;
        new SplitType(scope.current.querySelector("#first")).chars;
        const fe = scope.current.querySelectorAll("#first .char");


        console.log({ hovering })

        outer.current.style.height = `${first.current.clientHeight}px`;
        animate(fe, {

            y: ["-100%", 0],
            opacity: [0, 1],
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

    }, [hovering])

    return <div ref={scope} className={className ?? ""}>
        <div ref={outer} className='overflow-clip' onMouseEnter={() => {
            setHovering(true);
        }}
            onMouseLeave={() => {
                setHovering(false);
            }}
            onClick={() => {
                //send the user to the `link`
                window.open(link);
            }}
        >
            <div ref={first} id='first'>
                {text}
            </div>
            <div ref={second} id='second'>
                {text}
            </div>
        </div>
    </div>
}