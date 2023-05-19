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

Clustering, Mehrebenenmodellierung, Zeitreihen und selbst Markow-Ketten gibt es in zahlreichen Verfahren und Herangehensweisen. Entsprechend vielfältig sind die einzelnen Zugänge, sodass wir auch hier von einzelnen Übungen absehen und stattdessen Empfehlungen für gute umfangreichere Anleitungen geben.


### Clusteranalyse

- Für R gibt [Zhenning Xu](https://bookdown.org/utjimmyx/marketing_research/kmeans-cluster-analysis.html) einen Einblick in das *k*-means-Clustering.
- Neben *k*-means geht [Roger Peng](https://bookdown.org/rdpeng/exdata/k-means-clustering.html) außerdem und sehr umfangreich auf Verfahren des [hierarchischen Clusterings]( https://bookdown.org/rdpeng/exdata/hierarchical-clustering.html) und, genereller, der [Dimensionsreduktion](https://bookdown.org/rdpeng/exdata/dimension-reduction.html) von Daten ein. Die Beispiele sind allesamt in R gehalten. Dazu gibt es jeweils auch Video-Einführungen (in englischer Sprache), also zu [*k*-means](https://youtu.be/QGDuvVRUURA), zu [hierarchischen Verfahren](https://youtu.be/BKoChxguelA) und zur [generellen Dimensionsreduktion](https://youtu.be/ts6UQnE6E1U).
- Ebenfalls für R gibt auch [Brit Davidson](https://bookdown.org/brittany_davidson1993/bookdown-demo/cluster-analysis.html) einen umfangreichen Einblick in zahlreiche verschiedene Clusterverfahren, auch in das hierarchische Clustering, insbesondere unter Zuhilfenahme der Pakete [factoextra](https://cran.r-project.org/web/packages/factoextra/), [cluster](https://cran.r-project.org/web/packages/cluster/), [dendextend](https://cran.r-project.org/web/packages/dendextend/) und  [fpc](https://cran.r-project.org/web/packages/fpc/index.html).
- [van Atteveldt, Trilling und Arcila](https://cssbook.net/content/chapter07.html#sec-clustering) setzen ebenfalls auf das [factoextra](https://cran.r-project.org/web/packages/factoextra/)-Paket, wenn sie auf *k*-means, hierarchische und sogar latente Clusterverfahren (insbes. die **P**rincipal **C**omponent **A**nalysis, PCA) mit R eingehen. Wie immer, bieten die Autoren ihren Code dabei auch für Python an, für das neben den schon kennengelernten Bibliotheken `scikit-learn`, `pandas` und `matplotlib` außerdem [seaborn](https://seaborn.pydata.org/), [numpy](https://numpy.org/) und [scipy](https://scipy.org/) zum Einsatz kommen.
- Zu guter Letzt bietet (wie immer) auch [scikit-learn](https://scikit-learn.org/stable/modules/clustering.html) selbst eine gute Einführung in seine Cluster-Algorithmen und -Verfahren, natürlich ausschließlich mit Python-Beispielen.


### Mehrebenenmodellierung

- [Paul Roback und Julie Legler](https://bookdown.org/roback/bookdown-BeyondMLR/) haben ein Buch über generelle lineare Modelle und die Mehrebenenmodellierung geschrieben. Neben einer erwerbbaren gedruckten Version ist das Buch und hier vor allem das Mehrebenenkapitel samt vielen Übungen (ausschließlich in R) auch [online](https://bookdown.org/roback/bookdown-BeyondMLR/ch-multilevelintro.html) verfügbar. Das Buch lässt nahezu keine Wünsche (für R) offen, wirkt dabei aber mitunter etwas erschlagend.
- Eine deutliche knappere Einführung, ebenfalls für R, bieten [Mark Lai](https://bookdown.org/marklhc/notes_bookdown/hierarchical-multilevel-models.html#multilevel-modeling-mlm), der dabei auch uns insbesondere auf Arten der Visualisierung eingeht, oder [Harrer und Kollegen](https://bookdown.org/MathiasHarrer/Doing_Meta_Analysis_in_R/multilevel-ma.html), die sich verstärkt den statistischen Grundlagen verschrieben haben.  
- Immer wieder stößt man bei derart fortgeschrittenen statistischen Verfahren im Internet auf Quellen, die sich sehr explizit einer bayesianischen (nach Bayes, den wir im Buch schon kennengelernt haben) Denkweise verschrieben haben. Eine hervorragende Einführung dazu geben sowohl [das Buch](http://xcelab.net/rm/statistical-rethinking/) als auch die [Online-Vorlesungen](https://www.youtube.com/channel/UCNJK6_DZvcMqNSzQdEkzvzA/playlists) von Richard McElreath Das gilt auch für die Mehrebenenmodellierung. Darauf aufbauend gibt [Solomon Kurz](https://bookdown.org/ajkurz/Statistical_Rethinking_recoded/multilevel-models.html) eine Einführung in die bayesianische Mehrebenenmodellierung mit R.

Unter all den kennengelernten Verfahren ist die Mehrebenenmodellierung wahrscheinlich diejenige, die sich am wenigsten mit Python (auf Einstiegsniveau) eignet. Möglich ist (natürlich) dennoch alles, aber die Auswahl an Anleitungen und die online verfügbare Unterstützung sind hier im Vergleich zu R deutlich eingeschränkt.

- Eine grundsätzliche Einführung in die Mehrebenenmodellierung ist auf der Seite [Python for Data Science](https://www.pythonfordatascience.org/mixed-effects-regression-python/), die von verschiedenen Autor:innen in unregelmäßigen Abständen befüllt wird, zu finden. Sie arbeiten mit der [statsmodels](https://www.statsmodels.org/)-Bibliothek.
- Bei der [statsmodels](https://www.statsmodels.org/stable/index.html)-Bibliothek findet sich ebenfalls eine knappe Einführung. Dabei wird erneut deutlich, dass R hier möglicherweise die verbreitetere Wahl darstellt.
- Die bayesianische Community gibt es auch bei Python, dabei vor allem im Umfeld der [PyMC](https://www.pymc.io/projects/docs/en/stable/learn.html)-Bibliothek.


### Zeitreihenmodellierung

- Für R gibt [Michael Foley](https://bookdown.org/mpfoley1973/time-series/) einen sehr umfangreichen Einblick in die Grundlagen, Darstellungsformen und unterschiedlichen Modellierungen.
- Ganz ähnlich gibt auch [Avril Coghlan](https://a-little-book-of-r-for-time-series.readthedocs.io/en/latest/src/timeseries.html) einen Überblick über Grundlagen, Visualisierung und Modellierung für R. Etwas knapper findet sich ähnliches bei [Ko Chiu Yu](https://bookdown.org/kochiuyu/Technical-Analysis-with-R/time-series-analysis.html).
- Für Python hat [Tarek Atwan](https://github.com/PacktPublishing/Time-Series-Analysis-with-Python-Cookbook) ein (nicht kostenfreies) Buch mit vielen Übungen geschrieben. Auch von [Jake VanderPlas](https://www.oreilly.com/library/view/python-data-science/9781491912126/) gibt es ein Buch voller Übungen zum Umgang mit Python (ebenfalls nicht kostenfrei).
- Kostenfrei sind hingegen die Python-Einführungen zu Zeitreihen der [statsmodels](https://www.statsmodels.org/stable/examples/index.html#time-series-analysis)-Bibliothek sowie, mit starkem Fokus auf maschinelles Lernen, von [TensorFlow](https://www.tensorflow.org/tutorials/structured_data/time_series).


### Markow-Ketten

- Eine sehr umfangreiche Einstiegsquelle für R mit Übungen (und Lösungen) stellt das Probability-Online-Buch von [Matt DiSorbo](https://bookdown.org/probability/beta/markov-chains.html) dar.
- Auch [Roger Peng](https://bookdown.org/rdpeng/advstatcomp/markov-chain-monte-carlo.html), [Daniel Barch](https://bookdown.org/danbarch/psy_207_advanced_stats_I/markov-chain-monte-carlo-methods.html) und [Mark Lai](https://bookdown.org/marklhc/notes_bookdown/markov-chain-monte-carlo.html) gehen auf Markow-Ketten und dabei auch auf die Monte-Carlo-Simulation ein.
- Der schon kennengelernte [Solomon Kurz](https://bookdown.org/ajkurz/Statistical_Rethinking_recoded/markov-chain-monte-carlo.html) gibt einen Einblick in Markow-Ketten mit R mit spezieller Rücksichtnahme auf bayesianische Prinzipien. 
- Für Python gibt etwa [Cyrille Rossant](https://ipython-books.github.io/131-simulating-a-discrete-time-markov-chain/) in ihrem Buch und als Auszug daraus auch online einen ersten Einstieg in den Umgang mit Markow-Ketten. 
- [Adrian Dolinay](https://www.youtube.com/watch?v=WT6jI8UgROI) erklärt das Prinzip von Markow-Ketten und den Umgang mit Python in einem etwa halbstündigen Video.
- Und [Cliburn Chan](https://people.duke.edu/~ccc14/sta-663-2020/notebooks/S15A_MarkovChains.html) geht im Rahmen seiner Kursmaterialien ebenfalls auf Python und Markow-Ketten ein.


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