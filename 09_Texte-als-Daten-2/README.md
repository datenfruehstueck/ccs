---
title: "Texte als Daten II"
chapter: "09"
layout: default
permalink: /09-texte-als-daten-2/
---
## Trockenübungen

1. Was sind Stoppwörter?
1. Beschreiben Sie den Unterschied zwischen Lemmatisierung und Stemming.
1. Welche Schritte gehören üblicherweise zum Pre-Processing?
1. Was ist eine DFM?


## Praxisübungen

Wir laden wieder den [Ten Thousand German News Articles Dataset](https://github.com/tblock/10kGNAD), den wir auch schon im vorherigen Abschnitt genutzt haben. Laden Sie sich [den Datensatz](https://github.com/datenfruehstueck/ccs/blob/main/08_Texte-als-Daten-1/10kgnad_articles.csv) auf Ihren Computer herunter und achten Sie beim Ausführen des Codes auf passende Pfade. Der Code zum Laden der Artikel in eine Variable (`articles`) ist wiederum vorgegeben.

```python
# Python
import pandas as pd

articles = pd.read_csv('10kgnad_articles.csv', sep = ';', header = None, names = [ 'ressort', 'article' ], quotechar = "'")
```

```r
# R
library(tidyverse)

articles <- read_csv2('10kgnad_articles.csv', col_names = c('ressort', 'article'), quote = "'", col_types = 'cc')
```


### Pre-Processing

Nun arbeiten wir uns schrittweise durch das Pre-Processing, das in den meisten Fällen einfach nur das Ändern eines Parameters umfasst. Wir beginnen mit der Überführung in Kleinschreibung.

```python
# Python

## einmalige Installation (wenn nicht schon im letzten Kapitel geschehen)
import nltk
nltk.download('punkt')

## eigentliche Tokenisierung
from nltk.tokenize import word_tokenize
articles['tokens_unigram'] = articles['article'].apply(word_tokenize, language='german')
```

```r
# R
library(quanteda)

articles_corpus <- corpus(articles, text_field = 'article')

articles_corpus %>%
  tokens(what = 'word') %>%
  tokens_tolower()
```

Recherchieren und ergänzen Sie die restlichen Schritte:

1. Entfernen von Interpunktion
1. Entfernen von Zahlen
1. Entfernen von URLs
1. Entfernen der acht Stoppwörter `der, die, das, ein, eine, einen, und, oder`
1. Stemming mithilfe von Snowball (in Python über den in nltk inkludierten `SnowballStemmer`, in R über die quanteda-Funktion `tokens_wordstem`)



### Parsing und Tagging

Für das Parsing und Tagging ist eine genaue Kenntnis der Grammatik nötig. Entsprechende Modelle müssen wir deshalb zunächst installieren. Dafür gibt es mehrere zur Auswahl, wir bedienen uns hier der Anschaulichkeit halber gleich zwei verschiedener. Anschließend versuchen wir uns im Parsing und Tagging eines einfachen (und bereits bekannten) Satzes. 

In R nutzen wir dafür einerseits ein *UDPipe*-Modell, das von Forschenden der Karls-Universität in Tschechien betrieben wird. Nach der Installation des [udpipe-Pakets](https://cran.r-project.org/web/packages/udpipe/) müssen wir einmalig das deutsche Sprachmodell herunterladen, bevor wir das eigentliche Parsing und Tagging durchführen können (das dauert mitunter ein paar Minuten). Außerdem nutzen wir auch mit R das [spaCy(r)-Paket](http://spacyr.quanteda.io/) mit dem Modell `de_core_news_md`, für das unter Windows aber noch zusätzlich [miniconda](https://conda.io/projects/conda/en/latest/user-guide/install/windows.html) installiert werden muss.

```python
# Python


```

```r
# R
library(udpipe)
library(spacyr)

## einmalige Installation(en)
udpipe_download_model(language = 'german')

spacy_install()
spacy_download_langmodel('de_core_news_md')
spacy_initialize(model = 'de_core_news_md')


## eigentliches Parsing/Tagging
## (Achtung: Dateiname muss hier ggf. angepasst werden)
udpipe_load_model('german-gsd-ud-2.5-191206.udpipe') %>% 
  udpipe_annotate('Die Klausur, die die Studierenden schreiben, ist anspruchsvoll.') %>% 
  as.data.frame(detailed = T) %>% 
  as_tibble()
  
'Die Klausur, die die Studierenden schreiben, ist anspruchsvoll.' %>%
  corpus() %>%
  spacy_parse(pos = TRUE,
              tag = TRUE,
              lemma = FALSE,
              entity = TRUE,
              nounphrase = TRUE,
              dependency = TRUE) %>%
  as_tibble()
```

1. Parsen / Taggen Sie die ersten zehn Dokumente des 10kGNAD-Datensatzes.
1. Nutzen Sie SpaCy zur Lemmatisierung des ersten Dokuments des 10kGNAD-Datensatzes.


### Named Entity Recognition

Für NER greifen wir ebenfalls auf spaCy zurück und müssen zunächst die entsprechenden Texte erneut "parsen". Einmal geparsed, lassen sich einfach vom Modell erkannte einzelne Entitäten extrahieren. Das gilt sowohl für einzelne Wörter, als auch für zusammengehörige Wörter, die spaCy auch als "Nounphrases" bezeichnet.

```python
# Python


```

```r
# R

'Die Klausur, die Christian Lindner schreibt, ist anspruchsvoll.' %>%
  corpus() %>%
  spacy_parse(pos = TRUE,
              tag = TRUE,
              lemma = FALSE,
              entity = TRUE,
              nounphrase = TRUE,
              dependency = TRUE) %>%
  entity_extract(type = 'all') %>%
  as_tibble()

'Die Klausur, die Christian Lindner schreibt, ist anspruchsvoll.' %>%
  corpus() %>%
  spacy_parse(pos = TRUE,
              tag = TRUE,
              lemma = FALSE,
              entity = TRUE,
              nounphrase = TRUE,
              dependency = TRUE) %>%
  nounphrase_extract() %>%
  as_tibble()
```

1. Extrahieren Sie Entitäten aus den ersten zehn Dokumenten des 10kGNAD-Datensatzes.
1. Finden Sie die häufigsten drei Entitäten im gesamten 10kGNAD-Datensatz. 


### Word Embeddings

Mit spaCy haben wir bereits ein vektorbasiertes Sprachmodell heruntergeladen, das wir jetzt auch für Word Embeddings nutzen können. Die Funktion dafür ist recht einfach, das Ergebnis aber sehr unübersichtlich -- immerhin erhalten wir schlicht dreihundert Zahlenwerte für jeden Begriff zurück.

Allerdings wurde die Funktion, Vektoren einzeln auszugeben, erst später in die Pakete eingeführt, sodass das R-Paket die entsprechende Funktionalität aktuell nicht standardmäßig beinhaltet. Wir müssen für R also zunächst eine eigene Version für [spaCyr](https://github.com/quanteda/spacyr/tree/issue-171) installieren, um hier einen Einblick zu bekommen. 

```python
# Python


```

```r
# R

## spaCyr zunächst abschalten, dann neu installieren und schließlich wieder laden
detach('package:spacyr', unload = TRUE)
devtools::install_github('quanteda/spacyr', ref = 'issue-171')
library(spacyr)
spacy_initialize(model = 'de_core_news_md')

'Die Klausur, die die Studierenden schreiben, ist anspruchsvoll.' %>%
  corpus() %>%
  spacy_parse(pos = TRUE,
              tag = TRUE,
              lemma = FALSE,
              entity = TRUE,
              nounphrase = TRUE,
              dependency = TRUE) %>%
  spacy_wordvectors_lookup()
```


### DFMs

Für die Erstellung von Document-Feature-Matrizen greifen wir der Einfachheit halber hier nur auf die pre-processeden Typen zurück. Im Grunde könnten wir eine DFM aber auch aus den gerade extrahierten Nounphrases bauen. Auf Basis dieser DFM können wir dann die Anzahl der Features, die (unveränderte) Anzahl der Dokumente sowie die Sparsity ableiten. 

Für den weiteren Verlauf reduzieren wir die DFMs allerdings drastisch, um den Rechenaufwand für die noch ausstehenden Visualisierungen gering zu halten. Deshalb behalten wir nur Wörter, die in mindestens einem Prozent, aber gleichzeitig in weniger als vierzig Prozent aller Dokumente vorkommen.

```python
# Python


```

```r
# R
articles_dfm <-
  articles_corpus %>%
  tokens(what = 'word') %>%
  tokens_tolower() %>%
  dfm() %>%
  dfm_trim(min_docfreq = .01, 
           max_docfreq = .40, 
		   docfreq_type = 'prop')

nfeat(articles_dfm)
ndoc(articles_dfm)
sparsity(articles_dfm)
```

Um aus DFMs Wortwolken oder die Keyness zu berechnen, benötigen wir in R noch eigene zusätzliche Pakete, die aber Teil des erweiterten quanteda-Universums sind. Sind [quanteda.textplots](https://cran.r-project.org/web/packages/quanteda.textplots/) und [quanteda.textstats](https://cran.r-project.org/web/packages/quanteda.textstats/) aber einmal installiert, ist die Handhabung für die Berechnung der Keyness und die Erstellung von Wortwolken indes ein Kinderspiel.

```python
# Python


```

```r
# R
library(quanteda.textplots)
library(quanteda.textstats)

articles_dfm %>%
  dfm_group(groups = ressort) %>%
  textstat_keyness(target = 'Inland') %>%
  textplot_keyness(n = 10)
```

1. Identifizieren Sie die zentralen Begriffe für den Bereich Web.
1. Finden Sie eine Lösung, das Ressort Inland nicht gegen alle anderen (wie im Beispiel), sondern nur gegen das Ressort International zu stellen.

```python
# Python


```

```r
# R
articles_dfm %>%
  textplot_wordcloud(maxwords = 100)
```

1. Erstellen Sie eine Wortwolke, die sich lediglich aus dem Ressort Wissenschaft speist.
1. Nutzen Sie Ihren ordentlich pre-processeden Korpus, um damit eine saubere(re) Wortwolke zu erstellen.


## Lösungsansätze

Ab hier folgen nun verschiedene Lösungswege zu den oben vorgestellten Übungen. Damit Sie die nicht "versehentlich" überscrollen und so Ihrer Übungsmöglichkeiten beraubt werden, folgt hier zunächst ein visueller Bruch.

![Winkende weiße Katze als GIF](https://media.giphy.com/media/vFKqnCdLPNOKc/giphy.gif)

### Trockenübungen

1. Allzu häufig vorkommende Begriffe in Korpora, die für Analysen in der Regel mehr Rauschen als inhaltlichen Mehrwert versprechen.
1. Das Stemming reduziert regelbasiert Wörter auf ihren Wortstamm, die Lemmatisierung führt Wörter inhaltlich auf ihre Nennform zurück.
1. Mindestens die eventuelle Überführung in Kleinschreibung, die Entfernung von Interpunktion und Zahlen, das Entfernen von Stoppwörtern, das Stemming oder die Lemmatisierung. 
1. Eine Matrix mit Types als Spalten und Dokumenten als Zeilen, wobei die Zellen in der Urform mit absoluten Vorkommnissen gefüllt sind.


### Praxisübungen

#### Pre-Processing

```python
# Python


```

```r
# R
articles_corpus %>%
  tokens(what = 'word',
         remove_punct = TRUE,
		 remove_numbers = TRUE,
		 remove_url = TRUE) %>%
  tokens_tolower() %>%
  tokens_remove(pattern = c('der', 'die', 'das', 'ein', 'eine', 'einen', 'und', 'oder')) %>%
  tokens_wordstem('german')
```


#### Parsing / Tagging

```python
# Python


```

```r
# R
udpipe_load_model('german-gsd-ud-2.5-191206.udpipe') %>% 
  udpipe_annotate(articles_corpus %>%
                    head(n = 10)) %>% 
  as.data.frame(detailed = T) %>% 
  as_tibble()
  
articles_corpus %>%
  head(n = 10) %>%
  spacy_parse(lemma = TRUE) %>%
  as_tibble()
```


#### Named Entity Recognition

```python
# Python


```

```r
# R
articles_tokens %>%
  head(n = 10) %>%
  spacy_parse(pos = TRUE,
              tag = TRUE,
              lemma = FALSE,
              entity = TRUE,
              nounphrase = TRUE,
              dependency = TRUE) %>%
  entity_extract(type = 'all') %>%
  as_tibble()

articles_corpus %>%
  spacy_parse(pos = TRUE,
              tag = TRUE,
              lemma = FALSE,
              entity = TRUE,
              nounphrase = TRUE,
              dependency = TRUE) %>%
  entity_extract(type = 'all') %>%
  as_tibble() %>%
  count(entity) %>%
  slice_max(n,
            n = 3)
```


#### DFMs

```python
# Python


```

```r
# R
articles_dfm %>%
  dfm_group(groups = ressort) %>%
  textstat_keyness(target = 'Web') %>%
  textplot_keyness(n = 10)

articles_dfm %>%
  dfm_subset(ressort %in% c('Inland', 'International')) %>%
  dfm_group(groups = ressort) %>%
  textstat_keyness(target = 'Inland') %>%
  textplot_keyness(n = 10)

articles_dfm %>%
  dfm_subset(ressort == 'Wissenschaft') %>%
  textplot_wordcloud(maxwords = 100)

articles_corpus %>%
  tokens(what = 'word',
         remove_punct = TRUE,
		 remove_numbers = TRUE,
		 remove_url = TRUE) %>%
  tokens_tolower() %>%
  tokens_remove(pattern = c('der', 'die', 'das', 'ein', 'eine', 'einen', 'und', 'oder')) %>%
  tokens_wordstem('german') %>%
  dfm() %>%
  dfm_trim(min_docfreq = .01, 
           max_docfreq = .40, 
		   docfreq_type = 'prop') %>%
  dfm_subset(ressort == 'Wissenschaft') %>%
  textplot_wordcloud(maxwords = 100)
```
