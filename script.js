
const gitHubForm = document.getElementById('gitHubForm');
var usernameInput;
var gitHubUsername;

gitHubForm.addEventListener('submit', (e) => {
    e.preventDefault();
     usernameInput = document.getElementById('Username');
     gitHubUsername = usernameInput.value;          
    requestUserRepos(gitHubUsername);
		let ul = document.getElementById('userRepos');
        ul.innerHTML=" " ;
		let ul2 = document.getElementById('userReposFiles');
        ul2.innerHTML=" " ;
		  var head = document.getElementById("headrep");
    head.style.visibility="hidden";	
	var img = document.getElementById("imgarrow");
    img.style.visibility="hidden";	

	
})

let j = 0;
function requestUserRepos(username){
  
	
  
    const xhr = new XMLHttpRequest();
    const url = `https://api.github.com/users/${username}/repos`;
    xhr.open('GET', url, true);
    xhr.send();
    xhr.onload = function () {
		
	
		let ul = document.getElementById('userRepos');
        ul.innerHTML=" " ;
       
        const data = JSON.parse(this.response);
        
        
        for (let i in data) {
           
            let li = document.createElement('li');
            li.classList.add('list-group-item')
            li.setAttribute("style"," background: linear-gradient(to bottom right, #ccffff 0%, #ffffff 57%); border: 4px solid black");
		    li.setAttribute("id",j);
			j++
			
			var x = data[i].name;
			var y = data[i].description;
			console.log(x)
			
			var Rep = document.createElement('div');
			Rep.setAttribute("style","text-align:center ;  text-decoration : underline; font-size:150% ");
			Rep.innerHTML="<b>Repository:<b>" + x;
			
			var anchortag = document.createElement("a")
			anchortag.href = "#headrep";
			
		
			
			var buttoncreate=document.createElement('button')
			buttoncreate.innerHTML= x;
			buttoncreate.classList.add("btn","btn-danger");
			buttoncreate.setAttribute("id",x)
			buttoncreate.addEventListener("click",button_id);
			 
			 anchortag.append(buttoncreate);
		
		
		    var description = document.createElement('p')
			description.setAttribute("style","margin-top:5px ;  font-style: italic ");
			description.innerHTML= " <b> Description: </b> " + y ;
			
			var Note = document.createElement('p')
			Note.setAttribute("style","text-align:center; font-weight: bold;");
			Note.innerHTML= "Click on the button to view respository files" 
			
            li.append(Rep, anchortag,description,Note);
			ul.append(li);
            
function button_id(event){
	butid = (event.target.id);
	console.log(butid);
	console.log(gitHubUsername);
    var head = document.getElementById("headrep");
    head.style.visibility="visible";	
	var img = document.getElementById("imgarrow");
    img.style.visibility="visible";	
	RepoName(gitHubUsername,butid)
}
   
            ul.appendChild(li);
        
        }
var li= document.getElementById("main-list");


function RepoName(username,respname){
	const xhr = new XMLHttpRequest();
const url = "https://api.github.com/repos/" + username  + "/" + respname + "/contents";
    xhr.open('GET', url, true);
      xhr.send();

    xhr.onload = function () {
			
        let ul2 = document.getElementById('userReposFiles');
		ul2.innerHTML="";
        var data2 = JSON.parse(this.response);
        console.log(data2)
		
		for (let i in data) {
		
        let li2 = document.createElement('li');
		li2.classList.add('list-group-item');
		li2.setAttribute("style"," background: linear-gradient(to bottom left, #ccffff 0%, #ffffff 57%); border: 4px solid black");
	    li2.setAttribute("id","list")
		 li2.innerHTML = (`
		        
                <p><strong>File Name:</strong> ${data2[i].name} </p>
				<p style="font-size:100%"><strong>Url:</strong> <a href="${data2[i].html_url}">${data2[i].html_url}</a></p>
            `);
		ul2.append(li2);
		}
        }
    }
}
document.getElementById("gitHubForm").reset();

			
}
