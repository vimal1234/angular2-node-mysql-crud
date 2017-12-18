# angular2-node-mysql-crud
Angular 2 CRUD using Node js and Mysql


# Steps to create angular 2 project with node js and mysql

To create an angular 2 crud app we need a mysql database, angular cli installed and node js installed with express js framework

#Step 1

1. Create a database 'employee'
2. Create table using this 

   ```
   CREATE TABLE `users`
      `id` int(10) AUTO INCREMENT PRIMARY KEY,
      `name` varchar(100),
      `age` varchar(100),
      `email` varchar(100)
   ```
      
3. Create server side app using the following commands
```
     mkdir employeedetails 
     cd employeedetails
     npm init
     npm install express --save
     npm install mysql --save
     npm install mongoose cors body-parser --save
```
4. Create client side app using the following commands
```
     npm install @angular/cli
     ng new client
     cd client
     ng g component employees
     ng g service employee
```    
 5. Run server side app using ```node app``` command
 6. Then run client side app using ```npm start``` or ```ng serve```
 7. Now go to ```http://localhost:4200/``` and see the output
