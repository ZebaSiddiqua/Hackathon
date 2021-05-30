// Get the GitHub username input form
const gitHubForm = document.getElementById('gitHubForm');
var usernameInput;
var gitHubUsername;
// Listen for submissions on GitHub username input form
gitHubForm.addEventListener('submit', (e) => {
    
    // Prevent default form submission action
    e.preventDefault();

    // Get the GitHub username input field on the DOM
     usernameInput = document.getElementById('Username');

    // Get the value of the GitHub username input field
     gitHubUsername = usernameInput.value;          

    // Run GitHub API function, passing in the GitHub username
    requestUserRepos(gitHubUsername);

})


function requestUserRepos(username){
    
    // Create new XMLHttpRequest object
    const xhr = new XMLHttpRequest();
    
    // GitHub endpoint, dynamically passing in specified username
    const url = `https://api.github.com/users/${username}/repos`;
   
    // Open a new connection, using a GET request via URL endpoint
    // Providing 3 arguments (GET/POST, The URL, Async True/False)
    xhr.open('GET', url, true);
    
    // When request is received
    // Process it here
	  // Send the request to the server
    xhr.send();
	
    xhr.onload = function () {
		let ul = document.getElementById('userRepos');
        ul.innerHTML=" " ;
        // Parse API data into JSON
        const data = JSON.parse(this.response);
        
        // Loop over each object in data array
        for (let i in data) {
            
            // Get the ul with id of of userRepos
           
            
            // Create variable that will create li's to be added to ul
            let li = document.createElement('li');
            
            // Add Bootstrap list item class to each li
            li.classList.add('list-group-item')
			li.setAttribute("id","main-list")
            
			var x = data[i].name;
			var y = data[i].description;
			console.log(x)
			
			var Rep = document.createElement('div');
			Rep.style.textAlign="center";
			Rep.style.fontSize="22px";
			Rep.innerHTML="<b>Repository:<b>" + x;
			
			var buttoncreate=document.createElement('button')
			buttoncreate.innerHTML= x;
			buttoncreate.classList.add("btn","btn-danger");
			buttoncreate.setAttribute("id",x)
			buttoncreate.addEventListener("click",button_id);
			
		
		    var description = document.createElement('p')
			description.innerHTML= "Description: " + y ;
			
			var Note = document.createElement('p')
			Note.innerHTML= "Click on the button to view respository files" 
			
            li.append(Rep, buttoncreate,description,Note);
			ul.append(li);
            
function button_id(event){
	butid = (event.target.id);
	console.log(butid);
	console.log(gitHubUsername);
	RepoName(gitHubUsername,butid)
}

            // Append each li to the ul
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
		
			
		 li2.innerHTML = (`
		        
                <p><strong>File Name:</strong> ${data2[i].name} </p>
				<p><strong>Url:</strong> <a href="${data2[i].html_url}">${data2[i].html_url}</a></p>
            `);
		
		
			
	
		ul2.append(li2);
			
		}
		
    
        
        }

    }
  

}
document.getElementById("gitHubForm").reset();
}
