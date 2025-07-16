const taskList = document.getElementById("taskList"); // UL এলিমেন্ট ধরছে যেখানে টাস্ক গুলো দেখাবে
    const taskStatus = document.getElementById("taskStatus"); // টাস্ক স্ট্যাটাস দেখানোর ডিভ
    let tasks = JSON.parse(localStorage.getItem("tasks")) || []; // localStorage থেকে আগের টাস্ক গুলো নেয়

    function addTask() {
      const input = document.getElementById("taskInput"); // ইনপুট এলিমেন্ট ধরছে
      const text = input.value.trim(); // ইনপুটের টেক্সট নিয়ে ফাঁকা বাদ দিচ্ছে
      if (text) {
        tasks.push({ text, completed: false }); // টাস্ক অ্যারেতে যোগ করা হচ্ছে
        input.value = ""; // ইনপুট ক্লিয়ার করা
        updateStorage(); // লোকাল স্টোরেজে আপডেট
        renderTasks(); // স্ক্রিনে টাস্ক দেখানো হচ্ছে
      }
    }

    function deleteTask(index) {
      tasks.splice(index, 1); // নির্দিষ্ট টাস্ক অ্যারে থেকে মুছে ফেলে
      updateStorage(); // লোকাল স্টোরেজ আপডেট
      renderTasks(); // টাস্ক আবার রেন্ডার করা
    }

    function updateStorage() {
      localStorage.setItem("tasks", JSON.stringify(tasks)); // লোকাল স্টোরেজে টাস্ক অ্যারে সংরক্ষণ
    }

    function renderTasks() {
      taskList.innerHTML = ""; // পুরনো টাস্ক মুছে ফেলে
      let completed = 0; // কতটি টাস্ক complete তা কাউন্ট করবে
      if (tasks.length === 0) {
        taskList.innerHTML = '<li style="color:#888;">No tasks yet! Add one above.</li>'; // কোনো টাস্ক না থাকলে দেখাবে
      } else {
        tasks.forEach((task, index) => {
          const li = document.createElement("li"); // নতুন li তৈরি করে

          const checkbox = document.createElement("input"); // চেকবক্স তৈরি
          checkbox.type = "checkbox";
          checkbox.checked = task.completed; // টাস্ক complete হলে চেকড থাকবে
          checkbox.onchange = () => {
            tasks[index].completed = checkbox.checked; // চেকবক্স পাল্টালে টাস্কের স্টেট আপডেট
            updateStorage(); // লোকাল স্টোরেজ আপডেট
            renderTasks(); // আবার রেন্ডার
          };

          const span = document.createElement("span"); // টাস্ক টেক্সট দেখানোর জন্য স্প্যান
          span.textContent = task.text;
          if (task.completed) {
            span.style.textDecoration = "line-through"; // complete হলে লাইন মারবে
            completed++; // কমপ্লিট কাউন্ট বাড়াবে
          }

          const deleteBtn = document.createElement("button"); // Delete বাটন তৈরি
          deleteBtn.textContent = "Delete";
          deleteBtn.className = "delete-btn";
          deleteBtn.onclick = () => deleteTask(index); // ক্লিক করলে টাস্ক মুছে যাবে

          li.appendChild(checkbox); // চেকবক্স li তে যোগ
          li.appendChild(span);     // স্প্যান li তে যোগ
          li.appendChild(deleteBtn); // ডিলিট বাটন li তে যোগ
          taskList.appendChild(li); // li পুরো তালিকায় যোগ
        });
      }
      taskStatus.textContent = `Total Tasks: ${tasks.length} | Completed: ${completed}`; // স্ট্যাটাস আপডেট
    }

    renderTasks(); // পেজ লোড হলে টাস্ক দেখাবে