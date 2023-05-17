---
title: "Gruppen und Sequenzen als Daten"
chapter: "13"
layout: default
permalink: /13-gruppen-und-sequenzen-als-daten/
---

## Trockenübungen

1. Gruppen lassen sich als abhängige und als unabhängige Größe verstehen. Was bedeutet das?
1. Wie lassen sich die zahlreichen Verfahren der Clusteranalyse einteilen?
1. Was ist ein "lag"?
1. Zeitreihen lassen sich additiv oder multiplikativ in drei Bestandteile zerlegen - welche sind das?
1. Bei der Mehrebenenmodellierung wird von klassischen Regressionsverfahren ausgegangen, die dann über Gruppeneinflüsse ergänzt werden. Nach welchen drei Grundprinzipien lassen sich diese Gruppeneinflüsse dabei modellieren?
1. Was sind Markow-Ketten?

## Praxisübungen

Folgen noch.


## Lösungsansätze

Ab hier folgen nun verschiedene Lösungswege zu den oben vorgestellten Übungen. Damit Sie die nicht "versehentlich" überscrollen und so Ihrer Übungsmöglichkeiten beraubt werden, folgt hier zunächst ein visueller Bruch.

![Winkende weiße Katze als GIF](https://media.giphy.com/media/vFKqnCdLPNOKc/giphy.gif)

### Trockenübungen

1. Als unabhängige Größe liegen Daten gruppiert vor, um als Prediktor in weitere Analysen einzufließen. Ein typischer Anwendungsfall sind verschachtelte oder hierarchische Dtaen, die als Mehrebenenmodelle verstanden werden müssen (z.B. Artikel in Redaktionen in Ländern). Als abhängige Größe stellt die Gruppierung das angepeilte Ergebnis einer Analyse dar. Ein typisches Anwendungsfeld davon ist die Clusteranalyse. 
1. In hierarchische und nicht-hierarchische Verfahren. Hierarchische Clusternalaysen können weiter unterteilt werden in divisive (top-down) und agglomerative (bottom-up) Verfahren. Als dritte Verfahrensfamilie haben sich in den letzten Jahren außerdem die latenten Clusteranalysen gesellt. 
1. Im Rahmen der Zeitreihenmodellierung wird als "lag" (Verzögerung) die Einheit der betrachteten zeitlichen Wiederholung und des statistisch dabei verschobenen zeitlichen Verzugs bezeichnet. 
1. Die **Saisonalität** beschreibt regelmäßig wiederkehrende Elemente, der **Trend** einen der gesamten Zeitreihe zugrundeliegende Veränderung und das **Rauschen** den verbleibenden Rest.
1. Danach, welche Konstanten der Regressionsverfahren dynamisch modelliert werden. Das können der Achsenabschnitt *a* (Random-Intercept-Modelle), die Steigung *b* (Random-Slope-Modelle) oder beides (Random-Intercept-and-Slope-Modelle) sein.
1. Markow-Ketten stellen ein statistisches Verfahren dar, das Übergangswahrscheinlichkeiten zwischen möglichen Zustandsänderungen in Form einer Übergangsmatrix (transition matrix) abbildet. 