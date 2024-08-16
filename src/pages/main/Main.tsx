import { useEffect, useRef } from 'react';
import * as S from "./Styles/Main.style";

function Main () {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);


    // 가로스크롤 이동
    useEffect(() => {
        const container = containerRef.current;
        if(!container) return;

        const handleWheel = (event: WheelEvent) => {
            if (event.deltaY !== 0){
                container.scrollLeft += event.deltaY;
                event.preventDefault();
            }
        };

        container.addEventListener('wheel', handleWheel);

        return () => {
            container.removeEventListener('wheel', handleWheel);
        };
    }, []);


    // Firework
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');

        if (!canvas || !ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        class Firework {
            x: number;
            y: number;
            colors: string[];
            explosionParticles: Particle[];

            constructor(x: number, y: number) {
                this.x = x;
                this.y = y;
                this.colors = ['#FF1461', '#18FF92', '#5A87FF', '#FBF38C'];
                this.explosionParticles = [];
                this.createParticles();
            }

            createParticles() {
                const particleCount = 100;
                for (let i = 0; i < particleCount; i++) {
                    this.explosionParticles.push(new Particle(this.x, this.y, this.colors[Math.floor(Math.random() * this.colors.length)]));
                }
            }

            draw() {
                this.explosionParticles.forEach(particle => particle.draw());
            }

            update() {
                this.explosionParticles.forEach((particle, index) => {
                    particle.update();
                    if (particle.alpha <= 0) {
                        this.explosionParticles.splice(index, 1);
                    }
                });
            }
        }

        class Particle {
            x: number;
            y: number;
            color: string;
            radius: number;
            alpha: number;
            velocity: { x: number; y: number; };

            constructor(x: number, y: number, color: string) {
                this.x = x;
                this.y = y;
                this.color = color;
                this.radius = Math.random() * 2 + 1;
                this.alpha = 1;
                this.velocity = {
                    x: (Math.random() - 0.5) * 3,
                    y: (Math.random() - 0.5) * 3
                };
            }

            draw() {
                if(!ctx) return;
                ctx.save();
                ctx.globalAlpha = this.alpha;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
                ctx.fillStyle = this.color;
                ctx.fill();
                ctx.restore();
            }

            update() {
                this.x += this.velocity.x;
                this.y += this.velocity.y;
                this.alpha -= 0.005;
            }
        }

        let fireworks: Firework[] = [];

        function animate() {
            requestAnimationFrame(animate);
            if(!ctx || !canvas) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            if (Math.random() < 0.003) {
                fireworks.push(new Firework(Math.random() * canvas.width, Math.random() * canvas.height));
            }

            fireworks.forEach((firework, index) => {
                firework.update();
                firework.draw();
                if (firework.explosionParticles.length === 0) {
                    fireworks.splice(index, 1);
                }
            });
        }

        animate();
    }, []);


    return (
        <S.Main>
            <S.Canvas ref={canvasRef} />
            {/* 통합 검색 */}
            <S.SearchForm>
                <S.SearchInput placeholder="Search for songs, users, blog"/>
            </S.SearchForm>
            <S.BlogForm ref={containerRef}>
                <S.BlogContent>1</S.BlogContent>
                <S.BlogContent>2</S.BlogContent>
                <S.BlogContent>3</S.BlogContent>
                <S.BlogContent>4</S.BlogContent>
                <S.BlogContent>5</S.BlogContent>
                <S.BlogContent>6</S.BlogContent>
            </S.BlogForm>
            <S.container>
            </S.container>
        </S.Main>
    )
}

export default Main;