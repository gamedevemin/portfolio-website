import { useEffect, useRef, useState } from 'react';

export function CyberPong() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [paddleY, setPaddleY] = useState(150);
  const [ballX, setBallX] = useState(400);
  const [ballY, setBallY] = useState(200);
  const [ballSpeedX, setBallSpeedX] = useState(-5);
  const [ballSpeedY, setBallSpeedY] = useState(3);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const paddleWidth = 10;
    const paddleHeight = 100;
    const ballSize = 10;

    const draw = () => {
      // Clear canvas
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw paddle
      ctx.fillStyle = '#0ff';
      ctx.shadowColor = '#0ff';
      ctx.shadowBlur = 10;
      ctx.fillRect(50, paddleY, paddleWidth, paddleHeight);

      // Draw ball
      if (gameStarted) {
        ctx.beginPath();
        ctx.fillStyle = '#f0f';
        ctx.shadowColor = '#f0f';
        ctx.arc(ballX, ballY, ballSize, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw score
      ctx.fillStyle = '#fff';
      ctx.font = '24px "Press Start 2P", system-ui';
      ctx.fillText(`Score: ${score}`, 20, 30);
    };

    const update = () => {
      if (!gameStarted) return;

      setBallX(x => x + ballSpeedX);
      setBallY(y => y + ballSpeedY);

      // Ball collision with top and bottom
      if (ballY <= 0 || ballY >= canvas.height) {
        setBallSpeedY(speed => -speed);
      }

      // Ball collision with paddle
      if (
        ballX <= 60 &&
        ballX >= 40 &&
        ballY >= paddleY &&
        ballY <= paddleY + paddleHeight
      ) {
        setBallSpeedX(speed => -speed);
        setScore(s => s + 1);
      }

      // Ball out of bounds
      if (ballX <= 0) {
        setGameStarted(false);
        setBallX(400);
        setBallY(200);
        setBallSpeedX(-5);
        setBallSpeedY(3);
        setScore(0);
      }

      // Ball hits right wall
      if (ballX >= canvas.width) {
        setBallSpeedX(speed => -speed);
      }
    };

    const gameLoop = () => {
      update();
      draw();
      requestAnimationFrame(gameLoop);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && !gameStarted) {
        setGameStarted(true);
      }
      if (e.code === 'ArrowUp') {
        setPaddleY(y => Math.max(0, y - 20));
      }
      if (e.code === 'ArrowDown') {
        setPaddleY(y => Math.min(canvas.height - paddleHeight, y + 20));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    gameLoop();

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [gameStarted, ballSpeedX, ballSpeedY, paddleY, ballX, ballY, score]);

  return (
    <div className="flex flex-col items-center gap-4">
      <canvas
        ref={canvasRef}
        width={800}
        height={400}
        className="border border-gray-700 rounded-lg"
      />
      {!gameStarted && (
        <div className="text-center">
          <p className="text-lg mb-2">Press SPACE to start</p>
          <p className="text-sm text-gray-500">
            Use ↑↓ arrow keys to move the paddle
          </p>
        </div>
      )}
    </div>
  );
} 