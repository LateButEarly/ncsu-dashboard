noodle [![Build Status](https://travis-ci.org/irkanu/ncsu-dashboard.svg)](https://travis-ci.org/irkanu/ncsu-dashboard) [![Code Climate](https://codeclimate.com/repos/54c99940e30ba05bf4000783/badges/cbb3becb98fe8367dff2/gpa.svg)](https://codeclimate.com/repos/54c99940e30ba05bf4000783/feed)
===
The "new moodle."
A moodle-esque student dashboard built on the MEAN stack.

# Prerequisites
* NodeJS & npm - http://nodejs.org/download/
* MongoDB - https://www.mongodb.org/downloads/
* Bower
```
$ npm install -g bower
```
* Grunt
```
$ npm install -g grunt-cli
```

# Installation
It's easy to install dependencies.
```
$ npm install
```

Start your engines!
```
$ grunt
```

:tada:


# Todo
- [x] User Authentication
  - [ ] User Roles

- [ ] Student Dashboard
  - [ ] Breadcrumbs
  - [ ] Events (CRUD)
    - [ ] Comments (CRUD)
  - [ ] Blog (CRUD)
    - [ ] Comments (CRUD)
  - [ ] Classes (Read-only)
    - [ ] Assignments (Read & Update)
      - [ ] Upload Documents (CRUD)
      - [ ] Feedback (Read-only)
    - [ ] Exams (Read & Update)
    - [ ] Quizzes (Read & Update)
    - [ ] Notices (Read-only)
- [ ] Teacher Dashboard
  - [ ] Classes (CRUD)
    - [ ] Assignments (CRUD)
      - [ ] Documents (Read-only)
      - [ ] Feeback (CRUD)
    - [ ] Exams (CRUD)
    - [ ] Quizzes (CRUD)
    - [ ] Notices (CRUD)
- [ ] Admin
  - [ ] Do it all.
  
