import gsap, { mapRange } from "gsap";
import { use, useContext, useEffect, useRef } from "react";
import { isMobileContext } from "../../contexts/isMobileContext";

const ArrowsAnimation = ({
    children,
}) => {
    const { isMobile } = useContext(isMobileContext);
    const arr = useRef(null);
    let tl = useRef();

    const arrows = () => {
        tl.current = gsap.timeline({ paused: true }),
            tl.current.to(arr.current, 0.5, { x: '80%', autoAlpha: 0, ease: 'power3.in' }, 0)
                .set(arr.current, { x: '-80%' },)
                .to(arr.current, 0.7, { x: '0%', autoAlpha: 1, ease: 'power3.out' })

        arr.current.addEventListener("mouseenter", function () {
            if (!tl.current.isActive()) {
                tl.current.restart();
            }
        });
    }

    useEffect(() => {
        {
            !isMobile &&
                arrows();
        }
    }, []);

    return (
        <div
            ref={arr}
            className={`_pointer switch f a-c j-c _y`}
        >
            {children}
        </div>
    );
};

export default ArrowsAnimation;
