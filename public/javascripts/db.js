//db.js

const mysql = require('mysql2');

const pool = mysql.createPool({
    connectionLimit: 10,// the number of connections will node hold open to our database
    password: "root",
    user: "root",
    database: "mark_color_sort",
    host: "localhost",
    port: "3306",
    

});


let db = {};
db.getAllSignIn = (userid) => {
    
    return new Promise((resolve, reject) => {

        const sql = `SELECT * FROM mark_color_sort.login_db where User_Name = "${userid}" `;
        console.log("sql query  " + sql)
        pool.query(sql, (error, employees) => {
            console.log("employeesdetails" + employees)
            if (error) {

                return reject(error);
            }
            return resolve(employees);
        });
    });
};
db.getAllEmployees = () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM mark_color_sort.login_db', (error, employees) => {
            if (error) {
                return reject(error);
            }
            return resolve(employees);
        });
    });
};
// db.getAllauthkey = () => {
//     return new Promise((resolve, reject) => {
//         pool.query('SELECT auth FROM mark_color_sort.login_db', (error, employees) => {
//             if (error) {
//                 return reject(error);
//             }
//             return resolve(employees);
//         });
//     });
// };
db.getAllLoginId = (User_Id, Pass) => {

    return new Promise((resolve, reject) => {
        var sql = `INSERT INTO  mark_color_sort.login_db (User_Name,Password) VALUES ("${User_Id}","${Pass}")`;
        pool.query(sql, (error, result) => {

            if (error) {
                return reject(error);
            }
            return resolve("success" + result);
        });
    });

};
db.getAllLoginIdToken = (authkey,login_id) => {

    return new Promise((resolve, reject) => {
        var sql = `UPDATE mark_color_sort.login_db SET JWTKEY = ("${authkey}") WHERE User_Name = ("${login_id}") `;
        pool.query(sql, (error, result) => {

            if (error) {
                return reject(error);
            }
            return resolve("success" + result);
        });
    });

};
//let db1 = {};

db.getAllAddTicketcustomerTbl = (millname,address,mob,model) => {

    return new Promise((resolve, reject) => {
        var sql = `INSERT INTO  mark_color_sort.customer_details (Mill_Name,Address,Mob_No,Machine_Model) VALUES ("${millname}","${address}","${mob}","${model}")`;
        
        pool.query(sql, (error, result) => {

            if (error) {
                return reject(error);
            }
            return resolve("success" + result);
        });
    });
}

db.uploadImage = (img,TicketNo) => {

    return new Promise((resolve, reject) => {
        var sql = `UPDATE mark_color_sort.tickets_log SET Report = "${img}" WHERE Ticket_No = "${TicketNo}" `;
        
        pool.query(sql, (error, result) => {

            if (error) {
                return reject(error);
            }
            return resolve("success" + result);
        });
    });
}

db.getAllAddTicketLogTbl = (millname,address,model) => {

    return new Promise((resolve, reject) => {
        var sql1 = `INSERT INTO  mark_color_sort.tickets_log (Mill_Name,address,Machine_Model) VALUES ("${millname}","${address}","${model}")`;
        pool.query(sql1, (error, result) => {

            if (error) {
                return reject(error);
            }
            return resolve("success" + result);
        });
    });
}

db.getAllCustomer = () => {
    return new Promise((resolve, reject) => {
        var sql = `SELECT * FROM mark_color_sort.customer_details where status = 'O'`;
        pool.query(sql, (error, details) => {
            if (error) {
                return reject(error);
            }
            return resolve(details);
        });
    });
};


db.getOpenTicket = () => {
    return new Promise((resolve, reject) => {
        var sql = `SELECT * FROM mark_color_sort.tickets_log where Status = "O"`;
        pool.query(sql, (error, details) => {
            if (error) {
                return reject(error);
            }
            return resolve(details);
        });
    });
};

db.updateTicketLogTbl = (TicketNo,Materials,Amt,callstatus,doservice) => {

    return new Promise((resolve, reject) => {
        var sql = ` UPDATE mark_color_sort.tickets_log SET Changed_Materials = "${Materials}" , Payment = "${Amt}",Status = "${callstatus}" WHERE Ticket_No = "${TicketNo}" `;
        pool.query(sql, (error, result) => {

            if (error) {
                return reject(error);
            }
            return resolve("success" + result);
        });
    });
}

db.updateCostomerTbl = (TicketNo,callstatus) => {

    return new Promise((resolve, reject) => {
        var sql = ` UPDATE mark_color_sort.customer_details SET Status = "${callstatus}" WHERE ID = "${TicketNo}" `;
        pool.query(sql, (error, result) => {

            if (error) {
                return reject(error);
            }
            return resolve("success" + result);
        });
    });
}

db.selectCustomerTicket = (millName,address) => {

    return new Promise((resolve, reject) => {
        var sql = ` SELECT A.Mill_Name , A.address , A.Machine_Model , A.Complaint_Date , A.Close_date , A.Service_Charge FROM mark_color_sort.tickets_log as A join mark_color_sort.customer_details as B where A.Mill_Name = "${millName}" && B.Mill_Name = "${millName}" AND A.address = "${address}" && B.Address = "${address}" AND B.ID = A.Ticket_No`;
        console.log("ticketcheck"+sql);
        pool.query(sql, (error, result) => {
            if (error) {
                return reject(error);
            }
            return resolve(result);
        });
    });
}

db.selectTicketDetails = (millName,address) => {

    return new Promise((resolve, reject) => {
        var sql = ` SELECT * FROM mark_color_sort.tickets_log A join mark_color_sort.customer_details B where A.Mill_Name = "${millName}" && B.Mill_Name = "${millName}" AND A.address = "${address}" && B.Address = "${address}"`;
        console.log("ticketcheck"+sql)
        pool.query(sql, (error, result) => {

            if (error) {
                return reject(error);
            }
            return resolve("success" + result);
        });
    });
}

db.getAllAuthKey = (username) => {
    return new Promise((resolve, reject) => {
        var sql = `SELECT JWTKEY FROM mark_color_sort.login_db where User_Name = "${username}"`;
        pool.query(sql, (error, details) => {
            if (error) {
                return reject(error);
            }
            return resolve(details);
        });
    });
};


module.exports = db;
//module.exports = db1;