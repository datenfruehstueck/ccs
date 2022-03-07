# Daten sichten

## Trockenübungen

1. Beschreiben Sie, was Merkmalsträger, Merkmale, Merkmalsausprägungen und Werte sind.
1. Was ist `CSV`?
1. Was unterscheidet `JSON` von `CSV`?
1. Lösen Sie die binäre Schreibweise `00010111` in ihre Dezimalschreibweise auf.

## Praxisübungen

Laden Sie den (künstlich erzeugten) Datensatz [erstwaehlende.csv](https://raw.githubusercontent.com/datenfruehstueck/ccs/main/02_Daten-sichten/erstwaehlende.csv) auf Ihren Computer herunter. Sie können dazu den [hier](https://raw.githubusercontent.com/datenfruehstueck/ccs/main/02_Daten-sichten/erstwaehlende.csv) angegebenen Link nutzen oder die Datei bei GitHub manuell auswählen und anschließend als `Raw` öffnen. 

Bei der Datei handelt es sich um eine einfache Textdatei, die Sie mit jedem Texteditor öffnen können. Unter Mac können Sie also einfach **TextEdit** dafür nutzen, unter Windows **Notepad** oder **Notepad++**. Sie erhalten Einblick in die Datei, die -- wie der Name schon sagt -- mit Kommata getrennte Werte je Zeile enthält. 

Im nächsten Schritt sollen die Daten in eine passendere Software eingelesen werden. Dafür können Sie ein Tabellenkalkulationsprogramm nutzen (z.B. Calc, Excel, Sheets). Noch besser (für die weiteren Übungen) wäre aber eine für die CCS übliche Programmiersprache, also **Python** oder **R**. Für beide erhalten Sie hier ein wenig Starthilfe. 

Python oder R müssen installiert werden. Entscheiden Sie sich für eines davon. Installieren Sie außerdem eine sogenannte Entwicklungsumgebung, die Ihnen die (hier sehr einfach gehaltene) Programmierung erleichtert. Für Python empfehle ich Ihnen [PyCharm](https://www.jetbrains.com/pycharm/), für R das [RStudio](https://www.rstudio.com/). 

Nach der Installation müssen Sie für die Praxisübungen zunächst eine Bibliothek (Python-Sprech) bzw. ein Paket (R-Sprech) installieren. In Python tun Sie das von der Kommandozeile Ihres Computers (bzw. innerhalb von PyCharm über das *Terminal*) aus (`pip install pandas`), in R direkt in R bzw. RStudio (`install.packages('tidyverse')`). 

Die Anweisungen sind hier etwas bewusst vage gehalten. Denn für den weiteren Verlauf der Übungen ist es unabdingbar, dass Sie konkrete Anwendungsschritte für die beiden Programmiersprachen selbst recherchieren lernen. Sind die Bibliothek bzw. das Paket installiert, kann der folgende Code ausgeführt werden. Achten Sie aber darauf, dass der `.csv`-Datensatz und Ihr Skript im selben Verzeichnis liegen und auch von dort ausgeführt werden. 

```python
# Python
import pandas as pd
erstwaehlende = pd.read_csv('erstwaehlende.csv')
erstwaehlende
```

```r
# R
library(tidyverse)
erstwaehlende <- read_csv('erstwaehlende.csv')
erstwaehlende
```

### Datentypen und Messniveaus

Der Datensatz enthält (fiktive) Befragungsdaten von Erstwählenden (Merkmalsträger) in fünf Merkmalen:

- `id` ist eine eindeutige Kennung jeder befragten Person als Ganzzahl
- `geschlecht` enthält entweder ein *d*, ein *m* oder ein *w*
- `alter` ist ebenfalls eine Ganzzahl und gibt das Alter zum Zeitpunkt der Befragung an
- `smartphone` enthält den Hersteller des Smartphones der Befragten
- `parteipraeferenz` gibt die Wahlabsicht zum Zeitpunkt der Befragung (vor der Bundestagswahl) an

Beschreiben Sie möglichst detailliert die Datentypen und Messniveaus der einzelnen Merkmale.

### Anzahl Merkmalsträger

Zunächst gilt es, die Anzahl vorliegender Fälle zweifelsfrei zu identifizieren. Bereits dafür gibt es zahlreiche Herangehensweisen. Je zwei werden hier vorgestellt. Wie viele Erstwählende haben an der Befragung teilgenommen?

```python
# Python
erstwaehlende.count()
len(erstwaehlende)
```

```r
# R
erstwaehlende %>%
  count()
nrow(erstwaehlende)
```

### Merkmalsausprägungen und fehlende Werte

Um festzustellen, wie die genauen Merkmalsausprägungen im Datensatz vorliegen und um etwaige fehlende Werte zu identifizieren, ist es sinnvoll, zunächst alle Merkmale einzeln auszuzählen. Tun Sie das und beschreiben Sie Ihre Befunde. Ein Startbeispiel ist gegeben:

```python
# Python
erstwaehlende.groupby(['geschlecht']).size()
```

```r
# R
erstwaehlende %>%
  count(geschlecht)
```

### Lage- und Streumaße

Beschreiben Sie das Altersmerkmal näher und geben Sie Median, Mittelwert und Modus sowie Standardabweichung an. Für **Python** suchen Sie für eine konkrete Umsetzung bestenfalls nach `pandas describe numeric data`, für **R** installieren Sie das Paket `tidycomm` und suchen online nach `tidycomm describe numeric variable`.

### Histogramme

Mit Grafiken beschäftigen wir uns später. Aber wir interessieren uns hier bereits für relative Werte. Können Sie mit Python oder R die prozentualen Anteile der Smartphone-Hersteller im Datensatz berechnen (und sogar nach Anteil absteigend sortieren)?


## Lösungsansätze

Ab hier folgen nun verschiedene Lösungswege zu den oben vorgestellten Übungen. Damit Sie die nicht "versehentlich" überscrollen und so Ihrer Übungsmöglichkeiten beraubt werden, folgt hier zunächst ein visueller Bruch.

![Winkende weiße Katze als GIF](https://media.giphy.com/media/vFKqnCdLPNOKc/giphy.gif)

### Trockenübungen

1. Siehe Unterlagen.
1. Ein Dateiformat für tabellarische Daten.
1. `JSON` ist ein Dateiformat für hierarchische Daten. Es beschreibt mithilfe einer Schlüssel-Wert-Notation jeden Wert einzeln und benötigt deshalb mehr Speicherplatz. Allerdings kann es mit globalen wie lokalen Merkmalen umgehen (`CSV`: nur global) und kennt grundlegende Datentypen (Zahl vs. Text vs. fehlende Werte).
1. 23

### Praxisübungen

#### Merkmale

- `id`: uint16 oder uint32, nominalskaliert
- `geschlecht`: char, nominalskaliert
- `alter`: byte oder uint8 (oder höher), metrisch skaliert
- `smartphone`: string, nominalskaliert
- `parteipraeferenz`: string, nominalskaliert

#### Merkmalsträger

Es sind 768 Fälle / Erstwählende im Datensatz.

#### Merkmalsausprägungen und fehlende Werte

- `id`: Ausprägungen von 1-768, keine fehlend
- `geschlecht`: 38d, 326m, 321w, 83 fehlend (`NA`)
- `alter`: Werte von 18 bis 32, keine fehlend
- `smartphone`: einer von elf Herstellern oder `sonstige` (n = 75), keine fehlend
- `parteipraeferenz`: eine von sechs Parteien oder `sonstige` (n = 70) oder `keine Angabe` (n = 20), keine fehlend

#### Lage- und Streumaße

- Median / 2. Quartil / 50-Perzentil: 19
- Mittelwert: 19.1
- Modus: 19
- Standardabweichung: 1.41

#### Histogramme

1. Samsung: 18%
1. Xiaomi: 15%
1. Apple: 10%
1. LG: 10%
1. Sony: 8%
1. Huawei: 7%
1. Google: 5%
1. HTC: 5%
1. Nokia: 5%
1. Motorola: 4%
1. OnePlus: 4%

Auf sonstige Hersteller entfallen weitere 10%.
