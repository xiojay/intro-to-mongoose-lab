const mongoose = require('mongoose');
const prompt = require('prompt-sync')();
const Customer = require('./models/customer');
require('dotenv').config();

//   const prompt = require('prompt-sync')();

const username = prompt('What is your name? ');

console.log(`Your name is ${username}`);

const mainMenu = () => {
  console.log("Welcome to the CRM\n")
  console.log("What would you like to do?")
  console.log("  1. Create a customer")
  console.log("  2. View all customers")
  console.log("  3. Update a customer")
  console.log("  4. Delete a customer")
  console.log("  5. Quit")

  const choice = prompt("Number of action to run: ")
  return choice;
};

const runApp = async () => {
  let exit = false
  while (!exit) {
    const action = mainMenu()
    switch (action) {
      case '1':
        await createCustomer()
        break;      case '2':
        await viewCustomers()
        break;      case '3':
        await updateCustomer()
        break;      case '4':
        await deleteCustomer()
        break;      case '5':
        exit = true
        break
      default:
        console.log('Invalid choice. Please try again.')
    }
  }

  mongoose.connection.close()
  console.log('exiting...')
};

const createCustomer = async () => {
  const name = prompt("What is the customer's name? ")
  const age = prompt("What is the customer's age? ")
  const newCustomer = new Customer({ name, age })
  await newCustomer.save()
  console.log('Customer created successfully.')
};

const viewCustomers = async () => {
  const customers = await Customer.find()
  console.log('Below is a list of customers:')
  customers.forEach(customer => {
    console.log(`id: ${customer._id} -- Name: ${customer.name}, Age: ${customer.age}`)
  })
};

const updateCustomer = async () => {
  const customers = await Customer.find()
  customers.forEach(customer => {
    console.log(`id: ${customer._id} -- Name: ${customer.name}, Age: ${customer.age}`)
  })
  
  const id = prompt("Copy and paste the id of the customer you would like to update here: ")
  const newName = prompt("What is the customer's new name? ")
  const newAge = prompt("What is the customer's new age? ")

  await Customer.findByIdAndUpdate(id, { name: newName, age: newAge })
  console.log('Customer updated successfully.')
};

const deleteCustomer = async () => {
  const customers = await Customer.find()
  customers.forEach(customer => {
    console.log(`id: ${customer._id} -- Name: ${customer.name}, Age: ${customer.age}`)
  })

  const id = prompt("Copy and paste the id of the customer you would like to delete here: ")
  await Customer.findByIdAndDelete(id)
  console.log('Customer deleted successfully.')
};

runApp();
