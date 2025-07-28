import java.util.Scanner;

public class FinancialCalculator {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        boolean isRunning = true;

        while (isRunning) {
            showMenu();

            System.out.print("=> Please choose a function [1->4]: ");
            String choice = scanner.nextLine();

            switch (choice) {
                case "1":
                    calculateElectricityBill(scanner);
                    break;
                case "2":
                    calculateTaxiFee(scanner);
                    break;
                case "3":
                    calculateSalary(scanner);
                    break;
                case "4":
                    calculateNetIncome(scanner);
                    break;
                default:
                    System.out.println("\nThank you for using the program!");
                    isRunning = false;
                    break;
            }
            System.out.println(); // Separator line
        }

        scanner.close();
    }

    public static void showMenu() {
        System.out.println("------ MENU ------");
        System.out.println("1. Calculate monthly electricity bill");
        System.out.println("2. Calculate monthly taxi fare (assume: 1 trip/month)");
        System.out.println("3. Calculate monthly salary (assume: 15% tax)");
        System.out.println("4. Calculate total income after monthly expenses");
    }

    public static void calculateElectricityBill(Scanner scanner) {
        System.out.print("Enter electricity usage (kWh): ");
        double kWh = Double.parseDouble(scanner.nextLine());

        double price = 0;
        if (kWh <= 50) {
            price = kWh * 1800;
        } else if (kWh <= 100) {
            price = 50 * 1800 + (kWh - 50) * 2200;
        } else {
            price = 50 * 1800 + 50 * 2200 + (kWh - 100) * 2700;
        }

        System.out.printf("===> Electricity bill: %.0f VND\n", price);
    }

    public static void calculateTaxiFee(Scanner scanner) {
        System.out.print("Enter distance (km) for one taxi trip: ");
        double km = Double.parseDouble(scanner.nextLine());

        double fee = 0;
        if (km <= 1) {
            fee = 15000;
        } else if (km <= 5) {
            fee = 15000 + (km - 1) * 13500;
        } else {
            fee = 15000 + 4 * 13500 + (km - 5) * 11000;
        }

        System.out.printf("===> Taxi fare: %.0f VND\n", fee);
    }

    public static void calculateSalary(Scanner scanner) {
        System.out.print("Enter gross salary: ");
        double grossSalary = Double.parseDouble(scanner.nextLine());

        double tax = grossSalary * 0.15;
        double netSalary = grossSalary - tax;

        System.out.printf("===> Net salary (after 15%% tax): %.0f VND\n", netSalary);
    }

    public static void calculateNetIncome(Scanner scanner) {
        System.out.print("Enter net salary: ");
        double netSalary = Double.parseDouble(scanner.nextLine());

        System.out.print("Enter electricity cost: ");
        double electricity = Double.parseDouble(scanner.nextLine());

        System.out.print("Enter taxi cost: ");
        double taxi = Double.parseDouble(scanner.nextLine());

        double netIncome = netSalary - electricity - taxi;

        System.out.printf("===> Total remaining income: %.0f VND\n", netIncome);
    }
}
