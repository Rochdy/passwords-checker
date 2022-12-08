FROM node:18-alpine

# update packages
RUN apk update

# create root application folder
WORKDIR /app

# copy configs to /app folder
COPY package*.json ./
COPY tsconfig.json ./

COPY . .

# check files list
RUN ls -a

RUN npm install
RUN npm run build

EXPOSE 3000

CMD [ "npm", "run", "password:api" ]