npx sequelize model:create --name interested_book --attributes isFavourite:boolean,isReserve:boolean,userId:integer,bookId:integer
npx sequelize model:create --name loan --attributes userId:integer,bookId:integer,bookProgress:string,dueDate:date
npx sequelize model:create --name genre --attributes genreName:string
npx sequelize model:create --name book --attributes title:string,author:string,publisher:string,sypnosis:string,copiesAvailable:integer,epubUrl:string,totalPages:integer,totalLoans:integer
npx sequelize model:create --name favourite --attributes userId:integer,loanId:interger

npx sequelize migration:create --name add-s-status-to-notifications 