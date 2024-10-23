# Clone the repository
- git clone https://github.com/Dharma001/task-management-app.git
- cd task-management-app

# Set up backend
- cd api
- cp .env.example .env
- pnpm install
- pnpm prisma generate
- pnpm prisma:migrate
- pnpm run dev 

### Api tests are in mero-task-app.postman_collection   (POSTMAN)

- Set up frontend
- cd front
- pnpm install
- pnpm run dev
