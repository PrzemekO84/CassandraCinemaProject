## Opis projektu
   
Cassandra Cinema to aplikacja umożliwiająca rezerwację biletów na seanse filmowe. Wykorzystuje Node.js, Express oraz bazę danych Apache Cassandra. Serwer obsługuje operacje związane z użytkownikami, filmami, seansami oraz rezerwacjami.

Aplikacja działa w kontenerze Docker, co ułatwia zarządzanie bazą danych.

## Technologie
   
- Backend: Javascript, Node.js, Express

- Frontend: HTML, CSS

- Baza danych: Apache Cassandra

- Autoryzacja: JWT (JSON Web Token)

- Zarządzanie bazą: CQL (Cassandra Query Language)

- Konteneryzacja: Docker

## Instalacja
   
Wymagania:
Zainstalowany Docker
Node.js i npm

![image](https://github.com/user-attachments/assets/04b5ba84-93c8-4317-9660-3977f998ccca)

## Struktura projektu

- Główne foldery i ich przeznaczenie:

### 📂 Project Structure - CASSANDRACINEMAPROJECT

### **Main Folders and Their Purpose**

- 📁 **CSS/** *(Design stron oraz podstron)*
  - 🎨 imageSlider.css
  - 🎨 registerLogin.css
  - 🎨 repertoire.css
  - 🎨 reservation.css
  - 🎨 styles.css

- 📁 **Htmls/** *(Indexy HTML)*
  - 📄 Bar.html
  - 📄 index.html
  - 📄 Login.html
  - 📄 Movies.html
  - 📄 Register.html
  - 📄 Repertoire.html
  - 📄 Reservation.html

- 📁 **Images/** *(Obrazy dla strony)*

- 📁 **JavaScript/** *(Logika aplikacji)*
  - ⚙️ app.js *(Główne działanie aplikacji)*
  - ⚙️ cassandraServer.js *(Działanie Serwera)*

- 📁 **node_modules/** *(Dependencies folder)*

- 📄 **dataBaseCode.cql** *(Opis bazdy danych)*
- 🔑 **key.env** *(Klucz JWTR)*
- 📦 **package-lock.json**
- 📦 **package.json** *(Project dependencies)*


### Struktura bazy danych

#### Tabela users

![image](https://github.com/user-attachments/assets/38f684f6-0154-4e34-8217-df65b4b3f697)

![image](https://github.com/user-attachments/assets/6970b150-85d3-4df3-8a42-68e56e5d2aea)

#### Tabela movies

![image](https://github.com/user-attachments/assets/5b7e8393-1cfb-4dce-b32d-bc71649be4ae)

![image](https://github.com/user-attachments/assets/2cdc2e7d-8883-429d-9f98-a083af6d7c2c)

#### Tabela screenings

![image](https://github.com/user-attachments/assets/fb7da3ee-0ab2-4e45-9056-12615c539395)

![image](https://github.com/user-attachments/assets/76813a58-c140-45ba-892b-11b0ebacc1aa)

#### Table reservations

![image](https://github.com/user-attachments/assets/7b6c27b2-67a1-4bb0-81b5-11df09265045)

![image](https://github.com/user-attachments/assets/bcc92b7f-0e9d-4869-b5b2-19eeb1073ac4)

## Działanie

## Autorzy i kontakt
📌 Autor: 
