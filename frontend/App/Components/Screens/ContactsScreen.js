import { useEffect, useState } from "react";
import * as Contacts from "expo-contacts";
import List from "../Common/List";
import ContactListElement from "../Contact/ContactListElement";

function ContactsScreen() {
  const [contacts, setContacts] = useState();
  useEffect(() => {
    getContacts();
  }, []);
  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === "granted") {
      const { data } = await Contacts.getContactsAsync();
      setContacts(
        data
          .map((contact) => {
            let number = contact.phoneNumbers && contact.phoneNumbers[0].number;
            if (number) {
              number = number.trim();
              number = number.replace("+91", "");
              number = number.replace(/-/g, "");
              number = number.replace(/\s+/g, "");
            }
            return {
              id: contact.id,
              name: contact.name,
              number,
            };
          })
          .filter((contact) => contact.number)
          .sort((a, b) => {
            if (a.name < b.name) {
              return -1;
            } else if (a.name > b.name) {
              return 1;
            } else {
              return 0;
            }
          })
      );
    }
  };
  return <List data={contacts} Component={ContactListElement} />;
}

export default ContactsScreen;
