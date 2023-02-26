# RFID-Reader-App-Cordova

Project developed for a bus company to control passengers using rfid card.

An ESP32 was used along with an RFID reader MRFC522 and the app used Cordova and javascript and jQuery.

As the reader will be placed on a bus, the validation will be done by a local database in the app, using SQLite. The app queries the server for updates, but the validation is only on the local database, to avoid errors when using an online server for validation.

How it works:

When passing the card through the rfid reader, the ESP32 reads it and sends it via Wifi to the app, which receives the data and queries it directly in the local SQLite.

When the passenger is found, his photo, his name and the company he works for are displayed.

If the passenger is not found at the local bank, an error message will be displayed, denying access.

All updates performed on the server are replicated on all readers, as the reader searches for updates in a time interval.


https://user-images.githubusercontent.com/28272136/221397336-95cabc65-3735-431e-b69e-d4cfbcca2bd7.mp4

