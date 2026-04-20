FROM node:20-alpine

WORKDIR /app

# Ensure correct permissions for the node user
COPY --chown=node:node package*.json ./
RUN npm install

COPY --chown=node:node . .

EXPOSE 5000

# Run as non-root user for security
USER node

CMD ["npm", "start"]
