function internship(){
    let projects = document.querySelector('.projects');
    projects.innerHTML = '';

    let project = document.createElement('section');
    project.className = "project";
    let project_title = document.createElement('h3');
    project_title.innerText = "SoftServe";
    project_title.className = "project__main-title";
    let project_occupation = document.createElement('h5');
    project_occupation.innerText = "Intern at R&D department";
    project_occupation.className = "project__title";
    let project_link = document.createElement("h5");
    project_link.innerText = "https://www.softserveinc.com/en-us/";
    project_link.className = "project__title";

    project.appendChild(project_title);
    project.appendChild(project_occupation);
    project.appendChild(project_link);
    project.innerHTML += "Aug. 13, 2018 - None<br/>About:";
    projects.appendChild(project);

    document.getElementsByClassName('project-type-switchers__switch-item')[1].classList.add("project-type-switchers__switch-item_active");
    document.getElementsByClassName('project-type-switchers__switch')[1].classList.add("project-type-switchers__switch_active");
    document.getElementsByClassName('project-type-switchers__switch-item')[0].classList.remove("project-type-switchers__switch-item_active");
    document.getElementsByClassName('project-type-switchers__switch')[0].classList.remove("project-type-switchers__switch_active");
    document.getElementsByClassName('project-type-switchers__switch-item')[2].classList.remove("project-type-switchers__switch-item_active");
    document.getElementsByClassName('project-type-switchers__switch')[2].classList.remove("project-type-switchers__switch_active");
}

function volunteer(){
    let projects = document.querySelector('.projects');
    projects.innerHTML = '';

    let project = document.createElement('section');
    project.className = "project";
    let project_title = document.createElement('h3');
    project_title.innerText = "Volunteer";
    project_title.className = "project__main-title";
    let project_description = document.createElement('section');
    project_description.innerText = "Translated from English and voiced the video (https://youtu.be/S5ucb9A6j78) for Code.org organisation into Ukrainian";
    project_description.className = "project__description";

    project.appendChild(project_title);
    project.innerHTML += "About:";
    project.appendChild(project_description);

    projects.appendChild(project);

    document.getElementsByClassName('project-type-switchers__switch-item')[2].classList.add("project-type-switchers__switch-item_active");
    document.getElementsByClassName('project-type-switchers__switch')[2].classList.add("project-type-switchers__switch_active");
    document.getElementsByClassName('project-type-switchers__switch-item')[0].classList.remove("project-type-switchers__switch-item_active");
    document.getElementsByClassName('project-type-switchers__switch')[0].classList.remove("project-type-switchers__switch_active");
    document.getElementsByClassName('project-type-switchers__switch-item')[1].classList.remove("project-type-switchers__switch-item_active");
    document.getElementsByClassName('project-type-switchers__switch')[1].classList.remove("project-type-switchers__switch_active");
}

function project(){
    let projects = document.querySelector('.projects');
    projects.innerHTML = '';

    document.getElementsByClassName('project-type-switchers__switch-item')[0].classList.add("project-type-switchers__switch-item_active");
    document.getElementsByClassName('project-type-switchers__switch')[0].classList.add("project-type-switchers__switch_active");
    document.getElementsByClassName('project-type-switchers__switch-item')[2].classList.remove("project-type-switchers__switch-item_active");
    document.getElementsByClassName('project-type-switchers__switch')[2].classList.remove("project-type-switchers__switch_active");
    document.getElementsByClassName('project-type-switchers__switch-item')[1].classList.remove("project-type-switchers__switch-item_active");
    document.getElementsByClassName('project-type-switchers__switch')[1].classList.remove("project-type-switchers__switch_active");
}
