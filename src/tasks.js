const Task = (taskName, desc, dueDate = null, pri = "normal") => {

    const name = taskName;
    const notes = desc;
    const created = new Date();
    const due = dueDate;
    const completed = 0 //0 == uncompleted, 1 == completed
    const priority = pri


    return {
        name,
        notes,
        created,
        due,
        completed,
        priority,
    }
}

export { Task };

