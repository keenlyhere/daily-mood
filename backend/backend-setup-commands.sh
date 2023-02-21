npm install cookie-parser cors csurf dotenv express express-async-errors helmet jsonwebtoken morgan per-env sequelize@6 sequelize-cli@6 pg bcryptjs express-validator
npm install -D sqlite3 dotenv-cli nodemon


npx sequelize model:generate --name User --attributes email:string,firstName:string,lastName:string,hashedPassword:string,birthday:dateonly,displayPic:string,theme:string,moolah:integer,activePet:integer,activeBg:integer

npx sequelize model:generate --name UserItem --attributes userId:integer,itemType:string
