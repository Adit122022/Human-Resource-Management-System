const express = require('express');
 const cors = require('cors')
const app = express();

app.set('view engine', 'ejs');
app.set('views', "./src/views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({origin:'http://localhost:5173',  credentials: true  }))

const auth = require('./routes/auth.route');
const employee = require('./routes/employee.route');
const attendanceRoutes = require('./routes/attendence.route');
const leaveRoutes = require('./routes/leave.route');
 const adminHrpannel = require('./routes/admin.routes')

app.use('/api/auth', auth);
app.use('/api/employees', employee)  
app.use('/api/adminpannel', adminHrpannel)  
app.use('/api/attendance', attendanceRoutes);
app.use('/api/leave', leaveRoutes);

module.exports = app;