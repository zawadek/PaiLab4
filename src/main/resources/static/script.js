const api_url_beginning = 'http://localhost:8080';
function showForm(method, id){
    let form = '<form method="'+ method+'" action="localhost:8080/index.html">' +
        '<input type="number" id="id" hidden> ' +
        '<table> ' +
        '<tr> <td> Imię: </td> <td> <input type="text" id="name"> </td> </tr>' +
        '<tr> <td> Nazwisko: </td> <td><input type="text" id="surname"> </td> </tr>' +
        '<tr> <td> Średnia: </td> <td> <input type="number" min="0.00" max="5.00" step="0.01" id="average"> </td> </tr>';

    if(method === 'POST')
    {
        form = form+'<tr> <td colspan="2"> <button type="button" onClick="addStudent()"> Dodaj studenta </button> </td> </tr> </table> </form> ';
    }
    else if(method === 'PUT')
    {
        form = form+'<tr> <td colspan="2"> <button type="button" onClick="editStudent('+id+')"> Edytuj studenta </button> </td> </tr> </table> </form> ';
    }

    document.getElementById('content').innerHTML = form;
}
// localhost:8080/students
function showAllStudents() {
    let table = '<table> ' +
        '<thead> ' +
        '<tr> ' +
        '<th> Id </th> ' +
        '<th> Imię </th> ' +
        '<th> Nazwisko </th> ' +
        '<th> Średnia </th> ' +
        '<th> Edytuj </th>' +
        '<th> Usuń </th>' +
        '</tr> ' +
        '</thead> <tbody>'

    fetch(api_url_beginning + '/students')
        .then((response) => response.json())
        .then((data) => {
                data.forEach(element => {
                    let id = element['id'];
                    table += '<tr> ' +
                        '<td>'+ element['id'] +'</td> ' +
                        '<td>'+ element['name'] +'</td> ' +
                        '<td>'+ element['surname'] +'</td> ' +
                        '<td>'+ element['average']+'</td> ' +
                        '<td> <button type="button" onclick="editStudentForm('+id+')"> Edytuj </button> </td> ' +
                        '<td> <button type="button" onclick="deleteStudent(' + id + ')"> Usuń </button> </td>' +
                        '</tr>';
                })
                table += '</tbody> </table>';
                document.getElementById('content').innerHTML = table;
            }
        );
}
// localhost:8080/student/get/{id}
function editStudentForm(id){
    showForm('PUT',id);
    fetch(api_url_beginning + '/student/get/' + id)
        .then(response => response.json())
        .then(data => {
            document.getElementById('name').value = data.name;
            document.getElementById('surname').value = data.surname;
            document.getElementById('average').value = data.average;
        });

}
// localhost:8080/student/update/{id}
function editStudent(id){
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
        "name": document.getElementById('name').value,
        "surname": document.getElementById('surname').value,
        "average": document.getElementById('average').value
    });

    let requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch(api_url_beginning + "/student/update/"+id, requestOptions)
        .then(response => response.text())
        .then((result)=>{
            window.alert(result);
            showAllStudents();
        })
        .catch(error => console.log('error', error));

}
// localhost:8080/student/delete/{id}
function deleteStudent(id){
    let requestOptions = {
        method: 'DELETE',
        redirect: 'follow'
    };

    let url = api_url_beginning + "/student/delete/" + id;
    fetch(url , requestOptions)
        .then((response) => response.text())
        .then((result) => {
            window.alert(result);
            showAllStudents();
        })
        .catch(error => window.alert(error));
}
//localhost:8080/student/add
function addStudent(){
    let data = {}
    if(document.getElementById('id').value !== "")
    {
        data.id = document.getElementById('id').value;
    }

    data.name = document.getElementById('name').value;
    data.surname = document.getElementById('surname').value;
    data.average = parseFloat(document.getElementById('average').value);

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(data),
        redirect: 'follow'
    };

    let url = api_url_beginning + "/student/add";
    fetch(url, requestOptions)
        .then(response => response.text())
        .then(result => showAllStudents())
        .catch(error => window.alert(error));

}