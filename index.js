// add note to locale storage
let addBtn = document.getElementById('add-btn')
addBtn.addEventListener('click', function(e){
    e.preventDefault()

    let addTitle = document.getElementById('note-title')
    let addTxt = document.getElementById('note-text')

    if(addTitle.nodeValue == '' || addTxt.value == ''){
        return alert('Please fill out all fields!')
    }

    let notes = localStorage.getItem('notes')
    if( notes == null){
        notesObj = []
    } else{
        notesObj = JSON.parse(notes)
    }

    let myObj = {
        title: addTitle.value,
        text: addTxt.value
    }
    notesObj.unshift(myObj)
    // console.log(myObj)
    localStorage.setItem('notes', JSON.stringify(notesObj))
    addTitle.value = ''
    addTxt.value = ''

    showNotes()
})

// function to show notes
function showNotes(){
    let notes = localStorage.getItem('notes')

    if(notes == null){
        notesObj = []
    } else{
        notesObj = JSON.parse(notes)
    }

    let html = ''
    notesObj.forEach(function(element, index){
        html += `
                <div class="note">
                    
                    <h3 class="note-title">${element.title}</h3>
                    <p class="note-text">${element.text}</p>
                    <button id="${index}" onclick="deleteNotes(this.id)" class="note-btn">Delete Note</button>
                    <button id="${index}" onclick="editNotes(this.id)" class="note-btn edit-btn">Edit Note</button>
                </div>
        `
    })

    let notesElem = document.getElementById('notes')
    if(notesObj.length != 0){
        notesElem.innerHTML = html
    } else{
        notesElem.innerHTML = 'No Notes Yet! Add new notes using the form input above.'
    }
}

showNotes()

// function to delete a note
function deleteNotes(index){
    let confirmDel = confirm('Delete note?')
    if(confirmDel == true){
        let notes = localStorage.getItem('notes')
        if(notes == null){
            notesObj = []
        } else{
            notesObj = JSON.parse(notes)
        }

        notesObj.splice(index, 1)
        localStorage.setItem('notes', JSON.stringify(notesObj))
        showNotes()
    }
}

// function to edit notes
function editNotes(index){
    let notes = localStorage.getItem('notes')
    let addTitle = document.getElementById('note-title')
    let addTxt = document.getElementById('note-text')

    if(addTitle.value !== '' || addTxt.value !== ''){
        return alert('Please clear out filled before editing.')
    }

    if(notes == null){
        notesObj = []
    } else{
        notesObj = JSON.parse(notes)
    }
    console.log(notesObj)

    notesObj.findIndex((element, index) =>{
        addTitle.value = element.title
        addTxt.value = element.text
    })
    notesObj.splice(index, 1)
    localStorage.setItem('notes', JSON.stringify(notesObj))
    showNotes()
}