// Variables to track the sketch, timer, and score
let quick_draw_data_set = ["circle", "square", "triangle"]; // Add your sketch options here
let sketch = "";
let drawn_sketch = "";
let timer_counter = 0;
let timer_check = "";
let answer_holder = "";
let score = 0;

// Update Canvas Function
function updateCanvas() {
    const canvas = document.getElementById("myCanvas");
    const context = canvas.getContext("2d");

    // Clear and set background
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Generate new random sketch
    let random_number = Math.floor(Math.random() * quick_draw_data_set.length);
    sketch = quick_draw_data_set[random_number];
    console.log("Sketch to draw:", sketch);

    // Update HTML to show the sketch to draw
    document.getElementById("sketch_name").innerText = `Sketch: ${sketch}`;
}

// Setup Function (for initializing the canvas)
function setup() {
    let canvas = document.createElement("canvas");
    canvas.id = "myCanvas";
    canvas.width = 280;
    canvas.height = 280;
    document.body.appendChild(canvas);

    updateCanvas();
}

// Draw Function
function draw() {
    check_sketch();
    if (drawn_sketch === sketch) {
        answer_holder = "set";
        score++;
        document.getElementById("score").innerText = `Score: ${score}`;
    }
}

// Check Sketch Function
function check_sketch() {
    timer_counter++;
    document.getElementById("timer").innerText = `Timer: ${timer_counter}`;
    console.log("Timer count:", timer_counter);

    if (timer_counter > 400) {
        timer_counter = 0;
        timer_check = "completed";
    }

    if (timer_check === "completed" || answer_holder === "set") {
        timer_check = "";
        answer_holder = "";
        updateCanvas();
    }
}

// Event listeners and startup
window.onload = setup;
setInterval(draw, 100);  // Adjust interval as needed
let canvas, ctx;
let drawing = false;

// Set up the canvas and context
function setup() {
    canvas = document.createElement("canvas");
    canvas.id = "myCanvas";
    canvas.width = 280;
    canvas.height = 280;
    document.body.appendChild(canvas);
    
    ctx = canvas.getContext("2d");
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add event listeners for drawing
    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mouseleave", stopDrawing);

    updateCanvas();
}

// Start drawing when the mouse is pressed down
function startDrawing(e) {
    drawing = true;
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
}

// Draw on the canvas as the mouse moves
function draw(e) {
    if (!drawing) return;
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.stroke();
}

// Stop drawing when the mouse is released
function stopDrawing() {
    drawing = false;
    ctx.closePath();
}
