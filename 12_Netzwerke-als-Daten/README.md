# Netzwerke als Daten

## Trockenübungen

1. Netzwerke, also die soziale Darstellung von Knoten und Kanten, lassen sich insbesondere auf zwei Dimensionen jeweils in zwei Gruppen einteilen. In welche?
1. Wie berechnet sich in ungewichteten Graphen die Distanz?
1. Was beschreibt die Nähenzentralität / Closeness?
1. Was sagt eine hohe Transitivität über einen Graphen aus?
1. Der Durchmesser eines fiktiven Netzwerks beträgt 24. Lässt sich etwas darüber aussagen, wie viel das ist?
1. Was ist "community detection"?

## Praxisübungen

Folgen noch.


## Lösungsansätze

Ab hier folgen nun verschiedene Lösungswege zu den oben vorgestellten Übungen. Damit Sie die nicht "versehentlich" überscrollen und so Ihrer Übungsmöglichkeiten beraubt werden, folgt hier zunächst ein visueller Bruch.

![Winkende weiße Katze als GIF](https://media.giphy.com/media/vFKqnCdLPNOKc/giphy.gif)

### Trockenübungen

1. Gerichtet/Ungerichtet (sind die Kanten Pfeile oder einfach nur Linien) und gewichtet/ungewichtet (sind Kanten unterschiedlich viel wert, also zB dicker/dünner).
1. Als kürzeste Anzahl der Kanten, die notwendig sind, um von einem bestimmten Knoten zu einem bestimmten anderen Knoten zu gelangen.
1. Als Maß beschreibt sie die möglichst nahe Distanz zu möglichst vielen anderen Knoten. Inhaltlich interpretierbar ist sie als Maß der (starken) Vernetzung.
1. Zunächst einen hohen Anteil "vollständiger" Dreiecksbeziehungen (alle drei Knoten sind mit allen anderen beiden Knoten vernetzt). Inhaltlich interpretierbar sind solche Graphen als Netzwerke mit hohem (sozialem) Zusammenhalt, also wahrscheinlich einer großen Nähe und Ähnlichkeit.
1. Jein. Typischerweise sind Netzwerke mit Menschen als Knoten dichter, sodass der Durchmesser in der Regel ein- oder niedrig zweistellig (zB 6-12) ist.
1. Eine Verfahrensfamilie zur automatisierten Erkennung von Gruppen/Clustern.