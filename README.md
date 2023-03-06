# RFID-Reader-App-mobile

Project developed for a bus company to control passengers using rfid card.

An ESP32 was used along with an RFID reader MRFC522 and the app used Cordova and javascript and jQuery.

As the reader will be placed on a bus, the validation will be done by a local database in the app, using SQLite. The app queries the server for updates, but the validation is only on the local database, to avoid errors when using an online server for validation.

<h2>How it works:</h2>

When passing the card through the rfid reader, the ESP32 reads it and sends it via Wifi to the app, which receives the data and queries it directly in the local SQLite.

When the passenger is found, his photo, his name and the company he works for are displayed.

If the passenger is not found at the local database, an error message will be displayed, denying access.

All updates performed on the server are replicated on all readers, as the reader searches for updates in a time interval.

<h3>Hardware used:</h3>
- Esp32
- RFID reader MRFC522

<h3>Software:</h3>
- Cordova
- Javascript
- jQuery
- Ajax
- SQLite Database
- C++ (Esp32)
- C# (Server)

<h2>Operation:</h2>

- Enter the admin and register a passenger
- Send a photo and inform the name and company
- Click save
- The app checks the server for updates every 30 seconds
- When a new passenger is registered, the app is updated and saves the data in a local database
- When getting on the bus, the passenger passes the RFID card over the reader, which sends the data to the app via Wifi
- The app searches the passenger id in the local database and returns the photo and data
- If the id is not found, the app returns a denial screen.

It is not necessary to have an internet signal to validate the RFID card since this validation is done directly in the local database.

If it were to depend on the 4G signal to query the server, there are places with shadow areas where the 4G signal does not work, so it would not be possible to validate the RFID card, so the local database is always kept up to date.

<h2>Example of operation</h2>
<br>

https://user-images.githubusercontent.com/28272136/221397336-95cabc65-3735-431e-b69e-d4cfbcca2bd7.mp4

