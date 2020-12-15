# HAccounting
## Introduction

A microservice designed to provide basic accounting abilities. It includes a client management system as well as 
a project management system. The project management system allows the creation of quotes and invoices for a client.
Each project contains a set of tasks with estimated and actual hours.

## Usage

### Clients

- GET `/clients` - return a list of all clients
- POST `/clients` - create a new client
- GET `/clients/{id}` - get a client
- PUT `/clients/{id}` - update a client
- DELETE `/clients/{id}` - delete a client
- GET `/clients/{id}/projects` - return a list of all projects for a given client

#### Sample Request

```
{
	"name": "Henry Walters Development",
	"rate": 140,
	"contactName": "Henry Walters",
	"contactEmail": "me@henrywalters.dev",
	"phone": "313-867-5309",
	"billingAddress": {
		"address": "123 Sample Ln",
		"city" : "Detroit",
		"state": "Michigan",
		"areaCode": "48017",
		"country": "USA"
	},
	"shippingAddress": {
		"address": "123 Sample Ln",
		"city" : "Detroit",
		"state": "Michigan",
		"areaCode": "48017",
		"country": "USA"
	}
}
```

### Projects

- GET `/projects` - return a list of all projects
- POST `/projects` - create a new project
- GET `/projects/{id}` - get a project
- PUT `/projects/{id}` - update a project
- DELETE `/projects/{id}` - delete a project
- GET `/projects/{id}/tasks` - return a list of all project tasks
- GET `/projects/{id}/quote` - return a PDF of the quote
- GET `/projects/{id}/invoice` - return a PDF of the invoice

#### Sample Request

```
{
	"clientId": "123456-1234-1234-1233456",
	"name": "Sample Project",
	"description": "A sample project",
	"status": "Lead" // Or "Quoted", "Invoiced" or "Paid"
}
```

### Tasks

- GET `/project-tasks/` - return a list of all tasks
- POST `/project-tasks/` - create a new task for a project
- GET `/project-tasks/{id}` - get a task
- PUT `/project-tasks/{id}` - update a task
- DELETE `/project-tasks/{id}` - delete a task

#### Sample Request

```
{
	"projectId": "123456-1234-1234-123456",
	"complete": false,
	"name": "Update backend",
	"description": "Update the backend for the sample project",
	"estimatedHours": 100,
	"actualHours": 5 // Nice performance
}
```