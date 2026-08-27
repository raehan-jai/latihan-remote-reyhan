const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");
const clearBtn = document.getElementById("clearBtn");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function tampilkanTugas() {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.classList.add("task");

        if (task.completed) {
            li.classList.add("completed");
        }

        li.innerHTML = `
            <span onclick="selesai(${index})">
                ${task.text}
            </span>

            <button class="delete" onclick="hapusTugas(${index})">
                Hapus
            </button>
        `;

        taskList.appendChild(li);
    });

    taskCount.textContent = `${tasks.length} tugas`;

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function tambahTugas() {
    const text = taskInput.value.trim();

    if (text === "") {
        alert("Tugas tidak boleh kosong!");
        return;
    }

    tasks.push({
        text: text,
        completed: false
    });

    taskInput.value = "";

    tampilkanTugas();
}

function selesai(index) {
    tasks[index].completed = !tasks[index].completed;

    tampilkanTugas();
}

function hapusTugas(index) {
    tasks.splice(index, 1);

    tampilkanTugas();
}

function hapusSemua() {
    if (tasks.length === 0) return;

    if (confirm("Hapus semua tugas?")) {
        tasks = [];
        tampilkanTugas();
    }
}

addBtn.addEventListener("click", tambahTugas);

taskInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        tambahTugas();
    }
});

clearBtn.addEventListener("click", hapusSemua);

tampilkanTugas();