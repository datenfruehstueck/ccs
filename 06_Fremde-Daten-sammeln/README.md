# Fremde Daten sammeln

## Trockenübungen

1. Zerlegen Sie die URL `https://www.ifkw.uni-muenchen.de/funktionen/suche/index.html?q=bachelorarbeit` in Protokoll, Host, Pfad und Parameter.
1. Was passiert bei einem Webseitenaufruf?
1. Wer darf unter welchen Bedingungen Online-Beiträge von - beispielsweise - Spiegel Online sammeln/scrapen?
1. Wie unterscheiden sich Scraping und agentenbasierte Tests?
1. Welche ethischen Prinzipien sind besonders bei Web Tracking virulent?
1. Was sind die zentralen Vorteile von Datenspenden?

## Praxisübungen

### Scraping

Es gibt jede Menge Anleitungen für unterschiedlichste Scraping-Übungen online. Wir wollen uns hier, zur Veranschaulichung, auf ein sehr einfaches beschränken: Das maschinelle "Abkratzen" von Tabellen, am Beispiel von [wahlrecht.de](https://wahlrecht.de). Das ist ein überparteilicher Dienst (rechtlich gesehen: ein Verein), der die sogenannten Sonntagsfragen für die deutsche Politik sammelt. Dabei werden Teilnehmende danach befragt, wen sie wählen würden, wäre am kommenden Sonntag Wahl. Ursprünglich fokussiert auf die Bundestagswahl, sammelt [wahlrecht.de](https://wahlrecht.de) längst auch Sonntagsfragen zu Landtagswahlen und von unterschiedlichen Meinungsforschungsinstituten. 

Wir konzentrieren uns hier beispielhaft auf die Sonntagsfragen der Forschungsgruppe Wahlen, die ihre Befragungen im Auftrag des ZDF-Politbarometers alle zwei Wochen (im unmittelbaren Vorfeld von Wahlen auch häufiger) durchführt. Unser Ziel ist es, eine kleine Forschungssoftware (in Python oder R) zu entwickeln, die die berichteten Projektionsergebnisse seit der letzten Bundestagswahl per Scraping erhebt. Dafür müssen wir die Spalten benennen und die Spalte des Veröffentlichungsdatums in ein Datumsformat konvertieren -- denn HTML kennt nur Text. Abschließend können wir die erhobenen/abgekratzten Daten danach filtern, dass sie nach der letzten Bundestagswahl erschienen sind.

Zunächst prüfen wir dafür die Angaben der Seite zu Web Scraping selbst über die sogenannte `robots.txt`-Datei. Wenn dem Scraping nichts im Weg steht, können wir die Seite über einen GET-Request aufrufen und die entsprechende Tabelle auslesen.

```python
# Python
import urllib.robotparser
import requests
from bs4 import BeautifulSoup
import pandas as pd
from datetime import datetime

url = 'https://www.wahlrecht.de/umfragen/politbarometer.htm'

rp = urllib.robotparser.RobotFileParser(url)
rp.read()
rp.can_fetch('*', url)

request = requests.get(url)

politbarometer = pd.DataFrame()
dom = BeautifulSoup(request.text, 'html.parser')
for row in dom.select('table.wilko tbody tr'):
  veroeffentlichung = datetime.strptime(row.select('td')[0].text, '%d.%m.%Y')
  if veroeffentlichung > datetime.strptime('26.9.2021', '%d.%m.%Y'):
    politbarometer = politbarometer.append({ 'Veröffentlichungsdatum': veroeffentlichung,
                            'CDU/CSU': row.select('td')[2].text,
                            'SPD': row.select('td')[3].text,
                            'Grüne': row.select('td')[4].text,
                            'FDP': row.select('td')[5].text,
                            'Linke': row.select('td')[6].text,
                            'AfD': row.select('td')[7].text,
                            'sonstige': row.select('td')[8].text,
                            'N': row.select('td')[10].text,
                            'Befragungszeitraum': row.select('td')[11].text },
                          ignore_index = True)
```

```r
# R
library(tidyverse)
library(rvest)
library(polite)

url <- 'https://www.wahlrecht.de/umfragen/politbarometer.htm'

session <- bow(url)
request <- scrape(session)

politbarometer <- 
  request %>% 
  html_element('table.wilko tbody') %>% 
  html_table(header = F,
             trim = T,
             dec = ',',
             na.strings = c('', '?', '–', '-'),
             convert = T) %>% 
  select('Veröffentlichungsdatum' = X1,
         'CDU/CSU' = X3,
         'SPD' = X4,
         'Grüne' = X5,
         'FDP' = X6,
         'Linke' = X7,
         'AfD' = X8,
         'sonstige' = X9,
         'N' = X11,
         'Befragungszeitraum' = X12) %>% 
  mutate(Veröffentlichungsdatum = dmy(Veröffentlichungsdatum)) %>%
  filter(Veröffentlichungsdatum > dmy('26.09.2021'))
```

1. Versuchen Sie als Übung nun, den Code auf Forsa und Infratest Dimap zu erweitern. Speichern Sie die Daten in einer gemeinsamen Variable, die eine zusätzliche Spalte zum Meinungsforschungsinstitut enthält.
1. Im Weiteren können Sie versuchen, nicht nur das Datum, sondern auch die eigentlichen Prozentwerte als Zahlen zu speichern. Dafür müssen etwaige Prozentzeichen entfernt und der verbleibende Text als Zahl interpretiert werden. 
1. Abschließend können Sie die als Zahlen interpretierten Werte visualisieren. Erstellen Sie beispielsweise ein Liniendiagramm für die SPD, in der jedes Meinungsforschungsinstitut eine Linie der SPD-Werte über die Zeit darstellt. Gibt es Institute, die die SPD systematisch besser oder schlechter als andere einschätzen?

### Agentenbasierte Tests

Für agentenbasierte Tests hat sich zuletzt immer stärker die frei verfügbare [Selenium](https://www.selenium.dev/documentation/webdriver/)-WebDriver-Bibliothek etabliert. Sie benötigt vier Teile:

1. Einen installierten und unterstützten Browser (z.B. Chrome, Firefox).
1. Einen Treiber, der Selenium mit dem Browser verknüpft. Dieser Treiber (z.B. Gecko) muss zum installierten Browser passen und kann über die [Selenium-Webseite](https://www.selenium.dev/documentation/webdriver/getting_started/install_drivers/) ausgewählt und heruntergeladen werden.
1. Selenium selbst. Hier hängt die Installation davon ab, mit welcher Programmiersprache Sie arbeiten. Für Python installieren Sie Selenium sehr einfach und wie bereits bekannt (`pip install selenium`). R benötigt einen Umweg über Java -- die Installation umfasst also Java, die entsprechende [Java-Bibliothek](https://www.selenium.dev/documentation/webdriver/getting_started/install_library/#requirements-by-language) und das [R-Paket](https://cran.r-project.org/web/packages/RSelenium/index.html).
1. Ihren Rezept-Code, der Selenium Anweisungen gibt, eine bestimmte Seite aufzurufen, Interaktionen auszuführen und/oder Daten zu erheben.

```python
# Python
from selenium import webdriver

driver = webdriver.Firefox()

driver.get('https://github.com/datenfruehstueck/ccs')

readme_link = driver.find_element_by_css_selector('[title="LICENSE.txt"]')
readme_link.click()

selenium.current_url
driver.title
```

```r
# R
library(RSelenium)

rsDriver()
selenium <- remoteDriver()
selenium$open()

selenium$navigate('https://github.com/datenfruehstueck/ccs')

readme_link <- selenium$findElement(using = 'css', '[title="LICENSE.txt"]')
readme_link$clickElement()

selenium$getCurrentUrl()
selenium$getTitle()
```

Auch für die Nutzung von Selenium gibt es online zahlreiche Einsteigstutorials. Die größte Hürde ist hierbei wohl, das Ganze ans Laufen zu bekommen. Geschafft? Super! Dann sind die folgenden Aufgaben mithilfe der [Online-Hilfe von Selenium](https://www.selenium.dev/documentation/webdriver/browser/) sicher kein Problem:

1. Navigieren Sie mithilfe von Selenium auf die Seite von  Google, suchen Sie nach dem Element mit dem Namen `q` und geben Sie automatisiert einen Suchbegriff ein. Anschließend übermitteln Sie mithilfe von Selenium ein Enter.
1. Sammeln Sie die gefunden Suchergebnisse, indem Sie alle `a`-Elemente und insbesondere, je `a`-Element, den Inhalt des `href`-Attributs extrahieren.
1. Beschreiben Sie in eigenen Worten, was bis hierhin geschieht. Analysieren Sie auch die gesammelten Daten und beschreiben Sie, ob und welche überschüssigen Daten Sie sammeln.
1. Versuchen Sie, die überschüssigen Daten bei einem erneuten Aufruf nicht zu sammeln.

### Web Tracking

Web Tracking erfolgt meist über professionelle Werkzeuge, die den Rahmen dieser Übung hier sprengen würden. Die Analyse der so erhaltenen Daten fällt in andere Sitzungen.

### Datenspenden

Alle großen Plattformen sind (in der EU) verpflichtet, ihren Nutzenden die Möglichkeit zum Download der über die Person gespeicherten Daten anzubieten. Das darf nicht zu versteckt sein. Google etwa bietet ein eigenes [Portal](https://takeout.google.com/) dafür an, um die Daten aus unterschiedlichen Services zu bündeln. Facebook bietet den Download in den Profileinstellungen je Service (z.B. für Facebook oder Instagram separat). Auch bei TikTok ist der Export in den Privatsphäre-Einstellungen zu finden. Bei Amazon ist der Export der eigenen Daten auf den [Amazon-Hilfeseiten](https://www.amazon.com/gp/help/customer/display.html) in den Profil- und Privatsphäre-Informationen verortet.

1. Beantragen Sie ihre eigenen Daten (oder Teile davon) bei einer selbst gewählten Plattform. Mitunter bedeutet das auch ein wenig Wartezeit -- Google etwa bietet die Daten nach einigen Minuten an und informiert Sie über Ihren Google-Posteingang.
1. Schauen Sie sich die Daten zunächst manuell und stichprobenartig, etwa mit einem Texteditor, an.
1. Laden Sie Teile der Daten mit Python oder R in ein passendes Datenformat und beschreiben Sie die Daten deskriptiv:
   - Welche Suchanfragen haben Sie gestellt?
   - Welche Alexa-Aufnahmen sind über Sie gespeichert?
   - Welche Werbe-Posts haben Sie angeklickt?
   - Zu welchen Zeiten haben Sie sich (mobil und am Desktop-Rechner) eingeloggt?
   - ...

In Forschungsprojekten mit Datenspenden würden Sie in weiterer Folge Teilnehmende bitten, Teile ihrer Daten mit Ihnen zu teilen (= sie Ihnen zu "spenden"). 

## Lösungsansätze

Ab hier folgen nun verschiedene Lösungswege zu den oben vorgestellten Übungen. Damit Sie die nicht "versehentlich" überscrollen und so Ihrer Übungsmöglichkeiten beraubt werden, folgt hier zunächst ein visueller Bruch.

![Winkende weiße Katze als GIF](https://media.giphy.com/media/vFKqnCdLPNOKc/giphy.gif)

### Trockenübungen

1. Protokoll: `https`, Host: `www.ifkw.uni-muenchen.de`, Pfad: `funktionen/suche/index.html`, ein Parameter namens `q` mit dem Wert `bachelorarbeit`
1. Siehe Unterlagen.
1. Siehe Unterlagen.
1. Siehe Unterlagen.
1. Siehe Unterlagen.
1. Siehe Unterlagen.
