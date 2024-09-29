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


## Screenshots Demonstrating the Execution of the Application
&nbsp;  &nbsp;  &nbsp; 
 ## User Registration Page
 &nbsp;  &nbsp;  &nbsp; 
 ![Registration](https://github.com/user-attachments/assets/6d91e36c-7295-42b6-8a04-fb8341455c79)
 &nbsp;  &nbsp;  &nbsp;  

  ## User Login Page
  &nbsp;  &nbsp;  &nbsp; 
 ![Login](https://github.com/user-attachments/assets/db103fd6-265d-4abb-9375-48f8018d582d)
&nbsp;  &nbsp;  &nbsp; 

  ## Home Page
  &nbsp;  &nbsp;  &nbsp; 
 ![Home](https://github.com/user-attachments/assets/8578a30a-2e77-4803-8a18-6965e676dcb6)
&nbsp;  &nbsp;  &nbsp; 
  ## Admin Dashboard
  &nbsp;  &nbsp;  &nbsp;
 ![Admin1 jgp](https://github.com/user-attachments/assets/7951a1af-0188-409c-8c99-70932b625a68)
&nbsp;  &nbsp;  &nbsp; 
 ![Admin2 jgp](https://github.com/user-attachments/assets/a970d37b-4dcd-40e2-b490-7f81909ffc33)
&nbsp;  &nbsp;  &nbsp; 
 ![Admin3 jgp](https://github.com/user-attachments/assets/74250060-dbe2-470d-88a2-d22e91c56070) 
&nbsp;  &nbsp;  &nbsp; 
 ![Admin4 jgp](https://github.com/user-attachments/assets/324e0a2e-61b8-4ec1-abfa-cc4f3bf458f8)
&nbsp;  &nbsp;  &nbsp; 
 ![Admin5 jgp](https://github.com/user-attachments/assets/6b504c87-5244-46db-8bff-22dac3cff4f4)
&nbsp;  &nbsp;  &nbsp; 
  ## Agent Dashboard
  &nbsp;  &nbsp;  &nbsp;
![image](https://github.com/user-attachments/assets/06890f9a-dba5-48a9-a1dd-b46df65b7d7c)
&nbsp;  &nbsp;  &nbsp;
 ![Agent1 jgp](https://github.com/user-attachments/assets/bbfdf1bd-7223-4329-9d9e-31180c5f7477)
&nbsp;  &nbsp;  &nbsp;  
 ![Agent2jpg](https://github.com/user-attachments/assets/926fa7d1-08e2-4236-b7c8-d42807c0ee2d)
&nbsp;  &nbsp;  &nbsp; 

  ## Customer Dashboard
  &nbsp;  &nbsp;  &nbsp;
  ![image](https://github.com/user-attachments/assets/98ab35e7-736b-4d12-be6a-d9dab21a6579)

  &nbsp;  &nbsp;  &nbsp;
 ![Customer1](https://github.com/user-attachments/assets/cb47ddbc-dcc0-4cb7-b247-694a006bd033)
&nbsp;  &nbsp;  &nbsp; 
 ![Customer2](https://github.com/user-attachments/assets/d7965237-33fd-4f6b-8b91-e5b2f7d2492e)
&nbsp;  &nbsp;  &nbsp; 
 ![Customer3](https://github.com/user-attachments/assets/79eda46c-0b93-4ba5-95d6-88b1047c223d)
&nbsp;  &nbsp;  &nbsp; 
 ![Customer4](https://github.com/user-attachments/assets/3ac6296c-6252-40e0-8ba3-3f97b6a50c10)
&nbsp;  &nbsp;  &nbsp; 
 ![Customer5](https://github.com/user-attachments/assets/2fd92cc4-0dae-4fb1-a0bd-442eef37b7c4)
&nbsp;  &nbsp;  &nbsp; 
 ![Customer6](https://github.com/user-attachments/assets/3ef5cc26-6bf2-4520-80f8-1ddd168309b0)




## Conclusion
The Online Health Insurance Management System (OHIMS) enhances health insurance management through a user-friendly interface and robust security. It is scalable and capable of integrating with additional services.

## Future Enhancements
- Integration with payment gateways.
- Development of a mobile application.
- Advanced analytics for better decision-making.

## GitHub Link
[GitHub Repository](https://github.com/Arun-hash30/onlinehealthinsurencemanagementsystem/tree/master)
