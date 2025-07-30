import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Scanner;

public class ContactManager {
    private final List<Contact> contacts = new ArrayList<>();
    private final Scanner scanner = new Scanner(System.in);

    private void printIntroduction() {
    System.out.println("""
            ========================================
            Technologies & Features Used:
            - Stream API (Java 8): to filter/search/display contact list
            - Optional (Java 8): to avoid null checks
            - Lambda expressions (Java 8): to handle menu actions
            - forEach() (Java 8): to loop through contact list
            - Text Blocks : to display multiline menu
            - record: to define immutable Contact model
            - Switch expressions : for clean menu control
            ========================================
            """);
    }

    public void run() {
        printIntroduction();
        while (true) {
            showMenu();
            String input = scanner.nextLine();
            int choice = -1;

            try {
                choice = Integer.parseInt(input);
            } catch (NumberFormatException ignored) {}

            if (choice >= 0 && choice <= 5) {
                getMenuAction(choice).run();
            } else {
                System.out.println("Thank you for using the program.");
                break;
            }
        }
    }

    private void showMenu() {
        System.out.println("""
                ===== MENU =====
                0. Add dummy contacts
                1. Show all contacts
                2. Search contact by ID
                3. Add new contact
                4. Edit contact
                5. Delete contact
                Please choose an option :""");
    }

    private Runnable getMenuAction(int choice) {
        return switch (choice) {
            case 0 -> this::addDummyContacts;
            case 1 -> this::showContacts;
            case 2 -> this::searchContact;
            case 3 -> this::addContact;
            case 4 -> this::editContact;
            case 5 -> this::deleteContact;
            default -> () -> {};
        };
    }

    private void showContacts() {
        if (contacts.isEmpty()) {
            System.out.println("The contact list is empty.");
        } else {
            contacts.forEach(System.out::println);
        }
    }

    private void searchContact() {
        System.out.print("Enter the contact ID to search: ");
        String id = scanner.nextLine();
        Optional<Contact> found = findById(id);
        found.ifPresentOrElse(
            System.out::println,
            () -> System.out.println("No contact found.")
        );
    }

    private void addContact() {
        System.out.print("Enter ID: ");
        String id = scanner.nextLine();

        if (findById(id).isPresent()) {
            System.out.println("Contact with this ID already exists!");
            return;
        }

        System.out.print("Enter name: ");
        String name = scanner.nextLine();
        System.out.print("Enter phone number: ");
        String phone = scanner.nextLine();
        System.out.print("Enter email: ");
        String email = scanner.nextLine();

        contacts.add(new Contact(id, name, phone, email));
        System.out.println("Contact added successfully.");
    }

    private void editContact() {
        System.out.print("Enter the contact ID to edit: ");
        String id = scanner.nextLine();
        Optional<Contact> contactOpt = findById(id);

        if (contactOpt.isEmpty()) {
            System.out.println("Contact not found.");
            return;
        }

        Contact old = contactOpt.get();

        System.out.print("Enter new name [" + old.name() + "]: ");
        String name = scanner.nextLine();
        System.out.print("Enter new phone number [" + old.phone() + "]: ");
        String phone = scanner.nextLine();
        System.out.print("Enter new email [" + old.email() + "]: ");
        String email = scanner.nextLine();

        Contact updated = new Contact(
            old.id(),
            name.isEmpty() ? old.name() : name,
            phone.isEmpty() ? old.phone() : phone,
            email.isEmpty() ? old.email() : email
        );

        contacts.remove(old);
        contacts.add(updated);
        System.out.println("Contact updated successfully.");
    }

    private void deleteContact() {
        System.out.print("Enter the contact ID to delete: ");
        String id = scanner.nextLine();
        Optional<Contact> found = findById(id);

        if (found.isPresent()) {
            contacts.remove(found.get());
            System.out.println("Contact deleted.");
        } else {
            System.out.println("Contact not found.");
        }
    }

    private Optional<Contact> findById(String id) {
        return contacts.stream()
            .filter(c -> c.id().equalsIgnoreCase(id))
            .findFirst();
    }

    private void addDummyContacts() {
    List<Contact> dummyList = List.of(
        new Contact("C001", "Alice Johnson", "0123456789", "alice@gmail.com"),
        new Contact("C002", "Bob Smith", "0987654321", "bob@yahoo.com"),
        new Contact("C003", "Charlie Brown", "0356742311", "charlie@outlook.com")
    );

    int addedCount = 0;

    for (Contact dummy : dummyList) {
        boolean exists = contacts.stream()
            .anyMatch(existing -> existing.id().equalsIgnoreCase(dummy.id()));

        if (!exists) {
            contacts.add(dummy);
            addedCount++;
        }
    }

    System.out.printf("Added %d new dummy contacts (skipped existing ones).\n", addedCount);
}


}
