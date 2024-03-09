let Data; let DataPromise;

function fetchData() {
  if (!DataPromise) {
    DataPromise = fetch("Data/projects.json").then(response => {if (!response.ok) {throw new Error('Failed to fetch data');} return response.json();}).then(data => {Data = data; return Data;}).catch(error => {console.error('Error fetching data:', error); throw error;});
  }
  return DataPromise;
}

fetchData().then(() => {useData();}).catch(error => {console.error('Error starting game:', error);});

function useData() {if (Data) {console.log('Using data:', Data); start();} else {console.log('Data not available yet.');}}
function start() {
  document.getElementById("main_title").href = Data.drive_link;
  document.getElementById("main_title").style.color = Data.color;
  document.getElementById("main_title").style.fontFamily = `"Comic Sans MS", "Comic Sans"`;
  document.getElementById("main").style.border = "solid 1px black";
  document.getElementById("main").style.backgroundColor = "#eee";
  document.getElementById("main").style.padding = "0 10px 10px 10px";
  document.getElementById("main").style.fontFamily = `"Comic Sans MS", "Comic Sans"`;
  for (const [project, details] of Object.entries(Data.projects)) {
    console.log(project,details);
    if (details.description == null) {
      document.getElementById("main").innerHTML += `<h2><a href="${details.drive_link}" style="text-decoration: none; color: ${details.color};">${project}</a></h2><div id="${project}_content" style="border: 1px solid black; background-color: #ddd; padding: 0 10px 10px 10px;"></div>`;
    } else {
      document.getElementById("main").innerHTML += `<h2><a href="${details.drive_link}" style="text-decoration: none; color: ${details.color};">${project}</a></h2><div id="${project}_content" style="border: 1px solid black; background-color: #ddd; padding: 0 10px 10px 10px;"><p>Description: ${details.description}</p></div>`;
    }
    if (details.nameStatus != null) {document.getElementById(`${project}_content`).innerHTML += `<p>Name Status: ${getStatusDescription(details.nameStatus)}</p>`;}
    for (const file of details.files) {
      document.getElementById(`${project}_content`).innerHTML += `<h3><a href="${file.drive_link}" style="text-decoration: none; color: black;">${file.title}</a></h3><div style="border: 1px solid black; background-color: #ccc; padding: 0 10px 0 10px;">`;
      if (file.description != null) {document.getElementById(`${project}_content`).innerHTML += `<p>Description: ${file.description}</p>`;}
      document.getElementById(`${project}_content`).innerHTML += `<p>File Type: ${file.fileType}</p>`;
      if (file.nameStatus != null) {document.getElementById(`${project}_content`).innerHTML += `<p>Name Status: ${getStatusDescription(file.nameStatus)}</p>`;}
      document.getElementById(`${project}_content`).innerHTML += `</div>`;
    }
  }
}
//p
function getStatusDescription(status) {switch (status) {case 1: return 'Name will be changed'; case 2: return 'Name will be changed, new name decided'; case 3: return 'Name is fine, might be changed in the future'; case 4: return 'Name is definite'; default: return '';}}
