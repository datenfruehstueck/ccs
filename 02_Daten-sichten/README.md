---
title: Daten sichten
chapter: 01
layout: default
---

# Daten sichten

## Trockenübungen

1. Beschreiben Sie, was Merkmalsträger, Merkmale, Merkmalsausprägungen und Werte sind.
1. Was ist `CSV`?
1. Was unterscheidet `JSON` von `CSV`?
1. Lösen Sie die binäre Schreibweise `00010111` in ihre Dezimalschreibweise auf.
1. Was sind ASCII, ISO-8859 und UTF-8?
1. Beschreiben Sie die Bestandteile eines Box- / Whisker-Plots.

## Praxisübungen

Laden Sie den (künstlich erzeugten) Datensatz [erstwaehlende.csv](https://raw.githubusercontent.com/datenfruehstueck/ccs/main/02_Daten-sichten/erstwaehlende.csv) auf Ihren Computer herunter. Sie können dazu den [hier](https://raw.githubusercontent.com/datenfruehstueck/ccs/main/02_Daten-sichten/erstwaehlende.csv) angegebenen Link nutzen und anschließend die Datei einfach speichern (Rechtsklick > Speichern unter ...) oder die Datei bei GitHub manuell auswählen und anschließend als `Raw` öffnen (und wieder speichern). Bei der Datei handelt es sich um eine einfache Textdatei, die Sie auch mit jedem Texteditor öffnen können (z.B. *TextEdit* unter MAC, *Notepad* oder *Notepad++* unter Windows). Sie erhalten Einblick in die Datei, die -- wie der Name schon sagt -- mit Kommata getrennte Werte je Zeile enthält. 

Speichern Sie die Datei auf Ihrem Computer. 

Im nächsten Schritt sollen die Daten in eine passendere Software eingelesen werden. Dafür können Sie ein Tabellenkalkulationsprogramm nutzen (z.B. Calc, Excel, Sheets). Noch besser (für die weiteren Übungen) wäre aber eine für die CCS übliche Programmiersprache, also **Python** oder **R**. Für beide erhalten Sie hier ein wenig Starthilfe. 

Python oder R müssen installiert werden. Entscheiden Sie sich für eines davon. Sie finden die Installationsdateien [für Python hier](https://python.org/) und [für R hier](https://r-project.org/). 

Im Anschluss installieren Sie außerdem eine sogenannte Entwicklungsumgebung, die Ihnen die (hier sehr einfach gehaltene) Programmierung erleichtert. Für Python empfehle ich Ihnen [PyCharm](https://www.jetbrains.com/pycharm/), für R das [RStudio](https://www.rstudio.com/). In beiden Fällen gibt es komplett kostenfreie und ausreichende Versionen, die "Community", "Free" oder "Open Source" heißen.

Die Anweisungen sind hier etwas bewusst vage gehalten. Denn für den weiteren Verlauf der Übungen ist es unabdingbar, dass Sie konkrete Anwendungsschritte für die beiden Programmiersprachen selbst recherchieren lernen. Weitere Tipps und Anleitungen zur Installation sowie zu den ersten Schritten in Python und R erhalten Sie beispielsweise [hier](https://www.youtube.com/watch?v=p6f4oq08z48), [hier](https://bookdown.org/valerie_hase/Github/tutorial-1-installation-und-aufbau-von-r-und-r-studio.html), [hier](https://bookdown.org/joone/ComputationalMethods/firststeps.html), [hier](https://data-flair.training/blogs/install-pandas-on-windows/) oder [hier](https://faculty.washington.edu/otoomet/machinelearning-py/python.html#installing-python).

Nach der Installation müssen Sie für die Praxisübungen zunächst eine Bibliothek (Python-Sprech) bzw. ein Paket (R-Sprech) installieren. Die hier vorgestellte und genutzte Bibliothek in Python heißt *pandas*, das entsprechende Paket in R nennt sich *tidyverse*. In Python installieren Sie von der Kommandozeile Ihres Computers (bzw. innerhalb von PyCharm über das *Terminal*) aus (mithilfe des folgenden Kommandos: `pip install pandas`), in R direkt in R bzw. RStudio (`install.packages('tidyverse')`). 

Sind die Programmiersprache, die Entwicklungsumgebung und die Bibliothek bzw. das Paket installiert, kann der folgende Code ausgeführt werden. Legen Sie dazu ein neues Skript an und kopieren Sie sich einfach den Code. Achten Sie aber darauf, dass der `.csv`-Datensatz und Ihr Skript im selben Verzeichnis liegen und auch von dort ausgeführt werden. 

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

Wenn Sie keine Fehlermeldung erhalten, sondern stattdessen eine angedeutete Tabelle (in Python: *dataframe*; in R: *tibble*) sehen, sind Sie startklar.

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
1. Kodierungen für Texte. Sie geben die Übersetzung von binär gespeicherten Werten in einzelne Zeichen an. ASCII ist dabei so etwas wie der Ursprung, kann aber nur mit 256 Zeichen umgehen. Die ISO-Normen können mehr, fokussieren aber immer auf einen bestimmten Zeichen- / Sprachraum. UTF-8 ist der Versuch einer dynamischen Länge, um alle Zeichen dieser Welt abbilden zu können. 
1. Box-Plots stellen Lage- und Streumaße einer metrischen Variable verdichtet dar. Dabei stellt die Box den Interquartilsabstand (IQR, 1.–3. Quartil) dar, der Median (2. Quartil) wird als dickere Linie darin abgebildet und die angehängten Linien ("whiskers") erweitern bis maximal zum 1,5-Fachen des IQR. Mitunter sind weitere Ausreißer als Punkte dargestellt.


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
