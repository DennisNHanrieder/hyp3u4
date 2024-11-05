"use strict";
/*
 * Hypermedia Systems & Architecture
 * http://www.fh-ooe.at/mtd
 *
 * Simple Vue.js 3 Application Template
 *
 */

const STORAGE_KEY = "hyp3t1.lab2.g1.2024";

Vue.createApp({
    data() {
        return {
		    notesData: [],
            contents: "",
        }
	},
    methods: {
        saveData() {
            if (this.contents.trim().length === 0) {
                this.contents = "";
                return;
            }

            const entry = {
                date: new Date().toLocaleString(),
                contents: this.contents.trim(),
            };

            this.notesData.push(entry);
            this.contents = "";

            localStorage.setItem(STORAGE_KEY,
                JSON.stringify(this.notesData)
            );
        },
    },
    created() {
        const data = localStorage.getItem(STORAGE_KEY);

        if (data) {
            this.notesData = JSON.parse(data);
            if (!Array.isArray(this.notesData)) this.notesData = [];
        }
    },
}).mount('#app');
