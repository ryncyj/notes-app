# Notes-App

A simple note-taking application. Users can create, edit, and delete notes with a responsive interface.


## **Tech Stack**

- **Backend:** Express.js, SQLite  
- **Frontend:** Vue.js, Vue Router, TailwindCSS  


## **Features**

- View list of notes
- Create new notes with a title and content  
- Edit existing notes  
- Delete notes with confirmation  
- Responsive UI


## **Deployment**
- Deployed using **Render**.
- Frontend and backend deployed as separate instance.
- Link: [notes-app](https://notes-app-d81r.onrender.com/)


## **Limitations**

- **Cold start delay:** On Render’s free tier, the backend may take up to a minute to start if inactive.
- **No user separation:** All notes are visible to everyone as there is currently so user separation. 
- **Database persistence:** Notes will be lost if the Render backend becomes inactive or restarts, as there is no persistent storage for render's free tier.


## **Development Process**

The general development process is as follows...
1. Generate the initial code using AI tools.
2. Verify the generated code by testing it and cross-referencing with official documentation.
3. Refine and modify the code as needed to ensure correctness and alignment with project requirements.

### Examples of AI usage in development

AI prompt: **"create a modal for delete confirmation"**  
Output: 
```
<template>
    <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg shadow-lg w-96 p-6">
            <h2 class="text-xl font-semibold mb-4">{{ title }}</h2>
            <p class="mb-6">{{ message }}</p>
            <div class="flex justify-end space-x-3">
                <button @click="onCancel" class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
                    Cancel
                </button>
                <button @click="onConfirm" class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                    Delete
                </button>
            </div>
        </div>
    </div>
</template>
```
Problem: 
- When modal was opened, the surrounding is completely black
- the transition from current screen to modal was instant which wasn't very nice.  
- Size of the modal wasn't ideal for small mobile screen size.

What I changed:
- Added transition so modal opening feels smoother.
- Added responsive margin so the modal doesn't expand all the way to the side on small mobile screen.
- Reduce background opacity to improve visibility of underlying UI.
---

AI prompt: **"Use SQLite to create the notes table"**  
Output:
```
import sqlite3 from "sqlite3";


// connect to database file
const db = new sqlite3.Database("./notes.db", (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
  } else {
    console.log("Connected to SQLite database.");


    // Create table if not exists
    db.run(
      `CREATE TABLE IF NOT EXISTS notes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        content TEXT,
      )`,
      (err) => {
        if (err) {
          console.error("Error creating table:", err.message);
        }
      }
    );
  }
});


export default db;
```
What I changed: 
- Added field `created_at` which stores the time each note was created.

Why:
- Allows me to sort using `created_at` when retrieving the list of notes, so that the I can display the most recently created note at the top of the list.
---

AI prompt: **"Format the time to show date month year hour minutes"**  
Output:
```
const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
}
```
Problem:
- TIme displayed was UTC time instead of user's local time.

What I changed:
- Use 12 hour format instead.
- Changed line 3 to `const date = new Date(dateString + 'Z')`

Why:
- Changed to 12 hour format due to preference and its generally easier to understand.
- Add the `+'Z'` so that it treats the `dateString` as UTC instead of local time, allowing proper conversion to local time.

