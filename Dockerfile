FROM cypress/included

WORKDIR /app

COPY . .

RUN npm install
RUN npx cypress install

EXPOSE 3000

ENTRYPOINT ["npm", "run", "test"]