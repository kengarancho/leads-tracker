import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js"

const firebaseConfig = {
    databaseURL: "https://leads-tracker-app-8d865-default-rtdb.asia-southeast1.firebasedatabase.app/" // "https://leads-tracker-app-8d865-default-rtdb.asia-southeast1.firebasedatabase.app/" //process.env.DATABASE_URL
}

const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
const referenceInDB = ref(database, "leads")

const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("saveinput-btn")
const deleteBtn = document.getElementById("delete-btn")
const ulEl = document.getElementById("ul-el")

function render(leads) {
    let listItems = ""
    for(let i = 0; i < leads.length; i++) {
        listItems += `<li>
                            <a href=https://${leads[i]} target="_blank">${leads[i]}</a>
                            </li>
        `
    }
    ulEl.innerHTML = listItems
}
// fetch data from the Firebase database
onValue(referenceInDB, function(snapshot) {
    const snapshotDoesExist = snapshot.exists()
    if (snapshotDoesExist) {
        const snapshotValues = snapshot.val()
        const leads = Object.values(snapshotValues)
        render(leads)
    } 
})

inputBtn.addEventListener("click", function() {
    push(referenceInDB, inputEl.value)
    inputEl.value = ""
})

deleteBtn.addEventListener("dblclick", function() {
    remove(referenceInDB)
    ulEl.innerHTML = ""
})

