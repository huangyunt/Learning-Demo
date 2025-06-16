import { useEffect, useState, useRef } from 'react';
import type { MutableRefObject } from 'react';

type TargetRef = MutableRefObject<HTMLElement | null>;
const useInView = (
    options: IntersectionObserverInit = {
        root: null,
        rootMargin: '0px',
        threshold: 1,
    },
    triggerOnce: boolean = false,
): [TargetRef, boolean] => {
    const [inView, setInView] = useState(false);
    const targetRef: TargetRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        console.log('ttttttt:', targetRef.current?.tagName, options, triggerOnce)
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    if (triggerOnce) {
                        observer.unobserve(entry.target);
                    }
                } else {
                    setInView(false);
                }
            });
        }, options);

        if (targetRef?.current) {
            observer.observe(targetRef.current);
        }

        return () => {
            if (targetRef?.current) {
                observer.unobserve(targetRef.current);
            }
        };
    }, [options, triggerOnce]);

    return [targetRef, inView];
};

export default useInView;
