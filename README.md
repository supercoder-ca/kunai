# kunai

> kunai

## requirements

* node.js v10.5+
* mongo
* linux v4.16+

## setup

---

install dependencies by casting `npm i`

---

customize and put this to `/etc/sysctl.d/net_highload_1.conf` (filename must accord `*.conf` wildcard):
```
net.netfilter.nf_conntrack_max=2097152
net.ipv4.tcp_fin_timeout=30
net.ipv4.ip_local_port_range=1024 65000
```

---

configure app by editing files inside `./config/`

---

build it by casting `npm run build`

---

make sure MongoDB is running and accessible with provided configuration

---

start in development/production by casting `npm run dev`/`npm start` accordingly

---

test it by casting `npm test`