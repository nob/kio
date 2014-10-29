#!/bin/sh
#
# iptables off
#
/sbin/iptables -F
/sbin/chkconfig iptables off
/sbin/service iptables stop

#
# yum repository
#
rpm -ivh http://ftp-srv2.kddilabs.jp/Linux/fedora/epel/6/x86_64/epel-release-6-8.noarch.rpm
rpm -ivh http://dl.iuscommunity.org/pub/ius/stable/CentOS/6/x86_64/ius-release-1.0-13.ius.centos6.noarch.rpm
yum -y update

#
#  Timzone
#
cp -a /home/www/vhosts/kioto/vagrant/os/clock /etc/sysconfig/.
cp -a /usr/share/zoneinfo/Asia/Tokyo /etc/localtime
#
# ntp
#
yum -y install ntp
/sbin/chkconfig ntpd on
/sbin/service ntpd start

#
# php
#
yum -y install php php-cli php-pdo php-mbstring php-mysql php-devel php-bcmath php-common php-gd php-xml pcre-devel curl-devel php-pear php-pear-HTTP php-pear-HTTP-Request2 php-pear-Net-URL2 php-dom
pecl install pecl_http-1.7.5
pear upgrade --force HTTP HTTP_Request2 Net_URL2
cp -a /home/www/vhosts/kioto/vagrant/php/php.ini /etc/php.ini

#
# Apache
#
yum  -y install httpd mod_ssl
cp -a /home/www/vhosts/kioto/vagrant/httpd/httpd.conf /etc/httpd/conf/.
cp -a /home/www/vhosts/kioto/vagrant/httpd/conf.d/* /etc/httpd/conf.d/.
cp -a /home/www/vhosts/kioto/vagrant/httpd/certs/*  /etc/pki/tls/certs/.
cp -a /home/www/vhosts/kioto/vagrant/httpd/private/*  /etc/pki/tls/private/.
cp -a /home/www/vhosts/kioto/vagrant/httpd/init/*     /etc/init/
cp -a /home/www/vhosts/kioto/vagrant/httpd/hosts /etc/. && chmod 644 /etc/hosts
/sbin/service httpd restart
