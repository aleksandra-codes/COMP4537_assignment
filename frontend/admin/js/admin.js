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
                const quote_btns = document.createElement("div")
                quote_btns.classList.add('quote_btns')
                const update_btn = document.createElement("button")

                update_btn.classList.add('btn_quote')
                update_btn.classList.add('btn')
                update_btn.classList.add('btn1')
                update_btn.classList.add('update_quote_btn')
                update_btn.innerHTML = 'Update'
                const delete_btn = document.createElement("button")
                delete_btn.classList.add('btn_quote')
                delete_btn.classList.add('btn')
                delete_btn.classList.add('btn1')
                delete_btn.classList.add('delete_quote_btn')
                delete_btn.innerHTML = 'Delete'
                quote_btns.append(update_btn)
                quote_btns.append(delete_btn)
				quote_text.innerHTML = value['quote']
				quote_author.innerHTML = value['author']
                delete_btn.setAttribute('id', value['quoteid']) 
                delete_btn.onclick = function(){ 
                    deleteQuote();
                }
                update_btn.setAttribute('id', value['quoteid']) 
                update_btn.onclick = function() {
                    textToUpdate();
                }
				single_quote.append(quote_text)
				single_quote.append(quote_author)
                single_quote.append(quote_btns)
                single_quote.setAttribute('id', `single${value['quoteid']}`)
		        document.getElementById('quote_list').appendChild(single_quote);
			}
		}
	};
	xhttp.send();
}

function sendData() {
    const xhttp = new XMLHttpRequest();
    const url = "https://www.aleksandrasorokina.com/quotes_app";

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

        }
    }

    let results = new Object();
    // retrieves input values for name and score
    results["quote"] = document.getElementById("quote_text_input").value;
    results["author"] = document.getElementById("author_input").value;
    
    let data = JSON.stringify(results);
    // send the data as a POST request
    xhttp.open("POST", url);
    xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhttp.send(data);
}


function deleteQuote() {
    const xhttp = new XMLHttpRequest();
    const url = "https://www.aleksandrasorokina.com/quotes_app/";
    let data = event.target.getAttribute('id')
    xhttp.open("DELETE", url + data, true);
    xhttp.onload = function() {
		if (this.readyState == 4 && this.status == 200) { 
		}
	};
    xhttp.setRequestHeader("Content-type", "text/plain");
    xhttp.send(data);
}

function textToUpdate() {
    let id = event.target.getAttribute('id');
    update_btn = document.getElementById(id);

    let single = document.getElementById(`single${id}`)
    let quote_text_div = single.querySelector('.quote_text')
    let quote_author_text_div = single.querySelector('.quote_author')
    let quote_btns_div = single.querySelector('.quote_btns')

    let quote_text = quote_text_div.innerHTML
    let quote_author_text = quote_author_text_div.innerHTML
    quote_text_div.parentNode.removeChild(quote_text_div)
    quote_author_text_div.parentNode.removeChild(quote_author_text_div)
    quote_btns_div.parentNode.removeChild(quote_btns_div)

    const quote = document.createElement("textarea");
    quote.setAttribute('id', "quote_text_input_update")
   
    quote.value = quote_text
    const quote_author = document.createElement("textarea");
    quote_author.value = quote_author_text
    quote_author.setAttribute('id', "author_input_update")
    const quote_btns = document.createElement("div")
    quote_btns.classList.add('quote_btns')
    const save_btn = document.createElement("button");
    save_btn.setAttribute('id', 'save_btn_update_quote')
    save_btn.classList.add('btn_quote')
    save_btn.classList.add('btn')
    save_btn.classList.add('btn1')
    save_btn.classList.add('delete_quote_btn')
    save_btn.innerHTML = 'Save'
    single.append(quote)
    single.append(quote_author)

    save_btn.onclick = function(){ 
        updateQuote(id);
        textareToDiv(id)
    }
    quote_btns.append(save_btn)
    single.append(quote_btns)

}

function textareToDiv(id) {
    let single = document.getElementById(`single${id}`)
    const quote_text = document.createElement("div");
    quote_text.classList.add('quote_text')
    const quote_textarea = document.getElementById("quote_text_input_update")
    const author_textarea = document.getElementById("author_input_update")
    quote_text.innerHTML = quote_textarea.value

    const quote_author = document.createElement("div");
    quote_author.classList.add('quote_author')
    quote_author.innerHTML = author_textarea.value 
    const quote_btns = document.createElement("div")
    quote_btns.classList.add('quote_btns')
    const update_btn = document.createElement("button")

    const quote_btns_div = single.querySelector('.quote_btns')
    quote_btns_div.parentNode.removeChild(quote_btns_div)

    update_btn.classList.add('btn_quote')
    update_btn.classList.add('btn')
    update_btn.classList.add('btn1')
    update_btn.classList.add('update_quote_btn')
    update_btn.innerHTML = 'Update'
    const delete_btn = document.createElement("button")
    delete_btn.classList.add('btn_quote')
    delete_btn.classList.add('btn')
    delete_btn.classList.add('btn1')
    delete_btn.classList.add('delete_quote_btn')
    delete_btn.innerHTML = 'Delete'
    quote_btns.append(update_btn)
    quote_btns.append(delete_btn)

    quote_textarea.parentNode.removeChild(quote_textarea)
    author_textarea.parentNode.removeChild(author_textarea)
    
    delete_btn.setAttribute('id', id) 
    delete_btn.onclick = function(){ 
        deleteQuote();
    }
    update_btn.setAttribute('id', id) 
    update_btn.onclick = function() {
        textToUpdate();
    }


    single.append(quote_text)
    single.append(quote_author)
    single.append(quote_btns)

}


function updateQuote(id) {
    const xhttp = new XMLHttpRequest();
    const url = "https://www.aleksandrasorokina.com/quotes_app";

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            
        }
    }

    let results = new Object();
    results["quoteid"] = id
    results["quote"] = document.getElementById("quote_text_input_update").value;
    results["author"] = document.getElementById("author_input_update").value;

    let data = JSON.stringify(results);
    xhttp.open("PUT", url);
    xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhttp.send(data);
}