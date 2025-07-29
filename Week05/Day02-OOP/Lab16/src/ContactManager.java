import java.util.ArrayList;
import java.util.Scanner;

public class ContactManager {
    private static final ArrayList<Contact> contacts = new ArrayList<>();
    private static final Scanner scanner = new Scanner(System.in);

    public static void main(String[] args) {
        addDummyData();
        while (true) {
            showMenu();
            String choice = scanner.nextLine();
            switch (choice) {
                case "1":
                    showAllContacts();
                    break;
                case "2":
                    searchContactById();
                    break;
                case "3":
                    addContact();
                    break;
                case "4":
                    updateContact();
                    break;
                case "5":
                    deleteContact();
                    break;
                default:
                    System.out.println("Thank you for using the program!");
                    return;
            }
        }
    }
    
    public static void addDummyData() {
        contacts.add(new Contact("C001", "Alice Johnson", "1234567890", "alice@example.com", "New York"));
        contacts.add(new Contact("C002", "Bob Smith", "0987654321", "bob@example.com", "California"));
        contacts.add(new Contact("C003", "Charlie Brown", "1122334455", "charlie@example.com", "Texas"));
    }

    public static void showMenu() {
        System.out.println("\n====== CONTACT MENU ======\n");
        System.out.println("1. Show all contacts");
        System.out.println("2. Search contact by ID");
        System.out.println("3. Add new contact");
        System.out.println("4. Update contact");
        System.out.println("5. Delete contact");
        System.out.print("\n=> Please choose an option: ");
    }

    public static void showAllContacts() {
        if (contacts.isEmpty()) {
            System.out.println("Contact list is empty.");
        } else {
            for (Contact contact : contacts) {
                contact.display();
            }
        }
    }

    public static void searchContactById() {
        System.out.print("Enter contact ID to search: ");
        String id = scanner.nextLine();
        for (Contact contact : contacts) {
            if (contact.getId().equalsIgnoreCase(id)) {
                contact.display();
                return;
            }
        }
        System.out.println("Contact with ID \"" + id + "\" not found.");
    }

    public static void addContact() {
        System.out.print("Enter ID: ");
        String id = scanner.nextLine();
        System.out.print("Enter name: ");
        String name = scanner.nextLine();
        System.out.print("Enter phone: ");
        String phone = scanner.nextLine();
        System.out.print("Enter email: ");
        String email = scanner.nextLine();
        System.out.print("Enter address: ");
        String address = scanner.nextLine();

        contacts.add(new Contact(id, name, phone, email, address));
        System.out.println("New contact added successfully!");
    }

    public static void updateContact() {
        System.out.print("Enter contact ID to update: ");
        String id = scanner.nextLine();
        for (Contact contact : contacts) {
            if (contact.getId().equalsIgnoreCase(id)) {
                System.out.print("Enter new name: ");
                contact.setName(scanner.nextLine());
                System.out.print("Enter new phone: ");
                contact.setPhone(scanner.nextLine());
                System.out.print("Enter new email: ");
                contact.setEmail(scanner.nextLine());
                System.out.print("Enter new address: ");
                contact.setAddress(scanner.nextLine());
                System.out.println("Contact updated successfully!");
                return;
            }
        }
        System.out.println("Contact with ID \"" + id + "\" not found.");
    }

    public static void deleteContact() {
        System.out.print("Enter contact ID to delete: ");
        String id = scanner.nextLine();
        for (Contact contact : contacts) {
            if (contact.getId().equalsIgnoreCase(id)) {
                contacts.remove(contact);
                System.out.println("Contact deleted successfully!");
                return;
            }
        }
        System.out.println("Contact with ID \"" + id + "\" not found.");
    }
}
