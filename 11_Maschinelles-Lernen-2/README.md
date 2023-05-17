---
title: "Maschinelles Lernen 2 (unüberwachtes Lernen)"
chapter: "11"
layout: default
permalink: /11-maschinelles-lernen-2/
---

## Trockenübungen

1. Benennen Sie die zentralen Unterschiede zwischen überwachtem und unüberwachtem Lernen.
1. In welche (zwei) Arten der Mustererkennung lassen sich unüberwachte Verfahren einteilen?
1. Erklären Sie das Konzept der Konvergenz.
1. Wie lassen sich unüberwacht gelernte Modelle evaluieren?
1. Beschreiben Sie die zentrale Funktionsweise eines Themenmodells (topic modeling).
1. Was sind zentrale ethische Aspekte des maschinellen Lernens?

## Praxisübungen

Maschinelles Lernen mit Python und R befindet sich derzeit in ständigem Umbruch. Während viele jüngste Entwicklungen, etwa im Bereich der Transformer-Modelle, zunächst mit Python Verbreitung finden, sind die Anwendungen in R zunehmend einfacher und direkter in sozialwissenschaftliche Arbeitsprozesse integrierbar. Wir sehen hier deshalb von Schritt-für-Schritt-Anleitungen ab, weil sich diese Anleitungen ständig selbst überleben würden; stattdessen werden hier einige Begrifflichkeiten vermittelt, die "im Internet" Verwendung finden, und zahlreiche Links zu Lernumgebungen und Anleitungen gesammelt.

### Begriffsübersicht

Begriff aus dem Lehrbuch | informatische Synonyme | statistische Synonyme | (weitere) englische Synonyme
--- | --- | --- | ---
*Goldstandard* | ground truth | abhängige Variable | label, outcome
*Codierung* | Annotation | Codierung | code, rate, annotate
*Feature* | Feature | unabhängige Variable | term, word, uni/bi-/tri-/n-gram
*Trainings-/Testpaket* | Trainings-/Testdaten | Kalibrierung/Validierung | split
*Lernprozess* | trainieren | schätzen | train, estimate
*Validierung* | Inspektion | Güte | validation, verification
*Anwendung* | Klassifizierung | Prognose | classifier, prediction, deployment

### Links für Python

- [sklearn](https://scikit-learn.org/) (auch: `scikit-learn`) ist eine/die zentrale Python-Bibliothek für das maschinelle Lernen
- [TensorFlow](https://www.tensorflow.org/) (auch als `tf` abgekürzt) stellt eine verallgemeinernde Sprache für die Definition und Berechnung von neuronalen Netzen dar. Sie wurde einst von Google ins Leben gerufen, ist mittlerweile aber davon weitestgehend unabhängig, und für viele Programmiersprachen verfügbar. Im Kern aber ist sie eine [Python-Bibliothek](https://www.tensorflow.org/overview), die große Modelle effizient zu verarbeiten weiß. 
- Auch [Keras](https://keras.io/) ist eine verallgemeinernde Sprache für die Definition und Berechnung von neuronalen Netzen, die primär als [Python-Bibliothek](https://keras.io/api/) verfügbar ist. Sie ist von TensorFlow unabhängig, kann aber darauf aufbauen -- und dasselbe gilt umgekehrt. Der Fokus von Keras liegt in der einfachen Lesbarkeit. Für allzu große Modelle und deren effiziente Verarbeitung weicht Keras deshalb auf andere Bibliotheken (z.B. TensorFlow) aus. 
- [PyTorch](https://pytorch.org/) ist eine weitere Alternative für die verallgemeinernde Sprache von neuronalen Netzen, dieses Mal von Meta/Facebook. Sie ist recht neu, gilt aber als gute Kombination aus Effizienz und Lesbarkeit. Auch sie ist in erster Linie eine einfach zu nutzende [Python-Bibliothek](https://pytorch.org/docs/stable/index.html).
- Einen angenehmen Einstieg in das unüberwachte Lernen bietet etwa [sklearn selbst](https://scikit-learn.org/stable/unsupervised_learning.html).
- Auf Topic Modeling gehen etwa [James Fulton und Beverly Tan](https://ourcodingclub.github.io/tutorials/topic-modelling-python/) oder [van Atteveldt, Trilling und Arcila](https://cssbook.net/content/chapter11.html#sec-unsupervised) ein.

### Links für R

- [tidymodels](https://www.tidymodels.org/) stellt die passende Erweiterung zum [tidyverse](https://www.tidyverse.org/) dar, um in R einfach lesbare und kompatible maschinelle Lernverfahren zu formulieren.
- [caret](https://cran.r-project.org/web/packages/caret/vignettes/caret.html) galt lange Zeit als das nutzungsfreundlichste und umfangreichste R-Paket für den Umgang mit überwachtem maschinellem Lernen. Noch immer erfreut sich das Paket großer Beliebtheit, wenngleich es mitunter eine etwas eigene Syntax erfordert.
- Für Textdaten gilt [quanteda](https://quanteda.io/) und für das maschinelle Lernen insbesondere [quanteda.textmodels](https://github.com/quanteda/quanteda.textmodels) als De-facto-Standard in den Sozialwissenschaften.
- Einen angenehmen Einstieg in das unüberwachte Lernen bieten etwa [Laurent Gatto](https://lgatto.github.io/IntroMachineLearningWithR/unsupervised-learning.html).
- Auf Topic Modeling gehen etwa [Valerie Hase](https://bookdown.org/valerie_hase/TextasData_HS2021/tutorial-13-topic-modeling.html), [Julian Unkel](https://bookdown.org/joone/ComputationalMethods/topicmodeling.html) oder [van Atteveldt, Trilling und Arcila](https://cssbook.net/content/chapter11.html#sec-unsupervised) ein.

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