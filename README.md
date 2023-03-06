# Daily Moo'd

## 🐮 **About**

Daily Moo'd, a clone of the mobile Lifestyle app, DailyBean, is a web application for users to track their daily feelings and tasks. It currently has 4 features: (1) Dailies: Full CRUD, (2) Tasks: Full CRUD, (3) Pets: create, read, and update, (4) Shop: read and update.

[Click to view Daily Moo'd Live](https://daily-mood.onrender.com/)

## 💻 **Tech Stack**

### Languages:

[![JavaScript][javascript-shield]][javascript-url]
[![HTML][html-shield]][html-url]
[![CSS][css-shield]][css-url]

### Backend Development:

![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white)
![SQLite](https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)

### Frontend Development:

[![react][react-shield]][react-url]
[![react-router][react-router-shield]][react-router-url]
[![redux][redux-shield]][redux-url]
![Chart.js](https://img.shields.io/badge/chart.js-F5788D.svg?style=for-the-badge&logo=chart.js&logoColor=white)

### Hosting:
![Render](https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white)

## ✨ **Features**:

### Splash Page
![Splash-demo](https://keenlychung.com/dailymood/dm_01_splash.gif)


### Dailies
![Dailies-demo](https://keenlychung.com/dailymood/dm_02_dailies.gif)


### Tasks
![Tasks-demo](https://keenlychung.com/dailymood/dm_03_tasks.gif)


### Monthly view
![Cowlendar-demo](https://keenlychung.com/dailymood/dm_04_cowlendar.gif)


### Stats
![Stats-demo](https://keenlychung.com/dailymood/dm_05_stats.gif)


## Pets & Store
![Store-demo](https://keenlychung.com/dailymood/dm_06_store.gif)


## Collection
![Cowlection-demo](https://keenlychung.com/dailymood/dm_07_cowlection.gif)


## 📁 Installation

1. Clone this repo
2. `cd` into the backend folder and `npm install` to install the dependencies
3. Run the migration and seeders
```
npx dotenv sequelize db:migrate
npx dotenv sequelize db:seed:all
```
4. Run `npm start` to start the backend server
5. `cd` into the frontend folder and `npm install` to install the dependencies.
6. Run `npm start` to start the frontend server

<!-- MARKDOWN LINKS & IMAGES -->

[javascript-shield]: https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E
[python-shield]: https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white
[html-shield]: https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white
[css-shield]: https://img.shields.io/badge/CSS-239120?&style=for-the-badge&logo=css3&logoColor=white
[flask-shield]: https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white
[sqlite-shield]: https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white
[postgresql-shield]: https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white
[react-shield]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[react-router-shield]: https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white
[redux-shield]: https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white
[linkedin-shield]: https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white
[javascript-url]: https://www.javascript.com/
[python-url]: https://www.python.org/
[html-url]: https://www.w3.org/html/
[css-url]: https://www.w3.org/Style/CSS/Overview.en.html
[flask-url]: https://flask.palletsprojects.com/en/2.2.x/
[sqlite-url]: https://www.sqlite.org/index.html
[postgresql-url]: https://www.postgresql.org/
[react-url]: https://reactjs.org/
[react-router-url]: https://reactrouter.com/en/main
[redux-url]: https://redux.js.org/
[linkedin-url]: https://www.linkedin.com/in/nguyenpeterviet/

## ✅ Roadmap
- [ ] Themes
- [ ] More customization for pets

## Database Schema Design

![Daily Moo'd DB Schema](https://media.discordapp.net/attachments/1077123206135169065/1077649852198031361/image.png)
