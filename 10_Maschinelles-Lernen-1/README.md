---
title: "Maschinelles Lernen I (überwachtes Lernen)"
chapter: "10"
layout: default
permalink: /10-maschinelles-lernen-1/
---

## Trockenübungen

1. Was ist "KI"?
1. Warum stellt "KI" ein Buzzword dar und was ist der Unterschied zu "maschinellem Lernen"?
1. Welche sechs Schritte gehören üblicherweise zum überwachten Lernen?
1. Worauf ist bei Training-Test-Split zu achten?
1. Nennen Sie drei algorithmische Verfahrensfamilien des überwachten Lernens.
1. In welchem Verhältnis stehen P(recision) und R(ecall)?


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
- Einen angenehmen Einstieg in das überwachte Lernen von Textdaten bietet etwa [spaCy](https://spacy.io/usage/spacy-101).
- Umfangreicher (und etwas objektiver) bietet das [Keh-Soon Yong](https://f0nzie.github.io/yongks-python-rmarkdown-book/sklearn.html).
- Und genereller, also nicht auf Textdaten beschränkt, finden sich zahlreiche Einstiegserklärungen und -beispiele bei [van Atteveldt, Trilling und Arcila](https://cssbook.net/content/chapter08.html), [Mark Scott](https://bookdown.org/content/f097ddae-23f5-4b2d-b360-ad412a6ca36a/chapter-4-supervised-learning.html) oder [Jake VanderPlas](https://jakevdp.github.io/PythonDataScienceHandbook/#5.-Machine-Learning).

### Links für R

- [tidymodels](https://www.tidymodels.org/) stellt die passende Erweiterung zum [tidyverse](https://www.tidyverse.org/) dar, um in R einfach lesbare und kompatible maschinelle Lernverfahren zu formulieren.
- [caret](https://cran.r-project.org/web/packages/caret/vignettes/caret.html) galt lange Zeit als das nutzungsfreundlichste und umfangreichste R-Paket für den Umgang mit überwachtem maschinellem Lernen. Noch immer erfreut sich das Paket großer Beliebtheit, wenngleich es mitunter eine etwas eigene Syntax erfordert.
- Für Textdaten gilt [quanteda](https://quanteda.io/) und für das maschinelle Lernen insbesondere [quanteda.textmodels](https://github.com/quanteda/quanteda.textmodels) als De-facto-Standard in den Sozialwissenschaften.
- Einen angenehmen Einstieg in das überwachte Lernen von Textdaten bietet [Julian Unkel](https://bookdown.org/joone/ComputationalMethods/textclassification.html). 
- Umfangreicher gehen [Emil Hvitfeldt und Julia Silge](https://smltar.com/) darauf ein.
- Und genereller, also nicht auf Textdaten beschränkt, finden sich zahlreiche Einstiegserklärungen und -beispiele bei [van Atteveldt, Trilling und Arcila](https://cssbook.net/content/chapter08.html).

## Lösungsansätze

Ab hier folgen nun verschiedene Lösungswege zu den oben vorgestellten Übungen. Damit Sie die nicht "versehentlich" überscrollen und so Ihrer Übungsmöglichkeiten beraubt werden, folgt hier zunächst ein visueller Bruch.

![Winkende weiße Katze als GIF](https://media.giphy.com/media/vFKqnCdLPNOKc/giphy.gif)

### Trockenübungen

1. Teilgebiet der Informatik zur Lösung Menschen vorbehaltener Probleme
1. keine spezifische Definition (auch nicht von "Intelligenz"), ML ist das informatische Prinzip "hinter" KI
1. (1) Goldstandard erstellen, (2) Pre-Processing und Feature Engineering, (3) Training-Test-Split, (4) Lernprozess mit ausgewähltem Algorithmus, (5) Validierung, (6) Anwendung/Deployment
1. Verzerrungsfreiheit (zufallsbasiert bei gleichzeitiger Repräsentation des Ursprungsverhältnisses)
1. (1) probabilistische Verfahren (zB Naive Bayes), (2) Entscheidungsbaumverfahren (zB Decision Tree), (3) Vektorverfahren (zB Support Vector Machine SVM), (4) neuronale Netze
1. P beschreibt die Genauigkeit, also wie viele der vom Modell für richtig gehaltenen Fälle sind wirklich richtig; R beschreibt die Trefferquote, also wie viele der richtigen Fälle vom Modell für richtig gehalten wurden
