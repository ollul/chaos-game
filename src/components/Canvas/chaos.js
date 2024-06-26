

export class Chaos {
    get width() {
        const sideWidth = parseInt(getComputedStyle(document.body).getPropertyValue('--sider-width')) || 0;
        return window.innerWidth - sideWidth;
    }

    get height() {
        return window.innerHeight;
    }

    stretchCanvas() {
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    }

    //функция генерирует градиент и задает цвета начальным точкам по градиенту
    mapColorsToPoints(points) {
        const gradients = [
            [[255, 0, 0], [255, 255, 0]],
            [[255, 255, 0], [0, 255, 0]],
            [[0, 255, 0], [0, 255, 255]],
            [[0, 255, 255], [0, 0, 255]],
            // [[0, 0, 255], [255, 0, 255]],
            // [[255, 0, 255], [255, 0, 0]],
        ]

        const toHex = (d, s, c) => `0${Math.round((d * c + s)).toString(16)}`.slice(-2);
        let gradient = new Set();

        gradients.forEach(([[rs, gs, bs], [re, ge, be]]) => {
            const c = 0.0001
            const dr = re - rs;
            const dg = ge - gs;
            const db = be - bs;
      
            for(let i = 0; i <=  Math.floor(1 / c); i++) gradient.add('#' + toHex(dr, rs, c * i) + toHex(dg, gs, c * i) + toHex(db, bs, c * i));            
        });
        
        const div = Math.round(gradient.size / points.length);
        return Array.from(gradient.values()).filter((_, i) => !(i % div)).map((color, idx) => ({...points[idx], color}));
    }
    
    drawPoints(points, size) {
        points.forEach((point) => this.drawPoint(point, size))
    }

    // инициализация начальных точек
    setInitialPoints(initialPoints) {
        this.clear();
        this.initialPoints = this.mapColorsToPoints(initialPoints);
        this.lastPoint = {x: Math.floor(Math.random() * this.width), y: Math.floor(Math.random() * this.height), color: '#000'};
        this.drawPoints(this.initialPoints, 5);  
        this.sw = this.width;
        this.sh = this.height;
        this.kx = 1;
        this.ky = 1;
        this.workedPoints = this.initialPoints.map(p => ({...p}));
        this.points = [];
    }

    randomPoint() {
        return this.initialPoints[Math.floor(Math.random() * this.initialPoints.length)]; 
    }

    makeNextPoint(point) {
        return {
            x: this.lastPoint.x + (point.x - this.lastPoint.x) * this.r,
            y: this.lastPoint.y + (point.y - this.lastPoint.y) * this.r,
            color: point.color
        }
    }

    drawPoint({x, y, color}, size = 1) {
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        this.ctx.arc(x, y, size, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.closePath();
    }

    render() {
        const points = Array.from({length: this.drawPointsForStep}).map(() => {
            this.lastPoint = this.makeNextPoint(this.randomPoint());
            this.points.push(this.lastPoint);
            return {
                color: this.lastPoint.color,
                x: this.lastPoint.x * this.kx,
                y: this.lastPoint.y * this.ky
            }
        });
        console.log(this.points.length);
        this.drawPoints(points);
    }

    start({ r } = { r: this.r}) {
        this.r = r;
        clearInterval(this.renderIntervalId);
        this.drawPoint(this.lastPoint);
        this.renderIntervalId = setInterval(this.render.bind(this), this.renderIntervalMs); 
    }

    pause() {
        clearInterval(this.renderIntervalId);
    }

    clear() {
        this.ctx.clearRect(0, 0, this.width, this.height)
    }

    reset() {
        window.clearTimeout(this.debounceId);
        clearInterval(this.renderIntervalId);
        this.initialPoints = [];
        this.clear();
    }
    
    resize() {
       window.clearTimeout(this.debounceId);
       this.debounceId = setTimeout(() => {
        this.rs = true;
        this.kx = this.width / this.sw;
        this.ky = this.height / this.sh;

        this.stretchCanvas();
        this.clear();
        this.drawPoints(this.initialPoints.map(p => ({
            ...p,
            x: p.x * this.kx,
            y: p.y * this.ky
        })), 5);
        const np = this.points.map(p => ({
            ...p,
            x: p.x * this.kx,
            y: p.y * this.ky
        }));

        this.drawPoints(np);
       }, 100);
    }
    
    constructor(canvas) {
        this.debounceId = null;
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.stretchCanvas();
        this.initialPoints = [];
        this.workedInitialPoints = [];
        this.r = .5;
        this.drawPointsForStep = 1000;
        this.renderIntervalMs = 1000;
        this.lastPoint = {x: 0, y: 0};
        this.renderIntervalId = null;    
        this.points = []; 
        this.kx = 1;
        this.ky = 1;   
        this.ws = 0;
        this.hs = 0;
    }
}
