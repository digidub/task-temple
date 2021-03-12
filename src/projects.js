const Project = (projectName, dueDate = null, pri = "normal") => {

    const name = projectName;
    const created = new Date();
    const due = dueDate;
    const completed = 0; //0 == uncompleted, 1 == completed
    const priority = pri

    return {
        name,
        created,
        due,
        completed,
        priority,
    }

}


export { Project }

