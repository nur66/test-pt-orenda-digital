# test-pt-orenda-digital
this is test for back-end

GUIDE FOR RUNNING PROGRAM

1. copy link github dibawah ini
	https://github.com/nur66/test-pt-orenda-digital.git

2. buka terminal pada direktori yang menjadi target folder project ini, jalankan perintah
	git clone https://github.com/nur66/test-pt-orenda-digital.git

3. buka xampp dan jalankan MySql

4. Buat database di mysql dengan nama "db_tes_pt_orenda_digital"

5. pada package.json buat seperti syntax di bawah untuk menjalankan nodemon
	"scripts": {
    		"start": "nodemon src/server.ts"
	},

6. buka terminal dan jalankan perintah npm start

#######################################################################################################################################################################

TEST POSTMAN

1. Register : POST /api/register
	http://localhost:2311/api/register  (karena port yang saya gunakan adalah 2311)

	Request body (raw)
	{
    	     "user": ["example1@email.com","example2@email.com"]
	}

2. Assign Task : POST /api/assign
	http://localhost:2311/api/assign

	Request body (raw)
	{
	    "user": "example1@email.com",
	    "tasks": ["buy eggs","buy milk"]
	}

3. List All : GET /api/tasks/common
	http://localhost:2311/api/tasks/common

	Request body (raw)
	{
	    "tasks": ["example1@email.com","example2@email.com"]
	}

4. Unassign Task : POST /api/unassign
	http://localhost:2311/api/unassign

	Request body (raw)
	{
	    "user": "example1@email.com",
	    "tasks": ["buy eggs"]
	}

Tambahan...

5. Delete User Cascade : DELETE /api/delete-user
	http://localhost:2311/api/delete-user

	Request body (raw)
	{
	    "user": "example1@email.com"
	}

6. Register Credential : POST /api/register-user
	http://localhost:2311/api/register-user

	Request body (raw)
	{
	    "name": "Lisa Mufia",
	    "email": "lisamufia23@gmail.com",
	    "password": "Allah.swt",
	    "confPassword": "Allah.swt"
	}

#######################################################################################################################################################################

DEPENDENCIES yang digunakan

"dependencies": {
    "@types/body-parser": "^1.19.2",
    "@types/cors": "^2.8.13",
    "@types/express": "^4.17.15",
    "@types/node": "^18.11.17",
    "bcrypt": "^5.1.0",
    "body-parser": "^1.20.1",
    "class-validator": "^0.14.0",
    "cors": "^2.8.5",
    "dotenv": "^16.0.3",
    "express": "^4.18.2",
    "jsonwebtoken": "^9.0.0",
    "mysql2": "^2.3.3",
    "nodemon": "^2.0.20",
    "reflect-metadata": "^0.1.13",
    "ts-node": "^10.9.1",
    "typeorm": "^0.3.11",
    "typescript": "^4.9.4"
  },
  "devDependencies": {
    "@types/bcrypt": "^5.0.0"
  }
