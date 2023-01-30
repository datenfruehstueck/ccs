# Maschinelles Lernen II (Unüberwachtes Lernen)

## Trockenübungen

1. Benennen Sie die zentralen Unterschiede zwischen überwachtem und unüberwachtem Lernen.
1. In welche (zwei) Arten der Mustererkennung lassen sich unüberwachte Verfahren einteilen?
1. Erklären Sie das Konzept der Konvergenz.
1. Wie lassen sich unüberwacht gelernte Modelle evaluieren?
1. Beschreiben Sie die zentrale Funktionsweise eines Themenmodells (topic modeling).
1. Was sind zentrale ethische Aspekte des maschinellen Lernens?

## Praxisübungen

Folgen noch.


## Lösungsansätze

Ab hier folgen nun verschiedene Lösungswege zu den oben vorgestellten Übungen. Damit Sie die nicht "versehentlich" überscrollen und so Ihrer Übungsmöglichkeiten beraubt werden, folgt hier zunächst ein visueller Bruch.

![Winkende weiße Katze als GIF](https://media.giphy.com/media/vFKqnCdLPNOKc/giphy.gif)

### Trockenübungen

1. Überwachtes Lernen benötigt einen Goldstandard (sog. "ground truth"), an der es sich im Lernprozess orientieren kann. Unüberwachtes Lernen hingegen **iteriert** so lange über einen nicht näher annotierten Datensatz, bis es mithilfe einer Kostenfunktion "das Gefühl hat", mehr Lernen lohnt sich nicht (sog. **Konvergenz**).
1. In die Erkennung von trennenden Strukturen (diskriminierende Verfahren) und die Erkennung von Zusammenhängen (generierende Verfahren).
1. Konvergenz beschreibt das Bemühen des Computers, den idealen Punkt zum Beenden des Trainingsprozesses zu identifizieren. Dafür wird eine Kostenfunktion über die Anzahl der Iterationen und eine Fehlergröße berechnet. Üblich ist die Suche nach einem (grafisch als 2D verstandenem, in der Realität aber multidimensionalem Koordinatensystem) Abstieg und einem anschließenden Minimum in dieser Kostenfunktion. Eine zentrale Gefahr besteht allerdings darin, dass dieses Minimum nicht das beste Minimum für die vorliegenden Daten darstellt, da möglicherweise der Startpunkt der Iterationen (zufällig) schlecht gewählt wurde.
1. Sie lassen sich untereinander vergleichen. Mitunter liegen außerdem extern messbare oder a-priori festgelegte und messbare Rahmenbedingungen vor. Für prominente Probleme gibt es außerdem sogenannte "Tasks", die als De-facto-Qualitätsmaßstab (insbes. für Übersetzungs- und Sprachmodelle) fungieren.
1. Daten (Texte) werden mithilfe eines generativen Modells in **k** (a-priori festgelegte Anzahl) Cluster (sogenannte "Themen") eingeteilt. Evaluiert wird für die Konvergenz dabei die cluster-interne Kohäsion bei gleichzeitiger cluster-externer Distinktion. Trainiert werden einerseits eine Matrix der Themen zu den Features/Wörtern und andererseits eine Matrix der Themen zu den Dokumenten.
1. Die probabilistische Zuschreibung (vs. deterministisch; es sind immer "Fehler" enthalten), die potenzielle Diskriminierung/algorithmische Verzerrung, die schwierige Nachvollziehbarkeit, die benötigten Ressourcen ...