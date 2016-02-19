FROM hypriot/rpi-node

MAINTAINER chris elliott

RUN npm install -g body-parser@1.9.2 \
        express@4.10.1 \
        jade@1.11.0 \
        morgan@1.5.0 \
        basic-auth@1.0.0 \
        request@2.67.0

ENV NODE_PATH /usr/local/lib/node_modules/

ADD app /app

CMD node /app/server.js
