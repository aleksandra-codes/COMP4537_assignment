window.onload=()=>{
	const admin_link = document.getElementById("admin_btn")
	admin_link.href = "./admin/admin.html"

	const student_link = document.getElementById("student_btn")
	student_link.href = "./student/student.html"

	const student_link = document.getElementById("leaderboard_btn")
	student_link.href = "./leaderboard/leaderboard.html"
  };

// function fetchDatabase() {
// 	console.log('function');
// 	const xhttp = new XMLHttpRequest();
// 	xhttp.open('GET', 'https://www.aleksandrasorokina.com/COMP4537');

// 	xhttp.onreadystatechange = function() {
// 		if (this.readyState == 4 && this.status == 200) { 
// 		    JSON.parse(this.responseText, (key, value)=>{
// 		        const item = document.createElement("div");
// 		        item.innerHTML = value
// 		        document.getElementById('results').appendChild(item);
// 		        console.log('value ' + value);
// 		    })
// 		}
// 	};
// 	xhttp.send();
// }

