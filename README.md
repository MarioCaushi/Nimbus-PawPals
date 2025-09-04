![React](https://img.shields.io/badge/React.js-2023-blue?logo=react&logoColor=white)
![.NET](https://img.shields.io/badge/.NET-6-purple?logo=dotnet&logoColor=white)
![CSharp](https://img.shields.io/badge/C%23-10-green?logo=csharp&logoColor=white)
![SQL](https://img.shields.io/badge/SQL-Database-orange?logo=postgresql&logoColor=white)
![Project](https://img.shields.io/badge/Project-Capstone-blueviolet)
![Domain](https://img.shields.io/badge/Domain-Pet%20Care-lightblue)
![Status](https://img.shields.io/badge/Status-Completed-success)
![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)


# 🐾 Nimbus' PawPals – Pet Store & Clinic Management System

**Nimbus’ PawPals** is a full-stack, role-based web platform designed to manage the operational needs of a pet store and veterinary clinic. It supports tailored interfaces for Managers, Receptionists, Doctors, Groomers, and Clients—combining product sales, medical records, grooming services, hotel bookings, feedback handling, and analytics in one unified solution.

---

##  Features

-  Role-based session authentication
-  Tailored dashboards for each user role
-  Pet health records and appointment scheduling
-  Grooming coordination with staff availability
-  Product inventory, cart, and order history
-  Staff and client management interfaces
-  Hotel booking system with capacity control
-  Business analytics and feedback response system

---

## Tech Stack

**Frontend**
- [React.js (Vite)](https://vitejs.dev/)
- [Axios](https://axios-http.com/)
- [Bootstrap 5](https://getbootstrap.com/) + Custom CSS

**Backend**
- [.NET 8 (ASP.NET Core Web API)](https://dotnet.microsoft.com/)
- [Entity Framework Core](https://learn.microsoft.com/en-us/ef/)
- [MySQL 8+](https://www.mysql.com/)

**Architecture**
- RESTful API communication
- Separate client/server projects
- MySQL schema provided in `/Back_End/`

##  Setup Instructions

###  Prerequisites

- [.NET 8 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/8.0)
- [Node.js v18+](https://nodejs.org/)
- [MySQL 8+](https://dev.mysql.com/downloads/mysql/)


###  Backend Setup

1. cd Back_End
2. Open appsettings.json and insert your MySQL connection string.
3. Create the database using the nimbus_pawpals_schema.sql script.
4. Start the backend: dotnet run

###  Frontend Setup

1. cd Front_End
2. Create a .env file and include the backend API URL: VITE_API_URL=http://localhost:5067
3. Install dependencies and start the frontend:

###  Database

1. The complete MySQL schema is included in the Back_End/ folder.
2. It defines all entities, relations, constraints, and sample data as per project specifications.


## Contributors

| Name            | Role                                 |
|-----------------|--------------------------------------|
| Mario Caushi    | Frontend development, documentation  |
| Debora Hoxhaj   | Backend development, documentation   |
| Adela Kushta    | Database design, documentation       |
| Megi Muci       | Specification and reporting          |
| Pellumb Cela    | Specification and reporting          |
| Jona Alushaj    | Specification and reporting          |

## Documentation

The full system documentation, including:

- Functional and non-functional requirements  
- Use case diagrams and user flows  
- Behavioral diagrams and system architecture  
- Detailed explanation of each system module  

...is included in the [`RequirementsReport_FINAL.pdf`](RequirementsReport_FINAL.pdf) file in the repository.

## License

This project is licensed under the MIT License.  
See the [LICENSE](LICENSE) file for details.


