export function poissonDiskSampling(width, height, radius, retries = 30) {
    const cellSize = radius / Math.sqrt(2);
    const gridWidth = Math.ceil(width / cellSize);
    const gridHeight = Math.ceil(height / cellSize);
    const grid = new Array(gridWidth * gridHeight).fill(-1);
    const points = [];
    const processList = [];

    function distanceSquared(a, b) {
        const dx = a[0] - b[0];
        const dy = a[1] - b[1];
        return dx * dx + dy * dy;
    }

    function insert(x, y) {
        const point = [x, y];
        points.push(point);
        const index = Math.floor(y / cellSize) * gridWidth + Math.floor(x / cellSize);
        grid[index] = point;
        processList.push(point);
    }

    insert(Math.random() * width, Math.random() * height);

    while (processList.length) {
        const randomIndex = Math.floor(Math.random() * processList.length);
        const point = processList[randomIndex];
        processList.splice(randomIndex, 1);

        for (let i = 0; i < retries; i++) {
            const angle = 2 * Math.PI * Math.random();
            const distance = Math.random() * radius + radius;
            const x = point[0] + Math.cos(angle) * distance;
            const y = point[1] + Math.sin(angle) * distance;

            const gridX = Math.floor(x / cellSize);
            const gridY = Math.floor(y / cellSize);
            const gridIndex = gridY * gridWidth + gridX;

            if (
                x >= 0 && x < width &&
                y >= 0 && y < height &&
                grid[gridIndex] === -1
            ) {
                let isFarEnough = true;

                for (let dy = -2; dy <= 2; dy++) {
                    for (let dx = -2; dx <= 2; dx++) {
                        const neighborX = gridX + dx;
                        const neighborY = gridY + dy;
                        const neighborIndex = neighborY * gridWidth + neighborX;

                        const inBounds = (
                            neighborX >= 0 &&
                            neighborY >= 0 &&
                            neighborX < gridWidth &&
                            neighborY < gridHeight
                        );

                        if (inBounds && grid[neighborIndex] !== -1) {
                            const distance = distanceSquared([x, y], grid[neighborIndex]);

                            if (distance < radius * radius) {
                                isFarEnough = false;
                                break;
                            }
                        }
                    }

                    if (!isFarEnough) {
                        break;
                    }
                }

                if (isFarEnough) {
                    insert(x, y);
                }
            }
        }
    }

    return points;
}


function makeTileable(canvas) {
    const {width, height} = canvas;
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = width;
    tempCanvas.height = height;
    const tempCtx = tempCanvas.getContext('2d');

    // Draw the 4 quadrants of the original canvas onto the temp canvas in a rotated order
    const halfWidth = width / 2;
    const halfHeight = height / 2;
    tempCtx.drawImage(canvas, 0, 0, halfWidth, halfHeight, halfWidth, halfHeight, halfWidth, halfHeight);
    tempCtx.drawImage(canvas, halfWidth, 0, halfWidth, halfHeight, 0, halfHeight, halfWidth, halfHeight);
    tempCtx.drawImage(canvas, 0, halfHeight, halfWidth, halfHeight, halfWidth, 0, halfWidth, halfHeight);
    tempCtx.drawImage(canvas, halfWidth, halfHeight, halfWidth, halfHeight, 0, 0, halfWidth, halfHeight);

    return tempCanvas;
}

export function makeBlueNoiseImage(width, height, radius) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    const points = poissonDiskSampling(width, height, radius);

    // Fill the canvas with white
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, width, height);

    // Draw the points
    ctx.fillStyle = '#000';
    points.forEach(point => {
        ctx.fillRect(point[0], point[1], 1, 1);
    });

    return makeTileable(canvas);
}