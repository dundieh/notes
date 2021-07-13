const chalk = require('chalk');
const yargs = require('yargs');
const notes = require('./notes.js');

//Customize Yargs Version
yargs.version('1.1.0');

//add a note
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'note description',
            demandOption: true,
            type: 'string'
        }
    },
    handler() {
        notes.addNote(yargs.argv.title, yargs.argv.body)
    }
})

//remove a note
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler() {
        notes.removeNote(yargs.argv.title);
    }
})

//List all the notes
yargs.command({
    command: 'list',
    describe: 'List out all the notes',
    handler() {
        notes.listNotes();
    }
})

//Search for your note
yargs.command({
    command: 'read',
    describe: 'Read the note',
    builder: {
        title: {
            describe: 'note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler() {
        notes.readNote(yargs.argv.title);
    }
})

yargs.parse();
