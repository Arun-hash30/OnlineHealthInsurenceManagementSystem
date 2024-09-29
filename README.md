# Online Health Insurance Management System (OHIMS)

## Description
The Online Health Insurance Management System (OHIMS) is a web-based application developed using Spring Boot, aimed at automating health insurance management processes. It features user management, policy management, claim submissions, and document handling.

## Key Functionalities
1. **User Management**:
   - Users can register and log in to the system.
   - Roles and permissions are managed using Spring Security.
   - Password encryption and authentication mechanisms are implemented.

2. **Policy Management**:
   - Customers can browse and compare health insurance policies.
   - Administrators can create, update, and delete policies.
   - Agents can assist customers with policy selection.

3. **Claim Management**:
   - Users can submit claims for medical benefits.
   - Claims are verified and processed by administrators.
   - Users receive notifications about claim status.

4. **Document Handling**:
   - Users can upload documents during registration and claim submission.
   - Documents are securely stored in the system.

5. **Notifications**:
   - Email notifications ensure timely communication with users.

6. **Admin Dashboard**:
   - A dedicated interface for managing users, policies, and claims.

## Technologies Used
- **Front-End**: React.js
- **Back-End**: Spring Boot
  - Spring Security
  - Spring Data JPA
  - Spring MVC
  - Hibernate
- **Database**: MySQL

## Workflow
1. **User Registration and Login**:
   - Users sign up and log in based on their roles (customer, agent, admin).

2. **Roles & Responsibilities**:
   | Role   | Responsibilities                              |
   |--------|-----------------------------------------------|
   | Admin  | Manage users, policies, and claims            |
   | Customer | Browse policies, purchase health insurance, file claims, check claim status |
   | Agent  | Assist clients, view policies, manage claims   |

## API Endpoints
### Authentication APIs
- **Register a User**: `POST http://localhost:8080/api/auth/register`
- **Login a User**: `POST http://localhost:8080/api/v1/auth/login`

### ADMIN Role
- **Create Policies**: `POST http://localhost:8080/api/admin/create-policies`
- **Manage Policies**: `GET http://localhost:8080/api/customer/policies`
- **Update Policies**: `PUT http://localhost:8080/api/admin/id`
- **Delete Policies**: `DELETE http://localhost:8080/api/admin/id`
- **Manage Users**: `GET http://localhost:8080/api/admin/users`
- **Delete Users**: `DELETE http://localhost:8080/api/admin/users/{id}`
- **Manage Claims**: `GET http://localhost:8080/api/agent/claims`
- **Claims**: `GET http://localhost:8080/api/agent/claims/policynum/claimNumber`

### CUSTOMER Role
- **Upload Supporting Docs**: `POST http://localhost:8080/api/files1/upload`
- **Claims**: `GET http://localhost:8080/api/customer/claims`
- **Claim Status Check**: `GET http://localhost:8080/api/customer/claims/claimnum`

### AGENT Role
- **Claims**: `GET http://localhost:8080/api/agent/claims`
- **Claim Check**: `GET http://localhost:8080/api/agent/claims/{id}`
- **Users**: `GET http://localhost:8080/api/agent/users`
- **Policies**: `GET http://localhost:8080/api/agent/policies`

## Conclusion
The Online Health Insurance Management System (OHIMS) enhances health insurance management through a user-friendly interface and robust security. It is scalable and capable of integrating with additional services.

## Future Enhancements
- Integration with payment gateways.
- Development of a mobile application.
- Advanced analytics for better decision-making.

## GitHub Link
[GitHub Repository](https://github.com/Arun-hash30/onlinehealthinsurencemanagementsystem/tree/master)
