# pull official base image
FROM node:12.2.0-alpine as build

# set working directory
WORKDIR /app

# add app
COPY . /app/

# install app dependencies
RUN npm install
RUN npm run build


# nginx preparaions
FROM nginx:1.15.8-alpine 
COPY --from=build /app/build/ /user/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d


EXPOSE 80

# start app
ENTRYPOINT ["nginx","-g", "daemon off;"] 




