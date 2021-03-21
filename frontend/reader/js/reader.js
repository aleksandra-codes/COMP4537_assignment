function fetchDatabase() {
	const xhttp = new XMLHttpRequest();
	xhttp.open('GET', 'https://www.aleksandrasorokina.com/quotes_app');

	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) { 
			const res_arr = JSON.parse(this.responseText)

			for(let value of res_arr){
				const single_quote = document.createElement("div");
				single_quote.classList.add('single_quote')
				const quote_text = document.createElement("div");
				quote_text.classList.add('quote_text')
				const quote_author = document.createElement("div");
				quote_author.classList.add('quote_author')
				quote_text.innerHTML = value['quote']
				quote_author.innerHTML = value['author']
				single_quote.append(quote_text)
				single_quote.append(quote_author)
		        document.getElementById('quote_list').appendChild(single_quote);
			}
		}
	};
	xhttp.send();
}