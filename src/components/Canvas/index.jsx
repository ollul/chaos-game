import React, { useEffect, useRef, useImperativeHandle } from "react"
import { Chaos } from "./chaos";



export const Canvas = React.forwardRef((_, ref) => {
    const canvasRef = useRef(null);
    const chaos = useRef();
    
    useEffect(() => {
        if(canvasRef.current) {
            chaos.current = new Chaos(canvasRef.current);            
        }
    }, [])

    useImperativeHandle(
        ref,
        () => {
            return {
                canvas: canvasRef.current,
                start(oprion) {
                    chaos.current?.start(oprion);
                },
                setInitialPoints(...args) {
                    chaos.current?.setInitialPoints(...args);
                },
                pause() {
                    chaos.current?.pause();
                },
                reset() {
                    chaos.current?.reset();
                },
                drawPoint(...args) {
                    chaos.current?.drawPoint(...args)
                }
            };
        },
        []
    );


    return (<canvas style={{background: "#353470"}} ref={canvasRef}></canvas>)
});