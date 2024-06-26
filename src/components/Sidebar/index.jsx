import { useCallback, useEffect, useState } from "react";
import classNames from "classnames";
import "./style.css";


// функция создает окружность с радиусом dist и делить ее на части (PI / PointsCount)
const makePolygon = (points) => {
    const width = window.innerWidth - 300;
    const height = window.innerHeight;
    let initialPoints = [];
    const dist = Math.min(height, width) / 2 * .7;
    for (let i = 0; i < points; i++) {
        const startAngle = points % 2 ? -Math.PI / 2 : -Math.PI / 4;
        const angle = startAngle + ((2 * Math.PI * i) / points);
        const x = +(width / 2 + Math.cos(angle) * dist).toFixed(2);
        const y = +(height / 2 + Math.sin(angle) * dist).toFixed(2);
        initialPoints.push({x, y});
    };
    
    return initialPoints;
}

const figures = [
    { 
        r: 0.5, 
        title: 'Треугольник',
        makePoints: () => makePolygon(3), 
        icon: <svg viewBox="0 0 24 24" fill="none"><g strokeWidth="0"></g><g  strokeLinecap="round" strokeLinejoin="round"></g><g > <path d="M2.39019 18.0983L10.6151 3.89171C11.0696 3.10655 11.2969 2.71396 11.5935 2.58211C11.8521 2.4671 12.1474 2.4671 12.4061 2.58211C12.7026 2.71396 12.9299 3.10654 13.3844 3.89171L21.6093 18.0983C22.0655 18.8863 22.2936 19.2803 22.2599 19.6037C22.2305 19.8857 22.0827 20.142 21.8534 20.3088C21.5904 20.5 21.1352 20.5 20.2246 20.5H3.77487C2.86435 20.5 2.40908 20.5 2.14613 20.3088C1.91677 20.142 1.769 19.8857 1.73959 19.6037C1.70588 19.2803 1.93398 18.8863 2.39019 18.0983Z" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
    },
    { 
        r: 0.57, 
        title: 'Квадрат',
        makePoints: () => makePolygon(4), 
        icon: <svg viewBox="0 0 24 24" fill="none"><g strokeWidth="0"></g><g strokeLinecap="round" strokeLinejoin="round"></g><g > <rect x="4" y="4" width="16" height="16" rx="2" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></rect> </g></svg>
    },
    { 
        r: 0.618, 
        title: 'Пентагон',
        makePoints: () => makePolygon(5), 
        icon: <svg viewBox="0 0 24 24" fill="none" stroke="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10.1192 4.09438C10.7952 3.60324 11.1332 3.35767 11.5027 3.26278C11.829 3.17901 12.1712 3.17901 12.4975 3.26278C12.867 3.35767 13.205 3.60324 13.881 4.09438L19.6298 8.27108C20.3058 8.76222 20.6437 9.0078 20.8482 9.32992C21.0287 9.61436 21.1344 9.93978 21.1556 10.276C21.1795 10.6568 21.0504 11.0541 20.7922 11.8488L18.5964 18.6068C18.3382 19.4015 18.2091 19.7989 17.9659 20.0928C17.7512 20.3524 17.4743 20.5535 17.1611 20.6775C16.8064 20.818 16.3886 20.818 15.553 20.818H8.44718C7.6116 20.818 7.19381 20.818 6.83908 20.6775C6.52586 20.5535 6.24904 20.3524 6.0343 20.0928C5.79111 19.7989 5.66201 19.4015 5.4038 18.6068L3.20798 11.8488C2.94977 11.0541 2.82066 10.6568 2.84462 10.276C2.86577 9.93978 2.97151 9.61436 3.15202 9.32992C3.35645 9.0078 3.69445 8.76222 4.37045 8.27108L10.1192 4.09438Z" stroke="#ffffff" strokeWidth="2" strokeLinejoin="round"></path> </g></svg>,
    },
    { 
        r: 0.667, 
        title: 'Гексагон',
        makePoints: () => makePolygon(6), 
        icon: <svg viewBox="0 0 24 24" fill="none"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M2.46148 12.8001C2.29321 12.5087 2.20908 12.3629 2.17615 12.208C2.14701 12.0709 2.14701 11.9293 2.17615 11.7922C2.20908 11.6373 2.29321 11.4915 2.46148 11.2001L6.53772 4.13984C6.70598 3.8484 6.79011 3.70268 6.90782 3.5967C7.01196 3.50293 7.13465 3.43209 7.26793 3.38879C7.41856 3.33984 7.58683 3.33984 7.92336 3.33984H16.0758C16.4124 3.33984 16.5806 3.33984 16.7313 3.38879C16.8645 3.43209 16.9872 3.50293 17.0914 3.5967C17.2091 3.70268 17.2932 3.8484 17.4615 4.13984L21.5377 11.2001C21.706 11.4915 21.7901 11.6373 21.823 11.7922C21.8522 11.9293 21.8522 12.0709 21.823 12.208C21.7901 12.3629 21.706 12.5087 21.5377 12.8001L17.4615 19.8604C17.2932 20.1518 17.2091 20.2975 17.0914 20.4035C16.9872 20.4973 16.8645 20.5681 16.7313 20.6114C16.5806 20.6604 16.4124 20.6604 16.0758 20.6604H7.92336C7.58683 20.6604 7.41856 20.6604 7.26793 20.6114C7.13465 20.5681 7.01196 20.4973 6.90782 20.4035C6.79011 20.2975 6.70598 20.1518 6.53772 19.8604L2.46148 12.8001Z" stroke="#fff" strokeWidth="2" strokeLinejoin="round"></path> </g></svg>,
    },
    { 
        r: 0.692, 
        title: 'Гептагон',
        makePoints: () => makePolygon(7), 
        icon: <svg viewBox="0 0 24 24" fill="none"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M11.1142 2.43753C11.6725 2.16175 12.3274 2.16175 12.8858 2.43752L19.1609 5.53717C19.7037 5.80531 20.0959 6.30493 20.2274 6.89592L21.7955 13.9432C21.925 14.5252 21.7882 15.1346 21.4222 15.6052L17.051 21.2276C16.6721 21.7149 16.0893 22 15.472 22H8.52798C7.91067 22 7.32795 21.7149 6.94905 21.2276L2.57778 15.6052C2.21185 15.1346 2.07497 14.5252 2.20446 13.9432L3.77264 6.89592C3.90415 6.30493 4.2963 5.80531 4.83914 5.53717L11.1142 2.43753Z" stroke="#fff" strokeWidth="2"></path> </g></svg>,
    },
    { 
        r: 0.707, 
        title: 'Октагон',
        makePoints: () => makePolygon(8), 
        icon: <svg viewBox="0 0 24 24" fill="none"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Shape / Octagon"> <path id="Vector" d="M14.4053 21H9.59375C9.10457 21 8.86006 20.9996 8.62988 20.9443C8.42581 20.8953 8.23099 20.815 8.05204 20.7053C7.85021 20.5817 7.67763 20.4091 7.33173 20.0632L3.9375 16.6689C3.59182 16.3233 3.41857 16.15 3.29492 15.9482C3.18526 15.7693 3.10425 15.5743 3.05526 15.3702C3 15.14 3 14.8945 3 14.4053V9.59375C3 9.10457 3 8.86006 3.05526 8.62988C3.10425 8.42581 3.18526 8.23098 3.29492 8.05204C3.41748 7.85205 3.58846 7.68107 3.92809 7.34144L3.9375 7.33173L7.33173 3.9375L7.3414 3.92813C7.68106 3.58847 7.85204 3.41748 8.05204 3.29492C8.23099 3.18526 8.42581 3.10425 8.62988 3.05526C8.86006 3 9.10457 3 9.59375 3H14.4053C14.8945 3 15.14 3 15.3702 3.05526C15.5743 3.10425 15.7693 3.18526 15.9482 3.29492C16.15 3.41857 16.3233 3.59181 16.6689 3.9375L20.0632 7.33173C20.409 7.67759 20.5817 7.85022 20.7053 8.05205C20.815 8.23099 20.8953 8.42581 20.9443 8.62988C20.9996 8.86006 21 9.10457 21 9.59375V14.4053M20.9996 14.4062C20.9996 14.8954 20.9996 15.14 20.9443 15.3702C20.8953 15.5743 20.815 15.7693 20.7053 15.9482C20.5817 16.1501 20.4091 16.323 20.0632 16.6689L16.6689 20.0632C16.323 20.4091 16.1501 20.5817 15.9482 20.7053C15.7693 20.815 15.5743 20.8953 15.3702 20.9443C15.14 20.9996 14.8954 20.9996 14.4062 20.9996" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g> </g></svg>,
    },
    { 
        r: 0.742, 
        title: 'Нонагон',
        makePoints: () => makePolygon(9), 
        icon: <svg viewBox="0 0 20 20" version="1.1" fill="#000000"><g strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="layer1"> <path stroke="#fff" d="M 10 1.9355469 L 4.6757812 3.8730469 L 1.84375 8.7792969 L 2.828125 14.359375 L 7.1679688 18 L 12.832031 18 L 17.171875 14.359375 L 18.15625 8.7792969 L 15.324219 3.8730469 L 10 1.9355469 z M 10 3 L 14.638672 4.6875 L 17.107422 8.9648438 L 16.25 13.826172 L 12.46875 17 L 7.53125 17 L 3.75 13.826172 L 2.8925781 8.9648438 L 5.3613281 4.6875 L 10 3 z " ></path> </g> </g></svg>, 
    },
    { 
        r: 0.764, 
        title: 'Декагон',
        makePoints: () => makePolygon(10), 
        icon: <svg viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="layer1"> <path d="M 7.4042969 2 L 3.2050781 5.0625 L 1.5996094 10 L 3.2050781 14.9375 L 7.4042969 18 L 12.595703 18 L 16.794922 14.9375 L 18.400391 10 L 16.794922 5.0625 L 12.595703 2 L 7.4042969 2 z M 7.7304688 3 L 12.269531 3 L 15.945312 5.6796875 L 17.347656 10 L 15.945312 14.320312 L 12.269531 17 L 7.7304688 17 L 4.0546875 14.320312 L 2.6523438 10 L 4.0546875 5.6796875 L 7.7304688 3 z" fill="#fff" stroke="#fff"></path> </g> </g></svg>,
    },
];


export const Sidebar = ({ setPoints, setR, status, onStart, onPause, onReset, canvasRef, r }) => {
    const [mod, setMod] = useState("fix");
    const [localR, setLocalR] = useState(0.5);
    const [vertexCount, setVertexCount] = useState(2);

    const handleCanvasClick = useCallback((e) => {
        const point = {x: e.offsetX, y: e.offsetY};
        canvasRef.current.drawPoint(point, 5);
        setPoints(points => [...points, point])
    }, [])

    useEffect(() => {
        if(mod === 'arbitrary' && status === 'pending') {
            canvasRef.current.canvas.addEventListener('click', handleCanvasClick);    
            return () => canvasRef.current.canvas.removeEventListener('click', handleCanvasClick);        
        }
    }, [mod, status])
    
    const handleBlur = () => {
        let int = parseFloat(localR) || 0;    
        setLocalR(int);
        setR(int);
    }


    const handleChangeVertex = (e) => {
        const vertex = parseInt(e.target.value);
        setVertexCount(vertex);
        setPoints(makePolygon(vertex));
    }

    return (<div className="sidebar">
        <p className="sidebar__heading">Настройки</p>
        <div className="sidebar__tabs">
            <p className={classNames("sidebar__tabs-item", {"sidebar__tabs-item_active": mod === "fix"})}  onClick={() => setMod("fix")}>Фиксированные</p>
            <p className={classNames("sidebar__tabs-item", {"sidebar__tabs-item_active": mod === "arbitrary"})} onClick={() => setMod("arbitrary")}>Произвольные</p>
        </div> 
        {
            mod === "fix" && (
                <>
                <div className="sidebar__figures">
                    {
                        figures.map(({makePoints, icon, r, title}, idx) => (<div 
                            className="sidebar__figure"
                            key={idx}
                            title={title}
                            onClick={() => {
                               if(status === 'pending') {
                                const points = makePoints();
                                setPoints(points)
                                setLocalR(r)
                                setVertexCount(points.length)
                                setR(r)
                               }
                            }}
                        >
                            { icon }
                        </div>))
                    }
                </div>
                <div className="sidebar__custom">
                    <div className="sidebar__custom-vertex">
                        <label htmlFor="vertex">Количество вершин: {vertexCount}</label>
                        <input type="range" value={vertexCount} onChange={handleChangeVertex} id="vertex" step={1} min={2} max={70}/>
                    </div>
                    <div className="sidebar__input-wrapper"><label htmlFor="r">R:</label> <input disabled={status !== 'pending'} onBlur={handleBlur} value={localR} onChange={e => setLocalR(e.target.value)} id="r" type="text" /></div>
                </div>
                </>
            )
        }
        {
            mod === "arbitrary" && (
                <div className="sidebar__tabs-block">
                    <p className="sidebar__note">Поставьте произвольные точки на холсте</p>
                    <div className="sidebar__input-wrapper"><label htmlFor="r">R:</label> <input disabled={status !== 'pending'} onBlur={handleBlur} value={localR} onChange={e => setLocalR(e.target.value)} id="r" type="text" /></div>
                </div>
            )
        }
      
        {
            status === 'pending' && <div onClick={onStart} className="sidebar__start-btn">НАЧАТЬ</div>
        }

        {
            (status === 'started' || status === 'pause') && (<div className="sidebar__started-controls">
                {
                    status === 'pause' ? 
                    <div onClick={onStart}>
                        <svg viewBox="0 0 24 24" fill="none"><g strokeWidth="0"></g><g strokeLinecap="round" strokeLinejoin="round"></g><g> <path d="M16.6582 9.28638C18.098 10.1862 18.8178 10.6361 19.0647 11.2122C19.2803 11.7152 19.2803 12.2847 19.0647 12.7878C18.8178 13.3638 18.098 13.8137 16.6582 14.7136L9.896 18.94C8.29805 19.9387 7.49907 20.4381 6.83973 20.385C6.26501 20.3388 5.73818 20.0469 5.3944 19.584C5 19.053 5 18.1108 5 16.2264V7.77357C5 5.88919 5 4.94701 5.3944 4.41598C5.73818 3.9531 6.26501 3.66111 6.83973 3.6149C7.49907 3.5619 8.29805 4.06126 9.896 5.05998L16.6582 9.28638Z" stroke="#fff" strokeWidth="2" strokeLinejoin="round"></path> </g></svg>
                    </div> :
                    <div onClick={onPause}>
                        <svg viewBox="0 0 24 24" fill="none"><g strokeWidth="0"></g><g strokeLinecap="round" strokeLinejoin="round"></g><g> <path d="M8 5V19M16 5V19" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                    </div>  
                }        
                <div onClick={onReset}>
                    <svg fill="#fff" viewBox="0 0 512 512"><g strokeWidth="0"></g><g strokeLinecap="round" strokeLinejoin="round"></g><g><path d="M64,256H34A222,222,0,0,1,430,118.15V85h30V190H355V160h67.27A192.21,192.21,0,0,0,256,64C150.13,64,64,150.13,64,256Zm384,0c0,105.87-86.13,192-192,192A192.21,192.21,0,0,1,89.73,352H157V322H52V427H82V393.85A222,222,0,0,0,478,256Z"></path></g></svg>
                </div>
            </div>)
        }
        
        
    </div>)
}
