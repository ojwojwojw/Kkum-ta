FROM nginx

WORKDIR /app

RUN mkdir ./build_device

ADD ./build ./build_device

RUN rm /etc/nginx/conf.d/default.conf

RUN rm /etc/nginx/nginx.conf

COPY ./default.conf /etc/nginx/conf.d/

COPY ./nginx.conf /etc/nginx/

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]