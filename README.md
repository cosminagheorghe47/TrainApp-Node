DESCRIERE:
<br>
Acest API permite dezvoltarea unei aplicații complete pentru gestionarea trenurilor, utilizând următoarele modele de date: Stație, Tren, User și Booking. Fiecare dintre aceste modele are asociate operațiuni CRUD (Create, Read, Update, Delete), permițând manipularea și gestionarea eficientă a datelor. API-ul oferă funcții de filtrare pentru toate entitățile, permițând utilizatorilor să găsească rapid informațiile necesare. Trenurile pot fi ordonate după data de plecare sau sosire, facilitând astfel planificarea călătoriilor.
<br>
<br>
Configurarea Fișierului .env
<br>
Pentru a permite conectarea la baza de date și configurarea corectă a aplicației, fișierul .env trebuie să conțină următoarele variabile:
<br>
DB_HOST: Adresa serverului de baze de date.
<br>
DB_PORT: Portul utilizat pentru conectarea la serverul de baze de date.<br>
DB_USER: Numele de utilizator pentru autentificare la baza de date.<br>
DB_PASSWORD: Parola corespunzătoare utilizatorului pentru baza de date.<br>
DB_NAME: Numele bazei de date utilizate de aplicație.<br>
<br>
Pornirea Aplicației<br>
Instalează Dependențele: npm install<br>
Pornește Aplicația: node index.js<br>
<br>
Exemplu Flow: 
</br>
1.Userul se inregistreaza, vede statiile si trenurile existente, ordonate de la cel care urmeaza cel mai curand, cauta trenul dorit in functie de statia de plecare si venire, face un booking la trenul dorit iar numarul de locuri disponibile de la acel tren scade.
</br>
2.Userul se conecteaza, isi vede toate bookingurile , isi schimba parola si username-ul, schimba rezervarea si numarul de locuri disponibile la fostul tren creste, iar cel de la trenul nou scade.
<br>
Diagrama:
<br>
![Screenshot 2024-05-24 192353](https://github.com/cosminagheorghe47/TrainApp-Node/assets/101595151/df20ecce-b5ae-45ca-b075-cb620f64e2e5)
<br>
FlowChart:
![image](https://github.com/cosminagheorghe47/TrainApp-Node/assets/101595151/8fe83dd9-9228-4d73-a1ac-28608ffdfe3b)
<br>
Documentatie API:
<br>
https://documenter.getpostman.com/view/35038361/2sA3QqfYLz
