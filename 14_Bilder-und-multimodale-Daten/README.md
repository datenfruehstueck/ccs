---
title: "Netzwerke als Daten"
chapter: "14"
layout: default
permalink: /14-bilder-und-multimodale-daten/
---

## Trockenübungen

1. Sind Bilder und multimodale Inhalte ethisch anders zu bewerten? Weshalb (nicht)?
1. Welche beiden Formate von Bildern sind gängig?
1. Nach welchen vier grundsätzlichen Schritten erfolgt üblicherweise die Spracherkennung?
1. Die Erkennung von Videos kann nach drei unterschiedlichen Analyseverfahren erfolgen. Nach welchen?

## Praxisübungen

### Visuelle Daten

Um selbst mit visuellen Daten aktiv zu werden, bietet sich etwa der [MNIST-Datensatz](https://storage.googleapis.com/tensorflow/tf-keras-datasets/mnist.npz) an. Einen Einstieg etwa mit Random-Forest-Algorithmen für Python und R bieten [van Atteveldt, Trilling und Arcila](https://cssbook.net/content/chapter14.html#sec-shallow).

Um auf Dienstleistende zurückzugreifen, bieten sich folgende Einstiege an:

- Google [Vision API](https://cloud.google.com/vision/)
- Amazon [Rekognition](https://aws.amazon.com/de/rekognition/)
- Microsoft [Azure Vision](https://azure.microsoft.com/en-us/products/cognitive-services/vision-services)
- [Imagga](https://imagga.com/)
- Megvii [Face++](https://www.faceplusplus.com/)


### Audio-Daten

Um selbst aktiv zu werden, geben frei verfügbare Lösungen wie [Kaldi Speech Recognition](https://github.com/kaldi-asr/kaldi), [Mozilla Deepspeech](https://github.com/mozilla/DeepSpeech) oder [Mycroft](https://mycroft.ai/) (das kostenfrei als Software ist, aber kostenpflichtige Assistenzsysteme bietet) gute Anhaltspunkte. Als Datensätze bieten sich für den Einstieg [LibriSpeech](https://www.openslr.org/12) und [Mozilla Common Voice](https://commonvoice.mozilla.org/de) an. 

Als Dienstleistende bieten sich etwa an:

- Google [Text-to-Speech API](https://cloud.google.com/text-to-speech?hl=de)
- Amazon [Polly](https://aws.amazon.com/de/polly/)
- Microsoft [Speech](https://azure.microsoft.com/de-de/products/cognitive-services/speech-services)
- rev ai [Speech to Text API](https://www.rev.ai/)
- Dolby [Speech API](https://dolby.io/products/analyze/)
- Spotify [API](https://developer.spotify.com/documentation/web-api) für Infos zu Songs, Alben und Künstler:innen


### Audiovisuelle Daten

Selbst Modelle für die Klassifizierung von Videos zu trainieren, ist gerade im Einstiegsniveau der CCS nicht empfehlenswert. Wer es unbedingt versuchen will, findet mit [torchvision](https://pytorch.org/vision/stable/index.html) als Teil der [PyTorch](https://pytorch.org/)-Bibliothek für Python einen Startpunkt.

Stattdessen bieten sich einige Dienstleistende auch dafür an:

- Google [Vision API](https://cloud.google.com/vision/)
- Amazon [Rekognition](https://aws.amazon.com/de/rekognition/)
- Microsoft [Azure Vision](https://azure.microsoft.com/en-us/products/cognitive-services/vision-services)
- [Valossa](https://valossa.com/)
- [Ximilar](https://www.ximilar.com/all-services/#ready-to-use-recognition)


### Geo-Daten

Mit Geo-Daten zu arbeiten, ist vor allem eine manuelle Aufgabe der Datenzusammenführung und des Datenmanagements. Dafür gibt es zahlreiche Quellen, die es zu kennen gilt. Sie listen wir hier zunächst auf.

- Informationen zur Welt, etwa Bevölkerungszahlen, finden sich bei der [Weltbank](https://data.worldbank.org/) oder den [Vereinten Nationen](https://data.un.org/).
- Infos zu Deutschland finden sich beim [statistischen Bundesamt](https://www.destatis.de/DE/Themen/Laender-Regionen/Regionales/_inhalt.html), regionalere Infos auch bei den zahlreichen [statistischen Landesämtern](https://www.statistikportal.de/de/statistische-aemter) oder manchmal auch städtischen oder institutionellen Open-Data-Portalen, die bei [govdata](https://www.govdata.de/) gesammelt werden.
- Kartenmaterial und Verortungen sind auch über APIs zugänglich, etwa bei [Google Maps](https://developers.google.com/maps?hl=de) und [Google Routes](https://developers.google.com/maps/documentation/routes/overview?hl=de), [Apple Maps](https://developer.apple.com/maps/), [mapbox](https://www.mapbox.com/) oder der mächtigen [OpenStreetMap](https://wiki.openstreetmap.org/wiki/Software_libraries). Auch Routen lassen sich so berechnen, nicht zuletzt auch bei den Anbietern von Navigations- und Automobilsoftware, etwa [here](https://developer.here.com/documentation/routing-api/dev_guide/index.html), [tomtom](https://developer.tomtom.com/routing-api/documentation/product-information/introduction), [Geoapify](https://apidocs.geoapify.com/docs/routing/#routing) oder [openroute](https://openrouteservice.org/dev/#/api-docs).
- Außerdem gibt es Kartenmaterial von offiziellen Stellen, etwa beim [Bundesamt für Kartographie und Geodäsie](https://gdz.bkg.bund.de/index.php/default/digitale-geodaten.html) oder schlicht über die [Suchfunktion von govdata](https://www.govdata.de/web/guest/suchen/-/searchresult/f/format%3Ashape%2C/s/relevance_desc). 

Darüber hinaus bieten sich einige Einführungen an, ein technisches Verständnis von den Herausforderungen zu vermitteln:

- [Cary Anderson](https://www.e-education.psu.edu/geog486/node/726) hält einen ganzen Kurs über Kartographie und Visualisierung, mit einem Abschnitt für den Datenjournalismus.
- [Jacques Marcoux](https://datajournalism.com/read/longreads/geographic-information-systems-a-use-case-for-journalists) gibt einen Einblick für Datenjournalist:innen.
- [IBM](https://www.ibm.com/topics/geospatial-data) informiert über Geo-Daten und die Aufgaben, die bei großen Datenmengen damit einhergehen.
- Der Geoinformationsdienst (GIS) hält Informationen zu [Open-Source-Geo-Daten](https://www.gislounge.com/using-open-source-geospatial-data-in-journalism/) vor.


## Lösungsansätze

Ab hier folgen nun verschiedene Lösungswege zu den oben vorgestellten Übungen. Damit Sie die nicht "versehentlich" überscrollen und so Ihrer Übungsmöglichkeiten beraubt werden, folgt hier zunächst ein visueller Bruch.

![Winkende weiße Katze als GIF](https://media.giphy.com/media/vFKqnCdLPNOKc/giphy.gif)

### Trockenübungen

1. In der Regel ja, weil sie näher an menschlichen Kommunikationsmodi liegen und mehr(ere) Sinne ansprechen. Menschen bringen solchen Inhalten deshalb typischerweise mehr Aufmerksamkeit und auch mehr Glaubwürdigkeit entgegen und sind entsprechend anfälliger für derart gestaltete Persuasionsversuche. Verfahren des maschinellen Lernens sind im Umgang mit Bildern und multimodalen Inhalte darüber hinaus aktuell noch etwas fehleranfälliger und bedürfen eines höheren Rechenaufwands.
1. Raster- (speichern je Pixel einen Farbwert; zB jpg, png) und Vektor-Format (speichern Formen und Koordinaten, zB svg).
1. (1) Schallwellen digitalisieren und in Oszillogramm überführen, (2) Signal in Bestandteile (zB Wörter) zerteilen, (3) Bestandteile abstrahieren und in eine Art Vektor-Abbildung überführen, (4) Vektor-Abbildung mit Referenzdatenbank abgleichen.
1. Bei der (1) Standbildanalyse werden einzelne Standbilder analysiert. Bei der (2) Objektanalyse werden spezifische Objekte (Menschen, Tiere ...) erkannt und über die Zeit verfolgt. Bei der (3) Bild-Ton-Analyse werden, über die Zeitachse gekoppelt, auditive Signale als Hilfssignal für visuelle Signale zusätzlich eingebaut.