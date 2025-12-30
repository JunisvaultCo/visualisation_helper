/* TODO:
1. modify
- divide/multiply an entire row/column
- rotate row/col
- switch two
2. say something about it:
- the sum of all elements / on a row / column
*/


let size_x;
let size_y;
let matrix;
let showTime = 3000;
let q;
let qc = 0;

function loaded() {
	document.getElementById("answer").addEventListener("keypress", function(event) {
	// If the user presses the "Enter" key on the keyboard
	if (event.key === "Enter") {
		answer_question();
	}
	});
}

function rand(maxx) {
	return Math.floor(Math.random() * maxx);
}

class Question {
	constructor() {
		this.typeMod = rand(1);
		let position_x = rand(size_x);
		let position_y = rand(size_y);
		this.question = "Element at x=" + position_x + " y=" + position_y;
		if (this.typeMod == 0) {
			let x = rand(size_x);
			let y = rand(size_y);
			matrix[y][x] = rand(10);
			this.question = "(" + x + ", " + y + ") = " + matrix[y][x] + ".<br/>" + this.question;
			this.answer = matrix[position_y][position_x];
		}
	}
}

function preset_size(sx, sy) {
	size_x = sx;
	size_y = sy;
	initialise_game();
}

function enter_size() {
	size_x = parseInt(custom_x.value);
	size_y = parseInt(custom_y.value);
	if (isNaN(size_x) || isNaN(size_y))
		return;
	if (size_x > 10 || size_y > 10) {
		console.log("too big (10 is max)");
		return;
	}
	initialise_game();
}

function initialise_game() {
	console.log(size_x, size_y);
	show.style.visibility = "visible";
	choose.style.visibility = "hidden";
	matrix = []
	for (let i = 0; i < size_y; i++) {
		let last = [];
		for (let j = 0; j < size_x; j++)
			last.push(Math.floor(Math.random() * 10));
		matrix.push(last);
	}
	draw_show();
}

function draw_show() {
	show.style.visibility = "visible";
	ctx = canvas.getContext("2d");
	ctx.fillStyle = "white"
	ctx.fillRect(0, 0, 1000, 1000);
	ctx.fillStyle = "black"
	let textSize = 50;
	ctx.font = textSize + "px serif";

	let initX = textSize;
	let initY = textSize;
	
	for (let i = 0; i < size_y; i++) {
		for (let j = 0; j < size_x; j++) {
			ctx.fillText(matrix[i][j], initX + j * textSize, initY + i * textSize);
		}
	}
	
	setTimeout(hide_show, showTime);
}

function hide_show() {
	show.style.visibility = "hidden";
	question.style.visibility = "visible";
	generate_question();
}

function generate_question() {
	qc += 1;
	answer.value = ""
	q = new Question();
	questionField.innerHTML = qc + ".<br/>" + q.question;
}

function answer_question() {
	let num = parseInt(answer.value);
	if (num == q.answer) {
		generate_question();
	} else {
		choose.style.visibility = "visible";
		question.style.visibility = "hidden";
	}

}
