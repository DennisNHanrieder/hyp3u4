"use strict";

class Person {
    constructor(firstname, lastname) {
        this.firstname = firstname;
        this.lastname = lastname;
    }
}

const app = Vue.createApp({
    data() {
        return {
            people: [],
            newFirstname: "",
            newLastname: "",
        };
    },
    methods: {
        addPerson() {
            if (this.newFirstname.trim() && this.newLastname.trim()) {
                const newPerson = new Person(this.newFirstname.trim(), this.newLastname.trim());
                this.people.push(newPerson);
                this.newFirstname = "";
                this.newLastname = "";
            }
        },
        removePerson(index) {
            this.people.splice(index, 1);
        },
        updatePerson(index, updatedPerson) {
            this.people[index] = updatedPerson;
        },
        clearPeople() {
            this.people = [];
        }
    }
});

app.component("person-item", {
    props: ["firstname", "lastname"],
    emits: ["delete-person", "update-person"],
    data() {
        return {
            isEditing: false,
            editedFirstname: this.firstname,
            editedLastname: this.lastname
        };
    },
    methods: {
        startEditing() {
            this.isEditing = true;
        },
        saveEdit() {
            if (this.editedFirstname.trim() && this.editedLastname.trim()) {
                this.$emit("update-person", new Person(this.editedFirstname.trim(), this.editedLastname.trim()));
            }
            this.isEditing = false;
        }
    },
    template: "#person-template"
});

app.mount("#app");
