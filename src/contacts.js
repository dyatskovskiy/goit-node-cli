const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.resolve("./db/contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);

  return contacts;
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }

  return contacts[index];
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }

  const removedContact = contacts[index];
  contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 1));

  return removedContact;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();

  const newContact = {
    id: uuidv4(),
    name: name,
    email: email,
    phone: phone,
  };

  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 1));

  return newContact;
}

module.exports = { listContacts, getContactById, removeContact, addContact };
