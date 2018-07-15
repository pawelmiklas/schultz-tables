document.addEventListener("DOMContentLoaded", function () {
	let btn = document.getElementById("btn");
	let main = document.querySelector(".main");
	let counter = 0;
	let counter_btn = 0;
	let counter_time_minute = 0;
	let counter_time_second = 0;
	let counter_time_ms = 0;
	let time = 0;
	let clear_time = 0;
	btn.addEventListener("click", function () {
		let size = document.getElementById("size");
		let cell_size = document.getElementById("cell-size");
		let border = document.getElementById("border");
		let size_with_value = size.options[size.selectedIndex].value;
		let cell_sice_with_value = cell_size.options[cell_size.selectedIndex].value;
		let border_with_value = border.options[border.selectedIndex].value;
		let tab_with_numbers = [];
		let counter_of_whiles = 0;
		let tab = document.getElementsByTagName("table");
		let td = document.getElementsByTagName("td");
		let tr = document.getElementsByTagName("tr");
		let p_time = document.getElementById("time");

		// Add numbers to array 
		for (let i = 1; i <= size_with_value * size_with_value; i++) {
			tab_with_numbers[i] = i;
		}
		// Sort random table
		tab_with_numbers.sort(() => Math.random() - 0.5);

		// Generate table
		function generate_table() {
			let table = document.createElement("table");
			table.setAttribute("id", "main-table");
			for (let i = 0; i < size_with_value; i++) {
				let row = document.createElement("tr");
				row.setAttribute("class", "row_list");
				for (let j = 0; j < size_with_value; j++) {
					let cell = document.createElement("td");
					cell.setAttribute("class", "cell_list");
					let number = document.createTextNode(tab_with_numbers[counter_of_whiles]);
					counter_of_whiles++;
					cell.appendChild(number);
					row.appendChild(cell);
				}
				table.appendChild(row);
			}
			main.appendChild(table);
			counter++;
		}

		// Set a value of border style
		function set_value_of_border() {
			if (border_with_value != 1) {
				for (let i = tab.length - 1; i >= 0; i--) {
					tab[i].style.border = "1px solid white";
				}
				for (let i = td.length - 1; i >= 0; i--) {
					td[i].style.border = "1px solid white";
				}
				for (let i = tr.length - 1; i >= 0; i--) {
					tr[i].style.border = "1px solid white";
				}
			}
		}

		// Set a value of cell size
		function set_value_of_cell() {
			if (cell_sice_with_value > 0) {
				for (let i = 1; i < 5; i++) {
					if (cell_sice_with_value == i * 10) {
						for (let j = tab.length - 1; j >= 0; j--) {
							tab[j].style.width = i * 120 + 300 + "px";
							tab[j].style.height = i * 120 + 300 + "px";
							tab[j].style.tableLayout = "fixed";
						}
					}
				}
			}
		}

		// Removing table every click on button
		function removing_table_every_click() {
			if (counter > 0) {
				for (let i = tab.length - 1; i >= 0; i--) {
					tab[i].remove();
				}
			}
		}

		// Timer
		function timer() {
			time = setInterval(clock_up, 10);
		}

		function clock_up() {
			if (counter_time_ms == 100) {
				counter_time_second++;
				counter_time_ms = 0;
			}
			if (counter_time_second == 60) {
				counter_time_minute++;
				counter_time_second = 0;
			}
			counter_time_ms++;
			if (counter_time_second < 10) {
				p_time.innerHTML = "0" + counter_time_minute + " : " + "0" + counter_time_second + " : " + counter_time_ms;
			} else if (counter_time_second >=10){
				p_time.innerHTML = "0" + counter_time_minute + " : " + counter_time_second + " : " + counter_time_ms;
			}


			if (counter_time_minute >= 1 && counter_time_second < 10) {
				p_time.innerHTML = "0" + counter_time_minute + " : " + "0" + counter_time_second + " : " + counter_time_ms;
			} else if (counter_time_minute >= 1 && counter_time_second >= 10) {
				p_time.innerHTML = "0" + counter_time_minute + " : " + counter_time_second + " : " + counter_time_ms;
			}


			if (counter_time_minute >= 10 && counter_time_second < 10) {
				p_time.innerHTML = counter_time_minute + " : " + "0" + counter_time_second + " : " + counter_time_ms;
			} else if (counter_time_minute >= 10 && counter_time_second >= 10){
				p_time.innerHTML = counter_time_minute + " : " + counter_time_second + " : " + counter_time_ms;
			}
		}

		//changing state of button
		if (counter_btn % 2 == 0) {
			btn.innerHTML = "STOP";
			counter_btn++;

			// call the function
			removing_table_every_click();
			generate_table();
			set_value_of_border();
			set_value_of_cell();
			timer();
		} else {
			btn.innerHTML = "START";
			counter_btn++;
			clearInterval(time);
			counter_time_minute = 0;
			counter_time_ms = 0;
			counter_time_second = 0;
		}


	})
});
