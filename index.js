/* Your Code Here */
// Function 1: Create an Employee Record
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    return {
      firstName,
      familyName,
      title,
      payPerHour,
      timeInEvents: [],
      timeOutEvents: []
    };
  }
  
  // Function 2: Create Multiple Employee Records
  function createEmployeeRecords(employeeData) {
    return employeeData.map(record => createEmployeeRecord(record));
  }
  
  function createTimeInEvent(employeeRecord, dateTimeString) {
    if (!dateTimeString) {
      throw new Error("Invalid dateTimeString provided");
    }
  
    const [date, hour] = dateTimeString.split(" ");
    const timeInEvent = {
      type: "TimeIn",
      date: date,
      hour: parseInt(hour, 10)
    };
  
    employeeRecord.timeInEvents = employeeRecord.timeInEvents || [];
    employeeRecord.timeInEvents.push(timeInEvent);
  
    return employeeRecord;
  }
  
  function createTimeOutEvent(employeeRecord, dateTimeString) {
    if (!dateTimeString) {
      throw new Error("Invalid dateTimeString provided");
    }
  
    const [date, hour] = dateTimeString.split(" ");
    const timeOutEvent = {
      type: "TimeOut",
      date: date,
      hour: parseInt(hour, 10)
    };
  
    employeeRecord.timeOutEvents = employeeRecord.timeOutEvents || [];
    employeeRecord.timeOutEvents.push(timeOutEvent);
  
    return employeeRecord;
  }
  
  
  // Function 5: Calculate Hours Worked on a Given Date
  function hoursWorkedOnDate(employeeRecord, date) {
    const timeIn = employeeRecord.timeInEvents.find(event => event.date === date);
    const timeOut = employeeRecord.timeOutEvents.find(event => event.date === date);
  
    return (timeOut.hour - timeIn.hour) / 100;
  }
  
  // Function 6: Calculate Wages Earned on a Given Date
  function wagesEarnedOnDate(employeeRecord, date) {
    return hoursWorkedOnDate(employeeRecord, date) * employeeRecord.payPerHour;
  }
  
  // Function 7: Calculate All Wages for an Employee
  function  allWagesFor(employeeRecord) {
    const datesWorked = employeeRecord.timeInEvents.map(event => event.date);
    return datesWorked.reduce((total, date) => total + wagesEarnedOnDate(employeeRecord, date), 0);
  }
  
  // Function 8: Find Employee by First Name
  function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(employee => employee.firstName === firstName);
  }
  
  // Function 9: Calculate Payroll for All Employees
  function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((total, record) => total + allWagesFor(record), 0);
  }
  
  
  
/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

