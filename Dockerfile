FROM nginx
# COPY ./public /usr/share/nginx/html
COPY ./certs /etc/nginx
COPY ./nginx_conf /etc/nginx
# FROM nginx
# COPY ./public /usr/share/nginx/html
# COPY ./certs /etc/nginx
# COPY ./nginx_conf /etc/nginx
