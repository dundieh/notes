const chalk = require('chalk');
const fs = require('fs');

const addNote = (title, body) => {
    const Notes = loadNotes();

    const duplicateNote = Notes.find((note) => note.title === title);

    if(!duplicateNote) {
        Notes.push({
            title: title,
            body: body
        });
    
        saveNotes(Notes);

        console.log(chalk.green.inverse('New Note Added'));
    } else {
        console.log(chalk.red.inverse('invalid note title'));
    }
}

const removeNote = (title) => {
    const Notes = loadNotes();

    const notesToKeep = Notes.filter((note) => note.title !== title);

    if(Notes.length > notesToKeep.length) {
        console.log(chalk.green.inverse('Note Removed'));
        saveNotes(notesToKeep);
    } else {
        console.log(chalk.red.inverse('invalid note title'));
    }
}

const listNotes = () => {
    console.log(chalk.inverse('Your Notes:'))

    const listedNotes = loadNotes();

    listedNotes.forEach((note) => console.log(note.title));
}

const readNote = (title) => {
    const Notes = loadNotes();

    const searchedNote = Notes.find((note) => note.title === title);
    
    if(searchedNote) {
        console.log(chalk.inverse(searchedNote.title));
        console.log(searchedNote.body)
    } else {
        console.log(chalk.red.inverse('invalid note title'));
    }
}

const saveNotes = (arr) => {
    const dataJSON = JSON.stringify(arr);
    fs.writeFileSync('notes.json', dataJSON);
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        return [];
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}